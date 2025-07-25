Quiero crear un portafolio narrativo basado en un terminal moderno estilo hacker-retrofuturista, usando Astro como framework principal. El objetivo es que cada sección de la web parezca una terminal de comunicación con diferentes entidades simbólicas (personajes que admiro como Lex Luthor, Barbara Gordon, etc.), y que al hacer clic sobre cada personaje, se abra un modal tipo “transmisión en vivo” o “mensaje confidencial”.

🖥️ Estructura general:
- Diseño inspirado en terminal retro (línea de comandos, colores neón, fuente monospace).
- Paleta de colores principal:
    - Fondo: `#0D2F2B`
    - Texto: `#33FF66`
    - Acentos: `#33FC2`
- Tipografía: `IBM Plex Mono` o `Fira Code`
- Animaciones de escritura tipo terminal (efecto de typing lento, como si el mensaje se escribiera en tiempo real).

📁 Secciones del terminal:
1. **Home / Boot**:
    - Animación tipo "sistema iniciando"
    - Texto estilo:
        ```
        > Initializing system...
        > Connecting to nodes...
        > Entities detected [LEXCORP] [ORACLE LINK] [WAYNE TECH]
        ```
    - Luego aparecen íconos o avatars de los personajes.

2. **Personajes (Íconos interactivos)**:
    - Al hacer clic en un personaje, abrir un modal o consola flotante que simula un mensaje cifrado.
    - Ejemplo:
        - `LEXCORP Uplink Established`
        - Texto escrito en tiempo real (carta de Lex, por ejemplo)
        - Modal con fondo borroso, visual de terminal segura (como SSH)

3. **Archivos / Proyectos / Repos**:
    - Listado de proyectos personales tipo:
        ```
        > access ./proyectos
        - [x] shiny_dashboards.R
        - [x] etl_indicadores.py
        - [x] lexterminal.web
        ```

4. **Visión / Manifiesto**:
    - Muestra una carta tipo manifiesto personal como si fuera un archivo .txt dentro del sistema.
    - Comando para acceder: `> ./vision.txt`

5. **Memoria** (timeline):
    - Visual tipo git log:
        ```
        2021-03 - [Comencé la U]
        2022-06 - [Primer script en R]
        2025-07 - [LexCorp idea founded]
        ```

📦 Tecnologías a usar:
- Astro (base del proyecto)
- TailwindCSS (para estilos rápidos, tipografía, colores)
- React integrado para los modales (mensajes interactivos)
- `react-typewriter-effect` o efecto typing en Astro
- Posiblemente `framer-motion` para transiciones suaves

🔐 Extras:
- Todos los modales deben simular "comunicaciones encriptadas"
- Cada uno con su “marca”:
    - LEXCORP (rojo oscuro / glitch)
    - ORACLE LINK (azul / púrpura / líneas limpias)
    - WAYNE TECH (gris oscuro / HUD estilo militar)

🧪 Objetivo final:
Un sitio web tipo terminal de acceso confidencial, que sirve como:
- Portafolio técnico
- Archivo narrativo personal
- Carta de presentación única y poderosa
