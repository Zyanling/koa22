使用虚拟dom的好处：
```
1.性能得到优化（dom操作是昂贵的）
2.方便和其他平台集成。比如react-native是基于virtual dom渲染出原生控件，因为react组件可以映射为对应的原生控件。在输出的时候，是输出web dom，还是android，或者是ios，就由平台本身决定了。
3.虚拟dom的渲染方式也比传统dom操作好一些。

函数式编程：是人类模仿自己逻辑思考方式发明出来的。函数式编程才是react的精髓。
命令式编程：就像是在给电脑下命令

jsx：react是通过创建与更新虚拟元素来管理整个vdom的。
虚拟元素可以理解为真实元素的对应，他的构建与更新都是在内存中完成的，并不会真正渲染到dom中。在react中创建的虚拟元素可以分为：1.dom元素（小写首字母） 2.组件元素（大写字母开头）。分别对应着原生dom元素与自定义元素。babel作为语法编译工具，提供了更为强大的功能。jsx还可以通过命名空间的方式使用组件元素，以解决组件相同名称冲突的问题，或是对一组组件进行归类。比如：我们想使用material ui组件库中的组件，以Mui开头，可以这么写：const App=()=>{
    <Mui.RaiseButton label="default"/>
}
```


二：
合成事件的实现机制： 来自：https://www.cnblogs.com/chrissong/p/10212348.html，https://www.cnblogs.com/mengff/p/9631919.html
```
1.事件委派：它并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或者卸载时，只是在这个统一的事件监听器上插入或删除一些对象，当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率得到很大的提升。
2.自动绑定：1.bind方法。这个方法可以帮助我们绑定事件处理器内的this，并可以向事件处理器中传递参数。
    class Com extends React.Component{
        //通过bind绑定的方法，可以传递参数
        render(){
            return (
                <button onClick={this.handleClick.bind(this,"test")}>but</button>
            )
        }
    }
    2.构造器内声明。在组件的构造器内完成了this的绑定，这种绑定的方式的好处在于仅需要进行一次绑定，而不是每次调用事件监听器时去执行绑定操作。
    class Com extends React.Component{
        constructor(props){
            super(props);
            this.handleClick=this.handleClick.bind(this)
        }
        render(){
            return (
                <button onClick={this.handleClick)}>but</button>
            )
        }
    }
    3.箭头函数绑定。
```


编译原理：来自：https://zhuanlan.zhihu.com/p/31096468
```
    什么是编译器：编译器是一个黑盒子，能够把一种源语言翻译为语义上等价的另一种目标语言 。源语言是高级程序设计语言，容易阅读与编写，而目标语言是机器语言，即二进制代码，能够被计算机直接识别。
    源程序--预处理器--编译器--目标程序--加载器，链接器--可执行程序。
    编译器分为前端和后端：前端包括：词法分析，语法分析，语义分析，中间代码生成。比较有代表性的工具是 Flex、Bison。为了更好的理解编译器前端的工作原理，本文主要讲解被广泛使用的babel为例。阐述它是如何将源代码编译为目标代码。

    词法分析：是处理源程序的第一步主要任务是扫描输入字符，转换为词法单元(Token)序列，传递给语法分析器进行语法分析.Token是一个不可分割的最小单元。在 Babylon 词法分析器里，每个关键字是一个 Token ，每个标识符是一个 Token，每个操作符是一个 Token，每个标点符号也都是一个 Token。除此之外，还会过滤掉源程序中的注释和空白字符。对于token的匹配规则可以根据正则表达式来描述。

    语法分析:语法分析是语法分析的下一步，主要任务是扫描来自词法器分析产生的token序列，根据文法和终点类型定义构造出一颗AST,传递给编译器前端余下部分

    生成代码：由于babel的定位仅仅是对es语法的转换，这一部分工作可以交给js解释器引擎来处理。而babel最为特色的部分是它的插件机制，针对不同的浏览器版本环境，调用不同的babel插件。通过访问者模式的接口定义，对ast进行一遍深度优先遍历，对指定的匹配到的节点进行修改，删除，新增，移位，使用原先的ast转换为另一颗经过修改的ast。最后一个阶段则是生成目标代码，从ast的跟节点出发，递归下降遍历，对每个节点都调用一个相关函数，执行语义动作，不断打印代码片段，最终生成目标代码，即经过babel编译后的代码。

    模版引擎：模板引擎技术使得结合数据渲染视图变得更加灵活，给逻辑的抽象带来了更多的可能性，数据与内容互不依赖。模板引擎的实现方式有很多种，比较简单的模板引擎，直接利用字符串替换、拼接的方式实现，比较复杂的模板引擎，例如 Pug，则会有比较完整的词法分析和语法分析过程，将模板预编译成 JS 代码再去动态执行。

三大框架都引入了模版编译技术。它对视图的渲染提供了渲染函数和模板两种方式。使用渲染函数需要调用核心 API 来构建 Virtual DOM 类型。

css预处理器：编译器对原样式代码进行词法分析，产生 Token 序列。接着，语法分析，生成中间表示，一棵符合定义的 AST。同时，还会为每个程序块建立一个符号表来记录变量的名字，属性，为代码生成阶段的变量作用域分析提供帮助。最后，递归下降访问 AST，生成能够在浏览器环境中直接执行的 CSS 代码。
```

