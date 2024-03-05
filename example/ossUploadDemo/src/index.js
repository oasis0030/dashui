import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css'
import Test from './Test'

class App extends React.Component {
    render() {
        return <div><Test /></div>
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
