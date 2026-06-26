# 🤝 CONTRIBUTING - Guía para Contribuir

¡Gracias por tu interés en contribuir a Acuareforma Conversa! 🙌

Esta guía te ayudará a colaborar de forma efectiva sin experiencia previa en desarrollo.

---

## 📋 Antes de Empezar

1. **Tienes instalado lo necesario?**
   - Node.js 18+
   - Git
   - Un editor de código (VS Code recomendado)

2. **Leíste la documentación?**
   - [README.md](./README.md) - Visión general
   - [SETUP.md](./SETUP.md) - Instalación y estructura

---

## 🚀 Flujo de Trabajo para Contribuir

### Paso 1: Fork el Proyecto (si no tienes acceso directo)
```bash
# En GitHub, haz clic en "Fork"
```

### Paso 2: Clonar tu Fork
```bash
git clone https://github.com/TU-USUARIO/acuareforma-conversa0.git
cd acuareforma-conversa0
```

### Paso 3: Crear una Rama para tu Tarea
```bash
# Actualiza la rama principal primero
git checkout main
git pull origin main

# Crea una rama nueva
git checkout -b feat/nombre-de-tu-tarea
# Ejemplos:
# - feat/agregar-validacion-email
# - fix/corregir-estilos-boton
# - docs/mejora-readme
```

### Paso 4: Hacer tus Cambios
```bash
# Edita los archivos que necesites
nano app/page.tsx
```

### Paso 5: Verificar que Funciona
```bash
# Inicia el servidor
npm run dev

# En otro terminal, revisa errores
npm run lint
```

### Paso 6: Guardar tus Cambios (Commit)
```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Hacer commit con mensaje descriptivo
git commit -m "feat: agregar validación en formulario de participación"
```

**Convención de mensajes:**
```
feat:  Nueva funcionalidad
fix:   Corrección de bug
docs:  Cambios en documentación
style: Estilos, formato (sin cambio lógico)
refactor: Reorganizar código
perf:  Mejora de performance
```

### Paso 7: Subir tu Rama
```bash
git push origin feat/nombre-de-tu-tarea
```

### Paso 8: Crear Pull Request
1. Ve a GitHub
2. Verás un botón "Compare & Pull Request"
3. Haz clic
4. Describe tu cambio:
   - ¿Qué cambiaste?
   - ¿Por qué lo cambiaste?
   - ¿Cómo probaste?
5. Envía el PR

### Paso 9: Esperar Review
Un mantenedor revisará tu código y te pedirá cambios si es necesario.

---

## 💪 Tipos de Contribuciones

### 1. **Reportar Bugs**
Si encuentras un error:

```markdown
**Descripción**: El formulario no valida emails
**Pasos para reproducir**:
1. Ve a /participacion
2. Ingresa correo inválido "abc"
3. Haz clic Guardar

**Resultado esperado**: Mostrar error
**Resultado actual**: Guarda sin validar
```

### 2. **Corregir Bugs (fix)**
```bash
git checkout -b fix/validacion-email
# ... haz cambios ...
git commit -m "fix: validar formato de email en registro"
```

### 3. **Nuevas Características (feat)**
```bash
git checkout -b feat/agregar-comparador-articulos
# ... haz cambios ...
git commit -m "feat: agregar página de comparación entre artículos"
```

### 4. **Mejorar Documentación (docs)**
```bash
git checkout -b docs/agregar-ejemplos-api
# ... edita markdown ...
git commit -m "docs: agregar ejemplos de uso de storage.ts"
```

### 5. **Mejorar Código (refactor)**
```bash
git checkout -b refactor/simplificar-calculations
# ... reorganiza código ...
git commit -m "refactor: extraer lógica de rankings a función"
```

---

## ✅ Checklist Antes de Hacer PR

- [ ] Ejecuté `npm run dev` y funciona sin errores
- [ ] Ejecuté `npm run lint` y no hay warnings
- [ ] Mis cambios tienen sentido y son una sola funcionalidad
- [ ] Agregué/actualicé comentarios si es código complejo
- [ ] El mensaje del commit es descriptivo
- [ ] Mi rama está actualizada con `main`
- [ ] No hay archivos innecesarios en el commit

---

## 📝 Pautas de Código

