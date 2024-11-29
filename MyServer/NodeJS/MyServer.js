const express = require('express');
const multer = require('multer');
const path = require('path');


const app = express();

app.listen(3000, () => {
    console.log('express server running at http://localhost:8888 or http://12.161.169.178:8888/');
});

app.get('/GetURL', function (req, res) {
    console.log(req, res);
    res.send(`Get Success, your computer name is ${req.hostname}, your Ip is ${req.ip}`)
});

app.get('/GetImage', function (req, res){

})

app.post('/PostURL', function (req, res) {
    console.log(req, res);
    res.send('Post Success')
});

// 設置文件存儲配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 可以根據需要設置文件保存的路徑
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // 使用時間戳和文件原始名稱來設置文件名
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 設定靜態文件夾來儲存上傳的圖片
app.use(express.static('uploads'));

// 解析表單數據
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 上傳圖片的路由
app.post('/upload', upload.single('image'), (req, res) => {
    // 獲取表單數據（電腦名稱）
    const computerName = req.body.computerName;
    const file = req.file;

    console.log('Computer Name:', computerName);
    console.log('Uploaded File:', file);

    // 返回成功的訊息或圖片 URL
    res.send(`File uploaded successfully! Computer Name: ${computerName}, File URL: /${file.filename}`);
});

// 提供 UploadMRImgs.html 頁面
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'UploadMRImgs.html'));
});