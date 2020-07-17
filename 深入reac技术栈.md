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
在现有reatc中，更新过程是同步的，这可能导致性能问题。当react决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和对比virtual dom，更新最后dom树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，reat就会一鼓作气运行到底，中途绝不停歇。表面上看，这样的设计也是挺合理的，因为更新过程不会有任何i/o操作，完全是cpu计算，所以无需异步操作，但是当组件树比较庞大的时候，问题就来了。假如更新一个组件需要1毫秒，如果🈶️200个组件需要更新，那就需要200毫秒，在这200毫秒的更新过程中，浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。想象一下，在这200毫秒内，用户往一个input元素中输入点什么，敲击键盘也不会获得响应，因为渲染输入按键结果也是浏览器主线程的工作，但是浏览器主线程被react占着，抽不出空，最后的结果就是用户敲了键盘看不到反应，咔咔哪些按键一下子出现在input元素里面了。这就是所谓的洁面卡顿，很不好的用户体验。


 ```
