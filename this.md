babel-core 是babel的核心包
babel-preset-env 用于将es2015+编译成es5
babel-preset-react 用于编译react的jsx语法
babel-loader 用webpack和babel编译js
clean-webpack-plugin 用于编译前，清空编译目录


1.this 指向

```
1.this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象 。 // https://www.cnblogs.com/pssp/p/5216085.html
2.当this遇到return 时：如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。还有一点就是虽然null也是对象，但是在这里this还是指向那个函数的实例，因为null比较特殊
    function fn(){  
    this.user = '追梦子';  
        return {};  
    }
    var a = new fn;  
    console.log(a.user); //undefined
    
    function fn()  
    {  
        this.user = '追梦子';  
        return undefined;
    }
    var a = new fn;  
    console.log(a.user); //追梦子

    function fn(){  
    this.user = '追梦子';  
    return null;
    }
    var a = new fn;  
    console.log(a.user); //追梦子    
```
2.es6的继承
```
关键点
1、class 可以理解为function,由于class本质还是一个function,因此它也会拥有一个的prototype属性，当new一个class时，会把class的porototype属性赋值给这个新对象的 __proto属性。
2、constructor 方法是默认添加的方法，在new一个对象时，自动调用该方法，constructor里面定义自己的属性。
3、继承extends和super，class 子类名 extends 父类名实现继承，当然还得在constructor里面写上super(父类的参数)，意思就是在子类中获得父类的this指针，相当于Animal.call(this)，参考https://www.jianshu.com/p/030b3d890850

// es6继承
  class Animal {
    //构造函数，里面写上对象的属性
    constructor(props) {
      this.name = props.name || 'Unknown';
    }
    //方法写在后面
    eat() {//父类共有的方法
      console.log(this.name + " will eat pests.");
    }
  }

  //class继承
  class Bird extends Animal {
    //构造函数
    constructor(props,myAttribute) {//props是继承过来的属性，myAttribute是自己的属性
      //调用实现父类的构造函数
      super(props)//相当于获得父类的this指向
      this.type = props.type || "Unknown";//父类的属性，也可写在父类中
      this.attr = myAttribute;//自己的私有属性
    }

    fly() {//自己私有的方法
      console.log(this.name + " are friendly to people.");
    }
    myattr() {//自己私有的方法
      console.log(this.type+'---'+this.attr);
    }
  }

//通过new实例化
  var myBird = new Bird({
    name: '小燕子',
    type: 'Egg animal' 
  },'Bird class')
  myBird.eat()
  myBird.fly()
  myBird.myattr()
```

3.数组去重复
```
1.利用es6 set去重复
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))

2.利用filter
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}

3.利用indexOf
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}

4.利用includes
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array =[];
    for(var i = 0; i < arr.length; i++) {
            if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
                    array.push(arr[i]);
              }
    }
    return array
}

5.[...new Set(arr)]
[...new Set(arr)] 
```

4.async 比promise的好处  （https://blog.csdn.net/xufeiayang/article/details/80484116）
```
1.简约而干净 （不需要then，catch）
2.错误处理   （Promise内部的错误，我们只能再嵌套一层try/catch，用await就可以解决）
3.条件判断    （我们需要先拉取数据，然后根据得到的数据判断是否输出此数据，或者根据数据内容拉取更多的信息。需要嵌套多层，写法辣眼睛）
4.多个promise连接时，写法嵌套多层  改进promise.all）
5.链式调用了很多promise，出错时log信息不明朗 
6.不能打断点 （在一个返回表达式的箭头函数中，我们不能设置断点）
```

5.koa2的作用：
```
1. 前后端分离
2. 前端快速启动一个服务
3. koa2解决跨域：
  Koa2和express：koa2更轻便，需要的模块引入用就可以
  Koa2:1.web服务框架可以让前端启动一个服务，2.前后端分离开发效率更好，更快捷，方便，前端可以自己控制版本的发布和消息的发送

    npm install koa-cors --save-dev
    var cors = require('koa-cors')
    app.use(cors())  // 放在route前面

    1.npm install koa-generator -g 安装koa1和koa2生成器
    2.koa2 test 生成test项目
    3.修改模板引擎
    4.引入webpack打包 
    5.引入react
    6.选择多页应用  （只需要引入每次打开页面的对应的打包的js文件就可以了）

    react+koa2不足：1.seo不友好，2.初次加载耗时多 
    传统的web加载方式，spa加载方式



react-touter源码解读：
1.在一个web 应用中，改变url无非是2种方式，一种是利用超链接进行跳转，另一种是使用浏览器的前进和回退功能
2.将history分为三类。
           hashHistory 老版本浏览器的history
           browserHistory h5的history
           memoryHistory node环境下的history，存储在memory中

History 接口不继承于任何属性。
History.length（只读）：返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回 1。
History.scrollRestoration：允许 web 应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。
History.state（只读）：返回一个历史堆栈顶部的状态的值。这是一种可以不必等待 popstate 事件而查看状态的方式。
方法
History 接口不继承任何方法。
History.back()：前往上一页，用户可点击浏览器左上角的返回按钮模拟此方法，等价于：history.go(-1)。
History.forward()：在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法，等价于：history.go(1)。History.go()：通过当前页面的相对位置从浏览器历史记录（绘会话记录）加载页面。比如：参数为 -1 的时候为上一页，参数为 1 的时候为下一页。当整数超出界限、调用没有参数的 go() 方法、不是整数的参数时，没有效果，也不会报错。
History.pushState()：按指定的名称和 URL（如果提供该参数）将数据 push 进会话历史栈，数据被 DOM 进行不透明处理。
History.replaceState()：按指定的数据，名称和 URL（如果提供该参数），更新历史栈上最新的入口。这个数据被 DOM 进行了不透明处理。History.pushState(),History.replaceState()只会修改url中的路径，并不会对当前的页面进行刷新
接收可以三个参数：状态对象、标题（被忽略）、URL（可选）
state对象：是一个 JavaScript 对象，它与创建的新历史记录条目相关联。每当用户导航到新状态时，popstate 都会触发事件，并且 state 事件的属性包含历史记录条目的状态对象的副本。
状态对象可以是任何可以序列化的对象。因为 Firefox 将状态对象保存到用户的磁盘，因此可以在用户重新启动浏览器后恢复它们，因此我们在状态对象的序列化表示强加了 640k 字符的大小限制。
title：Firefox 目前忽略了这个参数，虽然它可能在将来使用它。可以传入一个 null。
URL：此历史记录条目的 URL 由此参数指定。请注意，浏览器在调用后不会尝试加载此 URL，但可能会稍后尝试加载 URL，例如在用户重新启动浏览器之后。新 URL 不一定是绝对的；如果是相对的，则相当于当前 URL 进行解析。新 URL 必须与当前 URL 的源相同；否则，pushState() 将抛出异常。此参数可选，如果未指定，则将其设置为文档当前的 URL。
```

