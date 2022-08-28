module.exports = {
  apps: [
    {
      name: 'boilerplate',
      script: './dist/src/main.js', // address from / , because docker prod has no workingDir (=root)
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      out_file: './logs/pm2-out.log',
      error_file: './logs/pm2-error.log',
    },
  ],
};
