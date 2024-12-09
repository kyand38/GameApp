// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/graphql': {
//         target: 'http://localhost:3001',
//         secure: false,
//         changeOrigin: true,
//       }
//     }
//   }
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // The port for your Vite dev server
    open: true, // Automatically open the browser when the server starts
    proxy: {
      // Proxy for GraphQL endpoint
      '/graphql': {
        target: 'http://localhost:3001', // Backend server for GraphQL
        secure: false,
        changeOrigin: true,
      },
      // Proxy for API endpoints
      '/api': {
        target: 'http://localhost:3001', // Backend server for API endpoints
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensures `/api` prefix is retained
      },
    },
  },
});