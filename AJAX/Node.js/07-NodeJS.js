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

fs.writeFile('test.txt', "stte", err => {
    if (err) {
        console.log(err);
    } else {
        console.log("寫入成功");

    }

});

fs.readFile('test.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
})