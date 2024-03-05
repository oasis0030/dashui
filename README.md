# wbyui
----
针对React技术栈维护的前端组件库。

# 组件

---
- WBYTableFooter 
- WBYUploadFile
- WBYDetailTable
- HOCReactComponent
- ExtendReactComponent

## changelog
### wbyui@1.3.0
1. 增加HOCReactComponent
2. ExtendReactComponent

## 组件使用方式

---
### HOCReactComponent
#### 组件应用场景
>由于在React项目开发中，由于React本身渲染制度决定，导致父组件中传入子组件的属性在没有任何修改的时候，就会发生一次渲染。这样无形中导致了Diff算法的时间和空间成本。所以会利用React本身的生命周期([shouldComponentUpdate](https://reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action))利用Lodash.js(现在项目中暂时没有用到Immutable.js)来控制这类行为的发生，但是发现如果每次在组件内部进行处理，发现有很多冗余的代码。所以在某处来统一处理。发现React的[HOC](https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns)可以实现该效果。
#### 组件使用
1. 组件的导入(需要更新最新的wbyui@1.3.0)
```
import {HOCReactComponent} from 'wbyui';
```
2.处理组件（在组件调用出使用）
```
import {HOCReactComponent} from 'wbyui';
import {ExampleComponent} from 'yourStoreComponentsFile'
const ExampleComponent = HOCReactComponent(ExampleComponent);
class App extends React.Component {
    //...
    render(){
        return(
            <div>
                <HOCExampleComponent/>
            </div>
        )
    }
}
```

### ExtendReactComponent
-----
### 组件使用
1. 组件的导入(需要更新最新的wbyui@1.3.0)
```
import {ExtendReactComponent} from 'wbyui';
```
2. 处理组件(在组件定义处使用)
```
import {ExtendReactComponent} from 'wbyui';

export default class ExampleComponent extends ExtendReactComponent {
    //...
    render(){
        return(
            <div>
                <span>
                    ExampleComponent的内部实现
                </span>
            </div>
        )
    }
}
```
