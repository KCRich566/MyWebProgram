//   <!-- 前端工程化
//      1. 格式化工具
//      2. 壓縮工具
//      3. 專換工具
//      4. 前湍工程化
//      5. 打包工具
//      6. 腳手價工具
//      7. ...其他

//      瀏覽器能執行JS代碼是依靠內核中的V8引擎(C++程序)。
//      Node.js是基於Chrome V8引擎進行封裝(運行環境)

//      瀏覽器: (DOM, BOM)document, window, XMLHttpRequest, ECMAScript, ...
//      ECMAScript: String, Number, setTimeout, console, Promise, ...
//      Node.js: fs, path, http, ECMAScript, ...

//      Node.js:
//         1. 編寫後端程序: 提供數據和網頁資源等
//         2. 前端工程化: 集成各種開發中使用的工具和技術
//      [安裝Node.js]
//      Node-v16.19.0: vue-admin-template模板使用此版本
//         注意: 
//             1. 需使用非中文安裝
//             2. 不要勾選自動兒裝其他配件
//         驗證:
//             cmd(默認是Command Prompt唷 不要使用PS) > node -v

//         執行Node:
//             node xxx.js

//      -->

for (let i = 0; i < 10; i++) {
    console.log(i);
}

//     <!-- Node.js 讀寫文件(fs模塊) -->

// Node.js 引入模塊的方法 require
const fs = require('fs');

fs.writeFile('./test.txt', "stte", err => {
    if (err) {
        console.log(err);
    } else {
        console.log("寫入成功");

    }

});

fs.readFile('./test.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});

// 路徑path
const path = require('path');
// 當前JS路徑 __dirname
// path.join 拼接路徑
let myPath = path.join(__dirname, 'test.txt');
console.log('path=', myPath);


// 壓縮前端html: 去掉\n換行符, \r回車符，在寫到新的HTML文件中
// 讀取HTML
// 正則表達式替換字符串
// 寫入到新的HTML中

fs.readFile(path.join(__dirname, 'Decompress.html'), (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const htmlStr = data.toString();
        const resultStr = htmlStr.replace(/[\r\n]/g, '');
        console.log(resultStr);
    }
});

// URL中的端口號: 標記服務器裡不同功能的服務程序 0~65535
// http默認使用80端口, 3000, 8080
// 數據庫服務氣預設端口 3306
// 0~1023是系統專用的

// Web服務程序: 透過Web取得資源或內容

const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    // text/plain: 文字文本
    // text/html: html文本

    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'Decompress.html'), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const htmlStr = data.toString();
                const resultStr = htmlStr.replace(/[\r\n]/g, '');
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(resultStr);
            }
        });
    } else if (req.url === '/text/plain') {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('您好plain');

    } else {
        console.log(req.url);
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.end('您好json');

    }

});


server.listen(3000, () => {
    console.log('Web已啟動');
})


// 模塊化: Node.js的每個文件都是一個模塊，如 內置(fs, path, http, querystring), 自定義(utils.js)
// 提高復用性質，案須加載，獨立作用域
// 如果要共用則需導出或導入，使用CommonJS標準來導出導入

// CommonJS標準
// 導出 module.exports = {}
// 導入 require('模塊名或路徑');


const utils = require(path.join(__dirname, 'utils.js'));
console.log('require=', utils.url);


// ECMAScript標準
// 導出 export default {}
// 導入 import 變量名稱 from '模塊名稱'
// Node.js預設是使用CommonJS標準來導入導出模塊，如果要是用ECMAScript需要再執行檔案旁新建package.json文件，並設置{"type": "module"}

// import myUtilsECMA from "./utilsECMA.js"
// import {baseURL, getArraySum} from "./utilsECMA.js" // 只導入指定模塊內容(baseURL名稱與導出位置相同)
// console.log('import=', myUtilsECMA.url);

// 包的概念: 將模塊、代碼、其他資料聚合成一個資料夾, 如
//    urils -> lib: 要封裝的代碼
//          -> index.js: 預設入口點，也是唯一的出口點，把工具模塊的方法集中並向外暴露。就是一大堆的reuire('./lib/*.js')，最後統一導出module.export ={...};
//          -> package.json: 包的基礎定義


// 只要要製作包, 就一定要有package.json, 其內容如下
// {
//     "name": "abc",
//     "version": "",
//     "description": "",
//     "main": "入口點(index.js)",
//     "auther": "",
//     "license": ""
// }