setState更新机制：来自：https://www.cnblogs.com/katydids/p/10014111.html
```
    当this.setState()被调用的时候，react会重新渲染render方法来重新渲染ui。
    state和props的区别：state是可以改变的，是组件内部维护的一组用于反映ui变化的状态的集合，而props对于使用它的组件来说是只读的，要想修改props，只能通过该组件的父组件修改。父组件正是通过子组件的props传递给子组件其所需要的状态。
    state的值在修改之后并不会立即被修改，而是有一个队列，setState通过一个队列机制实现state的更新。当执行setState时，会把需要更新的state合并后放入状态队列，而不会立即更新this.state，利用这个队列机制可以高效的批量的更新state。
    它的主要流程如下：  
        1、当调用setState时，实际上会执行enqueueSetState方法，并对partialState以及_pendingStateQueue更新队列进行合并，最终通过enqueueUpdate执行state更新
        2、 如果组件当前正处于update事务中，则先将Component存入dirtyComponent中。否则调用batchedUpdates处理。而performUpdateIfNecessary方法获取_pendingElement、_pendingStateQueue、_pendingForceUpdate，并调用reciveComponent和updateComponent方法进行组件更新。
        3、batchedUpdates发起一次transaction.perform()事务
        4、开始执行事务初始化，运行，结束三个阶段
            初始化：事务初始化阶段没有注册方法，故无方法要执行
            运行：执行setSate时传入的callback方法，一般不会传callback参数
            结束：更新isBatchingUpdates为false，并执行FLUSH_BATCHED_UPDATES这个wrapper中的close方法
        5、FLUSH_BATCHED_UPDATES在close阶段，会循环遍历所有的dirtyComponents，调用updateComponent刷新组件，并执行它的pendingCallbacks, 也就是setState中设置的callback。
```

 react ref  获取dom元素
 ```
    1.string 
        class MyComponent extends React.Component {
            componentDidMount() {
                this.refs.myRef.focus();
            }
            render() {
                return <input ref="myRef" />;
            }
        }

    2.callback ref
    class MyComponent extends React.Component {
        componentDidMount() {
            this.myRef.focus();
        }
        render() {
            return <input ref={(ele) => {
            this.myRef = ele;
            }} />;
        }
        }

    3.React.createRef
    class MyComponent extends React.Component {
        constructor(props) {
            super(props);
            this.myRef = React.createRef();
        }
        componentDidMount() {
            this.myRef.current.focus();
        }
        render() {
            return <input ref={this.myRef} />;
        }
    }

 ```
