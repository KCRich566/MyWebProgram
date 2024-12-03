const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: 上傳圖片
 *     description: 上傳圖片並儲存到伺服器
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               modelNames:
 *                 type: array
 *                 items:
 *                   type: string
 *               computerName:
 *                 type: string
 *                 description: 客戶端計算機名稱
 *     responses:
 *       200:
 *         description: 上傳成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 savedData:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.post('/upload', (req, res) => {
  res.json({ message: '上傳成功' });
});

module.exports = router;
