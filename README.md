# TODO App - Gestión de Tareas

Una aplicación moderna de gestión de tareas construida con React, Vite y Azure AD B2C para autenticación.

## 🚀 Características

- **Gestión completa de tareas** - Crear, editar, eliminar y marcar tareas como completadas
- **Autenticación segura** - Integración con Azure AD B2C para login
- **Roles y permisos** - Usuarios regulares y administradores con funcionalidades diferenciadas
- **Panel administrativo** - Gestión de usuarios y visualización de tareas por usuario
- **Diseño responsivo** - Interfaz adaptable a todos los dispositivos
- **Experiencia moderna** - Animaciones fluidas y feedback visual en tiempo real

## 🛠️ Tecnologías

- **React 18** - Biblioteca principal para construcción de UI
- **Vite** - Build tool para desarrollo rápido
- **React Router** - Navegación y enrutamiento
- **Tailwind CSS** - Framework de estilos utilitarios
- **Azure MSAL** - Autenticación con Microsoft
- **Lucide React** - Iconos modernos y personalizables

## 📋 Requisitos Previos

- Node.js 16+ 
- NPM o Yarn
- Cuenta de Azure con AD B2C configurado
- Backend API desplegado (ver proyecto relacionado)

## 🔧 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/todo-app-frontend.git
cd todo-app-frontend
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno en el archivo `.env` con tus valores:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_AZURE_TENANT_NAME=tu-tenant
VITE_AZURE_CLIENT_ID=tu-client-id
VITE_AZURE_POLICY_NAME=tu-policy
```

4. Iniciar servidor de desarrollo
```bash
npm run dev
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/         # Componentes React
│   ├── admin/         # Componentes administrativos
│   ├── common/        # Componentes compartidos
│   ├── pages/         # Páginas principales
│   └── tasks/         # Componentes de tareas
├── config/            # Configuraciones (Auth, etc)
├── contexts/          # Context providers
├── hooks/             # Custom hooks
├── routes/            # Configuración de rutas
└── services/          # Servicios API
```

## 📱 Vistas Principales

- **Landing Page** - Página de inicio con información del producto
- **Dashboard** - Panel con estadísticas y accesos rápidos
- **Gestión de Tareas** - Lista de tareas con filtros y acciones
- **Administración** - Panel para gestionar usuarios (solo admin)

## 🔐 Autenticación

La aplicación utiliza Azure AD B2C para autenticación. Los usuarios deben:
1. Hacer clic en "Iniciar Sesión con Azure AD B2C"
2. Autenticarse con sus credenciales corporativas
3. Ser autorizados en el sistema por un administrador

## 🚀 Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

La carpeta `dist` contendrá los archivos estáticos listos para desplegar en cualquier servidor web o CDN.

## 🤝 Integración con Backend

Esta aplicación está diseñada para trabajar con el backend de microservicios desarrollado en Java Spring Boot. Asegúrate de que el backend esté ejecutándose y accesible en la URL configurada en `VITE_API_BASE_URL`.

## 📄 Licencia

Este proyecto fue desarrollado como parte del curso "Desarrollo de Aplicaciones Web" en UNIR.

---

Desarrollado con ❤️ por Irma Lizeth Estrada Tobar