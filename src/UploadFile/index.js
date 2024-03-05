import React, { Component } from 'react'
import { Upload, message, Icon, Button } from 'antd';
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import './index.less'
import PropTypes from 'prop-types'
import md5 from 'blueimp-md5'

function handleAccrpt(accept) {
    if (!accept || typeof accept !== 'string') return []
    let ary = accept.split(',')
    return ary.map(s => s.trim())
}


function handleValue(value) {
    return ['url', 'name', 'filepath', 'status', 'uid'].reduce((_value, key) => {
        if (!value[key]) {
            switch (key) {
                case 'url':
                case 'name':
                case 'filepath':
                    console.error('传入的value[object]必须包含: ' + key)
                    break;
                case 'status':
                    _value[key] = _value['done']
                    break;
                case 'uid':
                    _value[key] = _value['key'] || md5(_value['filepath'], Math.random())
                    break;
            }
        }
        return _value
    }, { ...value })
}

export default class UploadFile extends Component {
    static defaultProps = {
        len: 1,
        size: 10,
        multiple: false,
        accept: "",
        listType: 'picture-card',
        btnProps: {},
        disabled: false,
        uploadText: '上传',
        mapResponseToFileItem: () => ({}),
        beforeUpload: () => true
    }
    static propTypes = {
        value: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            filepath: PropTypes.string.isRequired
        })),
        tok: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                token: PropTypes.string.isRequired,
                upload_url: PropTypes.string.isRequired
            })
        ]).isRequired,
        len: PropTypes.number,
        multiple: PropTypes.bool,
        accept: PropTypes.string,
        mapResponseToFileItem: PropTypes.func,
        onChange: PropTypes.func,
        onPreview: PropTypes.func,
        disabled: PropTypes.bool,
        listType: PropTypes.oneOf(['text', 'picture-card', 'picture']),
        btnProps: PropTypes.object,
        beforeUpload: PropTypes.func,
        uploadText: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ])
        // itemStyle: PropTypes.object
    }
    state = {
        loading: false,
        disabled: true,
        token: null,
        upload_url: null,
        fileList: [],
        isParentToken: false

    };
    // 获取filelist
    getFiles = () => JSON.parse(JSON.stringify(this.state.fileList))
    // 上传前校验
    beforeUpload = file => {
        const { len, size, beforeUpload } = this.props
        const isLtLength = this.length < len
        if (!isLtLength) {
            message.error('超出最大上传数量，多余项目不会上传!');
        }
        const isFile = this.accept.length === 0 || this.accept.some(type => (
            // 如果传递的是后缀则判断后缀, 否则判断type
            /^\./.test(type) ? file.name.toUpperCase().endsWith(type.toUpperCase()) : file.type === type
        ));
        if (!isFile) {
            message.error('上传格式有误!');
        }
        const isLt2M = file.size / 1024 / 1024 < size;
        if (!isLt2M) {
            message.error('上传大小有误!');
        }
        let result = isLtLength && isFile && isLt2M && beforeUpload(file, message)
        if (result) this.length++
        return result;
    }
    handleFileItem = data => {
        let obj = {
            uid:  data.key || md5(data.filepath, Math.random()),
            name: data.file_original_name,
            url: data.url,
            status: "done",
            filepath: data.filepath
        }

        let _obj = this.props.mapResponseToFileItem(data)
        return Object.assign(_obj, obj)
    }
    handleChange = (info) => {
        const { upload_url, token, isParentToken } = this.state;
        if (!(upload_url && token)) return console.error('上传失败，upload_url 或 token 获取错误!')
        this.setState({
            loading: true
        })

        let formData = new window.FormData();
        formData.append("qq_file", info.file);
        formData.append("token", token);
        // 容器内增加请求
        this.axiosList.push(formData)
        axios.post(upload_url, formData).then((response) => {
            // 容器内移除本次请求
            this.axiosList = this.axiosList.filter(item => item !== formData)
            // 获取最新的filelist
            const { fileList } = this.state
            if (response.data.code === 1000) {
                let list = [...fileList,this.handleFileItem(response.data.data)]
                this.setState({ fileList: list, loading: this.axiosList.length !== 0 }, () => {
                    this.props.onChange && this.props.onChange([...list])
                })
            } else if (isParentToken && this.tokenAPI) {
                this.length--
                this.getToken().then(() => {
                    this.handleChange(info)
                })
            } else {
                this.length--
                this.setState({
                    loading: false
                }, () => {
                    console.error('错误信息: ' + response.data.msg)
                    message.error('上传失败! 请重新上传')
                })
            }
        })
            .catch(() => {
                // 容器内移除本次请求
                this.axiosList = this.axiosList.filter(item => item !== formData)
                this.length--
                if (isParentToken && this.tokenAPI) this.getToken().then(() => {
                    this.handleChange(info)
                })
            })
    }
    onRemove = (info) => {
        let fileList = [...this.state.fileList.filter(item => item.uid !== info.uid)]
        this.setState({ fileList }, () => {
            this.length--
            this.props.onChange && this.props.onChange(fileList)
        })
    }
    getToken = (tokenAPI) => {
        tokenAPI = tokenAPI || this.tokenAPI || ''
        return (tokenAPI ? axios.get(tokenAPI).then(({ data }) => {
            data.data && this.setState({ ...data.data, isParentToken: false, disabled: false })
        }) : Promise.reject())
    }

    init = (props) => {
        // 设置长度计数器的默认值
        this.length = Array.isArray(props.value) ? (props.value.length > props.len ? props.len : props.value.length) : 0
        // 设置文件格式数组
        this.accept = handleAccrpt(props.accept)
    }

    constructor(props) {
        super(props)
        // 根据props初始化基本数值
        this.init(props)
        // 设置容器ID
        this.did = ('upload-files-container-' + Math.random() + new Date().getTime()).replace('.', '')
        // 创建请求容器
        this.axiosList = []

    }

    componentWillMount() {
        const { tok, value = [], len } = this.props
        // 校验传入的tok值, 给予提示
        if (!tok) {
            throw new Error('需要传入tok 为 tokenAPI(获取token的接口,需要带"/api") 或者包含 token & urload_url 的对象')
        }

        let tokenAPI, upload_url, token
        // 初始化token 数据
        if (typeof tok === 'string') {
            tokenAPI = this.tokenAPI = tok
            this.getToken(tokenAPI)
        } else {
            [upload_url, token] = [tok.upload_url, tok.token]
            // 设置默认的token/upload_url值
            if (upload_url && token) {
                this.setState({
                    upload_url,
                    token,
                    isParentToken: true,
                    disabled: false
                })
            } else {
                throw new Error('传入的 token 或 urload_url 不能为空');
            }
        }

        // 设置默认的filelist为传入的value(大于限制长度的项会被截取)
        if (value && Array.isArray(value) && value.length) {
            this.setState({ fileList: value.slice(0, len).map(v => handleValue(v)) })
        }
    }

    componentWillReceiveProps(nextProps) {
        // 判断filelist的值 为false 或与上次相等则不操作否则将重新赋值
        let cur = nextProps.value ? nextProps.value : []
        if (isEqual(cur, this.props.value)) return
        // 初始化数据
        this.init(nextProps)
        this.setState({ fileList: cur.slice(0, nextProps.len).map(v => handleValue(v)) })
    }

    componentDidMount() {
        /*this.container = document.querySelector('#' + this.did)
        this.itemsDom = [...this.container.querySelectorAll('.ant-upload-list-item'), this.container.querySelector('.ant-upload-select')]*/
    }

    componentDidUpdate() {
        /*this.itemsDom.forEach(node => {
            Object.entries(this.props.itemStyle).forEach(([key,value]) => {
                node.style[key] = value
            })
        })*/
    }

    render() {
        const { len, multiple, accept, onPreview, showUploadList, listType, btnProps, uploadText } = this.props
        const { fileList, disabled } = this.state;
        let uploadButton = null;
        if (listType === 'picture-card') {
            uploadButton =
                <div className={'type-' + listType + (disabled || this.props.disabled ? ' disabled' : '')}>
                    <Icon className='upload-icon' type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="upload-text">{uploadText}</div>
                </div>
        } else {
            uploadButton =
                <Button className={'type-' + listType} disabled={disabled || this.props.disabled} {...btnProps}>
                    <Icon className='upload-icon' type={this.state.loading ? 'loading' : 'upload'} />
                    <span className="upload-text">{uploadText}</span>
                </Button>
        }
        return (
            <div className='wby-upload-files-container' id={this.did}>
                <Upload
                    disabled={disabled || this.props.disabled}
                    listType={listType}
                    showUploadList={showUploadList}
                    fileList={fileList.slice(0,len)}
                    multiple={multiple}
                    beforeUpload={this.beforeUpload}
                    customRequest={this.handleChange}
                    accept={accept}
                    onRemove={this.onRemove}
                    onPreview={onPreview}
                >
                    {fileList.length >= len ? null : uploadButton}
                </Upload>
            </div>
        );
    }
}
