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

## Ver la página

- **Publicada:** GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root).
- **Agenda con datos de ejemplo:** agrega `?demo` al final de la URL, por ejemplo `…/index.html?demo`. Muestra horarios ficticios con una etiqueta "Vista de ejemplo" y no guarda nada.

## Agenda en línea (mismo sistema que la página del psicólogo)

La agenda usa el mismo contrato que la de RAM Psicólogo: un **Google Apps Script** publicado como aplicación web.

- `GET` responde `{ ok, schedule: { lines: [...] }, days: [{ date: "AAAA-MM-DD", status: "open" | "full" | "blocked", slots: ["10:00", …] }] }`
- `POST` recibe `{ name, phone, reason, date, time, website }` y responde `{ ok: true }`. Si el horario ya se ocupó, responde `{ ok: false, error: "slot_taken", message, days }`.

Si alguien viene por convenio, se manda dentro de `reason`, por ejemplo `"Consulta oftalmológica integral · Convenio JATCO"`, así que el script no necesita cambios.

**Importante:** Opal Eye necesita **su propia copia** del script, con su propio calendario u hoja y su horario: lunes a viernes de 10:00 a 20:00. No uses la URL del psicólogo, porque las citas caerían en su agenda.

Para conectarla:
1. Haz una copia del proyecto de Apps Script del psicólogo en la cuenta de Opal Eye, ajusta el horario y la duración de la consulta, y publícalo (Implementar → Aplicación web → Cualquier usuario).
2. Copia la URL que termina en `/exec`.
3. En `index.html`, pégala en `var APPS_SCRIPT_URL = "";`.

Mientras `APPS_SCRIPT_URL` esté vacía, la sección muestra un botón para agendar por WhatsApp.