react-fiber:来自：https://zhuanlan.zhihu.com/p/26027085
 ```
react-fiber是什么？官方的解释：reatc fiber是对核心算法的一次重新实现。
同步更新过程的局限：
在现有reatc中，更新过程是同步的，这可能导致性能问题。当react决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和对比virtual dom，更新最后dom树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，reat就会一鼓作气运行到底，中途绝不停歇。
表面上看，这样的设计也是挺合理的，因为更新过程不会有任何i/o操作，完全是cpu计算，所以无需异步操作，但是当组件树比较庞大的时候，问题就来了。假如更新一个组件需要1毫秒，如果🈶️200个组件需要更新，那就需要200毫秒，在这200毫秒的更新过程中，浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。
想象一下，在这200毫秒内，用户往一个input元素中输入点什么，敲击键盘也不会获得响应，因为渲染输入按键结果也是浏览器主线程的工作，但是浏览器主线程被react占着，抽不出空，最后的结果就是用户敲了键盘看不到反应，咔咔哪些按键一下子出现在input元素里面了。这就是所谓的界面卡顿，很不好的用户体验。现有的react版本，当组件树很大的时候就会出现这种问题，因为更新过程是同步的一层组件嵌套一层组件，组件深入的过程，在更新完所有组件之前不停止，函数的调用栈调用的很深，而且长时间不会返回。因为javascript单线程的特点，每个同步任务不能耗时太长，不然就会让程序不会对其他输入作出响应，react的更新过程就是犯了整个禁忌，react fiber就是要改变现状。
 ```
 
 ```
 react fiber的方式：
 破解javascript中同步操作时间过长的方式其实很简单--分片。把一个耗时很长的任务分成很多小片，每一个小片的运作时间很短，虽然总时间依然很长，但是每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。react fiber把更新过程碎片化，每执行完一段更新过程，就把控制权交还给react负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续更新，如果有紧急任务，那就去做紧急任务。 维护每一个分片的数据结构，就是fiber。
 ```
 
```
为什么叫fiber？
进程（process）， 线程（thread），fiber（纤维），意指比thread更细的线，也就是比线程（thread）控制的更精密的并发处理机制。
在react fiber中，一次更新过程会分成多个分片完成，所以完全有可能一个更新任务还没完成，就被另一个更高优先级的更新过程打断，这时候，优先级高的更新任务会优先处理完，而低优先级更新任务所做的工作完全作废，然后等待机会重头再来。
因为一个更新过程可能会被打断，所以react fiber一个更新过程被分为两个阶段，第一个阶段：Reconciliation Phase 第二阶段：Commit Phase。在第一个阶段react fiber会找出需要更新哪些dom，这个阶段可以被打断的，第二个阶段：一鼓作气把dom更新完，绝不会被打断。因为第一阶段会被打断而且’重头再来‘，就会造成意想不到的情况。比如：一个低优先级的任务a正在执行，已经调用了某个组件的componentWillUpdate函数，接下来发现自己的时间分片已经用完了，于是冒出水面，看看有没有紧急任务，哎呀，真的有一个紧急任务B，接下来React Fiber就会去执行这个紧急任务B，任务A虽然进行了一半，但是没办法，只能完全放弃，等到任务B全搞定之后，任务A重头来一遍，注意，是重头来一遍，不是从刚才中段的部分开始，也就是说，componentWillUpdate函数会被再调用一次。在现有的React中，每个生命周期函数在一个加载或者更新过程中绝对只会被调用一次；在React Fiber中，不再是这样了，第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用！
```

生命周期：getDerivedStateFromProps：来自：https://www.jianshu.com/p/50fe3fb9f7c3
 ```
 getDerivedStateFromProps:从props中获取state。这个生命周期的功能实际上就是将：传入的props映射到state上面。这个函数会在每次re-rendering之前被调用。这意味着：即使你的props没有任何变化，而是父state发生了变化，却可能导致很多隐含的问题。
 ```
 ```
 使用：这个生命周期的函数代替了componentWillReceiveProps，所以你需要使用componentWillReceiveProps的时候，就可以考虑使用getDerivedStateFromProps来进行代替。
 两者的参数是不相同的，getDerivedStateFromProps是一个静态函数，也就是这个函数不能通过this访问到class的属性，也并不推荐直接访问属性。而是应该通过参数的nextProps以及prevState来进行判断，根据传入的props来映射到state。需要注意的是，如果props传入的内容不需要影响到你的state，那么就返回一个null，这个返回值是必须的，所以尽量写到函数的末尾。
 static getDerivedStateFromProps(nextProps,prevState){
    const { type } = nextProps
    if (type != prevState.type) {
        return { type }
    }
    return null
 }
 ```
 
react/vue.js之类的框架为什么需要给组件添加key属性，作用是什么？
```
为什么要用key？在开发过程中为了保证遍历同级元素的唯一性，用来提升dom的性能。
为什么要保证元素的唯一性？从原理上来说就是框架会通过key来判断元素是否需要重新渲染，即key唯一则可保证元素唯一，key的作用就是更新时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。
```
如何判断代码是运行在浏览器还是node环境中？
```
this === window ? console.log('运行在浏览器中'):console.log('运行在node环境中')
```


