import { defineConfig } from 'astro/config'
import react from '@astrojs/react'


// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? 'https://astro-shadcn-ui-template.vercel.app'
    : 'http://localhost:4321',
  integrations: [
    react(),
  ],
})
