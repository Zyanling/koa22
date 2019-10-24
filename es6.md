
#### 学习地址：http://es6.ruanyifeng.com/#docs/async#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95
## 1.promise:
 ```
  含义：是异步编程的一种解决方案。比传统的解决方案--回调函数/事件--更合理和更强大。
  有两个特点：1.对象的状态不受外界的影响。
            2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。
  好处：有了promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数，promise对象提供了统一的接口，使得控制异步操作更加容易。        
  缺点：
    1.无法取消promise，一旦创建，无法取消。
    2.如果不设置回调函数，promise内部抛出的错误，不会反应到外部。
    3.当处于pending状态时，无法得知目前进展到哪一个阶段。
  基本用法：  
    Promise是一个构造函数，用来生成Promise实例。
    Promise.prototype.then()  then方法返回得失新的promise实例，因此可以采用链式写法，即then方法后面可以再调用另一个then方法。
    Promise.prototype.catch()  用于指定发生错误时的回调函数。如果该对象的状态变为resolved，则会调用then方法指定的回调函数，如果异步操作抛出错误，状态就会变为rejected就会调用catch方法指定的回调函数。
    Promise.prototype.finally()  用于指定不管 Promise 对象最后状态如何，都会执行的操作。不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
    Promise.all() 
      用于将多个 Promise 实例，包装成一个新的 Promise 实例。
      const p=Promise([p1,p2,p3]);
      p的状态由p1,p2,p3决定分为两种情况：
        1.都变为fulfilled,p 的状态才会变为fulfilled，此时p1,p2,p3的返回值组成一个数组，传递给p的回调函数。
        2.只要p1,p2,p3之中有一个rejected，p的状态就变为rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
    Promise.race()
        此时第一个被reject的实例的返回值，会传递给p的回调函数。
        const p = Promise.race([p1, p2, p3]);
        p的状态：只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
        Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
    Promise.resolve()
        有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
    Promise.reject()
        方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
```

## 2.async:
```
  含义：使得异步操作变得更加方便
  好处：
    1.更好的语义。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
    2.更广的适用性。sync函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
    3.返回值是promise。async函数的返回值是 Promise 对象。你可以用then方法指定下一步的操作。
    4.async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖
  基本用法：
  async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
  函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。
  async function getStockPriceByName(name){
      const symbol=await getStockSymbol(name);
      const stockPrice=await getStockPrice(symbol);
      return stockPrice;
  } 
  getStockPriceByName("good").then((result)=>{
      console.log(result);
  })
  async有多种形式：
        // 函数声明
        async function foo() {}

        // 函数表达式
        const foo = async function () {};

        // 对象的方法
        let obj = { async foo() {} };
        obj.foo().then(...)

        // Class 的方法
        class Storage { 
        constructor() {
            this.cachePromise = caches.open('avatars');
        }

        async getAvatar(name) {
            const cache = await this.cachePromise;
            return cache.match(`/avatars/${name}.jpg`);
        }
        }

        const storage = new Storage();
        storage.getAvatar('jake').then(…);

        // 箭头函数
        const foo = async () => {};
            
 async语法：
    1.返回Promise对象 ；async函数内部return语句返回的值，会成为then方法回调函数的参数。
    2.Promise 对象的状态变化。async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，
        才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。  
    3.await命令： await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值
                await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
        async function f() {
            await Promise.reject('出错了');
            }

            f()
            .then(v => console.log(v))
            .catch(e => console.log(e))
            // 出错了
         注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。
                任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。   

    async function f() {
        await Promise.reject('出错了');
        await Promise.resolve('hello world'); // 不会执行
        }
    上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

    有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
        async function f() {
        try {
            await Promise.reject('出错了');
        } catch(e) {
        }
        return await Promise.resolve('hello world');
        }

        f()
        .then(v => console.log(v))
        // hello world

        另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
        async function f() {
            await Promise.reject('出错了')
                .catch(e => console.log(e));
            return await Promise.resolve('hello world');
            }

            f()
            .then(v => console.log(v))
            // 出错了
            // hello world

        4.错误处理：

```
## 3.class的基本语法
    好处：1.让对象原型的写法更加清晰   2.更像面向对象编程的语法
    传统的构造函数：
        function Point(x, y) {
            this.x = x;
            this.y = y;
            }

            Point.prototype.toString = function () {
            return '(' + this.x + ', ' + this.y + ')';
        };

        var p = new Point(1, 2);

     es6中的构造函数：
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            toString() {
                return '(' + this.x + ', ' + this.y + ')';
            }
            toValue(){}
        }
    Point === Point.prototype.constructor // true （类本身就指向构造函数）
    
    // 等同于
    Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {},
    };
    // 等同于：
    Object.assign(Point.prototype, {
        toString(){},
        toValue(){}
    });


