module.exports = {
  apps: [
    {
      name: '150djr',
      script: 'npx',
      args: 'tsx server.ts',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
