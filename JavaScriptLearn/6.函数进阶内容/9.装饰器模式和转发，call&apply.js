// 当存在一个函数，但是此函数无法满足我们的需求，且可以在这个函数的基础上进行优化，就可以使用装饰器模式。

// 比如添加缓存。
// slow 函数并没有缓存功能，我们通过装饰器模式给它添加该功能。
function slow(x) {
    return x;
}

// 在这里使用到闭包和函数的特性。
// decorateSlow 是一个装饰器。
// 装饰器和原函数是分离的，这样的做法是很好的。
// 装饰器函数是可重用的。我们可以将它应用于另一个函数。
// 缓存逻辑是独立的，它没有增加袁函数本身的复杂性（如果有的话）。
// 如果需要，我们可以组合多个装饰器（其他装饰器将遵循同样的逻辑）。
function decorateSlow(func) {
    // 创建一个缓存器
    let cache = new Map();

    // 返回被我们包装过的函数。
    return function (x){
        if(cache.has(x)) {
            console.log("缓存中存在，从缓存中获取");
            return cache.get(x);
        }
        console.log("缓存中不存在，获取结果返回并设置到缓存中");
        let res = func(x);
        cache.set(x, res);
        return res;
    }
}

let slowDe = decorateSlow(slow);

console.log(slowDe(3));
console.log(slowDe(3));

// 但是上述的实现方式，在对对象的某些方法使用时，就不会有效果了。
// 因为对象中的方法很有可能会调用 this，而上述的形式是直接调用该函数，会使得 this 为 undefined，从而导致错误。
// 可以使用 func.call(context, …args) 指定 this 的值，context 就是要指定的 this.

function user() {
    console.log(this.name + " " + "Hi");
}

user.call({name: "John"});

// 使用对象和 call 进行实现装饰器。
let obj = {
    someMethod() {
        return 1;
    },

    slow(x) {
        console.log(("Called with " + x));
        return x * this.someMethod(); // (*)
    }
}

// 传递一个对象中的函数，对其进行包装。
function decorateObj(func) {
    let cache = new Map();
    return function (x) {
        if(cache.has(x)) {
            return cache.get(x);
        }
        // 调用这个函数必然是 obj 对象，所以使用 this 就行，表示的是 obj 对象。
        let res = func.call(this, x);
        cache.set(x, res);
        return res;
    }
}

// 如果在需要包裹的函数中有多个参数，则需要使用到 arguments 这个内置变量了。
let test = {
    slow(min, max) {
        console.log(`Called with ${min} and ${max}`);
        return min + max;
    }
}

function decorateTest(func, hash) {
    let cache = new Map();
    return function (){
        console.log(`$arguments are `);
        for(let i in arguments) {
            console.log(arguments[i]);
        }
        // 获取哈希表的 key.
        let key = hash(arguments);
        console.log("key is " + key);
        // 判断缓存中是否存在 key.
        // 若存在，则直接返回数据，否则，调用函数得到数据存入缓存并返回。
        if(cache.has(key)) {
            console.log("Test 命中缓存");
            return cache.get(key);
        }
        console.log("Test 没命中缓存");
        let res = func.call(this, ...arguments);
        cache.set(key, res);
        return res;
    }
}

function hash(array) {
    let count = 0;
    for(let i of array) {
        count += i;
    }
    return count % 13;
}

let decorateTest1 = decorateTest(test.slow, hash);

decorateTest1(3, 1);
decorateTest1(3, 1);
decorateTest1(3, 2);

// 我们现在知道了 func.call 除第一个参数外，其余参数是以一个一个的值的形式存在的，需要使用 ... 语法。
// func.apply 是和上述方法类似的一种方法，不过，第二个参数一个类数组，包含所有的参数值，不使用 ... 语法。
// 可以替换为 let res = func.apply(this, arguments);

// Spread 语法 ... 允许将 可迭代对象 args 作为列表传递给 call。
// apply 只接受 类数组 args。

// 一些包装器可能会提供自己的属性。例如，装饰器会计算一个函数被调用了多少次以及花费了多少时间，并通过包装器属性公开（expose）这些信息。
// 如何统计这些信息，使用闭包和装饰器的特点可以轻易实现！

// 总结
// 装饰器 是一个围绕改变函数行为的包装器。主要工作仍由该函数来完成。
//
// 装饰器可以被看作是可以添加到函数的 “features” 或 “aspects”。我们可以添加一个或添加多个。而这一切都无需更改其代码！
//
// 为了实现 cachingDecorator，我们研究了以下方法：
//
// func.call(context, arg1, arg2…) —— 用给定的上下文和参数调用 func。
// func.apply(context, args) —— 调用 func 将 context 作为 this 和类数组的 args 传递给参数列表。
// 通用的 调用传递（call forwarding） 通常是使用 apply 完成的：
//
// let wrapper = function() {
//   return original.apply(this, arguments);
// };
// 我们也可以看到一个 方法借用（method borrowing） 的例子，就是我们从一个对象中获取一个方法，并在另一个对象的上下文中“调用”它。采用数组方法并将它们应用于参数 arguments 是很常见的。另一种方法是使用 Rest 参数对象，该对象是一个真正的数组。
