module.exports = {
  apps: [
    {
      name: "bhtf-portal",
      script: ".output/server/index.mjs",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 6060,
        NITRO_PORT: 6060,
        NITRO_HOST: "0.0.0.0",
        HOST: "0.0.0.0",
      },
    },
  ],
};
