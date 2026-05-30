// 函数在 JS 中是一等公民，不仅可以赋值给变量，还可以在函数中创建函数并返回。
// 在调用函数时，其访问的仍然是定义处可以进行访问的变量，这种情况称为闭包。

// 我们知道一个代码块可以隔绝一个作用域，里层的作用域可以访问外层的作用域。

{
    let message = "Hello";
    console.log(message);
}

// 在外部无法访问里面的变量。
// console.log(message);

// 嵌套函数，可以在函数内容创建并使用函数。
function sayGoogBye(firstName, lastName) {
    function content() {
        return "Say GoodBye " + firstName + " " + lastName;
    }
    console.log(content());
}

sayGoogBye("Tom", "Smith");


// 可以将函数作为返回值，此时这个返回的函数访问的变量和定义处的一致。
function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

// 得到一个函数对象，然后调用，访问的是 makeCounter 中的 count.
let counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());

// 相互独立，在调用 makeCounter 后会创建一个全新的内存对象。
let counter2 = makeCounter();
console.log(counter2());
console.log(counter2());
console.log(counter2());

// 原理是 「词法环境」。
// 具体参考这里：https://zh.javascript.info/closure

