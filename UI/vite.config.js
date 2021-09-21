import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy-watch'
import path from 'path'

export default ({ command, mode }) => {
  return {
    plugins: [
      vue(),
      copy({
        targets: [
          { src: '../js', dest: './public' },
        ]
      })
    ],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    publicDir: './public',
    build: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      },
      outDir: 'dist', //指定输出路径
      assetsDir: "./public", //指定生成静态资源的存放路径
    },
  }
}