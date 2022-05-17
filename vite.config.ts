import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
export default ({mode}) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd())}

  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      }
    },
    {},
  )

  return defineConfig({
    define: envWithProcessPrefix,
    resolve:{
      alias:{
        '@' : path.resolve(__dirname, './src')
      },
    },
    plugins: [react()]
  })
}