# Backend Challenge - FullStack SSR

## Descripción

Este proyecto es una API RESTful desarrollada en Node.js utilizando Express.js y TypeORM. El propósito del proyecto es gestionar usuarios con autenticación JWT y roles, permitiendo operaciones CRUD. Los roles de usuario incluyen `admin` y `user`, con diferentes permisos de acceso.

## Estructura de Carpetas

```bash
├── src
│ ├── controllers # Controladores de la aplicación
│ ├── db # Configuración de la base de datos
│ ├── entities # Entidades de TypeORM
│ ├── interfaces # Interfaces TypeScript
│ ├── middleware # Middlewares de Express
│ ├── routes # Rutas de la aplicación
│ ├── services # Servicios de la aplicación
│ ├── utils # Utilidades y manejo de errores
│ └── constants # Constantes de la aplicación
├── .env # Variables de entorno
├── package.json # Dependencias del proyecto
├── tsconfig.json # Configuración de TypeScript
└── README.md # Documentación del proyecto
```

## Tecnologías Utilizadas

- Node.js
- Express.js
- TypeScript
- TypeORM
- MySQL (o cualquier otra base de datos compatible con TypeORM)
- JWT (JSON Web Tokens) para autenticación
- bcrypt.js para encriptación de contraseñas

## Stack Tecnológico

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: TypeORM
- **Base de Datos**: MySQL
- **Lenguaje**: TypeScript

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio:**

```bash
git clone https://github.com/tu-usuario/backend-challenge.git
cd backend-challenge
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=database
JWT_SECRET=secret
```

4. **Crear base de datos:**

Crea una base de datos MySQL con el nombre especificado en la variable `DB_DATABASE`.

5. **Ejecutar migraciones:**

```bash
npm run typeorm migration:run
```

6. **Iniciar el servidor:**

```bash
npm run dev
```
