import React from 'react';
import ReactDOM from 'react-dom';


const wrap = (Component) => {
    const WrappedComponent = class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                
            };
        }

        render() {
            return (
                <div className='site'>
                    <div className='header'>
                        header
                    </div>
                    <div className='main'>
                        <div className='left'>
                            left
                        </div>
                        <div className='right'>
                            <Component/>
                        </div>
                    </div>
                    <div className='footer' />
                </div>
            );
        }
    };
    return WrappedComponent;

}

function layout(App, module) {

    if (module && module.hot) {
        module.hot.accept();
    }

    const WrappedApp = wrap(App);

    ReactDOM.render(<WrappedApp />,
        document.getElementById('root')
    );

    return WrappedApp;

}

export default layout;
