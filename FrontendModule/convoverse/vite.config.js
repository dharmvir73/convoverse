import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      "/api/user": "http://localhost:5000/",
      "/api/user/login": "http://localhost:5000/",
      "/api/chat": "http://localhost:5000/",
      "/api/chat/group": "http://localhost:5000/",
      "/api/chat/groupremove": "http://localhost:5000/",
      "/api/message": "http://localhost:5000/"
    }
  },

  plugins: [react()],
})
