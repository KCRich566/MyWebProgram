const express = require('express'); // 建立 Web 伺服器
// Multer 是一個中介軟體，用來處理文件上傳
// 如multipart/form-data 編碼類型的請求
const multer = require('multer');
// 用來與檔案系統進行交互
const fs = require("fs");
// 用來處理檔案和目錄路徑
const path = require('path');

// API doc文件
const setupSwagger = require('./swagger');

// 初始化目錄
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const app = express();

// 啟用Swagger
setupSwagger(app);

// 開放靜態資源
app.use(express.static('uploads'));

// 設定端口
app.listen(3000, () => {
  console.log('express server running at http://localhost:3000');
});

// [app.use]
// 註冊中間件: app.use() 可以用來設置一個中間件來處理所有的 HTTP 請求，或是針對特定路徑進行處理。中間件的功能可以是日誌記錄、身份驗證、請求體解析、錯誤處理等。
// 處理請求: 當客戶端發送請求時，app.use() 註冊的中間件會被依序執行，並可以對請求進行操作或修改。

// [express.urlencoded]
// 設定模板引擎和中介軟體，處理來自表單的 URL 編碼格式的請求體的表單數據
// 會觸發一個具體的運作流程來解析 URL 編碼格式的請求體。
// 這個中間件會自動解析來自 HTML 表單提交的 application/x-www-form-urlencoded 格式的資料，並將它轉換成 JavaScript 的物件，讓你能夠在 req.body 中訪問到解析後
// 如address[addressLine1]=123+Main+St&address[city]=New+York
// 如果extended: true表示使用qs模組來解析，其能夠處理嵌套內容
// 反之，使用queryString模組來解析，其只能夠解析簡單的Key與Value
app.use(express.urlencoded({ extended: true }));

// [express.json]
// 處理JSON格式的請求
// 只會處理 JSON 格式 的請求體，即 Content-Type: application/json 的請求
app.use(express.json());



app.get('/GetURL', function (req, res) {
  res.send(`Get Success, your computer name is ${req.hostname}, your Ip is ${req.ip}`)
});

app.get('/GetImage', function (req, res) {
  res.send("Image endpoint not implemented yet.");
});

app.post('/PostURL', function (req, res) {
  res.send('Post Success')
});

function GetNowTimeStamp(isDate) {
  const now = new Date();
  if (isDate === true) {
    return `${now.getFullYear()}-` +
      `${(now.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${now.getDate().toString().padStart(2, '0')}`;
  } else {
    return `${now.getFullYear()}-` +
      `${(now.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${now.getDate().toString().padStart(2, '0')}-` +
      `${now.getHours().toString().padStart(2, '0')}-` +
      `${now.getMinutes().toString().padStart(2, '0')}-` +
      `${now.getSeconds().toString().padStart(2, '0')}-` +
      `${now.getMilliseconds().toString().padStart(3, '0')}`;
  }


}

// [multer.diskStorage]
// 用於設置文件存儲的方式
// 配置 Multer 中介層（暫時存放）
const storage = multer.diskStorage({
  // cb: 回調函數
  // 第一個參數：錯誤物件。如果沒有錯誤，通常傳遞 null。
  // 第二個參數：指定檔案儲存的目錄路徑

  // 儲存文件的目錄
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 初始目錄，稍後分類
  },
  // 儲存文件的命名規則
  filename: (req, file, cb) => {
    const now = new Date();
    const uniqueName = `${GetNowTimeStamp(false)}-${req.body.computerName}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const multerUpload = multer({ storage });

// 處理圖片上傳請求
// multerUpload.array("images"): 表示上傳檔案的名稱是"images"，所以Multer會處理這個內容
// 也可以使用全局設定
// app.use(multer({ storage }).array('images')); // 全局處理檔案上傳
app.post("/upload", multerUpload.array("images"), (req, res) => {
  try {
    const files = req.files; // 上傳的圖片檔案
    let modelNames = null;
    if (req.headers["content-type"].includes('application/json')) {
      modelNames = req.body.modelNames.split(',') || []; // 從表單中取得 modelNames 資料，避免未定義
    } else if (req.headers["content-type"].includes('multipart/form-data')) {
      modelNames = req.body.modelNames || []; // 從表單中取得 modelNames 資料，避免未定義
    }

    const computerName = req.body.computerName;
    // 初始化儲存結果的陣列
    const savedData = [];

    files.forEach((file, index) => {
      const modelName = modelNames[index];

      if (modelName) {
        // 建立對應的 Model 資料夾
        const modelDir = path.join(uploadDir, computerName, modelName);
        if (!fs.existsSync(modelDir)) {
          fs.mkdirSync(modelDir, { recursive: true });
        }

        // 移動檔案到對應的資料夾
        const newFilePath = path.join(modelDir, path.basename(file.path));
        fs.renameSync(file.path, newFilePath);

        // 儲存檔案資料
        // 如果key與value一樣，可以省略定義key
        savedData.push({
          index,
          modelName,
          originalName: file.originalname,
          filePath: newFilePath,
        });
      }
    });

    // 將資料儲存到 imageData.json
    const dataFilePath = path.join(__dirname, `${GetNowTimeStamp(true)}-${computerName}-imageData.json`);
    const existingData = fs.existsSync(dataFilePath) ? JSON.parse(fs.readFileSync(dataFilePath)) : [];

    // 展開運算
    const updatedData = [...existingData, ...savedData];

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));

    res.status(200).json({ message: "上傳成功", savedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "上傳失敗", error: error.message });
  }
});

// 提供 UploadMRImgs.html 頁面
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'UploadImgs.html'));
});
