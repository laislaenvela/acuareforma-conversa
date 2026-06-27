# Guía de Integración con Supabase - Estructura Normalizada

## 📋 Estructura de Base de Datos

El proyecto utiliza dos tablas principales normalizadas:

### Tabla: `capitulos`
```sql
id              (SERIAL PRIMARY KEY)
codigo          (VARCHAR) - Ej: "I", "II", "III"
orden           (INTEGER) - Orden de visualización
nombre_vigente  (VARCHAR) - Nombre actual
nombre_propuesto(VARCHAR) - Nombre propuesto
slug            (VARCHAR) - URL-friendly identifier
created_at      (TIMESTAMP)
updated_at      (TIMESTAMP)
```

### Tabla: `articulos`
```sql
id              (SERIAL PRIMARY KEY)
capitulo_id     (INTEGER FOREIGN KEY → capitulos.id)
numero          (INTEGER) - Número del artículo
titulo          (VARCHAR) - Título
texto_vigente   (TEXT) - Texto actual
texto_propuesto (TEXT) - Texto propuesto
discusion       (TEXT) - Discusión (opcional)
justificacion   (TEXT) - Justificación del cambio
pregunta        (TEXT) - Pregunta para la comunidad
estado          (VARCHAR) - Estado (active, draft, etc.)
created_at      (TIMESTAMP)
updated_at      (TIMESTAMP)
```

## 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que se complete la inicialización

## 2. Crear Tablas

En el editor SQL de Supabase, ejecuta:

### Tabla capitulos
```sql
CREATE TABLE capitulos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  orden INTEGER NOT NULL,
  nombre_vigente VARCHAR(255) NOT NULL,
  nombre_propuesto VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_capitulos_orden ON capitulos(orden);
  community_question TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para chapter_id para búsquedas más rápidas
CREATE INDEX idx_articles_chapter_id ON articles(chapter_id);
```

## 3. Insertar Datos de Artículos

Tienes dos opciones:

### Opción A: Importar desde los datos locales existentes

Puedes ejecutar SQL para insertar los artículos que ya tienes en `app/data/proposal.ts`. Aquí hay un ejemplo:

```sql
INSERT INTO articles (id, title, chapter_id, current_text, proposed_text, rationale, community_question) 
VALUES 
(1, 'Nombre de la Asociación', 1, 'Texto vigente del artículo 1.', 'Texto propuesto del artículo 1.', 'Explicación de por qué se propone este cambio.', '¿Consideras adecuada esta formulación?'),
(2, 'Naturaleza jurídica', 1, 'Texto vigente del artículo 2.', 'Texto propuesto del artículo 2.', 'Explicación de por qué se propone este cambio.', '¿Cómo valoras esta modificación?'),
-- ... más artículos
;
```

### Opción B: Usar la interfaz CSV de Supabase

1. Ve a la tabla `articles` en Supabase
2. Haz clic en "Import data" > "From CSV"
3. Sube un archivo CSV con los artículos

## 4. Obtener Credenciales

1. Ve a Project Settings > API
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. Configurar Variables de Entorno

En el archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 6. Habilitar RLS (Row Level Security) - Opcional

Si deseas mayor seguridad, puedes habilitar RLS en la tabla `articles`:

1. Ve a la tabla `articles`
2. Haz clic en "RLS" en la parte superior
3. Enable RLS
4. Crea una policy para permitir SELECT público:

```sql
CREATE POLICY "Allow public read access" ON articles
FOR SELECT USING (true);
```

## 7. Verificar la Integración

Una vez configurado:

1. El proyecto intentará cargar artículos desde Supabase
2. Si Supabase no está disponible o hay un error, usará los datos locales automáticamente
3. Puedes ver los logs en la consola del navegador para verificar que todo funciona

## Estructura de Base de Datos

La tabla `articles` tiene la siguiente estructura:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | SERIAL | Identificador único del artículo |
| title | VARCHAR(255) | Título del artículo |
| chapter_id | INTEGER | ID del capítulo al que pertenece |
| current_text | TEXT | Texto vigente del artículo |
| proposed_text | TEXT | Texto propuesto |
| rationale | TEXT | Justificación del cambio |
| community_question | TEXT | Pregunta para la comunidad |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de última actualización |

## Próximas Características

El proyecto ahora está listo para:
- ✅ Cargar artículos desde Supabase
- ✅ Mostrar artículos en las páginas
- ⏳ Crear contribuciones de comunidad en Supabase
- ⏳ Actualizar artículos desde Supabase

## Soporte

Si tienes problemas:
1. Verifica que las variables de entorno estén correctamente configuradas
2. Comprueba los logs del navegador (F12 > Console)
3. Asegúrate de que Supabase esté corriendo y accessible