sourcemap是什么？有什么作用？生产环境中怎么使用？
```
是什么？我们在项目进行打包后，会将开发中的多个文件代码打包到一个文件中，并且经过压缩，去掉多余的空格，且babel编译化后，最终会用于线上环境，那么这样处理后的代码和源代码会有很大差别，当有bug出现时，我们只能定位到压缩处理后的代码位置，无法定位到开发环境中的代码，对于开发不好调试。
作用是什么？为了解决不好调试定位代码问题的。简单理解就是：构建了处理前的代码和处理后代码之间的桥梁。主要是方便开发人员错误定位的。
开发环境中使用：cheap-module-eval-source-map
生产环境中使用：cheap-module-source-map
```
webpack热更新原理?(HMR)：来自：https://segmentfault.com/a/1190000020310371.  https://www.jianshu.com/p/652fbae768bf
 ```
 HMR即hot module replacement是指当你对代码修改并保存后，webpack将会对代码进行重新打包，并将改动的模块发送到浏览器端，浏览器用新的模块替换掉旧的模块，去实现局部更新页面而非整体刷新页面。
 原理过程：
    1.webpack在编译期，为需要热更新的entry注入热更新代码（EventSource通知） 2.页面首次打开后，服务端与客户端通过EventSource建立通信渠道，把下一次的hash返回前端
    3.客户端获取到hash，这个hash将作为下一次请求服务端hot-update.js和hot-update.json的hash 4.修改页面代码之后，webpack监听到文件修改后，开始编译，编译完成后，发送build消息给客户端
    5.客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档  6.hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，重新 render 组件， 继而实现 UI 无刷新更新
 ```
什么是消息队列、宏任务与微任务？ 来自：https://www.yuque.com/luhengchang/blog/xlttgp
```
事件循环：浏览器的渲染主线程每时每刻都需要接收新的事件，执行事件。因此需要采用事件循环机制，不断循环监听是否有新的事件需要被接收并执行。事件循环是js实现异步的一种方法，也是js的执行机制。
浏览器的渲染主线程需要处理各种事件，比如鼠标的点击，资源下载完成，文件读写等事件。但是这些事件被频繁出发，比如用户多次点击鼠标，渲染主线程可能在处理前一个事件，并不能立即响应和处理这些新的事件，
因此需要引入一个消息队列来管理这些事。
消息队列符合队列‘先进先出’的特点，鼠标滑动点击，键盘输入等产生的消息事件会被添加到队列的尾部，渲染主线程从队列的头部取出并执行事件。
了解了消息队列和事件循环系统，回过头来理解异步回掉函数。在渲染主线程中执行任务过程中，调用setTimeout函数时，宿主就会将hello函数封装成一个事件，并添加到消息队列中，然后setTimeout函数执行结束。主线程会不断地从消息队列中取出新的任务，执行新的任务。等到时机合适，便取出setTimeout设置的hello函数的回掉的任务，然后就可以直接执行hello函数的调用了。
宏任务：是指消息队列中的等待被主线程执行的事件。执行时机：上一个宏任务结束后。常见的宏任务有：1.<script>脚本  2.各种ui交互事件（如鼠标点击，拖动）和函数调用 3.setTimeout  4.setInterval
微任务：某一个宏任务的执行时间过长，就会影响下一个宏任务的执行时机。于是引入了微任务，它是一个需要异步执行的函数。微任务是存在于某个宏任务中，可以理解成v8为每个宏任务维护一个微任务队列。
执行时机：主函数执行结束后，当前宏任务结束之前。 常见的微任务有：1.Promise.resolve() & Promise.reject()  2.MutationObserver  3.async & await
 ```
 宏任务实战：
 ```
 
 ```

react-router的实现原理 参考：https://blog.csdn.net/tangzhl/article/details/79696055  https://www.jianshu.com/p/53dc287a8020
```
react-router的基本原理：实现url和ui界面的同步。其中在react-router中，url对应location对象，而ui是由raect components来决定的，这样就转变成location与components之间的同步问题。
react-router的实现：依赖第三方库history。history分为三类：1.hashHistory:通常应用于老版本浏览器，主要通过hash来实现  2.browserHistory:通常应用于高版本浏览器，通过html5中的history来实现的  3.memoryHistory:node环境中，主要存储在memory中

```
 宏任务实战：
