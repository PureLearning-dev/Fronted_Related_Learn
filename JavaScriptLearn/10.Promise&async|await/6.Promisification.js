// “Promisification”，它指将一个接受回调的函数转换为一个返回 promise 的函数。
// 因为 Promise 使用起来更加方便，所以这种转变是十分值得的。

// readFile 会在定义处将回调函数中的参数确定。
// 执行顺序：
// 1. 调用函数，在函数中传入参数和回调函数。
// 2. 执行函数体内部代码。
// 3. 执行完成返回，这里需要注意，异步操作并不会等待，而是通过操作系统后台进行完成。
// 4. 当异步操作完成后，执行回调函数。
// fs.readFile('config.json', (err, data) => {
//     if (err) {
//         console.error('读文件失败', err);
//         return;
//     }
//     console.log('文件内容', data);
// });

// “Promisification” 化，在原本的含有回调函数的函数外层再包裹一层逻辑，使得到的新函数返回一个 Promise，并且不需要回调函数作为参数。
// function readFilePromise(path) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile('config.json', (err, data) => {
//             if (err) {
//                reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }
//

// 调用方，这样就可以轻松地使用了。
// readFilePromise('config.json')
//     .then(data => console.log('文件内容', data))
//     .catch(err => console.error('读文件失败', err));