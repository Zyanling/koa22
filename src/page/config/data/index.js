import React from 'react'
import layout from '../../layout/index'

const styles = (theme) => ({
    page: {
        padding: '20px'
    }
})
class Component extends React.Component {

    constructor(props) {
        super(props);
        this.state = { num: 1 }
        this.handleClick=this.handleClick.bind(this)
    }
    componentDidMount() {

    }

    handleClick = () => {
        this.setState({ num: this.state.num + 1 },()=>{
            console.log(1)
        })
    }
    render() {
    
        return (
            <>
                {this.state.num}
                <button
                    onClick={this.handleClick}
                >
                    add
                </button>
                data indexrrwrrr
            </>
        )
    }
}


export default layout((Component), module)