class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
上面代码中，b是B类的实例，它的constructor方法就是B类原型的constructor方法。

constructor 方法 ：
    constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
    
    class Point {}
    // 等同于
    class Point {
    constructor() {}
    }
类的实例：
    类必须使用new调用，否则会报错
    var point = new Point(2, 3);
   
    类的所有实例共享一个原型对象。
    var p1 = new Point(2,3);
    var p2 = new Point(3,2);
    p1.__proto__ === p2.__proto__
    上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的。
    这也意味着，可以通过实例的__proto__属性为“类”添加方法。
    p1.__proto__.printName = function () { return 'Oops' };
    p1.printName() // "Oops"
    p2.printName() // "Oops"
    var p3 = new Point(4,2);
    p3.printName() // "Oops"
    上面代码在p1的原型上添加了一个printName方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。

取值函数（getter）和存值函数（setter）
    在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
    class MyClass {
        constructor() {
            // ...
        }
        get prop(){
            return "getter"
        }
        set prop(value){
            console.log("setter:"+value)
        }
    }
    let inst=new MyClass();
    inst.prop=123;//// setter: 123
    inst.prop;  //"getter"
    
属性表达式 :
    let methodName = 'getArea';
        class Square {
            constructor(length) {
                // ...
            }

            [methodName]() {
                // ...
            }
        }
Class 表达式
    const MyClass = class { /* ... */ };
    立即执行：
    let person = new class {
    constructor(name) {
        this.name = name; //this，它默认指向类的实例.但是，必须非常小心，一旦单独使用该方法，很可能报错。
    }

    sayName() {
        console.log(this.name);
    }
    }('张三');

    person.sayName(); // "张三"  

## 4.class的继承
## 5.module
export：
    // profile.js
    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;
    //输出变量
    export { firstName, lastName, year };
    //输出函数/类
    export function multiply(x, y) {
        return x * y;
    };
    通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。下面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。
    function v1() { ... }
    function v2() { ... }
    export {
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamLatestVersion
    };

import 命令：
import { firstName, lastName, year } from './profile.js';
function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
上面代码的import命令，用于加载profile.js文件，并从中输入变量。import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
import { lastName as surname } from './profile.js';

## 6.数组的扩展
## 7.对象的扩展和新增方法
## 8.函数的扩展
## 9.let 和const
## 10.变量的解构赋值
## 11.异步遍历器





匿名函数
function(){}
命名函数 var handleClick=function(){}   function handleClick(){}
立即执行函数  (function IIFE(){ .. }) 
(function IIFE(){ .. }) 函数表达式外面的 ( .. ) 就是 JavaScript 语法能够防止其成为普通函数声明的部分。
表达式最后的 ()(即 })(); 这一行)实际上就表示立即执行前面给出的函数表达式。

function foo() { .. }
// foo函数引用表达式，然后()执行它 foo();

 var foo = {
         a: 42
};
// 创建bar并将其链接到foo
var bar = Object.create( foo );