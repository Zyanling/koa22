使用虚拟dom的好处：
1.性能得到优化（dom操作是昂贵的）
2.方便和其他平台集成。比如react-native是基于virtual dom渲染出原生控件，因为react组件可以映射为对应的原生控件。在输出的时候，是输出web dom，还是android，或者是ios，就由平台本身决定了。
3.虚拟dom的渲染方式也比传统dom操作好一些。

函数式编程：是人类模仿自己逻辑思考方式发明出来的。函数式编程才是react的精髓。
命令式编程：就像是在给电脑下命令

jsx：react是通过创建与更新虚拟元素来管理整个vdom的。
虚拟元素可以理解为真实元素的对应，他的构建与更新都是在内存中完成的，并不会真正渲染到dom中。在react中创建的虚拟元素可以分为：1.dom元素（小写首字母） 2.组件元素（大写字母开头）。分别对应着原生dom元素与自定义元素。babel作为语法编译工具，提供了更为强大的功能。jsx还可以通过命名空间的方式使用组件元素，以解决组件相同名称冲突的问题，或是对一组组件进行归类。比如：我们想使用material ui组件库中的组件，以Mui开头，可以这么写：const App=()=>{
    <Mui.RaiseButton label="default"/>
}



二：
合成事件的实现机制：
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




    