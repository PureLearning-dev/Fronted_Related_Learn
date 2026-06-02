// 在 Promise 类中，有 6 种静态方法。

// Promise.all.
// 假设我们希望并行执行多个 promise，并等待所有 promise 都准备就绪。
// Promise.all 接受一个可迭代对象（通常是一个数组项为 promise 的数组），并返回一个新的 promise。

Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log);

// 常见的使用场景，会在所有异步操作都得到结果后执行一些逻辑。
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
];

// 将每个 url 映射（map）到 fetch 的 promise 中
let requests = urls.map(url => fetch(url));

// Promise.all 等待所有任务都 resolved，才执行后续操作。
Promise.all(requests)
    .then(responses => responses.forEach(
        response => console.log((`${response.url}: ${response.status}`))
    ));

let names = ['iliakan', 'remy', 'jeresig'];

let requests2 = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests2)
    .then(responses => {
        // 所有响应都被成功 resolved
        for(let response of responses) {
            console.log((`${response.url}: ${response.status}`)); // 对应每个 url 都显示 200
        }

        return responses;
    })
    // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
    .then(responses => Promise.all(responses.map(r => r.json())))
    // 所有 JSON 结果都被解析："users" 是它们的数组
    .then(users => users.forEach(user => console.log((user.name))));

// 如果任意一个 promise 被 reject，由 Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error。

Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(console.log); // Error: Whoops!

// Promise.all(iterable) 允许在 iterable 中使用非 promise 的“常规”值。
// 如果是常规值，则直接将这个常规值放入到结果 Promise 对应位置上。

// 如果任意的 promise reject，则 Promise.all 整个将会 reject。当我们需要 所有 结果都成功时，它对这种“全有或全无”的情况很有用。
// 但是同样的，也得不到成功的结果了，为了得到所有 Promise 的结果，可以使用 Promise.allSettled.
// 这个方法会得到每个 Promise 的结果，形成一个数组。
urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
];

// 对成功的响应，结果数组对应元素的内容为 {status:"fulfilled", value:result}，
// 对出现 error 的响应，结果数组对应元素的内容为 {status:"rejected", reason:error}。
Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
        results.forEach((result, num) => {
            if (result.status == "fulfilled") {
                console.log((`${urls[num]}: ${result.value.status}`));
            }
            if (result.status == "rejected") {
                console.log((`${urls[num]}: ${result.reason}`));
            }
        });
    });

// Promise.race.
// 与 Promise.all 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）。
// 其余的慢的 Promise 直接不管了。
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // 1

// Promise.any.
// 与 Promise.race 类似，区别在于 Promise.any 只等待第一个 fulfilled 的 promise，并将这个 fulfilled 的 promise 返回。如果给出的 promise 都 rejected，那么返回的 promise 会带有 AggregateError —— 一个特殊的 error 对象，在其 errors 属性中存储着所有 promise error。
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // 1

// 全是错误的情况。
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ouch!
    console.log(error.errors[1]); // Error: Error!
});

// Promise.resolve/reject.
// 在现代的代码中，很少需要使用 Promise.resolve 和 Promise.reject 方法，因为 async/await 语法（我们会在 稍后 讲到）使它们变得有些过时了。

// Promise.resolve.
// Promise.resolve(value) 用结果 value 创建一个 resolved 的 promise。

// 当一个函数被期望返回一个 promise 时，这个方法用于兼容性。（译注：这里的兼容性是指，我们直接从缓存中获取了当前操作的结果 value，但是期望返回的是一个 promise，所以可以使用 Promise.resolve(value) 将 value “封装”进 promise，以满足期望返回一个 promise 的这个需求。）

// let cache = new Map();
//
// function loadCached(url) {
//   if (cache.has(url)) {
//     return Promise.resolve(cache.get(url)); // (*)
//   }
//
//   return fetch(url)
//     .then(response => response.text())
//     .then(text => {
//       cache.set(url,text);
//       return text;
//     });
// }

// Promise.reject.
// Promise.reject(error) 用 error 创建一个 rejected 的 promise。
// 这个方法在实际上从来没被用过。

// 总结
// Promise 类有 6 种静态方法：
//
// Promise.all(promises) —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 Promise.all 的 error，所有其他 promise 的结果都会被忽略。
// Promise.allSettled(promises)（ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：
// status: "fulfilled" 或 "rejected"
// value（如果 fulfilled）或 reason（如果 rejected）。
// Promise.race(promises) —— 等待第一个 settle 的 promise，并将其 result/error 作为结果返回。
// Promise.any(promises)（ES2021 新增方法）—— 等待第一个 fulfilled 的 promise，并将其结果作为结果返回。如果所有 promise 都 rejected，Promise.any 则会抛出 AggregateError 错误类型的 error 实例。
// Promise.resolve(value) —— 使用给定 value 创建一个 resolved 的 promise。
// Promise.reject(error) —— 使用给定 error 创建一个 rejected 的 promise。
// 以上所有方法，Promise.all 可能是在实战中使用最多的。