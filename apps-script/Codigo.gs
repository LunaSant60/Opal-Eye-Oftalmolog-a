/**
 * Agenda en línea de Opal Eye Oftalmología, conectada a Google Calendar.
 *
 * Se publica como aplicación web desde la cuenta de Google de la clínica.
 * Las citas se crean en ESE calendario, así que el script debe pertenecer
 * a la cuenta donde la doctora quiere ver sus citas.
 *
 *   GET  → horarios disponibles  { ok, timezone, schedule:{lines}, days:[{date,status,slots}] }
 *   POST → reservar             { name, phone, reason, date, time, website }
 *          responde { ok:true } o { ok:false, error:"slot_taken", message, days }
 *
 * Para bloquear un día completo (vacaciones, congreso), crea en el calendario
 * un evento de "todo el día". Cualquier otro evento ocupa sus horarios.
 */

var CONFIG = {
  CALENDAR_ID: 'primary',            // 'primary' = el calendario principal de la cuenta
  TIMEZONE: 'America/Mexico_City',
  DURATION_MIN: 30,                  // duración de cada consulta (confirmar con la doctora)
  DAYS_AHEAD: 14,                    // cuántos días hacia adelante se muestran
  MIN_NOTICE_HOURS: 2,               // no ofrecer horarios que empiecen en menos de 2 h
  // Horario por día de la semana (0 = domingo … 6 = sábado). Varios rangos por día si hay comida.
  HOURS: {
    1: [['10:00', '20:00']],
    2: [['10:00', '20:00']],
    3: [['10:00', '20:00']],
    4: [['10:00', '20:00']],
    5: [['10:00', '20:00']]
  },
  SCHEDULE_LINES: ['Lunes a viernes · 10:00 am a 8:00 pm'],
  NOTIFY_EMAIL: 'opal.eye.oftalmologia@gmail.com', // aviso por correo de cada cita nueva ('' para desactivar)
  EVENT_COLOR: CalendarApp.EventColor.CYAN
};

function doGet() {
  return json_({ ok: true, timezone: CONFIG.TIMEZONE, schedule: scheduleInfo_(), days: availability_() });
}

function doPost(e) {
  var data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, message: 'Solicitud inválida.' }); }

  // Campo trampa para bots: si viene lleno, fingimos éxito y no guardamos nada.
  if (data.website) return json_({ ok: true });

  var name = String(data.name || '').trim().slice(0, 80);
  var phone = String(data.phone || '').replace(/\D/g, '');
  var reason = String(data.reason || '').trim().slice(0, 140);
  var date = String(data.date || '');
  var time = String(data.time || '');
  if (!name || !/^\d{10}$/.test(phone) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return json_({ ok: false, message: 'Revisa tu nombre, tu WhatsApp y el horario elegido.' });
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return json_({ ok: false, message: 'Hay mucha demanda en este momento. Intenta de nuevo.' });
  try {
    var free = freeSlots_(date);
    if (free.indexOf(time) === -1) {
      return json_({ ok: false, error: 'slot_taken', message: 'Ese horario ya no está disponible. Elige otro.', days: availability_() });
    }
    var start = toDate_(date, time);
    var end = new Date(start.getTime() + CONFIG.DURATION_MIN * 60000);
    var ev = calendar_().createEvent('Consulta: ' + name, start, end, {
      description: 'Paciente: ' + name + '\nWhatsApp: ' + phone + '\nMotivo: ' + (reason || '—') +
                   '\n\nAgendado desde la página web.\nhttps://wa.me/52' + phone
    });
    if (CONFIG.EVENT_COLOR) ev.setColor(CONFIG.EVENT_COLOR);
    if (CONFIG.NOTIFY_EMAIL) {
      MailApp.sendEmail(CONFIG.NOTIFY_EMAIL, 'Nueva cita: ' + name + ' · ' + date + ' ' + time,
        'Paciente: ' + name + '\nWhatsApp: ' + phone + '\nMotivo: ' + (reason || '—') + '\nFecha: ' + date + ' ' + time);
    }
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// ---------- disponibilidad ----------

function availability_() {
  var out = [];
  var today = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd');
  for (var i = 0; i <= CONFIG.DAYS_AHEAD; i++) {
    var ds = addDays_(today, i);
    var dow = toDate_(ds, '12:00').getDay();
    if (!CONFIG.HOURS[dow]) continue;               // días sin consulta no se muestran
    if (isBlocked_(ds)) { out.push({ date: ds, status: 'blocked', slots: [] }); continue; }
    var slots = freeSlots_(ds);
    if (i === 0 && !slots.length) continue;          // hoy sin horarios: no lo mostramos
    out.push({ date: ds, status: slots.length ? 'open' : 'full', slots: slots });
  }
  return out;
}

function freeSlots_(ds) {
  var dow = toDate_(ds, '12:00').getDay();
  var ranges = CONFIG.HOURS[dow];
  if (!ranges || isBlocked_(ds)) return [];
  var dayStart = toDate_(ds, '00:00'), dayEnd = new Date(dayStart.getTime() + 864e5);
  var busy = calendar_().getEvents(dayStart, dayEnd).filter(function (ev) { return !ev.isAllDayEvent(); });
  var earliest = Date.now() + CONFIG.MIN_NOTICE_HOURS * 3600000;
  var step = CONFIG.DURATION_MIN * 60000;
  var slots = [];
  ranges.forEach(function (r) {
    var t = toDate_(ds, r[0]).getTime(), stop = toDate_(ds, r[1]).getTime();
    for (; t + step <= stop; t += step) {
      if (t < earliest) continue;
      var overlaps = busy.some(function (ev) { return ev.getStartTime().getTime() < t + step && ev.getEndTime().getTime() > t; });
      if (!overlaps) slots.push(Utilities.formatDate(new Date(t), CONFIG.TIMEZONE, 'HH:mm'));
    }
  });
  return slots;
}

function isBlocked_(ds) {
  var d = toDate_(ds, '12:00');
  return calendar_().getEventsForDay(d).some(function (ev) { return ev.isAllDayEvent(); });
}

function scheduleInfo_() {
  return { lines: CONFIG.SCHEDULE_LINES, durationMin: CONFIG.DURATION_MIN };
}

// ---------- utilidades ----------

function calendar_() {
  var cal = CONFIG.CALENDAR_ID === 'primary' ? CalendarApp.getDefaultCalendar() : CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!cal) throw new Error('No se encontró el calendario ' + CONFIG.CALENDAR_ID);
  return cal;
}

// Fecha "yyyy-MM-dd" + hora "HH:mm" interpretadas en la zona horaria de la clínica.
function toDate_(ds, hm) {
  return Utilities.parseDate(ds + ' ' + hm, CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm');
}

function addDays_(ds, n) {
  var d = toDate_(ds, '12:00');
  return Utilities.formatDate(new Date(d.getTime() + n * 864e5), CONFIG.TIMEZONE, 'yyyy-MM-dd');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Ejecuta esta función una vez desde el editor para dar permisos y ver la disponibilidad en el registro.
function probar() {
  Logger.log(JSON.stringify(availability_(), null, 2));
}
