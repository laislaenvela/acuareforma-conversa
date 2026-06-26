# 🏛️ Acuareforma Conversa

**Plataforma participativa para la reforma estatutaria del acueducto comunitario**

Una aplicación web moderna donde ciudadanos pueden explorar, comprender y aportar opiniones sobre artículos de una propuesta de reforma estatutaria. Construida con React, Next.js y TypeScript.

---

## ✨ Características

- 📖 **Explorar Propuesta**: Navega artículos organizados por capítulos y temas
- 🗳️ **Participación Ciudadana**: Registro simple y contribuciones estructuradas
- 💬 **Múltiples Tipos de Aportes**:
  - Preguntas
  - Observaciones
  - Riesgos identificados
  - Comentarios de apoyo
- 📊 **Estadísticas en Tiempo Real**: Visualiza participación comunitaria
- 🎯 **Posicionamiento Estructurado**:
  - De acuerdo
  - Parcialmente de acuerdo
  - En desacuerdo
  - Necesita más información
- 🔍 **SEO Optimizado**: Sitemap automático, metadata dinámica
- ⚡ **Alta Performance**: Páginas pre-generadas, compresión, caché

---

## 🚀 Inicio Rápido

### Instalación (2 minutos)

```bash
# 1. Clonar el repositorio
git clone <URL-del-repositorio>
cd acuareforma-conversa0

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) ✅

### Documentación Completa

Para instrucciones detalladas, ver [SETUP.md](./SETUP.md)

---

## 📁 Estructura del Proyecto

```
├── app/
│   ├── page.tsx              # Dashboard principal
│   ├── articulo/[id]/        # Páginas de artículos individuales
│   ├── explorar/             # Explorador de propuesta
│   ├── participacion/        # Registro y participación
│   ├── lib/                  # Lógica compartida
│   └── data/proposal.ts      # Contenido del proyecto
├── components/               # Componentes React reutilizables
├── public/                   # Assets estáticos
└── [docs]                    # Documentación
```

**[Ver estructura completa →](./SETUP.md#-estructura-del-proyecto)**

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Framework** | Next.js | 16.2.9 |
| **UI Library** | React | 19.2.4 |
| **Styling** | Tailwind CSS | v4 |
| **Lenguaje** | TypeScript | 5.x |
| **Storage** | Browser localStorage | - |

---

## 📖 Páginas Disponibles

| Ruta | Descripción |
|------|------------|
| `/` | Dashboard con estadísticas y artículos trending |
| `/explorar` | Explora todos los artículos por capítulos o temas |
| `/articulo/[id]` | Detalle completo de un artículo + formulario para aportar |
| `/participacion` | Registro de usuario y estadísticas personales |
| `/acerca` | Información sobre el proyecto |

---

## 🎯 Caso de Uso

### Usuario Nuevo
1. Visita `/participacion`
2. Completa registro (nombre, usuario, email)
3. Ve sus contribuciones previas
4. Puede cambiar usuario en cualquier momento

### Exploración
1. Va a `/explorar`
2. Elige zwischen Capítulos o Temas
3. Haz clic en un artículo para ver detalles
4. Lee texto vigente vs. propuesto

### Aportación
1. Lee un artículo en `/articulo/[id]`
2. Completa formulario:
   - Selecciona posición personal
   - Elige tipo de aporte
   - Escribe comentario principal
   - (Opcional) Agrega justificación y propuesta alternativa
3. Haz clic "Compartir aporte"
4. Aporte se guarda en localStorage

---

## 💡 Optimizaciones Implementadas

✅ **Performance**
- Generación estática de 50+ páginas de artículos
- Memoización de cálculos pesados
- Lazy loading de componentes
- Compresión automática de assets

✅ **SEO**
- Metadata dinámica por artículo
- Sitemap automático
- Robots.txt configurado
- OpenGraph tags para redes sociales

✅ **Código**
- Type safety 100% con TypeScript
- Componentes memorizados
- Funciones puras y reutilizables
- Storage abstracción centralizado

---

## 🔄 Flujo de Datos

```
Usuario
  ↓
Participa en /participacion
  ↓ (localStorage)
Contribución guardada
  ↓
Visible en /
  ↓
Otros ven estadísticas
```

**Nota**: Actualmente usa localStorage. Para producción, integrar API backend.

---

## 🤝 Contribuir

¿Quieres ayudar? Ver [CONTRIBUTING.md](./CONTRIBUTING.md)

### Contribuciones Bienvenidas
- 🐛 Reportar bugs
- ✨ Nuevas features
- 📝 Mejorar documentación
- 🎨 Diseño y UX

---

## 📋 Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm start        # Ejecutar servidor de producción
npm run lint     # Revisar código
```

---

## 🔐 Seguridad & Privacidad

- ✅ Datos almacenados localmente (no se envía al servidor)
- ✅ Sin tracking de usuarios
- ✅ Validación TypeScript en tiempo de desarrollo
- ⚠️ Para producción: agregar autenticación real y backend

---

## 🌐 Despliegue

### Vercel (Recomendado - Gratis)
1. Push a GitHub
2. Conecta repo en [Vercel](https://vercel.com)
3. Automáticamente despliega en cada push

### Otro hosting
```bash
npm run build
npm start
```

---

## 📞 Soporte

- 📧 Email: [tu-email]
- 💬 Issues: [GitHub Issues](../../issues)
- 📚 Wiki: [Documentación](./SETUP.md)

---

## 📄 Licencia

Este proyecto es de la comunidad. Ver términos en el repositorio.

---

**Hecho con ❤️ para la participación ciudadana**

*¡Mantengamos la reforma estatutaria abierta y transparente!*
