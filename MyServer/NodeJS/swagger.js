const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger 定義
const swaggerDefinition = {
  openapi: '3.0.0', // 使用 OpenAPI 3.0
  info: {
    title: 'API 文件範例', // 文件名稱
    version: '1.0.0',      // 版本號
    description: '這是您的 API 文件描述', // 簡介
  },
  servers: [
    {
      url: 'http://localhost:3000', // 替換為您的伺服器地址
      description: '本地伺服器',
    },
  ],
};

// Swagger 配置選項
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // 此處指定 API 描述的文件位置
};

// 生成 Swagger 文檔
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 設置 API 文件路徑
};
