// async/await 是以更舒适的方式使用 promise 的一种特殊语法，同时它也非常易于理解和使用。

// 在函数前面的 “async” 这个单词表达了一个简单的事情：即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。

async function f() {
    return 1;
}

f().then(console.log);

console.log("同步代码");

// 也可以在 async 后的函数中显示返回一个 Promise.

// await 在 async 后函数中使用，用于等待 Promise 执行完成。
// 使用这个关键词可以让异步逻辑的写法和同步代码一样。
async function g() {
    console.log("开始执行g函数");

    let promise = await new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve("异步函数执行完成");
            }, 1000)
        }
    ).then(value => {
        console.log(value)
        return "then执行完成";
    });
    console.log(promise);

    console.log("g函数执行完成");
}

g();

// 不能在普通函数中使用 await.
// 现代浏览器在 modules 里允许顶层的 await.
// await 会将后续接着的 Promise 拆开，得到具体的值，就算是 thenables 对象也是同理。

// 如果我们没有使用 modules，或者必须兼容 旧版本浏览器 ，那么这儿还有一个通用的方法：包装到匿名的异步函数中。
// 立即执行函数。
// (async () => {
//   let response = await fetch('/article/promise-chaining/user.json');
//   let user = await response.json();
//   ...
// })();

// await 接受 “thenables”.
// 像 promise.then 那样，await 允许我们使用 thenable 对象（那些具有可调用的 then 方法的对象）。这里的想法是，第三方对象可能不是一个 promise，但却是 promise 兼容的：如果这些对象支持 .then，那么就可以对它们使用 await。

class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        console.log((resolve));
        // 1000ms 后使用 this.num*2 进行 resolve
        setTimeout(() => resolve(this.num * 2), 1000); // (*)
    }
}

async function f1() {
    // 等待 1 秒，之后 result 变为 2
    // await 后续跟的 thenables 对象，会自动将 resolve 和 reject 传入对象中的 then 函数中，作为参数进行使用。
    let result = await new Thenable(1);
    console.log((result));
}

f1();

// 如果 await 接收了一个非 promise 的但是提供了 .then 方法的对象，它就会调用这个 .then 方法，并将内建的函数 resolve 和 reject 作为参数传入（就像它对待一个常规的 Promise executor 时一样）。然后 await 等待直到这两个函数中的某个被调用（在上面这个例子中发生在 (*) 行），然后使用得到的结果继续执行后续任务。

// 要声明一个 class 中的 async 方法，只需在对应方法前面加上 async 即可：
class Waiter {
    async wait() {
        return await Promise.resolve(1);
    }
}

new Waiter()
    .wait()
    .then(console.log); // 1（alert 等同于 result => alert(result)）

// 如果一个 promise 正常 resolve，await promise 返回的就是其结果。但是如果 promise 被 reject，它将 throw 这个 error，就像在这一行有一个 throw 语句那样。
// h 和 m 函数的效果是一样的。
async function h() {
    await Promise.reject(new Error("Whoops!"));
}

async function m() {
    throw new Error("Whoops!");
}

// 在真实开发中，promise 可能需要一点时间后才 reject。在这种情况下，在 await 抛出（throw）一个 error 之前会有一个延时。
//
// 我们可以用 try..catch 来捕获上面提到的那个 error，与常规的 throw 使用的是一样的方式：
async function q() {
    try {
        let response = await fetch('http://no-such-url');
    } catch(err) {
        console.log((err)); // TypeError: failed to fetch
    }
}

q();

// 如果我们没有 try..catch，那么由异步函数 f() 的调用生成的 promise 将变为 rejected。我们可以在函数调用后面添加 .catch 来处理这个 error：
async function v() {
    let response = await fetch('http://no-such-url');
}

// f() 变成了一个 rejected 的 promise
v().catch(console.log); // TypeError: failed to fetch // (*)

// 当我们使用 async/await 时，几乎就不会用到 .then 了，因为 await 为我们处理了等待。并且我们使用常规的 try..catch 而不是 .catch。这通常（但不总是）更加方便。
//
// 但是当我们在代码的顶层时，也就是在所有 async 函数之外，我们在语法上就不能使用 await 了，所以这时候通常的做法是添加 .then/catch 来处理最终的结果（result）或掉出来的（falling-through）error。

// 总结
// 函数前面的关键字 async 有两个作用：
//
// 让这个函数总是返回一个 promise。
// 允许在该函数内使用 await。
// Promise 前的关键字 await 使 JavaScript 引擎等待该 promise settle，然后：
//
// 如果有 error，就会抛出异常 —— 就像那里调用了 throw error 一样。
// 否则，就返回结果。
// 这两个关键字一起提供了一个很好的用来编写异步代码的框架，这种代码易于阅读也易于编写。
//
// 有了 async/await 之后，我们就几乎不需要使用 promise.then/catch，但是不要忘了它们是基于 promise 的，因为有些时候（例如在最外层作用域）我们不得不使用这些方法。并且，当我们需要同时等待多个任务时，Promise.all 是很好用的。
