// 一旦方法被传递到与对象分开的某个地方 —— this 就丢失。
let user = {
    firstName: "John",
    sayHi() {
        console.log((`Hello, ${this.firstName}!`));
    }
};

// 传递的只是一个函数引用，而没有前缀对象，从而丢失 this.
setTimeout(user.sayHi, 1000); // Hello, undefined!

// 那么可以如何解决这样的问题呢？
// 1. 将函数进行空包装。
// 当然，为了让表达式看起来更简洁，可以使用箭头函数。
setTimeout(function () {
    // 保留了前缀对象。
    user.sayHi();
}, 1000);

// 这种方式有个 bug，如果在等待的 1 秒内，user 对象的 sayHi 方法发生了改变，则执行的结果就不是根据原本的逻辑得到的了。

// 2. 使用 bind 函数。
// 这个方法可以解决 1 中的 bug，这个函数可以绑定 this.
// bind 函数返回的是一个特殊的函数对象，类似于绑定了 this 的原函数。

// 此时 this 已经被确定为 user 了，就算后续对 user 进行修改也不会导致 user.sayHi.bind(user) 得到的函数中的 this 发生变化。
setTimeout(user.sayHi.bind(user), 1000);

// 再深入一点，不仅可以绑定 this，还可以绑定参数。
// bind 的完整语法是 let bound = func.bind(context, [arg1], [arg2], ...);
// 显而易见的使用方式。

function multi(a, b) {
    return a * b;
}

// 绑定为 2 倍。
let double = multi.bind(null, 2);
// a 被绑定为 2，double 中传入的值被赋予给 b，从而得到 6.
console.log(double(3));

// 为什么我们通常会创建一个部分应用函数？
//
// 好处是我们可以创建一个具有可读性高的名字（double，triple）的独立函数。我们可以使用它，并且不必每次都提供一个参数，因为参数是被绑定了的。
//
// 另一方面，当我们有一个非常灵活的函数，并希望有一个不那么灵活的变型时，部分应用函数会非常有用。

// 当我们想绑定一些参数（arguments），但是不想绑定上下文 this，应该怎么办？
// 显然不能使用 bind 函数，这个函数必须绑定上下文。但我们使用 call 或者 apply 绑定部分参数是非常容易的。
// 同时，也不用强行绑定 this.

// 总结
// 方法 func.bind(context, ...args) 返回函数 func 的“绑定的（bound）变体”，它绑定了上下文 this 和 ...args 参数。
//
// 通常我们应用 bind 来绑定对象方法的 this，这样我们就可以把它们传递到其他地方使用。例如，传递给 setTimeout。
//
// 当我们绑定一个现有的函数的某些参数时，绑定后的（不太通用的）函数被称为 partially applied 或 partial。
//
// 当我们不想一遍又一遍地重复相同的参数时，部分应用函数非常有用。就像我们有一个 send(from, to) 函数，并且对于我们的任务来说，from 应该总是一样的，那么我们就可以使用它的一个部分应用函数。

