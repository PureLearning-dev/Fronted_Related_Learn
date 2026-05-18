// 什么是回调？
// 其实很简单，我可以这样解释：
// 我们去执行一件事，在这件事完成之时，会触发另一件事，这另一件事就称为回调。

// 比如 setTimeOut，设置在一秒后执行传入的函数，这个传入的函数是在一秒这个事件完成后，立即执行的，故称为回调函数。
console.log("hello world");

setTimeout(() => console.log(1), 1000);

// 定义一个回调函数。
// callback 参数是一个函数，在定义 test 时，我们直接使用则可。
// 在使用 test 时，传入 callback 时，就要定义这个回调函数的逻辑。
function test(val, callback) {
    if(typeof val !== 'number') {
        callback(new Error("val 必须是数字"));
        return ;
    }
    callback(null, val * 2);
}

// 使用一次回调函数。
test(2, (error, result) => {
    if (error) console.log(error);
    else console.log(result);
});

// 使用 3 次回调函数，如果继续使用的话，会导致占用更多右侧的屏幕空间，这个情况称为回调地狱！
test(3, (error, result) => {
    if (error) console.log(error);
    else {
        test(result, (error, result) => {
            if (error) console.log(error);
            else {
                test(result, (error, result) => {
                    if (error) console.log(error);
                    else console.log(result);
                })
            }
        })
    }
})

// 上述的回调是同步的，其实更常使用回调的地方是异步的，但是使用回调的逻辑是一致的，不外乎一个是立刻执行，一个是等待异步事件完成后执行罢了。