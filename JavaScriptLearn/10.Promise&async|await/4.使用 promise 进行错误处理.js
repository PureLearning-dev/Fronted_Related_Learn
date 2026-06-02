// 对 Promise 的错误进行获取，使用 catch 是非常方便的。

// .catch 不必是立即的。它可能在一个或多个 .then 之后出现。

// new Promise((resolve, reject) => {
//     throw new Error("Whoops!");
// }).catch(console.log); // Error: Whoops!
//
// // 这段代码和上面的实现效果完全一致，在 executor 周围的“隐式 try..catch”自动捕获了 error，并将其变为 rejected promise。
// // new Promise((resolve, reject) => {
// //   reject(new Error("Whoops!"));
// // }).catch(alert); // Error: Whoops!
//
// // 这不仅仅发生在 executor 函数中，同样也发生在其处理程序中。如果我们在 .then 处理程序中 throw，这意味着 promise rejected，因此控制权移交至最近的 error 处理程序。
// // catch 不仅仅会捕获主动抛出的错误，还会捕获任何程序意外发生的错误。
// new Promise((resolve, reject) => {
//     resolve("ok");
// }).then((result) => {
//     throw new Error("Whoops!"); // reject 这个 promise
// }).catch(console.log); // Error: Whoops!

// 在常规的 try..catch 中，我们可以分析 error，如果我们无法处理它，可以将其再次抛出。对于 promise 来说，这也是可以的。
// 如果我们在 .catch 中 throw，那么控制权就会被移交到下一个最近的 error 处理程序。如果我们处理该 error 并正常完成，那么它将继续到最近的成功的 .then 处理程序。

// 1.catch 中正确处理。
new Promise((resolve, reject) => {
    console.log("开始执行第一个Promise");
    reject("false");
}).catch((error) => {
    console.log("first Promise catch");
    console.log(error);
}).then((result) => {
    console.log("first Promise then");
    console.log(result);
});

// 2.catch 中没有正确处理。
new Promise((resolve, reject) => {
    console.log("开始执行第二个Promise");
    reject("false2");
}).catch((err) => {
    console.log("second Promise first catch");
    // 再次抛出，后续不会执行 then，而是执行下一个 catch.
    throw err;
}).then((result) => {
    console.log("second Promise then");
    console.log(result);
}).catch((error) => {
    console.log("second Promise second catch");
    console.log(error);
});

// 如果在 Promise 内部使用异步函数并在异步函数内部使用 throw，会导致抛出的错误称为全局的。
// 在异步函数内部需使用 reject，因为这个函数是闭包的，可以在 Promise 内任意一处进行调用。

// 总结
// .catch 处理 promise 中的各种 error：在 reject() 调用中的，或者在处理程序中抛出的 error。
// 如果给定 .then 的第二个参数（即 error 处理程序），那么 .then 也会以相同的方式捕获 error。
// 我们应该将 .catch 准确地放到我们想要处理 error，并知道如何处理这些 error 的地方。处理程序应该分析 error（可以自定义 error 类来帮助分析）并再次抛出未知的 error（它们可能是编程错误）。
// 如果没有办法从 error 中恢复，不使用 .catch 也可以。
// 在任何情况下我们都应该有 unhandledrejection 事件处理程序（用于浏览器，以及其他环境的模拟），以跟踪未处理的 error 并告知用户（可能还有我们的服务器）有关信息，以使我们的应用程序永远不会“死掉”。