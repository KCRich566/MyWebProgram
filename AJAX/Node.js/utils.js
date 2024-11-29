const baseURL = 'http://hmajax.itheima.net';
const getArraySum = arr => arr.reduce((sum, item) => sum + item, 0);
console.log('run utils.js');
module.exports ={
    url: baseURL,
    arraySum: getArraySum
}