// 当我们需要过一会儿才执行的话，可以使用 setTimeout 或者 setInterval 函数。

// setTimeout 允许我们将函数推迟到一段时间间隔之后再执行。
// setInterval 允许我们重复运行一个函数，从一段时间间隔之后开始运行，之后以该时间间隔连续重复运行该函数。

// setTimeout 第一个参数传递的是函数的引用，而不是函数调用。
let id = setTimeout(() => console.log(`Hi`), 1000);

// setTimeout 返回的是一个「定时器标识符」，可以使用 clearTimeout(id); 来取消这个任务。
console.log(id);

// setInterval 方法和 setTimeout 的语法相同。
// 不过这个函数是隔设定时间就执行一次函数，而不是只执行一次。
// 想要阻止后续调用，我们需要调用 clearInterval(timerId).

// 想要周期性地调度也可以使用 setTimeout 函数，在执行函数中又放一个 setTimeout 函数就行。
setTimeout(() => {
    console.log(`one`);
    setTimeout(() => {
        console.log(`two`);
    }, 1000);
}, 1000);

// 显然这种方式比 setInterval 灵活太多了，可以根据执行结果调整逻辑。

// 使用 setInterval 时，func 函数的实际调用间隔要比代码中设定的时间间隔要短！
// 因为间隔时间中包含着函数执行时间，甚至可能出现延迟。

// 而 setTimeout 会在执行函数完成后才进行调用下一个函数，所以是准确的！

// 上述两种方式都会在时间到时，将任务推入宏队列。

setTimeout(() => {
    console.log(`间隔时间未设置`);
});

// 在「浏览器环境」下，嵌套定时器的运行频率是受限制的。根据 HTML5 标准 所讲：“经过 5 重嵌套定时器之后，时间间隔被强制设定为至少 4 毫秒”。
let start = Date.now();
let times = [];

setTimeout(function run() {
    times.push(Date.now() - start); // 保存前一个调用的延时

    if (start + 100 < Date.now()) console.log((times));// 100 毫秒之后，显示延时信息
    else setTimeout(run); // 否则重新调度
});

// 总结
// setTimeout(func, delay, ...args) 和 setInterval(func, delay, ...args) 方法允许我们在 delay 毫秒之后运行 func 一次或以 delay 毫秒为时间间隔周期性运行 func。
// 要取消函数的执行，我们应该调用 clearInterval/clearTimeout，并将 setInterval/setTimeout 返回的值作为入参传入。
// 嵌套的 setTimeout 比 setInterval 用起来更加灵活，允许我们更精确地设置两次执行之间的时间。
// 零延时调度 setTimeout(func, 0)（与 setTimeout(func) 相同）用来调度需要尽快执行的调用，但是会在当前脚本执行完成后进行调用。
// 浏览器会将 setTimeout 或 setInterval 的五层或更多层嵌套调用（调用五次之后）的最小延时限制在 4ms。这是历史遗留问题。
// 请注意，所有的调度方法都不能 保证 确切的延时。
//
// 例如，浏览器内的计时器可能由于许多原因而变慢：
//
// CPU 过载。
// 浏览器页签处于后台模式。
// 笔记本电脑用的是省电模式。
// 所有这些因素，可能会将定时器的最小计时器分辨率（最小延迟）增加到 300ms 甚至 1000ms，具体以浏览器及其设置为准。
