// Promise 链其实很简单。
// 我们可以通过 then 和 catch 不断地返回值，这个值也包括 Promise 对象，finally return 会被忽略。
// 这样就可以把多次异步执行的操作用链式的方式书写出来了。

// 返回一个 Promise，其中仍可以使用异步逻辑。
// 当然，也可以直接返回一个值，这样的话，会被直接封装为 settled 的 Promise，相当于同步。
// 链条后面始终会等待前面的 Promise 完成后才进行执行。
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
}).then((value) => {
    console.log(value);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value * 2);
        }, 1000)
    })
}).then((value) => {
    console.log(value);
});

// 总结
// 如果 .then（或 catch/finally 都可以）处理程序返回一个 promise，那么链的其余部分将会等待，直到它状态变为 settled。当它被 settled 后，其 result（或 error）将被进一步传递下去。