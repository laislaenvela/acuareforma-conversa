# Setup del Proyecto - Acuareforma Conversa

## 📋 Requisitos Previos

- **Node.js**: versión 18 o superior ([Descargar](https://nodejs.org/))
- **npm**: viene incluido con Node.js
- **Git**: para control de versiones

Verifica que estén instalados:
```bash
node --version  # Debe ser v18 o superior
npm --version
git --version
```

## 🚀 Instalación Paso a Paso

### 1. Clonar el repositorio
```bash
git clone <URL-del-repositorio>
cd acuareforma-conversa0
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 4. Abrir en el navegador
Abre [http://localhost:3000](http://localhost:3000)

El sitio se actualiza automáticamente cuando cambias archivos.

## 📁 Estructura del Proyecto

```
acuareforma-conversa0/
├── app/                          # Carpeta principal de Next.js
│   ├── page.tsx                 # Página de inicio
│   ├── layout.tsx               # Estructura HTML común
│   ├── globals.css              # Estilos globales
│   │
│   ├── articulo/[id]/
│   │   └── page.tsx             # Página individual de artículos
│   │
│   ├── explorar/
│   │   └── page.tsx             # Página para explorar propuesta
│   │
│   ├── participacion/
│   │   └── page.tsx             # Página de registro y participación
│   │
│   ├── acerca/
│   │   └── page.tsx             # Página de información
│   │
│   ├── lib/                     # Funciones y utilidades compartidas
│   │   ├── types.ts            # Definiciones de tipos TypeScript
│   │   ├── storage.ts          # Funciones para localStorage
│   │   ├── calculations.ts     # Cálculos y análisis de datos
│   │   ├── metadata.ts         # Configuración SEO
│   │   ├── constants.ts        # Textos y constantes UI
│   │   └── useLocalStorage.ts  # Hook personalizado
│   │
│   ├── data/
│   │   └── proposal.ts         # Datos de artículos, capítulos y temas
│   │
│   ├── sitemap.ts              # Mapa del sitio para SEO
│   └── robots.ts               # Configuración para buscadores
│
├── components/                  # Componentes React reutilizables
│   ├── Navbar.tsx              # Barra de navegación
│   ├── TopicCard.tsx           # Tarjeta de temas
│   ├── StatCard.tsx            # Tarjeta de estadísticas
│   └── ParticipationGate.tsx   # Formulario de participación
│
├── public/                      # Archivos estáticos (imágenes, etc.)
├── package.json                 # Dependencias del proyecto
├── next.config.ts              # Configuración de Next.js
├── tsconfig.json               # Configuración de TypeScript
├── tailwind.config.ts          # Configuración de estilos Tailwind
├── eslint.config.mjs           # Configuración de linter
│
└── Documentación
    ├── README.md               # Este archivo
    ├── SETUP.md                # Guía de instalación
    ├── CONTRIBUTING.md         # Cómo contribuir
    └── AGENTS.md               # Nota sobre versión de Next.js
```

## 🛠️ Comandos Disponibles

```bash
# Inicia servidor de desarrollo (puerto 3000)
npm run dev

# Construye la aplicación para producción
npm run build

# Inicia servidor de producción
npm start

# Ejecuta el linter (revisa código)
npm run lint

# Arregla automáticamente algunos errores de linter
npm run lint -- --fix
```

## 📚 ¿Cómo Agregar una Nueva Página?

### Ejemplo: Crear página `/contacto`

1. Crea la carpeta:
```bash
mkdir app/contacto
```

2. Crea el archivo `page.tsx`:
```tsx
export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-4xl font-bold">Contacto</h1>
      {/* Tu contenido aquí */}
    </main>
  );
}
```

3. ¡Listo! Next.js automáticamente crea la ruta `/contacto`

## 🎨 Cambiar Textos de la UI

Todos los textos principales están en `/app/lib/constants.ts`:

```typescript
export const HOME_PAGE = {
  title: "Acuareforma Conversa",
  subtitle: "Tu nuevo texto aquí...",
  // etc.
};
```

Simplemente edita ahí y se refleja en toda la aplicación.

## 🗃️ Trabajar con Datos

Los artículos, capítulos y temas están en `/app/data/proposal.ts`:

```typescript
export const articles = [
  {
    id: 1,
    title: "Nombre de la Asociación",
    currentText: "Texto vigente...",
    proposedText: "Texto propuesto...",
    // etc.
  }
];
```

Edita estos datos para cambiar el contenido del sitio.

## 💾 Sistema de Almacenamiento

- **Actualmente**: Los participantes y contribuciones se guardan en `localStorage` del navegador
- **En el futuro**: Se puede reemplazar con una base de datos real

Funciones en `/app/lib/storage.ts`:
```typescript
getParticipant()        // Obtiene usuario actual
saveParticipant()       // Guarda identificación
getContributions()      // Obtiene todos los aportes
addContribution()       // Agrega nuevo aporte
```

## 🔧 Integración Continua (CI/CD)

El proyecto está configurado para:
- ✅ TypeScript type checking automático
- ✅ Linting automático en commits
- ✅ Generación de sitemap para SEO
- ✅ Generación estática de páginas de artículos

## 📱 Responsive Design

Usa Tailwind CSS para responsive:
```tsx
<div className="hidden md:flex">  {/* Solo desktop */}
  <div className="md:grid-cols-2"> {/* 2 columnas en desktop */}
```

Breakpoints principales:
- `md`: 768px (tablets)
- `lg`: 1024px (desktop)

## 🐛 Troubleshooting

### Error de puerto 3000 ocupado
```bash
# Cambia el puerto
npm run dev -- -p 3001
```

### Error de módulos no encontrados
```bash
# Reinstala las dependencias
rm -rf node_modules
npm install
```

### Limpiar caché de Next.js
```bash
rm -rf .next
npm run dev
```

## 📖 Recursos Útiles

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## ❓ ¿Preguntas?

Consulta los archivos:
- `CONTRIBUTING.md` - Cómo contribuir al proyecto
- `AGENTS.md` - Notas sobre la versión de Next.js
- `/app/lib/README.md` - Documentación de funciones compartidas
