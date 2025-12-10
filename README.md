# Backend - Sistema de Reservación de Canchas

## Instalación

```bash
npm install
```

## Configuración

1. Crear archivo `.env` basado en `.env.example`
2. Configurar las variables de entorno:
   - `MONGODB_URI`: URI de conexión a MongoDB
   - `JWT_SECRET`: Clave secreta para JWT
   - `EMAIL_USER`: Email para envío de notificaciones
   - `EMAIL_PASS`: Contraseña de aplicación de Gmail

## Inicializar Base de Datos

```bash
node seed.js
```

## Ejecutar en Desarrollo

```bash
npm run dev
```

## Ejecutar en Producción

```bash
npm start
```

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario

### Canchas
- `GET /api/canchas` - Listar todas las canchas
- `GET /api/canchas/:id` - Obtener una cancha específica

### Reservas (Protegidas)
- `POST /api/reservas` - Crear reserva
- `GET /api/reservas/mis-reservas` - Obtener reservas del usuario
- `DELETE /api/reservas/:id` - Cancelar reserva

### Usuario (Protegidas)
- `GET /api/user/profile` - Obtener perfil del usuario

## Despliegue

### Vercel
1. Instalar Vercel CLI: `npm i -g vercel`
2. Ejecutar: `vercel`
3. Configurar variables de entorno en el dashboard

### Render/Railway
1. Conectar repositorio
2. Configurar variables de entorno
3. Deploy automático
