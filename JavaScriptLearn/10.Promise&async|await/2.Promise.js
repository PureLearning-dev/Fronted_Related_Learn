// 为了解决回调一节中的回调地狱，提出了 Promise 这个概念。
// Promise 内部维护一个「状态」，初始化为 pending，执行 resolve 方法变为 fulfilled，执行 reject 变为 rejected.
// 并在内部有 result 属性，用于保存 成功 或者 失败 的结果，值通过 resolve 或 reject 的参数传入。
// 状态只有一次变化的机会，变化后，就不能再次发生变化了。

let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("执行异步方法");
        resolve("完成异步方法");
    }, 1000);
});

promise.then(console.log);

setTimeout(() =>{
    console.log(promise);
}, 2000);

// 上述内容使用的是 resolve，使用 reject 的方式是相同的。
// 一个 resolved 或 rejected 的 promise 都会被称为 “settled”。

// Promise 对象的 state 和 result 属性都是内部的。我们无法直接访问它们。但我们可以对它们使用 .then/.catch/.finally 方法。我们在下面对这些方法进行了描述。

// then 函数。
// then 的第一个参数是一个函数，该函数将在 promise resolved 且接收到结果后执行。
// .then 的第二个参数也是一个函数，该函数将在 promise rejected 且接收到 error 信息后执行。

// 通常我们只使用第一个参数，第二个参数使用 catch 进行替代。
let promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Promise2 完成");
    }, 1000)
});

promise2.then(console.log, console.log);

// catch 函数。
// 如果我们只对 error 感兴趣，可以使用 then(null, function) 或者 catch.
// catch(f) 调用是 .then(null, f) 的完全的模拟，它只是一个简写形式。
// 如果在 Promise 内抛出 Error，相当于 reject 了，也会被 catch 捕获。

// finally 函数。
// 调用 .finally(f) 类似于 .then(f, f)，因为当 promise settled 时 f 就会执行：无论 promise 被 resolve 还是 reject。

// 请注意，finally(f) 并不完全是 then(f,f) 的别名。
//
// 它们之间有重要的区别：
//
// finally 处理程序（handler）没有参数。在 finally 中，我们不知道 promise 是否成功。没关系，因为我们的任务通常是执行“常规”的完成程序（finalizing procedures）。
// finally 处理程序将结果或 error “传递”给下一个合适的处理程序。

// 根据以下代码可知，执行顺序与调用顺序保持一致，且可多次调用。
new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000)
})
    .finally(() => console.log(("Promise ready"))) // 先触发
    .then(result => console.log((result))) // <-- .then 显示 "value"
    .finally(() => console.log(("Promise ready1")));

new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000)
})
    .then(result => console.log((result))) // <-- .then 显示 "value"
    .finally(() => console.log(("Promise ready"))) // 先触发

// 总结：
//
// finally 处理程序没有得到前一个处理程序的结果（它没有参数）。而这个结果被传递给了下一个合适的处理程序。
// 如果 finally 处理程序返回了一些内容，那么这些内容会被忽略。
// 当 finally 抛出 error 时，执行将转到最近的 error 的处理程序。
// 如果我们正确使用 finally（将其用于常规清理），那么这些功能将很有用。