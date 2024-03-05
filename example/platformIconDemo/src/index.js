import React from 'react';
import ReactDOM from 'react-dom';

import { WBYPlatformIcon } from 'wbyui'

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

    render() {
        const { widthSize } = this.props
        const testData = [1, 2, 3, 4, 8, 9, 14, 17, 18, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 93, 94, 100, 101,
            102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
            118, 119, 120, 9000, 10000, 1000011]

        return <div>
            {
                testData.map(item => <WBYPlatformIcon
                    weibo_type={item}
                    icon_type={'default'}
                    widthSize={widthSize}
                />)
            }
            {
                testData.map(item => <WBYPlatformIcon
                    weibo_type={item}
                    icon_type={'gray'}
                    widthSize={widthSize}
                />)
            }
        </div>
    }
}

ReactDOM.render(<App icon_type={'gray'} widthSize={40} />, document.getElementById('container'));
