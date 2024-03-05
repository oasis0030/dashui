import React, { Component } from 'react'
import BGIconComponent from "../BGIconComponent/index";
import './index.css'
//平台码表
const iconTypes = {
    1: "weibo",
    2: "tencent-weibo",
    3: "sohu-weibo",
    4: "wangyi",
    8: "renren",
    9: "wechat",
    14: "baidu",
    17: "weitao",
    18: "weishi",
    23: "pengyouquan",
    24: "miaopai",
    25: "meipai",
    26: "toutiao",
    27: "nice",
    28: "in",
    29: "youku",
    30: "tudou",
    31: "ximalaya",
    32: "lizhi",
    33: 'qqpublic',
    93: "xiaohongshu",
    94: "zhihu",
    100: "iqiyi",
    101: "sohu-video",
    102: "tencent-video",
    103: "kuaishou",
    104: "yy",
    105: "yingke",
    106: "yizhibo",
    107: "douyu",
    108: "huajiao",
    109: "xiaokaxiu",
    110: "bilibili",
    111: "acfun",
    112: "weixinshipinhao",
    113: "huya",
    114: "xiongmao",
    115: "douyin",
    116: "huoshan",
    117: "momo",
    118: "xigua",
    119: "taobao",
    120: "weishi-2",
    9000: "video",
    10000: 'other'
}

/***
 * @param icon_type:图标类型
 * @param weibo_type: 平台id
 * @param widthSize: 图标大小
 * 
 *  */
export default class WBYPlatformIcon extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        const { icon_type = 'default', weibo_type = 10000, widthSize = 20 } = this.props

        const iconTypesPostfix = {
            'default': '',
            'gray': '-gray'
        }//class后缀

        let iconClassName = "icon-" + (iconTypes[weibo_type] || iconTypes[10000]) + iconTypesPostfix[icon_type]
        const transformSize = widthSize / 240
        const iconPath = require('./images/platformlist_icons.png')
        return <BGIconComponent
            type='sprites'
            imgSrc={iconPath}
            transformSize={transformSize}
            width={240}
            height={240}
            classInfo={iconClassName}
        ></BGIconComponent>
    }
}
