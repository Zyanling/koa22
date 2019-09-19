import React from 'react'
import layout from '../../layout/index'

const styles = (theme) => ({
    page: {
        padding: '20px'
    }
})
class Component extends React.Component {
    render() {
        return (
            <>
                menu
            </>
        )
    }
}


export default layout((Component), module)