6.react优化点，这样优化的好处，优化了什么
```
1.bing函数优化：
  1.constructor绑定
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this); //构造函数中绑定
  }
  //然后可以
  <p onClick={this.handleClick}>
  2.使用时绑定<p onClick={this.handleClick.bind(this)}>
  3.使用箭头函数：<Test click={() => { this.handleClick() }}/>
  以上三种第一种最优。因为第一种构造函数只在组件初始化的时候执行一次
  第二种组件每次render都会执行
  第三种在每一次render时候都会生成新的箭头函数。例：Test组件的click属性是个箭头函数，组件重新渲染的时候Test组件就会因为这个新生成的箭头函数而进行更新，从而产生Test组件的不必要渲染。
2.不要滥用props；
  prosp尽量只传需要的数据，避免多余的更新，尽量避免使用{...props};
3.列表类组件优化：
  key属性在组件类之外提供了另一种方式的组件标识。通过key标识，在组件发生增删改，排序等操作时，可以根据key值位置直接调整dom顺序，告诉react避免不必要的渲染而避免性能的浪费。
  var items = sortBy(this.state.sortingAlgorithm, this.props.items);
  return items.map(function(item){
    return <img src={item.src} />
  });
  当顺序发生改变时，react会对元素进行diff操作，并改img的src属性。显示，这样的操作效率是非常低的。这时，我们可以为组件添加一个key属性以唯一的标识组件：
  return <img src={item.src} key={item.id} />
  增加key后，react 就不是diff，而是直接使用insertBefore操作移动组件位置，而这个操作是移动DOM节点最高效的办法
4.组件尽可能的进行拆分，解耦
组件尽可能的细分，比如一个input+list组件，可以将list分成一个PureComponent，只在list数据变化时更新。否则在input值变化页面重新渲染的时候，list也需要进行不必要的DOM diff。
5.shouldComponentUpdate避免重复渲染
大部分情况下，你可以使用React.PureComponent而不必写你自己的shouldComponentUpdate，它只做一个浅比较。但是当你比较的目标为引用类型数据，浅比较会忽略属性或状态突变的情况，此时你不能使用它，此时你需要关注下面的不可突变数据。

6.懒加载
7.强缓存
  app.use(require('koa-static')(path.join(__dirname, '/public'), {
    maxage: 365 * 24 * 60 * 60
  }));
8.gzip压缩
const compress =require('koa-compress');
app.use(compress({threshold:2048}));
```

7.purecomponent和component的区别
```
为什么用PureComponent?
PureComponent 是优化 React 应用程序最重要的方法之一，易于实施，只要把继承类从 Component 换成 PureComponent 即可，可以减少不必要的 render 操作的次数，从而提高性能，而且可以少写 shouldComponentUpdate 函数，节省了点代码。
原理：
当组件更新时，如果组件的props和state都没有发生改变，render方法就不会触发，省去Virtual dom的生成和对比的过程，达到提升性能的目的。
```

8.js执行机制 https://baijiahao.baidu.com/s?id=1615713540466951098&wfr=spider&for=pc
```
  1.理解js单线程的概念 
    JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。
    JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。
  2.理解任务队列（消息队列）
    单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。JavaScript语言的设计者意识到这个问题，将所有任务分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
    在所有同步任务执行完之前，任何的异步任务是不会执行的 
  3.理解Event Loop
    1.所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
    2.在主线成程之外，还存在一个"任务队列 （task queue）"。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
    3.旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
    4.主线程不断重复上面的第三步。
    主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会循环反复
  4.哪些语句会放入异步任务队列及放入时机
    1.有4种会放入异步任务队列
    1.setTimeout 和setinterval
    2.dom事件
    3.es6中的promise
    4.ajax异步请求





```
9.浏览器缓存机制（强缓存，弱缓存）

10.


11.React setState流程解析 https://segmentfault.com/a/1190000015463599?utm_source=tag-newest
为什么有时连续两次setState只有一次生效？
https://blog.csdn.net/sinat_17775997/article/details/88226732

12:js判断两个对象是否相等,https://blog.csdn.net/weixin_38098192/article/details/82768207


13:什么是跨域？有什么解决方法？

14:js隐视转换，显示转换原理


15.从输入URL到页面加载发生了什么  https://www.jianshu.com/p/a877684a4cdd

16.webpack4之提升Webpack打包速度的方法