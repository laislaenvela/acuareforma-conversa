# Design Tokens v1
## Acuareforma Conversa

> Versión: 1.0
> Estado: Activo

Los Design Tokens constituyen la única referencia oficial para los colores del proyecto.

Los componentes no deben utilizar códigos HEX directamente cuando exista un Design Token equivalente.

---

| Categoría | Design Token | Valor | Uso |
|-----------|--------------|--------|-----|
| **Brand** | `--color-brand-primary` | `#7FA1FF` | Identidad institucional, Hero y elementos de marca. |
| **Proposal** | `--color-proposal` | `#5D74E8` | Exploración de la propuesta, botones principales y estados activos relacionados con la lectura. |
| **Participation** | `--color-participation` | `#CFE046` | Participación individual, formularios, aportes y acciones del usuario. |
| **Community** | `--color-community` | `#F27340` | Indicadores colectivos, estadísticas y participación comunitaria. |
| **Text** | `--color-text-primary` | `#0F1B5B` | Color principal para textos, navegación, iconografía y títulos secundarios. |
| **Text** | `--color-text-secondary` | *(Pendiente de definir)* | Textos secundarios. |
| **Text** | `--color-text-inverse` | `#FFFFFF` | Texto sobre fondos oscuros o de color. |
| **Surface** | `--color-surface-navbar` | `#DDE0F3` | Fondo del navbar. |
| **Surface** | `--color-surface-primary` | `#FFFFFF` | Fondo principal del sitio. |
| **Surface** | `--color-surface-secondary` | *(Pendiente de definir)* | Superficies secundarias. |
| **Border** | `--color-border-default` | *(Pendiente de definir)* | Bordes estándar del sistema. |
| **Link** | `--color-link` | `var(--color-proposal)` | Color por defecto de los enlaces. |
| **Link** | `--color-link-hover` | `var(--color-text-primary)` | Estado hover de los enlaces. |
| **Button** | `--color-button-primary` | `var(--color-proposal)` | Botón principal del sistema. |
| **Button** | `--color-button-secondary` | `#FFFFFF` | Fondo del botón secundario. |
| **Button** | `--color-button-secondary-text` | `var(--color-text-primary)` | Texto del botón secundario. |
| **Button** | `--color-button-secondary-border` | `var(--color-text-primary)` | Borde del botón secundario. |
| **Progress** | `--color-progress` | `#F9B043` | Indicadores de avance, seguimiento del proceso y recursos gráficos de acompañamiento. |
---

# Reglas

1. Los Design Tokens describen funciones, no colores.

2. Ningún componente debe utilizar códigos HEX directamente cuando exista un Design Token equivalente.

3. Los componentes deben reutilizar los Design Tokens existentes antes de crear nuevos.

4. Si un mismo color cumple varias funciones, los tokens semánticos deben apuntar al token funcional y no duplicar el valor HEX.

5. Si la identidad cromática evoluciona en el futuro, solo deberán modificarse los Design Tokens, nunca los componentes individualmente.

# Alcance de los Design Tokens

Los Design Tokens sustituyen valores de color.

No autorizan cambios en:

- jerarquía visual;
- contraste;
- sombras;
- espaciado;
- tamaño;
- bordes;
- estados;
- comportamiento.

Su objetivo es centralizar la definición del color del sistema.