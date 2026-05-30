// 箭头函数的主要目的是用于简化函数的创建，在需要函数的地方直接定义。
// 但是箭头函数和函数之间也有着很大的不同。

// 1. 箭头函数没有 this.
// 如果在箭头函数中访问 this，会从外部作用域中进行获取。
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
            // 这个箭头函数中的 this 会访问 showList 函数中的 this，显然这个 this 指向的是 group.
            student => console.log((this.title + ': ' + student))
        );
    }
};

group.showList();

// 如果我们再包裹一层的话，this 就为 undefined，因为在外层 function 中，并没有对象进行调用，所以 this 没有定义。
// let group = {
//   title: "Our Group",
//   students: ["John", "Pete", "Alice"],
//
//   showList() {
//     this.students.forEach(function(student) {
//       // Error: Cannot read property 'title' of undefined
//       alert(this.title + ': ' + student);
//     });
//   }
// };
//
// group.showList();

// 因为箭头函数没有 this，所以也不能对其使用 new.
// 箭头函数也没有 arguments.

let obj = {
    title: "Our Group",
    name: "John",
    showList(content) {
        console.log(this.name + ': ' + this.title + " " + content);
    }
}

function defer(func, ms) {
    return function() {
        setTimeout(() => {
            func.apply(this, arguments);
        }, ms);
    }
}

function sayHi(content) {
    console.log("Hi " + content);
}

let deferShowList = defer(obj.showList, 1000);

obj.deferShowList = deferShowList;

let deferFunc = defer(sayHi, 2000);

deferFunc("Tom");

obj.deferShowList("List");

// 总结
// 箭头函数：
//
// 没有 this
// 没有 arguments
// 不能使用 new 进行调用
// 它们也没有 super