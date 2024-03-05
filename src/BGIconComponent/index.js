import React, { Component } from 'react'

/***
 * @param type: 图标类型  default-正常图标 sprits-雪碧图 
 * @param imgSrc: 图片链接（require之后的）
 * @param transformSize: 缩放比例
 * @param width: 展示图片的原始宽度
 * @param height: 展示图片的原始高度
 * @param classInfo: 图片上的class信息
 * @param fontSize: 背景图片中文字的大小
 * @param text: 文字的内容
 * @param textStyle：文字的样式
 * 
 *  */
export default class BackgroundIconComponent extends Component {

    constructor(props) {
        super(props)
    }

    handleMargin = (w, h, t) => {
        const tb = -(h * (1 - t) / 2)
        const lr = -(w * (1 - t) / 2)
        return `${tb}px ${lr}px`
    }
    render() {
        const { type = 'default', imgSrc, transformSize, width, height,
            classInfo, fontSize = 12, text, textStyle } = this.props

        const marginStr = this.handleMargin(width, height, transformSize)

        let styleInfo = {
            width: width,
            height: height,
            display: 'inline-block',
            transform: `scale(${transformSize})`,
            verticalAlign: `text-bottom`,
            margin: marginStr,
            fontSize: fontSize / transformSize
        }

        if (type === 'default') {
            styleInfo.background = `url(${imgSrc}) no-repeat`
        } else {
            styleInfo.backgroundImage = `url(${imgSrc})`
            styleInfo.backgroundRepeat = 'no-repeat'
        }

        return <span style={styleInfo} className={classInfo}>
            <span style={textStyle}>{text}</span>
        </span>
    }
}

