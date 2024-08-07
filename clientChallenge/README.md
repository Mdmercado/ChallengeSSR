# Frontend Challenge

## Este proyecto representa la parte frontend del desafío Fullstack SSR. Está construido utilizando React, TailwindCSS y Flowbite para la UI, y Zustand para la gestión del estado. La aplicación se comunica con el backend para gestionar usuarios y autenticar roles.

### Tecnologías Utilizadas

- **React**: Biblioteca principal para la construcción de interfaces de usuario.
- **TypeScript**: Superconjunto de JavaScript que añade tipos estáticos.
- **Vite**: Herramienta de desarrollo rápida para proyectos modernos de frontend.
- **TailwindCSS**: Framework de CSS utilitario.
- **Flowbite**: Biblioteca de componentes UI basada en TailwindCSS.
- **Zustand**: Pequeña pero poderosa biblioteca de gestión de estado.
- **Axios**: Cliente HTTP para realizar peticiones al backend.
- **React Router**: Para el enrutamiento en la aplicación.
- **SweetAlert2**: Para alertas bonitas y fáciles de usar.

### Estructura de Carpetas

- **src/**: Carpeta principal del código fuente.
  - **components/**: Componentes reutilizables.
  - **contexts/**: Proveedores de contexto para la gestión del estado global.
  - **pages/**: Componentes de página.
  - **services/**: Módulos para interactuar con el backend.
  - **types/**: Definiciones de tipos TypeScript.
  - **utils/**: Utilidades generales.

### Instalación

1. **Clonar el repositorio**:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd clientChallenge
   ```
2. **Instalar dependencias**:
   ```sh
    npm install
   ```
3. **Configurar variables de entorno**:

   ```sh
   VITE_API_URL=http://localhost:3000/api

   ```

   Luego, reemplazar los valores de las variables de entorno según corresponda.

4. **Ejecutar la aplicación**:
   ```sh
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173/`.

### Pantallas de la Aplicación

#### Login

Formulario para que los usuarios inicien sesión con su email y contraseña.

#### User Panel

Panel donde los usuarios pueden ver sus datos y actualizarlos (nombre de usuario y email). Los usuarios inactivos reciben una alerta.

#### Admin Panel

Panel de administración donde los administradores pueden:

- Ver una lista de todos los usuarios.
- Editar datos de cualquier usuario (nombre, email, rol y estado).
- Eliminar usuarios.

### Gestión de Roles

La aplicación maneja dos tipos de roles: usuario y administrador. Dependiendo del rol del usuario, se muestran diferentes pantallas y se permiten diferentes acciones.

- Usuario:
  - Puede ver y editar solo su propia información (excepto su rol y estado).
- Administrador:
  - Puede ver, editar y eliminar cualquier usuario.
  - Tiene acceso a la lista completa de usuarios en el Admin Panel.

### Mejoras a Implementar

- Validación de Formularios: Mejorar la validación de los formularios para asegurar que los datos ingresados son correctos.
- Gestión de Sesiones: Implementar la renovación automática del token para mantener la sesión del usuario activa sin necesidad de re-login.
- Notificaciones en Tiempo Real: Utilizar WebSockets para notificaciones en tiempo real sobre cambios en los datos de usuarios.
- Tests Unitarios y de Integración: Añadir pruebas unitarias y de integración para asegurar la calidad del código.
