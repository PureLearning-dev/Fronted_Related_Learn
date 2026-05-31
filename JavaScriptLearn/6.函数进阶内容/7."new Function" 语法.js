// 创建函数除了使用 function 关键词，还可以有构造函数的形式。
let sum = new Function(...['a', 'b'], "return a + b");

console.log(sum(1, 2));

// 以前的所有声明方法都需要我们 —— 程序员，在脚本中编写函数的代码。
//
// 但是 new Function 允许我们将任意字符串变为函数。
// 所以，创建函数可以变为动态的、可配置的了，通过后端传递函数信息进行动态创建。

// 如果我们使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。
// 因此，此类函数无法访问外部（outer）变量，只能访问全局变量。

// function getFunc() {
//     let value = "test";
//
//     let func = new Function('console.log(value)');
//
//     return func;
// }
//
// 使用 getFunc 得到的函数，访问不到外部的 value.
// getFunc()(); // error: value is not defined

// 总结
// 语法：
//
// let func = new Function ([arg1, arg2, ...argN], functionBody);
// 由于历史原因，参数也可以按逗号分隔符的形式给出。
//
// 以下三种声明的含义相同：
//
// new Function('a', 'b', 'return a + b'); // 基础语法
// new Function('a,b', 'return a + b'); // 逗号分隔
// new Function('a , b', 'return a + b'); // 逗号和空格分隔
// 使用 new Function 创建的函数，它的 [[Environment]] 指向全局词法环境，而不是函数所在的外部词法环境。因此，我们不能在 new Function 中直接使用外部变量。不过这样是好事，这有助于降低我们代码出错的可能。并且，从代码架构上讲，显式地使用参数传值是一种更好的方法，并且避免了与使用压缩程序而产生冲突的问题。