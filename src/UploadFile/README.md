# 文件选择上传组件 UploadFile
### API

| 参数     |    说明          |      类型      |   默认值   |
| :------ | :--------------- | :------------: | :------- |
| value |    设置默认的上传列表 |   object[]    | 无 |
| tok  |    设置获取token的api或直接设置token/upload_url | string \| object : {token: string, upload_url: string}| 无 |
| len  |    设置上传的个数       |   number    | 1 |
| multiple |   是否多选    |    boolean   |    false     |
| accept |   限制上传文件的类型    |    string 多个类型用逗号隔开(e.g. 'image/jpeg, .png')如果类型设置为后缀则判断文件的后缀否则判断文件的类型   | 无 |
| mapResponseToFileItem  |    映射上传成功后返回的数据到files   |   Function(data) 必须返回一个对象    | 无 |
| onChange |   files变化时触发的函数    |    Function(filelist)   | 无 |
| onPreview  |   点击预览触发的回调    |   Function(file)    | 无 |
| disabled |   是否禁用上传按钮    |   boolean    | false |
| listType |   上传组件的类型    |   string \['text', 'picture-card', 'picture'\]    | 'picture-card' |
| btnProps |   上传按钮的属性(配合listType使用)    |    object   | 无 |
| size |  设置上传单个文件的大小(单位:M)     |    number   |  10  |
| beforeUpload |  上传前的自定义校验必须返回一个布尔值     |    Function(file, message)第二个参数默认传递了message对象   | 无 |
| uploadText |    上传按钮的文字,可设置为一个节点   |   string | React.node    | 上传 |

> 注意:
>  1. 该组件可配合form表单使用, 支持 getFieldDecorator() 函数赋予的各种属性
>  2. getFiles() 方法可获取已上传的文件列表(配合ref使用)


基本使用

```javascript
import React, { Component } from "react"
import { WBYUploadFile } from "wbyui";
const files = [
   {
      name: "xx.jpg",
      url: "http://abc.com/a/b/xx.jpg",
      filepath: "/a/b/xx.jpg"
   }
]
const tokA = '/api/salecrm/upload/getUploadCompany'
const tokB = {
   token: "8n84o09q836311r8o21300505696731p",
   upload_url: "http://192.168.100.147:80/upload/upload/"
}

export default class Box extends Component {
   render() {
      // const { getFieldDecorator } = this.props.form
      return <div>
            <WBYUploadFile value={files} tok={tokA} len={2} accept={'.png, .gif, image/jpeg'} multiple={true} uploadText={'上传合同'} ref={node => this.x = node}/>
            <a onClick={() => {
               //console.log(this.props.form.getFieldsValue());
               console.log(this.x.getFiles())
            }}>哈哈哈哈哈</a>
         </div>
   }
}

```























