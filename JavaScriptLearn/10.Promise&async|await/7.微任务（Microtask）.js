// JS 只有一个调用栈，有多个任务队列。
// 一个调用栈的意思是 JS 是单线程的，所有同步代码都在同一个调用栈上线性执行，栈帧一层压一层。这也是为什么一个死循环就能把整个页面卡死——调用栈没释放，事件循环没机会处理后续任务。
// 任务队列又可以分为 「宏队列」 和 「微队列」。
// 当且仅当调用栈上的同步代码执行完成后，才会从任务队列中获取任务到调用栈上进行执行。
// 其中 「微队列」 的优先级比 「宏队列」 的更好。

// 之前学习的 Promise 中的链式调用就会把任务放入微队列。

// 执行流程：
// 1. 同步代码首先执行完成（创建 Promise、设置异步代码、添加事件处理）。
// 2. 微队列中的任务被移动到调用栈执行（全局事件被触发）。
// 3. 异步任务时间到了，进行执行，因为 Promise 状态为 rejected，所以 catch 进行处理。
let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch(err => console.log(('caught'))), 1000);

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));

// 总结
// Promise 处理始终是异步的，因为所有 promise 行为都会通过内部的 “promise jobs” 队列，也被称为“微任务队列”（V8 术语）。
//
// 因此，.then/catch/finally 处理程序总是在当前代码完成后才会被调用。
//
// 如果我们需要确保一段代码在 .then/catch/finally 之后被执行，我们可以将它添加到链式调用的 .then 中。
//
// 在大多数 JavaScript 引擎中（包括浏览器和 Node.js），微任务（microtask）的概念与“事件循环（event loop）”和“宏任务（macrotasks）”紧密相关。