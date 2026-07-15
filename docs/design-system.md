# Sistema de Diseño v1
## Acuareforma Conversa

> Versión: 1.0
> Estado: Activo

---

# Propósito

Acuareforma Conversa es una plataforma para facilitar la comprensión y la participación comunitaria alrededor de una propuesta de reforma estatutaria.

La interfaz debe favorecer la lectura, la reflexión y la participación informada.

La prioridad del diseño no es impresionar visualmente, sino construir confianza, facilitar el diálogo y acompañar un proceso pedagógico.

---

# Principios

Toda decisión de diseño debe responder a los siguientes principios.

## Comprensión antes que decoración

Cada elemento visual debe ayudar a comprender mejor la información.

Si un recurso visual distrae de la lectura o de la participación, debe eliminarse.

---

## Participación sin fricción

El usuario debe identificar fácilmente:

- dónde comprender la propuesta;
- dónde participar;
- dónde conocer el estado de la participación comunitaria.

---

## Consistencia

Los mismos elementos deben comportarse siempre de la misma manera.

No deben coexistir patrones diferentes para una misma acción.

---

## Color con significado

Los colores representan funciones dentro del recorrido metodológico.

Nunca deben utilizarse únicamente como decoración.

---

## Lectura como prioridad

La lectura comparada de los artículos constituye el núcleo del aplicativo.

Todas las decisiones visuales deben favorecer esa experiencia.

---

# Arquitectura de la experiencia

La experiencia principal del aplicativo se organiza en tres momentos.

## 1. Explorar la propuesta

El usuario comprende la propuesta de reforma.

---

## 2. Participar

El usuario comparte preguntas, observaciones y propuestas.

---

## 3. Así va la participación

El usuario comprende cómo está participando la comunidad.

---

# Sistema cromático

El sistema cromático se organiza por funciones, no por colores.

## Color institucional

Representa la identidad de Acuareforma Conversa.

Se utiliza únicamente para:

- elementos de marca;
- comunicación institucional;
- título principal del Hero.

---

## Color de exploración

Representa el recorrido por la propuesta.

Se utiliza para:

- acciones relacionadas con la exploración;
- botones principales;
- estados activos de lectura.

---

## Color de participación

Representa la participación individual.

Se utiliza para:

- formularios;
- aportes;
- acciones realizadas por el usuario.

---

## Color comunitario

Representa la dimensión colectiva del proceso.

Se utiliza para:

- indicadores;
- estadísticas;
- visualización de la participación comunitaria.

---

## Color principal de texto

Es el color predominante de lectura.

Se utiliza para:

- títulos;
- párrafos;
- navegación;
- iconografía;
- formularios;
- etiquetas.

---

## Superficies

Los fondos deben mantener suficiente contraste para favorecer la lectura.

Los fondos nunca deben competir con el contenido.

---

# Tipografía

La tipografía debe favorecer la lectura prolongada.

## Hero

Es el único título con protagonismo institucional.

Debe transmitir claridad antes que impacto visual.

---

## Títulos

Mantienen una jerarquía clara y consistente.

---

## Párrafos

Priorizan la legibilidad.

Evitar interlineados excesivos.

---

# Tarjetas

Las tarjetas representan acciones.

Todas deben compartir:

- estructura;
- jerarquía;
- espaciado;
- radio de borde.

El color identifica su función, no su importancia.

---

# Botones

Debe existir una jerarquía clara entre acciones principales y secundarias.

El color no debe ser el único indicador de prioridad.

---

# Formularios

Los formularios deben minimizar el esfuerzo cognitivo.

La interfaz debe acompañar al usuario sin generar distracciones.

---

# Navegación

La navegación debe ser simple y consistente.

El usuario nunca debe preguntarse:

- dónde está;
- cuál es el siguiente paso.

---

# Indicadores

Los indicadores representan información agregada.

Su objetivo es comprender el proceso comunitario, no evaluar a las personas participantes.

---

# Evolución

Todo nuevo componente debe integrarse respetando este sistema.

Antes de crear un nuevo patrón visual debe verificarse si existe uno equivalente dentro del proyecto.

La consistencia tiene prioridad sobre la originalidad.

# Conservación de la intención visual

La implementación del Sistema de Diseño no debe modificar la intención visual de un componente existente.

La aplicación de Design Tokens tiene como objetivo unificar el sistema de diseño, no reinterpretarlo.

Si un componente ya comunica correctamente su función mediante color, contraste, jerarquía o estados visuales, esos atributos deben conservarse.

La sustitución de colores debe respetar siempre la apariencia funcional existente.

# Estados interactivos

Los estados activos forman parte de la experiencia de navegación.

Nunca deben desaparecer durante una migración al Sistema de Diseño.

Ejemplos:

- pestaña activa
- botón seleccionado
- capítulo activo
- tema activo
- artículo seleccionado

Si un componente posee un estado visual diferenciador, éste debe mantenerse utilizando los Design Tokens correspondientes.

# Componentes consolidados

Los siguientes componentes ya se consideran aprobados visualmente.

Durante futuros sprints no deben modificarse salvo que el objetivo del sprint sea explícitamente rediseñarlos.

Componentes consolidados:

- Tarjetas principales del Hero.
- Tarjetas de métricas del tablero general.
- Selector Capítulos / Temas.
- Tarjetas de navegación principal.

## Migración progresiva

La adopción del Sistema de Diseño es progresiva.

No todos los componentes deben migrarse en un mismo sprint.

Cuando un componente existente requiera cambios funcionales o de UX, debe aprovecharse esa intervención para migrarlo a los Design Tokens, siempre que ello no altere su apariencia visual aprobada.

La estabilidad del producto tiene prioridad sobre la homogeneización completa del código.