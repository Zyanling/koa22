babel-core 是babel的核心包
babel-preset-env 用于将es2015+编译成es5
babel-preset-react 用于编译react的jsx语法
babel-loader 用webpack和babel编译js
clean-webpack-plugin 用于编译前，清空编译目录


1.this 指向

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

2.es6的继承

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

3.数组去重复

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


4.async 比promise的好处  （https://blog.csdn.net/xufeiayang/article/details/80484116）

1.简约而干净 （不需要then，catch）
2.错误处理   （Promise内部的错误，我们只能再嵌套一层try/catch，用await就可以解决）
3.条件判断    （我们需要先拉取数据，然后根据得到的数据判断是否输出此数据，或者根据数据内容拉取更多的信息。需要嵌套多层，写法辣眼睛）
4.多个promise连接时，写法嵌套多层  改进promise.all）
5.链式调用了很多promise，出错时log信息不明朗 
6.不能打断点 （在一个返回表达式的箭头函数中，我们不能设置断点）


5.koa2的作用：
1. 前后端分离
2. 前端快速启动一个服务
3. koa2解决跨域：
    npm install koa-cors --save-dev
    var cors = require('koa-cors')
    app.use(cors())  // 放在route前面

    1.npm install koa-generator -g 安装koa1和koa2生成器
    2.koa2 test 生成test项目
    3.修改模板引擎
    4.引入webpack打包 
    5.引入react
    6.选择多页应用  （只需要引入每次打开页面的对应的打包的js文件就可以了）
