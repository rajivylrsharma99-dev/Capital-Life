import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vercel runs the functions in ./api for us in production, but `vite dev` does not.
// This mounts /api/quotes on the dev server so the ticker works locally too.
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/quotes', async (req, res) => {
        try {
          const { default: handler } = await server.ssrLoadModule('/api/quotes.js')
          await handler(req, shimVercelRes(res))
        } catch (err) {
          server.config.logger.error(`dev-api /api/quotes failed: ${err.message}`)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'dev api error' }))
        }
      })
    },
  }
}

// Vercel's res helpers (status/json) on top of a plain Node response.
function shimVercelRes(res) {
  res.status = (code) => {
    res.statusCode = code
    return res
  }
  res.json = (body) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(body))
    return res
  }
  return res
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devApi(),
  ],
})
