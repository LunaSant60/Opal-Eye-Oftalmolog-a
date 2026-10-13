# Opal Eye Oftalmología: expediente y propuesta de identidad

## 1. Datos del negocio (confirmados)

| Dato | Valor | Fuente |
|---|---|---|
| Nombre | **Opal Eye Oftalmología** | Google Maps y opaleyeoftalmo.com |
| Doctora | **Dra. Paola Hernández Romo**, cirujano oftalmólogo | Descripción de su ficha de Google |
| Certificaciones | Certificada por el Consejo Mexicano de Oftalmología; miembro de la Sociedad Mexicana de Oftalmología | Ficha de Google |
| Cédulas | C.P. 11777757 (UAA) · C.E. 15127190 (UNAM) | Ficha de Google |
| Dirección | Plaza La Cantera, Blvd. Juan Pablo II 1098, Local 12, Canteras de San Agustín, 20218 Aguascalientes, Ags. | Google Maps |
| Horario | **Lunes a viernes 10:00–20:00** · Sábado y domingo cerrado | Cliente (Google Maps aún dice 9:00; conviene actualizarlo) |
| Teléfono / WhatsApp | 449 999 7719 (+52 449 999 7719) | Google Maps y widget de WhatsApp de su sitio |
| Correo | **opal.eye.oftalmo@gmail.com** | Cliente |
| Calificación | **5.0 ★ con 13 reseñas** | Google Maps |
| Distintivo | Negocio dirigido por mujeres | Google Maps |
| Redes | Instagram [@opal.eye.ofta](https://www.instagram.com/opal.eye.ofta/) · Facebook [Opal.Eye.Ofta](https://www.facebook.com/Opal.Eye.Ofta/) | Su sitio |
| Sitio actual | https://opaleyeoftalmo.com (hecho con Totalplay Constructor Web) | Link del cliente |
| Place ID de Google | ChIJfYib72rvKYQREqbpO5YC7KE | Google Maps |

### Servicios (los mismos de su sitio)
1. **Consulta oftalmológica integral**: agudeza visual, presión intraocular, fondo de ojo, análisis de película lagrimal y revisión detallada. Refracción no se incluye (indicación del cliente).
2. **Cirugías oftalmológicas**: con seguimiento antes y después. Una reseña menciona una cirugía de cataratas.
3. **Tratamientos con láser.**

### Reseñas visibles en Google (textuales)
- "La doctora es muy atenta y explica muy bien, atendió a mi abuelo por cataratas, ahora ya puede ver bien."
- "Excelente atención, la doctora muy amable y te apoya en todo momento!!!"
- "Muy preparada la doctora. Estoy esperando otra consulta para poder operarme :)"
- "Exelente servicio y calidad y sobretodo precios muy accesibles 👍🏼" (no se usó en la página por el error de ortografía)

En la página se citan como "Opinión en Google", sin nombres de quienes las escribieron.

## 2. Diagnóstico de su página actual
- Usa plantilla genérica: azul corporativo, olas y una fuente Ubuntu que **no son los colores de su logo**.
- Todas las fotos son de banco de imágenes (Freepik). Una incluso muestra a un doctor hombre, cuando quien atiende es ella.
- No aparece su nombre, sus cédulas, su dirección, su horario, sus reseñas ni el mapa.
- El formulario pide correo, cuando sus pacientes contactan por WhatsApp.
- La página de contacto dice "24 hrs X 7 días", pero Google dice L–V 9–20. **Hay que preguntarle cuál es el correcto** (quizás lo de 24/7 se refiere a WhatsApp).

## 3. Identidad: su logo como protagonista + "el ópalo"
Su logo ya es muy bueno: un ojo turquesa con una figura (¿caballito de mar o dragón?) que forma el iris, sobre azul marino. La página nueva parte de él:

- **Logo vectorizado** a partir del logo que mandó el cliente:
  - `logo-opal-eye.svg`: logotipo completo (ojo + "OPΛL EYE" + "OFTALMOLOGÍA"), con la A sin barra original. Va en el encabezado y el pie.
  - `logo-mark.svg`: solo el ojo. Va en el favicon, el hero y los detalles.
  Si su diseñador tiene el archivo original (AI, SVG o PDF), se puede cambiar por ese, aunque el trazo ya quedó prácticamente igual.
- **El ojo-ópalo.** En el hero, su logo aparece grande y pintado con el "juego de color" del ópalo (turquesa → aqua → cielo → lila → durazno). El brillo sigue al cursor y los tonos cambian al hacer scroll, como un ópalo bajo la luz. Ese es el sello: lo ves y sabes que es Opal Eye.
- **Ojito separador**: un ojo mínimo que acompaña los títulos y las listas.
- **Su propio eslogan** en el hero ("Cuidamos tu visión con precisión y cercanía"), más la frase nueva *"Cada mirada es única, como un ópalo."*

### Paleta

| Token | Color | Origen |
|---|---|---|
| `--navy` | `#0E212F` | Fondo de su logo |
| `--teal` | `#54A5A4` | Color de su logo |
| `--teal-strong` | `#2F7473` | Turquesa más oscuro para botones y texto (contraste AA) |
| `--teal-soft` | `#E4F2F1` | Fondos suaves |
| Ópalo | `#8FD8D2` `#A9D3F0` `#C6C0EE` `#F5CDB8` `#C2EAD8` | El juego de color, solo como acento |

### Tipografía (archivos que mandó el cliente, en `fonts/`)
- **Marlin**: títulos grandes en mayúsculas. Es la letra del logotipo, con la Λ.
- **Asen Pro**: texto, subtítulos y citas (pesos 300, 400, 400 itálica y 600).
- **Mosafin**: etiquetas, botones y números (pesos 500 y 600).
Quedan disponibles más pesos en los archivos originales si hacen falta.

## 4. Pendiente (opcional, para la versión final)
- [x] Foto de la Dra. Paola (`dra-paola.jpg`, en la sección "Quién te atiende")
- [x] Logo en alta (vectorizado: `logo-opal-eye.svg`)
- [ ] Fotos del consultorio y de la fachada (opcional, para una galería)
- [ ] Confirmar el horario (L–V 9–20 contra "24 hrs X 7 días")
- [ ] Saber qué representa la figura del logo, para contarlo en la página si tiene historia
- [ ] Subespecialidad o cirugías que más hace (catarata, láser, etc.), para detallar servicios
- [ ] Aseguradoras, formas de pago y facturación
- [ ] Dominio: publicar en opaleyeoftalmo.com

## 5. Cambios de la ronda 2 (indicaciones del cliente)
- Horario 10:00–20:00 y correo opal.eye.oftalmo@gmail.com.
- Titular: "Tu visión merece una mirada experta." Sección de señales: "Lo que no duele también importa."
- Se quitó el halo alrededor del ojo del hero, y los ojitos pequeños se cambiaron por puntos.
- "Quién te atiende" pasó a ser **"Sobre mí"**, en primera persona.
- Consulta integral sin refracción, con fondo de ojo y análisis de película lagrimal.
- Sección **Convenios**: convenio con JATCO (botón que preselecciona el convenio en la agenda) y una oferta de convenios para otras empresas. Precio con convenio JATCO: **$650 MXN por consulta**.
- **Agenda en línea** con el mismo sistema del psicólogo (ver README). **Pendiente:** publicar el Apps Script propio de Opal Eye y pegar su URL.
- Tipografías de la marca: Marlin, Asen Pro y Mosafin.
