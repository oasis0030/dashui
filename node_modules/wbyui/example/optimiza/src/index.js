import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Checkbox } from 'antd';
import  RenderCountA  from './RenderCountA';
import  RenderCountB  from './RenderCountB';
import {HOCReactComponent} from 'wbyui'
const HOCRenderCountB = HOCReactComponent(RenderCountB);
class App extends React.Component {
    constructor(props,context){
        super(props,context);
        this.state={
            dataFormComponentA:null,
        }
        this.getComponentAData = this.getComponentAData.bind(this);
    }
    getComponentAData(param){
        this.setState({
            dataFormComponentA:param
        })
    }
    render() {
        
        return(
            <div>
                <p>这是一个容器组件/父组件</p>
                <p>我是从远程接口/调用该组件的地方来{String(this.props.initProps)}</p>
                <div>
                    <p>调用组件A</p>
                    <RenderCountA initProps={this.props.initProps} getComponentAData ={this.getComponentAData}/>
                </div>
                <div>
                    <p>调用组件B</p>
                    <HOCRenderCountB initProps={this.props.initProps} dataFormComponentA = {this.state.dataFormComponentA}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App initProps={{"companyName":"wby","time":{"a":1,"b":2},'asd':1}}/>, document.getElementById('container'));
