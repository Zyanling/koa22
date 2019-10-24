import React from "react";
// 创建context
const Context = React.createContext({ counter: 0 })
const { Provider, Consumer } = Context;


function Child(props) {
    return <div onClick={this.props.add()}>{props.counter}</div>
}

class ContextText extends Component {
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
                    <Consumer value={{ counter: 0 }}>
                        {
                            (value) => <Child {...value} />
                        }
                    </Consumer>
                    <Consumer value={{ counter: 0 }}>
                        {
                            (value) => <Child {...value} />
                        }
                    </Consumer>
                </Provider>
            </div >
        )
    }
}



function FruitsList({ fruits }) {
    return (
        <ul>
            {
                fruits.map((item) => {
                    return (
                        <li
                            onClick={() => {
                                setFruit(item)
                            }}
                        >
                            {item}
                        </li>
                    )
                })
            }
        </ul>
    )
}

function FruitAdd(){
    const [fname,setFname]=useState("")
    return <div>
        <input type="text" value={fname} onChange={
            
        } onKeyDown={}/>
    </div>
}

function HooksTest() {
    const [furit, setFruit] = useState("草莓");
    const [fruits, setFruits] = useState(["草莓", "香蕉"])


    return (
        <div
        >
            <FruitAdd onAdd={(fname)=>{
                setFruits([...fruits,fname])
            }}></FruitAdd>
            <FruitsList fruits={fruits} setFruit={setFruits} />
        </div>
    )
}
