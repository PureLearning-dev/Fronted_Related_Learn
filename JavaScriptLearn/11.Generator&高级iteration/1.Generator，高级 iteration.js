// 使用函数的常见情况是直接将函数体全部执行完成，可能会返回一个值。
// 这样的做法足够满足大多数场景了，但是在某些情况无法满足，比如：生成一个无限多的斐波那契数列值，可以在执行中暂停，通过计算得到下一个值。
// 此时，引出了 generator 的概念，简单来说，generator 给了开发者对函数执行流的精细控制权。

// 创建一个 generator 函数。
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

// 返回的并不是我们需要的部分数据，而是一个特殊的对象。
console.log(generateSequence());

// 要访问其值，需要通过 next 方法得到一个包含值的对象。
// 对同一个 Generator 对象调用 next 方法，可以一个一个往下取数据，直到最后一个数据。
const generator = generateSequence();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());

// 当取到最后一个数据后，再往下取时，得到的对象中的 value 值为 undefined.
console.log(generator.next());

// generator 是可迭代的。
const generator2 = generateSequence();

// 迭代对应的值，而不再是对象了，但是通过 return 返回的值不会出现。
// 因为当返回的对象的 done 为 true 时，就不会迭代，为了解决这个问题，在函数中只使用 yield.
for(let ob of generator2) {
    console.log(ob);
}

// 因为 generator 是可迭代的，我们可以使用 iterator 的所有相关功能，例如：spread 语法 ...
function *generator3() {
    yield 1;
    yield 2;
}

console.log([2, ...generator3()]);

// 当一个对象中包含 next 方法可以称为可迭代对象，在之前的学习中，我们实现了一个可迭代对象。
// 那里的功能可以使用这里的 generator 进行重构。
let range = {
    start: 0,
    end: 10,
    [Symbol.iterator]: function* (){
        for(let i = this.start; i <= this.end; i++){
            yield i;
        }
    }
}

// 因为 generator 返回的是一个可迭代对象，符合 let of 语法。
// 在 let of 中，每次循环就调用一次 next ，得到下一个数据，然后进行输出。
for(let i of range){
    console.log(i);
}

function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

// yield* 是将 generateSequence 迭代得到的值全部 yield 出去。
function* generatePasswordCodes() {

    // 0..9
    yield* generateSequence(48, 57);

    // A..Z
    yield* generateSequence(65, 90);

    // a..z
    yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
}

console.log(str);

// yield 不仅仅可以往外抛值，还可以从外部获取值，是一个双向的过程，使用 .next(val) 进行处理。
function* gen(){
    let answer1 = yield "2 + 1 = ?";
    console.log(answer1);
    let answer2 = yield "2 + 4 = ?";
    console.log(answer2);
}

// 执行到 yield 时暂定，然后从外部得到输出，将其赋值给 answer1.
// 可以认为一开始有个下标在 0 处，调用 next 是为了找到下一个 yield 暂停并将对应对象返回，然后等待下一次调用 next.
// 如果下一次 next 中包含参数，则作为上次 yield 结果传入函数内。
let gen1 = gen();
console.log(gen1.next());
console.log(gen1.next(3));
console.log(gen1.next(6));

// 当然，也可以传入一个 error 对象。
// 使用 generator.throw 语法进行传递。
function* gen() {
    while (true) {
        try {
            let value = yield "给我一个合法的值";
            console.log("收到有效值:", value);
            break;
        } catch(e) {
            console.log("值不合法，重试:", e.message);
        }
    }
}

const g = gen();
g.next();                          // 启动，停在第一个 yield
g.throw(new Error("空字符串"));     // 注入异常，被 catch 捕获，循环继续
g.next(42);                        // 传入有效值，break 出去

function* gen2() {
    yield 1;
    yield 2;
    yield 3;
}

const g2 = gen2();

// 使用 generator.return() 会结束，并返回参数值。
console.log(g2.next());       // { value: 1, done: false }
console.log(g2.return('foo')); // { value: "foo", done: true }
console.log(g2.next());       // { value: undefined, done: true }

// 总结
// generator 是通过 generator 函数 function* f(…) {…} 创建的。
// 在 generator（仅在）内部，存在 yield 操作。
// 外部代码和 generator 可能会通过 next/yield 调用交换结果。
// 在现代 JavaScript 中，generator 很少被使用。但有时它们会派上用场，因为函数在执行过程中与调用代码交换数据的能力是非常独特的。而且，当然，它们非常适合创建可迭代对象。
//
// 并且，在下一章我们将会学习 async generator，它们被用于在 for await ... of 循环中读取异步生成的数据流（例如，通过网络分页提取 (paginated fetches over a network)）。
//
// 在 Web 编程中，我们经常使用数据流，因此这是另一个非常重要的使用场景。