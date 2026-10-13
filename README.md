# Opal Eye Oftalmología: sitio web

Sitio de una sola página para Opal Eye Oftalmología (Dra. Paola Hernández Romo, Aguascalientes).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa (estilos y código incluidos) |
| `fonts/` | Tipografías de la marca en WOFF2, recortadas a caracteres del español: Marlin (títulos), Asen Pro (texto) y Mosafin (etiquetas y números) |
| `logo-opal-eye.svg` | Logotipo completo vectorizado |
| `logo-mark.svg` | Solo el ojo, que también se usa como favicon |
| `dra-paola.jpg` | Foto de la sección "Sobre mí" |
| `BRIEF.md` | Expediente del negocio, identidad y pendientes |
| `apps-script/Codigo.gs` | Servidor de la agenda (Google Apps Script + Google Calendar) |

## Ver la página

- **Publicada:** GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root).
- **Agenda con datos de ejemplo:** agrega `?demo` al final de la URL, por ejemplo `…/index.html?demo`. Muestra horarios ficticios con una etiqueta "Vista de ejemplo" y no guarda nada.

## Agenda en línea (mismo sistema que la página del psicólogo)

La agenda usa el mismo contrato que la de RAM Psicólogo: un **Google Apps Script** publicado como aplicación web.

- `GET` responde `{ ok, schedule: { lines: [...] }, days: [{ date: "AAAA-MM-DD", status: "open" | "full" | "blocked", slots: ["10:00", …] }] }`
- `POST` recibe `{ name, phone, reason, date, time, website }` y responde `{ ok: true }`. Si el horario ya se ocupó, responde `{ ok: false, error: "slot_taken", message, days }`.

Si alguien viene por convenio, se manda dentro de `reason`, por ejemplo `"Consulta oftalmológica integral · Convenio JATCO"`, así que el script no necesita cambios.

**Importante:** Opal Eye usa **su propio script**, en `apps-script/Codigo.gs`, conectado a **su Google Calendar**. No uses la URL del psicólogo, porque las citas caerían en su agenda.

### Conectarla a Google Calendar (unos 10 minutos)
1. Entra a https://script.google.com con la **cuenta de Google donde la doctora quiere ver sus citas** (por ejemplo opal.eye.oftalmo@gmail.com) y crea un **Proyecto nuevo**.
2. Borra lo que trae el archivo `Código.gs` y pega todo el contenido de `apps-script/Codigo.gs`.
3. Revisa `CONFIG` al inicio del archivo:
   - `DURATION_MIN`: cuánto dura cada consulta. Viene en 30 minutos; **confírmalo con la doctora**.
   - `HOURS`: el horario por día, ya puesto de lunes a viernes de 10:00 a 20:00. Si hay hora de comida, se ponen dos rangos, por ejemplo `[['10:00','14:00'], ['16:00','20:00']]`.
   - `NOTIFY_EMAIL`: a dónde llega el aviso de cada cita nueva.
4. Guarda, elige la función `probar` y dale **Ejecutar**. Google pide permisos para Calendar y Gmail: acéptalos. En el registro aparecen los horarios disponibles.
5. **Implementar → Nueva implementación → Tipo: Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
6. Copia la URL que termina en `/exec` y pégala en `index.html`, en `var APPS_SCRIPT_URL = "";`. Sube el cambio.

### Cómo se usa en el día a día
- Cada cita aparece en su Google Calendar como **"Consulta: Nombre"**, con WhatsApp, motivo (incluido si viene por convenio JATCO) y un link para escribirle al paciente.
- Cualquier evento que ella ponga en su calendario **ocupa esos horarios** en la página.
- Para **bloquear un día completo** (vacaciones, congreso), basta con crear un evento de **todo el día**.
- Si cambias el código del script después, ve a **Implementar → Administrar implementaciones → editar → Versión nueva**. Así la URL sigue siendo la misma.

Mientras `APPS_SCRIPT_URL` esté vacía, la sección muestra un botón para agendar por WhatsApp.
