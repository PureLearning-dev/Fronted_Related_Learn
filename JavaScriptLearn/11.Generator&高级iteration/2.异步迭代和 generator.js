// 当值是以异步的形式出现时，例如在 setTimeout 或者另一种延迟之后，就需要异步迭代。
// 此时使用的就不是 [Symbol.iterator] 而是 [Symbol.asyncIterator].

let range = {
    from: 1,
    to: 5,

    [Symbol.asyncIterator]() { // (1)
        return {
            current: this.from,
            last: this.to,

            // next 返回的是一个 Promise 对象。
            async next() { // (2)

                // 注意：我们可以在 async next 内部使用 "await"
                await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

// 异步返回。
(async () => {

    // for await of 会在 [Symbol.asyncIterator] 上去实现的方法。
    for await (let value of range) { // (4)
        console.log((value)); // 1,2,3,4,5
    }

})()

// Spread 语法 ... 无法异步工作，因为找到函数都不一样。

// 在大多数时候，当我们想要创建一个可迭代对象时，我们会使用 generator。

// 总结
// 常规的 iterator 和 generator 可以很好地处理那些不需要花费时间来生成的数据。
//
// 当我们期望异步地，有延迟地获取数据时，可以使用它们的异步版本，并且使用 for await..of 替代 for..of。
//
// 异步 iterator 与常规 iterator 在语法上的区别：
//
//                             Iterable	                         异步 Iterable
// 提供 iterator 的对象方法	   Symbol.iterator	                 Symbol.asyncIterator
// next() 返回的值是	           {value:…, done: true/false}	     resolve 成 {value:…, done: true/false} 的 Promise
//
// 异步 generator 与常规 generator 在语法上的区别：
//
//                             Generator	                      异步 generator
// 声明方式	                   function*	                      async function*
// next() 返回的值是	           {value:…, done: true/false}	      resolve 成 {value:…, done: true/false} 的 Promise
//
// 在 Web 开发中，我们经常会遇到数据流，它们分段流动（flows chunk-by-chunk）。例如，下载或上传大文件。
//
// 我们可以使用异步 generator 来处理此类数据。值得注意的是，在一些环境，例如浏览器环境下，还有另一个被称为 Streams 的 API，它提供了特殊的接口来处理此类数据流，转换数据并将数据从一个数据流传递到另一个数据流（例如，从一个地方下载并立即发送到其他地方）。