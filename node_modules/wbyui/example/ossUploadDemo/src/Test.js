import React, { Component } from 'react';
import { OssUpload } from "wbyui";
import request from 'axios';
import { Form, Button, Icon } from 'antd';

const sessionId = "qsIfc7mrJdL7qG5gjH8c-8WpOAdA39zyrOkDfvhSmzDsehb0"
function action() {
    return request.get('/api/toolbox-gateway/file/v1/getToken', {
        headers: {
            "X-Access-Token": sessionId
        }
    }).then(({ data }) => {
        console.log(data);
        return data
    });
}

const rule = {
    bizzCode: 'F_IMG_0001',
    suffix: 'jpg,png,gif',
    max: 10
};

class Test extends Component {
    state = {
        token: ''
    };

    componentWillMount() {
        action().then(({ data }) => {
            this.setState({
                token: data,
                sessionId: sessionId
            });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return <Form>
            <div>
                <Form.Item>
                    {getFieldDecorator('dragger', {
                        initialValue: [{ uid: '-1', status: 'done', name: 'xxx' }],
                        valuePropName: 'fileList',
                        getValueFromEvent: e => e.fileList
                    })(<OssUpload
                        authToken={this.state.token}
                        sessionId={this.state.sessionId}
                        rule={{
                            bizzCode: 'F_IMG_0001',
                            max: 10
                        }}
                        multiple={true}
                        len={3}
                        mapResponseToFileItem={ data => {
                            console.log(data)
                            return {}
                        }}
                        onChange={(info) => {
                            console.log(info, '++++++');
                        }}
                    >
                        <Button>上传文件</Button>
                    </OssUpload>)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('dragger2', {
                        initialValue: [{ uid: '-1', status: 'done', name: 'xxx' }],
                        valuePropName: 'fileList',
                        getValueFromEvent: e => e.fileList
                    })(<OssUpload.Dragger
                        authToken={this.state.token}
                        rule={{
                            bizzCode: 'F_IMG_0001',
                            suffix: 'jpg,png,gif'
                        }}
                        multiple={true}
                        listType="picture-card"
                        len={3}
                        onChange={(info) => {
                            console.log(info, '++++++');
                        }}
                    />)}
                </Form.Item>
                <OssUpload
                    authToken={this.state.token}
                    rule={{
                        bizzCode: 'F_IMG_0001',
                        suffix: 'jpg,png,gif',
                        max: 10
                    }}
                    len={3}
                    multiple={true}
                    listType="picture"
                    onChange={(info) => {
                        console.log(info, '++++++');
                    }}
                />
            </div>
        </Form>;
    }
}

export default Form.create()(Test)
