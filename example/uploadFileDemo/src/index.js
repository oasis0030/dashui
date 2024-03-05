import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WBYUploadFile } from "wbyui"
import { Form } from 'antd'
import 'antd/dist/antd.css'

const files = [
    {
        name: "734c083f11475320476184395a014665.jpg",
        url: "http://trunk-img.weiboyi.com/vol1/1/202/213/b/m/s97o33267s3811r8o21300505696731p/734c083f11475320476184395a014665.jpg",
        filepath: "/vol1/1/202/213/b/m/s97o33267s3811r8o21300505696731p/734c083f11475320476184395a014665.jpg"
    }
]
console.log(files);
const tokA = 'https://www.easy-mock.com/mock/5a79c566f92f1264c40894e6/lzb/token'
const tokB = {
    token: "8n84o09q836311r8o21300505696731p",
    upload_url: "http://mock.eolinker.com/ME8FRcu2b370ab73e042befc2c56a925ab511b5116aec98?uri=/upload/upload"
}
console.log(tokA, tokB);

class box extends Component {
    componentWillMount() {}

    render() {
        const { getFieldDecorator } = this.props.form
        return <div>
            <Form>
                <Form.Item>
                    <WBYUploadFile value={files} tok={tokB} len={5} accept={'.rar, .dmg, image/jpeg'}
                        multiple={true} listType='text' ref={node => this.x = node}  uploadText={'上传合同'}/>
                </Form.Item>
                <a onClick={() => {
                    console.log(this.props.form.getFieldsValue());
                    console.log(this.props.form.resetFields());
                    console.log(this.x.getFiles())
                }}>哈哈哈哈哈</a>
            </Form></div>
    }
}

const Content = Form.create()(box)


ReactDOM.render(<Content />, document.getElementById('root'));
