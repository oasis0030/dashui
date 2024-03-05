import React,{Component} from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import{ExtendReactComponent} from 'wbyui';
export default class RenderCountA extends ExtendReactComponent{
    constructor(props,context){
        super(props,context)
        this.handleStep = this.handleStep.bind(this);
    }
    componentWillReceiveProps(nextProps,nextContex){
        console.log(this.props,'props','\n',nextProps,'nextProps')
        console.count('RenderCountA-WillReceiveProps')
    }
    handleStep(param){
        let detailInfo = {
            'height':178,
            'weight':60,
        };
        let tempData = new Object();
        tempData.name = 'alps';
        tempData.age = 23;
        tempData.address = Object.assign({},detailInfo);
        tempData.step = param;
        this.props.getComponentAData(tempData);
    }
     
    render(){
        console.log(this.props,'RenderCountA-props')
        console.count('RenderCountA-Render');
        return(
            <div >
                <p>这是一个展示组件A</p>
                <Button onClick={()=>this.handleStep('01')}>A组件数据处理Step01</Button>
                <Button onClick={()=>this.handleStep('02')}>A组件数据处理Step02</Button>
            </div>
        )
    }
}