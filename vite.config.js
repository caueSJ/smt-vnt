const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  base: '/smt-vnt/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        team: resolve(__dirname, 'team.html')
      }
    }
  }
})