### Nombres Claros
```typescript
// ❌ Evita
const x = () => {}
const proc = (d) => {}
const a, b, c

// ✅ Usa
const handleButtonClick = () => {}
const processUserData = (data: User) => {}
const userName, userEmail, userRole
```

### TypeScript Requerido
```typescript
// ❌ Evita
const user = { name: "Juan", age: 30 }
const addNumber = (a, b) => a + b

// ✅ Usa
const user: User = { name: "Juan", age: 30 }
const addNumber = (a: number, b: number): number => a + b
```

### Funciones Pequeñas
```typescript
// ❌ Función gigante
const handleFormSubmit = () => {
  // 150 líneas de código
}

// ✅ Funciones pequeñas
const validateInput = (data: FormData): boolean => { ... }
const saveToStorage = (data: Contribution): void => { ... }
const handleFormSubmit = async () => {
  const isValid = validateInput(data)
  if (isValid) saveToStorage(data)
}
```

### Componentes Memoizados
```typescript
// ✅ Para componentes que reciben props
const TopicCard = memo(function TopicCard({ title }: Props) {
  return <div>{title}</div>
})

// ✅ Para hooks costosos
const expensiveValue = useMemo(() => {
  return calculateSomething(data)
}, [data])
```

---

## 🎨 Convenciones de Estilo

### Archivos y Carpetas
```
- Archivos: camelCase (miArchivo.tsx)
- Componentes: PascalCase (MiComponente.tsx)
- Carpetas: lowercase (mi-carpeta/)
```

### Imports
```typescript
// 1. Imports externos
import React from 'react'
import Link from 'next/link'

// 2. Imports tipos
import type { User } from '@/types'

// 3. Imports internos
import { getContributions } from '@/lib/storage'
```

### CSS Classes
```tsx
// ✅ Tailwind inline
<div className="rounded-lg border p-4 shadow-sm">

// ❌ Evita clases personalizadas a menos que sea necesario
<div className="custom-card">
```

---

## 🔍 Cambios Comunes

### Modificar Textos
```typescript
// Archivo: app/lib/constants.ts
export const HOME_PAGE = {
  title: "Acuareforma Conversa",
  // ← Cambia aquí
  subtitle: "Tu nuevo texto...",
}
```

### Agregar un Campo a Formulario
```typescript
// 1. Actualiza tipo en: lib/types.ts
export type Contribution = {
  // ... campos existentes
  newField: string
}

// 2. Usa en el componente
const [newField, setNewField] = useState("")

// 3. Guarda en: lib/storage.ts
addContribution({
  // ... otros campos
  newField
})
```

### Crear Nueva Página
```bash
mkdir app/mi-pagina
touch app/mi-pagina/page.tsx
```

```typescript
// app/mi-pagina/page.tsx
export default function MyPage() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-4xl font-bold">Mi Página</h1>
    </main>
  )
}
```

---

## 🐛 Debugging

### Revisar Errores
```bash
npm run lint        # Chequea código
npm run dev         # Muestra errores en temps real
```

### Debugging en Navegador
```typescript
console.log("Mi valor:", miVariable)
// Abre DevTools (F12) → Console
```

### Limpiar Caché
```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## 💬 Preguntas Frecuentes

**P: No entiendo TypeScript**
R: Aprende básico en [typescriptlang.org](https://www.typescriptlang.org). Es similar a JavaScript con tipos.

**P: ¿Cómo agrego una dependencia nueva?**
R: `npm install nombre-paquete` pero avisa antes en un Issue.

**P: Mi PR fue rechazado, ¿qué hago?**
R: Lee los comentarios, haz los cambios sugeridos, haz commit y push. El PR se actualiza automáticamente.

**P: ¿Puedo trabajar en dos cosas a la vez?**
R: No, crea ramas separadas para cada tarea.

---

## 📚 Recursos Útiles

- [Git Tutorial](https://git-scm.com/book/es/v2)
- [TypeScript Basics](https://www.typescriptlang.org/docs/handbook/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🙏 Código de Conducta

Por favor:
- ✅ Sé respetuoso
- ✅ Sé paciente
- ✅ Haz preguntas
- ✅ Ayuda a otros
- ❌ No hagas spam
- ❌ No seas agresivo

---

## 🎉 ¡Gracias!

¡Tu contribución, por pequeña que sea, ayuda a este proyecto! 

Si tienes dudas, abre un Issue o contacta a los mantenedores.

**¡Bienvenido al equipo!** 🚀
