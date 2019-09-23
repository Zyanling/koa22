
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
    
    
```
## 3.class的基本语法
## 4.class的继承
## 5.module
## 6.数组的扩展
## 7.对象的扩展和新增方法
## 8.函数的扩展
## 9.let 和const
## 10.变量的解构赋值
## 11.异步遍历器


