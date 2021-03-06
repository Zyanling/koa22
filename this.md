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


要实现前端路由，需要解决两个核心： （来自：https://juejin.im/post/5cd8d609e51d456e7b372155#heading-6）
1.如何改变url却不引起页面刷新
2.如何检测url变化了
下面分别是hash和history两种实现方式回答上面的核心问题。

hash实现：
1.hash是url中hash(#)及后面的那部分，常用作锚点在页面内进行导航，hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，改变 URL 中的 hash 部分不会引起页面刷新
2.通过 hashchange和load 事件监听 URL 的变化，改变 URL 的方式只有这几种：通过浏览器前进后退改变 URL、通过<a>标签改变 URL、通过window.location改变URL，这几种情况改变 URL 都会触发 hashchange 事件

history实现：
1.history提供了pushsState和replaceState两个方法，这两个方法改变url的path部分不会引起页面刷新。
2.history提供类似hashchange事件的popstate事件，但是popstate事件有些不同：通过浏览器前进后退改变url时会触发popstate事件，通过pushState/replaceState或<a>标签改变 URL 不会触发 popstate 事件。好在我们可以拦截 pushState/replaceState的调用和<a>标签的点击事件来检测 URL 变化，所以监听 URL 变化可以实现，只是没有 hashchange 那么方便。

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

 ```
解读为什么直接修改this.state无效:
要知道setState本质是通过一个队列机制实现state更新的。 执行setState时，会将需要更新的state合并后放入状态队列，而不会立刻更新state，队列机制可以批量更新state。
如果不通过setState而直接修改this.state，那么这个state不会放入状态队列中，下次调用setState时对状态队列进行合并时，会忽略之前直接被修改的state，这样我们就无法合并了，而且实际也没有把你想要的state更新上去。

什么是批量更新：就是将一段时间内对model的修改批量更新到view的机制
setState之后发生的事情：React在setState之后，会经对state进行diff，判断是否有改变，然后去diff dom决定是否要更新UI。如果这一系列过程立刻发生在每一个setState之后，就可能会有性能问题。
在短时间内频繁setState。React会将state的改变压入栈中，在合适的时机，批量更新state和视图，达到提高性能的效果。
总结
1.通过setState去更新this.state，不要直接操作this.state，请把它当成不可变的。
2.调用setState更新this.state不是马上生效的，它是异步滴，所以不要天真以为执行完setState后this.state就是最新的值了。
3.多个顺序执行的setState不是同步地一个一个执行滴，会一个一个加入队列，然后最后一起执行，即批处理

1.setState不会立刻改变React组件中state的值.
2.setState通过触发一次组件的更新来引发重绘.
3.多次setState函数调用产生的效果会合并。

 ```

12:js判断两个对象是否相等,https://blog.csdn.net/weixin_38098192/article/details/82768207


13:什么是跨域？有什么解决方法？
```
由于浏览器的同源策略，凡是发送请求url的协议，域名、端口三者之间任意一与当前页面地址不同即为跨域。存在跨域的情况：
    1.网络协议不同，如http协议访问https协议。
    2.端口不同，如80端口和8088端口。
    3.域名不同，如qianduanblog.com访问baidu.com。
    4.子域名不同，如abc.qianduanblog.com访问def.qianduanblog.com。
    5.域名和域名对应ip,如www.a.com访问20.205.28.90.

    跨域请求资源的方法：
    1.(1)、porxy代理
    定义和用法：proxy代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。
    实现方法：通过nginx代理；
    注意点：1、如果你代理的是https协议的请求，那么你的proxy首先需要信任该证书（尤其是自定义证书）或者忽略证书检查，否则你的请求无法成功。
    2.CORS
    使用方法：一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作。如下：
    res.writeHead(200, {
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin":'http://localhost',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
    })
    3.jsonp
    定义和用法：通过动态插入一个script标签。浏览器对script的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。
    特点：通过情况下，通过动态创建script来读取他域的动态资源，获取的数据一般为json格式。
    实例如下：


<script>
    function testjsonp(data) {
       console.log(data.name); // 获取返回的结果
    }
</script>
<script>
    var _script = document.createElement('script');
    _script.type = "text/javascript";
    _script.src = "http://localhost:8888/jsonp?callback=testjsonp";
    document.head.appendChild(_script);
</script>
缺点：
　　1、这种方式无法发送post请求（这里）
　　2、另外要确定jsonp的请求是否失败并不容易，大多数框架的实现都是结合超时时间来判定
```


14:js隐视转换，显示转换原理


15.从输入URL到页面加载发生了什么 
总体来说6个过程。
```
1.dns解析（网址到IP地址的转换）
2.tcp连接 （建立连接，传输数据）
3.发送http请求
4.服务器处理请求并返回http报文
5.浏览器解析渲染页面
6.连接结束

dns解析:
网址到IP地址的转换，这个过程就是DNS解析
首先在本地域名服务器中查询IP地址，如果没有找到的情况下，本地域名服务器会向根域名服务器发送一个请求，如果根域名服务器也不存在该域名时，
本地域名会向com顶级域名服务器发送一个请求，依次类推下去。直到最后本地域名服务器得到google的IP地址并把它缓存到本地，供下次查询使用。
从上述过程中，可以看出网址的解析是一个从右向左的过程: com -> google.com -> www.google.com。但是你是否发现少了点什么，根域名服务器的解析过程呢？
事实上，真正的网址是www.google.com.，并不是我多打了一个.，这个.对应的就是根域名服务器，默认情况下所有的网址的最后一位都是.，
既然是默认情况下，为了方便用户，通常都会省略，浏览器在请求DNS的时候会自动加上，所有网址真正的解析过程为: . -> .com -> google.com. -> www.google.com.。

tcp连接：
1.建立连接、2.传输数据、3.断开连接。
建立TCP连接很简单，通过三次握手便可建立连接。
建立好连接后，开始传输数据。TCP数据传输牵涉到的概念很多：超时重传、快速重传、流量控制、拥塞控制等等。
断开连接的过程也很简单，通过四次握手完成断开连接的过程。
三次握手建立连接：
第一次握手：客户端发送syn包(seq=x)到服务器，并进入SYN_SEND状态，等待服务器确认;第二次握手：服务器收到syn包，必须确认客户的SYN(ack=x+1)，同时自己也发送一个SYN包(seq=y)，即SYN+ACK包，此时服务器进入SYN_RECV状态;第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=y+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。
握手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP连接一旦建立，在通信双方中的任何一方主动关闭连接之前，TCP 连接都将被一直保持下去。  

发送http请求：
有缓存且较新，客户端直接读取本地缓存进行资源展示
有缓存但是不新，准备http请求包,发送至服务端进行缓存校验
没有缓存，直接进行服务端资源请求

什么是浏览器缓存：浏览器缓存就是把一个已经请求过的Web资源（如html页面，图片，js，数据等）拷贝一份副本储存在浏览器中。
缓存会根据进来的请求保存输出内容的副本。当下一个请求来到的时候，如果是相同的URL，缓存会根据缓存机制决定是直接使用副本响应访问请求，
还是向源服务器再次发送请求。比较常见的就是浏览器会缓存访问过网站的网页，当再次访问这个URL地址的时候，如果网页没有更新，就不会再次下载网页，而是直接使用本地缓存的网页。
只有当网站明确标识资源已经更新，浏览器才会再次下载网页。

为什么使用缓存：
1.减少网络带宽消耗。无论对于网站运营者或者用户，带宽都代表着金钱，过多的带宽消耗，只会便宜了网络运营商。当Web缓存副本被使用时，只会产生极小的网络流量，可以有效的降低运营成本。
2.降低服务器压力。给网络资源设定有效期之后，用户可以重复使用本地的缓存，减少对源服务器的请求，间接降低服务器的压力。同时，搜索引擎的爬虫机器人也能根据过期机制降低爬取的频率，也能有效降低服务器的压力。
3.减少网络延迟，加快页面打开速度。带宽对于个人网站运营者来说是十分重要，而对于大型的互联网公司来说，可能有时因为钱多而真的不在乎。那Web缓存还有作用吗？答案是肯定的，对于最终用户，缓存的使用能够明显加快页面打开速度，达到更好的体验。

浏览器解析渲染页面：
浏览器在收到HTML,CSS,JS文件后，它是如何把页面呈现到屏幕上的？下图对应的就是WebKit渲染的过程。
浏览器是一个边解析边渲染的过程。首先浏览器解析HTML文件构建DOM树，然后解析CSS文件构建渲染树，等到渲染树构建完成后，浏览器开始布局渲染树并将其绘制到屏幕上
这个过程比较复杂，涉及到两个概念: reflow(回流)和repain(重绘)。页面在首次加载时必然会经历reflow和repain。reflow和repain过程是非常消耗性能的，尤其是在移动设备上，它会破坏用户体验，有时会造成页面卡顿。所以我们应该尽可能少的减少reflow和repain。
回流reflow：DOM节点中的各个元素都是以盒模型的形式存在，这些都需要浏览器去计算其位置和大小等，这个过程称为relow。
重绘repain：当盒模型的位置,大小以及其他属性，如颜色,字体,等确定下来之后，浏览器便开始绘制内容，这个过程称为repain

JS的解析是由浏览器中的JS解析引擎完成的。JS是单线程运行，也就是说，在同一个时间内只能做一件事，所有的任务都需要排队，前一个任务结束，后一个任务才能开始。
但是又存在某些任务比较耗时，如IO读写等，所以需要一种机制可以先执行排在后面的任务，这就是：同步任务(synchronous)和异步任务(asynchronous)。
JS的执行机制就可以看做是一个主线程加上一个任务队列(task queue)。同步任务就是放在主线程上执行的任务，异步任务是放在任务队列中的任务。
所有的同步任务在主线程上执行，形成一个执行栈;异步任务有了运行结果就会在任务队列中放置一个事件；脚本运行时先依次运行执行栈，然后会从任务队列里提取事件，运行任务队列中的任务，这个过程是不断重复的，所以又叫做事件循环(Event loop)。
浏览器在解析过程中，如果遇到请求外部资源时，如图像,iconfont,JS等。浏览器将重复1-6过程下载该资源。请求过程是异步的，并不会影响HTML文档进行加载，但是当文档加载过程中遇到JS文件，HTML文档会挂起渲染过程，不仅要等到文档中JS文件加载完毕还要等待解析执行完毕，才会继续HTML的渲染过程。原因是因为JS有可能修改DOM结构，这就意味着JS执行完成前，后续所有资源的下载是没有必要的，这就是JS阻塞后续资源下载的根本原因。CSS文件的加载不影响JS文件的加载，但是却影响JS文件的执行。JS代码执行前浏览器必须保证CSS文件已经下载并加载完毕

```




16.Webpack打包速度的方法（来源自：https://blog.csdn.net/mnhn456/article/details/82758215）：
  背景：对于webpack来说，默认的配置都是单线程的，并没有充分利用电脑cpu的资源，可以充分利用cpu实现多线程打包和压缩项目，以达到节省编译时间的目的。


17:react 16之后的生命周期

18:redux 工作流程

19:dva

20:高阶组件解决的问题
  高阶组件的作用就是为了组件之间的代码复用。组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用
  高阶组件包装的新组件和原来的组件之间通过props传递信息，减少代码的重复程度。


21:虚拟dom是什么 （三w1h，what是什么，why有什么好处，where在哪用，how怎么用）
虚拟dom就是个js对象，和真实dom有一个关系的映射，她也是一颗树，其中的属性描述了dom的具体结构
1.vdom可以看作是一个使用javascript模拟了dom结构的树形结构，这个树结构包含了整个dom结构的信息。
为什么要使用虚拟DOM？
1.渲染DOM是非常非常消耗性能的，常常会出现页面卡死的情况；所以尽量减少对DOM的操作成为了优化前端性能的必要手段，vdom就是将DOM的对比放在了js层，通过对比不同之处来选择新渲染DOM节点，从而提高渲染效率。
2.跨平台，兼容性好，性能好
3.在哪用
vue中2.0以后每个组件都有一个watcher，用虚拟dom比对。
读源码时发现渲染函数，返回的是一个虚拟dom，渲染函数是编译器产生的
vdom如何使用？面我将使用snabbdom的用法介绍一下vdom的使用

属性更新：src/core/vdom/patch.js  550行开始
       src/platforms/web/runtime/modules/index.js

22.弹性布局的api
```
http://www.360doc.com/content/18/0819/23/43682464_779579321.shtml

  1.了解基本概念：
    1.容器：需要添加弹性布局的父元素；
    2.项目：弹性布局容器中的每一个子项目；
  2.基本方向：
    1.主轴：水平/垂直方向为主轴
    2.交叉轴：与主轴垂直的另一个方向，称为交叉轴
  3.使用：
    给父容器添加diaplay:flex/inline-flex;即可使容器采用弹性布局显示。容器添加弹性布局之后，而容器自身在文档中的定位方式依然遵循常规文档流。
    display:flex;显示为块级元素
    display:inline-block;显示为行级元素；
    给flex布局后，子元素的float，clear,vertical-align属性将失效，但是position属性依然生效。
    12大属性：6个作用域父容器，6个作用于子项目。

    作用于父容器的6大属性：
    1.flex-direction属性决定主轴的方向。
        row(默认值):主轴为水平方向，起点在左端。row-reverse：主轴为水平方向，起点在右端。
        column：主轴为垂直方向，起点在上沿。column-reverse：主轴为垂直方向，起点在下沿。
    2.flex-wrap 如果一条轴线排不下，如何换行。nowrap：不换行。wrap：换行，并且第一行在容器最上方。wrap-reverse:换行并且第一行在容器最下方。
    3.flex-flow：是flex-direction和flex-wrap的缩写形式。
    4.justify-content：定义了项目在主轴上的对其方式。
        flex-start:项目位于主轴起点。flex-end：项目位于主轴终点。center：居中。space-between：两端对其，项目之间的间隔都相等。
        space-around:每个项目两侧的间隔相等。
    5.align-items:定义项目在交叉轴上如何对其。
        flex-start：交叉轴的起点对齐。
        flex-end：交叉轴的终点对齐。
        center：交叉轴的中点对齐。
        baseline: 项目的第一行文字的基线对齐。(文字的行高、字体大小会影响每行的基线)
        stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
    6.align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
        flex-start：与交叉轴的起点对齐。
        flex-end：与交叉轴的终点对齐。
        center：与交叉轴的中点对齐。
        space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
        space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
        stretch（默认值）：轴线占满整个交叉轴。

  作用于子项目的6大属性：
        1.order:定义项目的排列顺序。数值越小，排列越靠前，默认为0。
        2.flex-grow:定义项目的放大比例。默认为0，即如果存在剩余空间，也不放大。
        3.flex-shrink:定义项目的缩小比例。默认为1，即如果空间不足，该项目将缩小。
        4.flex-basis定义项目占据的主轴空间。（如果主轴为水平，则设置这个属性，相当于设置项目的宽度。 原width将会失效。）
        5. flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
        6.align-self:定义单个项目自身在交叉轴上的排列方式，可以覆盖掉容器上的align-items属性。
          属性值：与align-items相同，默认值为auto，表示继承父容器的align-items属性值

```

23.some和every方法，es6
every()检测 如果该函数对每一项返回true,则返回true。
some()检测 如果该函数对任一项返回true，则返回true。

24:position
absolute:生成绝对定位，相对于最近的relative第一个父元素进行定位。
fixed:生成绝对定位的元素，相对于浏览器窗口进行定位。
relative:生成相对定位的元素，相对于其正常位置进行定位。
static:默认值。没有定位，元素出现在正常的流中
inherit:规定应该从父元素继承 position 属性的值。


防抖和截流
事件机制
CommonJS模块与ES6模块的区别差异：
1.commonjs模块输出的是一个值的拷贝，es6模块输出的是值的引用。
2.commonjs模块是运行时加载，ex6模块是编译时输出接口。

解释2:
commonjs加载的是一个对象，该对象只在脚本运行完才会生成。而es6模块不是对象，他的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
解释1:
CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
例如：
  //lib.js
  var counter=3;
  function incCounter(){
    counter++;
  }
  module.exports={
    counter:counter,
    incCounter:incCounter,
  }
  上面的代码输出内部变量个改写这个变量的内部方法incCounter。然后在main.js中加载这个模块。
  //main.js
  var mod=require("./lib");
  console.log(mod.counter) //3;
  mod.incCounter(); 
  console.log(mod.counter) //3;
  上面的代码说明，lib.js模块加载以后，它的背部变化就影响不到输出的mod.counter。这是因为




fetch中，如果请求超过3s，做请求拦截
fetch中添加请求超时，需要用到Promise.race()方法。
Promise.race([p1,new Promise((resolve,reject)=>{
  setTimeot(()=>{reject( new error("请求超时"))},3000)
})])



URL到界面显示发生了什么?
1.DNS解析
先本地缓存找，在一层层找
将常见的地址解析成唯一对应的ip地址基本顺序为：本地域名服务器->根域名服务器->com顶级域名服务器依次类推下去,找到后记录并缓存下来如www.google.com为. -> .com -> google.com. -> www.google.com.
2.TCP连接 三次握手，只要没收到确认消息就要重新发
主机向服务器发送一个建立连接的请求（您好，我想认识您）；
服务器接到请求后发送同意连接的信号（好的，很高兴认识您）；
主机接到同意连接的信号后，再次向服务器发送了确认信号（我也很高兴认识您），自此，主机与服务器两者建立了连接。
3.发送HTTP请求
浏览器会分析这个url，并设置好请求报文发出。
4.服务器处理请求并返回HTTP报文
5.浏览器解析渲染页面
通过HTML解析器解析HTML文档，构建一个DOM Tree，同时通过CSS解析器解析HTML中存在的CSS，构建Style Rules，两者结合形成一个Attachment。
通过Attachment构造出一个呈现树（Render Tree）
Render Tree构建完毕，进入到布局阶段（layout/reflow），将会为每个阶段分配一个应出现在屏幕上的确切坐标。
最后将全部的节点遍历绘制出来后，一个页面就展现出来了。
遇到script会停下来执行，所以通常把script放在底部
6.连接结束



jvascript基础
css基础
html基础
webpack源码 
nodejs
vue源码
react源码