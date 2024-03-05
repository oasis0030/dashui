# 文件选择上传组件OssUpload

> 使用组件需要 react 16.3 以上

后端用JAVA实现的存储在OSS上的文件选择上传和拖拽上传控件。

[文件上传接口说明文档](http://192.168.1.121:8095/pages/viewpage.action?pageId=34177621)

## 何时使用

旧的上传组件(WBYUploadFile)仍可继续使用, 新需求建议使用新的上传组件

## API

新的上传组件原则上支持所有的 **ant-design** [Upload](https://ant.design/components/upload-cn/) 组件的API参数. 组件的使用方式也将保持一致

> 不支持`customRequest`和`accept`参数, 本组件是基于customRequest 封装的所以不再提供此参数, accept 参数有新的参数来代替.

新增的参数如下: 

| 参数                  | 说明                                                         | 类型                                           | 默认值                  |
| --------------------- | ------------------------------------------------------------ | ---------------------------------------------- | ----------------------- |
| authToken`*`          | 上传Token                                                    | string                                         | 无                      |
| sessionId`*`          | 登录Token                                                    | string                                         | `Cookie.get('token')`   |
| bucket                | 上传文件的权限类型, 现阶段支持三种类型, 对应后端的三种接口`public`,`private`,`public-cdn` 参见[接口说明](http://192.168.1.121:8095/pages/viewpage.action?pageId=34177621) <br />如果传递了`action`参数则忽略此参数使用action提供的接口地址上传 | string                                         | 'public'                |
| rule`*`               | 上传文件的规则, 其中包含接口所需的`bizzCode`和前端校验所需的`suffix`, `max` (规则将由后端来维护) | {bizzCode:string, suffix?:string, max?:number} | {bizzCode:'F_IMG_0001'} |
| empty                 | 没有传递必要参数时的展示                                     | ReactNode                                      | \<p>loading...\</p>     |
| mapResponseToFileItem | 处理响应的数据体到file对象上, 必须返回一个对象               | (response) => object                           | 无                      |
| tipContent            | 底部提示的内容                                               | string or (rule) => string                       | 请上传xxx的文件         |
| tipStatus             | 底部提示的样式, 包含`normal`, `error`, `none`                | string                                         | 'normal'                |
| len                   | 可上传的最大数量, 0代表没有限制                              | number                                         | 无                      |