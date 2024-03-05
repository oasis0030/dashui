import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { BGIconComponent } from 'wbyui'

/**
 * WBYPlatformIcon组件可传参数
 *   @params weibo_type 平台类型
 *   @params icon_type 图片颜色
 *   @params widthSize 图标大小
 */
class App extends React.Component {
    constructor(props, context) {
        super(props);
    }
    handleMargin = (w, h, t) => {
        const tb = -(h * (1 - t) / 2)
        const lr = -(w * (1 - t) / 2)
        return `${tb}px ${lr}px`
    }
    render() {
        const demoData = [{
            type: 'default',
            imgSrc: 'http://trunk-img.weiboyi.com/img/uploadimg/weixin_follower_img/153559934432322612625b8762f0a4046.jpg',
            transformSize: 0.3,
            width: 600,
            height: 600,
        }, {
            type: 'sprites',
            imgSrc: 'http://trunk-img.weiboyi.com/vol1/1/102/124/l/y/o0n64o33s92711r899q900505696731p/platformlist_icons.png',
            transformSize: 0.6,
            width: 240,
            height: 240,
            classInfo: "huajiao-account-level-1",
            text: '123',
            textStyle: {
                display: 'inline-block',
                margin: '7px 29px',
                color: '#fff'
            },
        }]

        return <div>
            <span>我是需要对齐的文字</span>
            {
                demoData.map((item, index) =>
                    <BGIconComponent
                        key={index}
                        type={item.type}
                        imgSrc={item.imgSrc}
                        transformSize={item.transformSize}
                        width={item.width}
                        height={item.height}
                        text={item.text}
                        textStyle={item.textStyle}
                        classInfo={item.classInfo}
                    ></BGIconComponent>
                )
            }
            <span>我是需要对齐的文字</span>
        </div>

    }
}

ReactDOM.render(<App />, document.getElementById('container'));
