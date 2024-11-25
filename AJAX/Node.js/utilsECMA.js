
// 可以使用default來統一導出，也可以將欲導出的內容前加入export

export const baseURL = 'www.google.com';
export const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0);

// export default{
//     url:baseURL,
//     arraySum:getArraySum
// }