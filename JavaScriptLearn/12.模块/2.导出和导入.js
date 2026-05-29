// 这里学习的是所有可以存在的导入导出情形。

// 1. 在声明前导出。
// 可以在任意的声明语法前进行导出。
export let A = 10;
export const B = 20;
export function init() {
    console.log(A);
}
export function* gen() {
    yield B;
    yield A;
}

export class Human{
    name = 'Human';
    sayHi() {
        console.log('hi');
    }
}

// 2. 导出和声明分离。
let a = 20;
function goodBye() {
    console.log('goodBye');
}

export {
    a,
    goodBye,
};

// 3. 导入使用 import。
import {sayHi} from "./script/SayHi.js";
sayHi();

// 全部导入的话使用 * 表示，但是后面必须使用 as 进行重命名。
import * as a from "./script/Init.js";

// as 使用来进行重命名的，导出和导入都可以使用。

// 上述的导出导入是普通的，并且一个模块可以导出许多东西，这样使用的话，后期可能不好维护。
// 最佳实践是通过 默认导出 进行导出，每个模块只导出一个数据。
export default {
    name: "default",
}

// 通过默认导出的数据，在导入时，可以不使用 {} 包裹，并且可以自定义导入的名字。

// 在声明和导出分离时，可以使用 default 关键作为默认导出的内容，便于重命名，导入也是同理。
// 在一个模块中有且只能有 1 个默认导出。

// 重新导出。
// 在导入了一个值后，立即重新导出。
// 这个的作用是为了统一暴露的文件。
// 使用 export ... from ...语法。

// 重新导出时，默认导出需要单独处理。
//
// 假设我们有一个 user.js 脚本，其中写了 export default class User，并且我们想重新导出类 User：
//
// // 📁 user.js
// export default class User {
//   // ...
// }
// 我们可能会遇到两个问题：
//
// export User from './user.js' 无效。这会导致一个语法错误。
//
// 要重新导出默认导出，我们必须明确写出 export {default as User}，就像上面的例子中那样。
//
// export * from './user.js' 重新导出只导出了命名的导出，但是忽略了默认的导出。
//
// 如果我们想将命名的导出和默认的导出都重新导出，那么需要两条语句：
//
// export * from './user.js'; // 重新导出命名的导出
// export {default} from './user.js'; // 重新导出默认的导出
// 重新导出一个默认导出的这种奇怪现象，是某些开发者不喜欢默认导出，而是喜欢命名的导出的原因之一。

// 总结
// 这是我们在本节和前面章节中介绍的所有 export 类型：
//
// 你可以阅读并回忆它们的含义来进行自查：
//
// 在声明一个 class/function/… 之前：
// export [default] class/function/variable ...
// 独立的导出：
// export {x [as y], ...}.
// 重新导出：
// export {x [as y], ...} from "module"
// export * from "module"（不会重新导出默认的导出）。
// export {default [as y]} from "module"（重新导出默认的导出）。
// 导入：
//
// 导入命名的导出：
// import {x [as y], ...} from "module"
// 导入默认的导出：
// import x from "module"
// import {default as x} from "module"
// 导入所有：
// import * as obj from "module"
// 导入模块（其代码，并运行），但不要将其任何导出赋值给变量：
// import "module"
// 我们把 import/export 语句放在脚本的顶部或底部，都没关系。
//
// 因此，从技术上讲，下面这样的代码没有问题：
//
// sayHi();
//
// // ...
//
// import {sayHi} from './say.js'; // 在文件底部导入
// 在实际开发中，导入通常位于文件的开头，但是这只是为了更加方便。
//
// 请注意在 {...} 中的 import/export 语句无效。
//
// 像这样的有条件的导入是无效的：
//
// if (something) {
//   import {sayHi} from "./say.js"; // Error: import must be at top level
// }
// ……但是，如果我们真的需要根据某些条件来进行导入呢？或者在某些合适的时间？例如，根据请求（request）加载模块，什么时候才是真正需要呢？
