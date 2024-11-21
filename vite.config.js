import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para las rutas de autenticación
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Reescribe la ruta, eliminando el prefijo '/auth' si es necesario
        // Por ejemplo, si tu backend espera '/auth/login', no necesitas reescribir
        // pathRewrite: { '^/auth': '/auth' },
      },
      // Proxy para las rutas protegidas
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // pathRewrite: { '^/api': '/api' },
      },

      '/create-preference': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // pathRewrite: { '^/api': '/api' },
      },
    },
  },
});
