import React from 'react'
import layout from '../../layout/index'
import React from "react";
// 创建context
const Context = React.createContext({ counter: 0 })
const Context2 = React.createContext({ name: "1" })
const { Provider, Consumer } = Context;
const { Provider2, Consumer2 } = Context2


function Child(props) {
    return <div onClick={this.props.add()}>{props.counter}</div>
}

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }
    add = () => {
        this.setState({ counter: this.state.counter + 1 })
    }
    render() {
        return (
            <div>
                {/* context达到状态共享 */}
                <Provider value={{ counter: 0, add: this.add }}>
                    {/* Consumer接收一个函数 */}
                    <Consumer >
                        {
                            (value) => <Child {...value} />
                        }
                    </Consumer>
                    <Provider2>
                        <Consumer2></Consumer2>
                    </Provider2>
                </Provider>
            </div >
        )
    }
}




export default layout((Component), module)





// hoc

function Lesson(props) {
    return (
        <div>
            {props.name}
        </div>
    )
}
const lessons = [
    { stage: "react", title: "核心api" }
]

// 高阶组件withComponent 负责包装lesson
// 包装后的组件具备根据传入的索引，渲染课程
const withComponentCom = Com => props => {
    const content = lessons[props.idx]
    return <Com {...content} />
}
// 包装Lesson
const LessonWithContent = withComponentCom(Lesson)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <LessonWithContent idx={0}></LessonWithContent>
            </div>
        )
    }
}