// npm: 是Node.js標準的軟件包管理器，裏頭有350000個軟件包
// npm init -y: 得到package.json文件 來初始化清單文件
// npm i 軟件包名稱: 取得軟件包(放在node_modules中，並且新增訊息到package.json，最後使用package-lock.json來固定化軟件包的版本)

// npm安裝所有依賴，通常是有package.json, 但沒有node_modules
// npm i   直接下載依賴套件

// nodemon全局軟件包: 通常在系統設置的位置，替代node命令，檢測代碼更改，自動重啟程序
// 本地軟件包，如node_modules
// npm i nodemon -g (-g代表安裝到全局環境中)
// nodemon *.js

// 刪除node軟件包
// npm uni 軟件包名


// Webpack用於現在JS應用程序的"靜態模塊打包工具": Vue,React腳手架使用的鋪墊
// 打包: 把靜態模塊內容壓縮, 整合, 轉譯
    // 把less/sass轉成css
    // ES6+降級成ES5
    // 支持多種模塊標準語法

    /* 
   src  -> utils/check.js 
        -> index.js

    1. 新建項目初始化，編寫程式碼。npm init -y:產生package.json.
    2. npm i webpack webpack-cli --save-dev:(開發環境devDependencies) 下載webpack與webpack-cli到當前項目中，並配置局部定義命令
    3. npm run build 運行打包命令，自動產生dist分法文件夾(壓縮和優化後的代碼)
    src(index.js, ...lib)[input] -> webpack -> dist(main.js)[output]

    npm install --save-dev html-webpack-plugin: 簡化本地HTML創建
    
    module.exports = {
        entry: "src...index.js",
        ourput: {
            path: "output folder",
            filename: '.(output folder)/login.index.js',
            clean: true //打不內容前清空目錄
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: "src (html file path)",
                filename: "output folder"/output.html //尋找output path的資料夾
            })
        ]
    }



    Webpack默認是只能識別js代碼，所以引入套件來識別HTML，引入加載器來識別CSS(css-loader)
    npm install --save-dev css-loader style-loader
    css-loader: 解析css代碼
    style-loader: 將解析的csss插入DOM


    file.js -> import css from "file.css"

    module.exports = {
        module:{
            rultes:[{
                test: /\.css$/i,
                use: ["style-loader", "css-loader"];    
        }]
    }}



    提取css代碼(優化) -> mini-css-extract-plugin與style-loader一同使用
    npm install --save-dev mini-css-extract-plugin

    壓縮css代碼(優化) -> css-minimizer-webpack-plugin
    生產模式壓縮

    asset/resource: img
    asset/inline: base64 data URI(img)
    asset/source: txt文本
    asset: 導出data URI(<8KB), 重送單獨文件(>8KB)

    generator: {
        filename: 'assets/[hash][ext(擴展名)][query]'
    }

    => src="data:image/png;base64, ....."

    在JS中,本地的資源(圖片)要用import, http可以直接寫
    import imgObj from './assets/logo.png';
    */



    /* 
    一直打包npm run build也不是很有效率，所以要用搭建"開發環境"，自動偵測變化並熱更新
    
    mode: 'development' or 'production'

        

    webpack-dev-server -> 將打包結果放進內存中，這樣更新就會比較快
    默認以public文件夾作為服務器的根目錄，此目錄也會有dist的檔案
    npm run dev
    

    devServer:{
        static: true
    }

    ---[在不同模式配置不同環境東西]---
    cross-env
    process.env.NODE_ENV
    注入環境變量
    DefinePlugin: 允許再編譯時，將代碼中的變量變成其他數值

    ------

    source map -> 開發環境調錯，可以追蹤error和warning在原始代碼的位置。因為webpack會打包混淆位置(只適用於開發環境唷，生產環境不要使用)
    inline-source-map


    alias別名
    resolve:{
        alias:{
            '@': path.resolve(__dirname, 'src);
        }
    }

    優化CDN: 內容分發網路
    作用:把靜態文件/第三方庫放在CDN網路，供用戶就近請求獲取，減輕服務器壓力

    使用模板引擎
    <% JS code %>
    script defer='defer'


    [---多頁面打包---]

    單頁面: 單個HTML文件，切換DOM的方式實現不同業務邏輯展示，後續Vue/React會學到

    webpack.config.js要改成多入口和多頁面設置
    entry:{'1':'','2':''}
    output:{
        filename: './[name]/index.js
    }
    */
// 
