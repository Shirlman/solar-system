import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy-watch'

const sdkPath = '../SDK/dist/SSSDK.umd*'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [
    vue(), 
    copy({
      watch: sdkPath,
      targets: [
        { src: sdkPath, dest: 'sdk' },
      ]
    })
  ]
})
