import React,{Component} from 'react';
export default class RenderCountB extends Component{
    constructor(props,context){
        super(props,context)
    }
    componetWillReceiveProps(nextProps,nextContext){
         console.log(this.props,'props','\n',nextProps,'nextProps')
        console.count('RenderCountB-WillReceiveProps')
    }
    render(){
         console.log(this.props,'RenderCountB-props')
        console.count('RenderCountB-Render');
        return(
            <div >
                <p>这是一个展示组件B</p>
                
            </div>
        )
    }
}