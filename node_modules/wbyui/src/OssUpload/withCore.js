/**
 * Created by lzb on 2019-01-18.
 */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { Icon, message } from 'antd';
import axios from 'axios';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { BUCKET_MAP } from './config'
import './style.less';

const { CancelToken, isCancel } = axios;

const defaultFileList = [];
/**
 * 处理 data 参数
 * @param data
 * @param more
 * @returns {function(*=): {}}
 */
const handleData = (data, more = {}) => file => {
  let result = {};
  if (typeof data === 'function') {
    result = data(file);
  } else {
    result = data;
  }
  return { ...result, ...more };
};
/**
 * 处理文件后缀规则
 * @param suffix
 * @returns {*}
 */
const handleSuffix = (suffix) => {
  if (!suffix || typeof suffix !== 'string') return [];
  let ary = suffix.split(',');
  return ary.map(s => {
    return (/^\./.test(s) ? '' : '.') + s.trim();
  });
};
/**
 * 处理底部提示语展示内容
 * @param tipContent
 * @param rule
 * @returns {*}
 */
const handleContent = (tipContent, rule) => {
  if (typeof tipContent === 'function') {
    return tipContent(rule);
  } else if (typeof tipContent === 'string') {
    return tipContent;
  } else {
    let resultAry = [];
    if (rule.suffix) {
      resultAry.push(`${handleSuffix(rule.suffix).join(', ')}格式`);
    }
    if (rule.max) {
      resultAry.push(`${rule.max}M以内`);
    }
    return resultAry.length > 0 ? `请上传${resultAry.join('; ')}的文件` : null;
  }
};

/**
 * 底部提示语
 */
export class UploadTips extends React.Component {
  componentDidMount() {
    if (this.props.translate) {
      this.node = findDOMNode(this);
      let targetParent = this.node.parentNode.firstElementChild;
      let targetBefore = targetParent.lastElementChild;
      targetParent.insertBefore(this.node, targetBefore);
    }
  }

  render() {
    return <div className={'oss-upload-tips ' + this.props.status}>{this.props.content}</div>;
  }
}
const withCore = (Upload) =>  class CoreWrapped extends React.Component {
  static defaultProps = {
    sessionId: Cookie.get('token'),
    bucket: 'public',
    data: {},
    headers: {},
    rule: {
      bizzCode: 'F_IMG_0001'
    },
    tipStatus: 'normal',
    empty: <p>loading...</p>
  };
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    bucket: PropTypes.oneOf(Object.keys(BUCKET_MAP)).isRequired,
    rule: PropTypes.shape({
      bizzCode: PropTypes.string.isRequired,
      suffix: PropTypes.string,
      max: PropTypes.number
    }).isRequired,
    headers: PropTypes.object,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]),
    empty: PropTypes.element,
    beforeUpload: PropTypes.func,
    mapResponseToFileItem: PropTypes.func,
    tipContent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    tipStatus: PropTypes.oneOf(['normal', 'error', 'none']),
    len: PropTypes.number
  };

  constructor(props) {
    super(props);
    const fileList = props.fileList || props.defaultFileList || defaultFileList;
    this.state = {
      fileList
    };
  }

  static getDerivedStateFromProps(nextProps) {
    let state = {};
    if ('fileList' in nextProps) {
      state.fileList = nextProps.fileList || [];
    }
    return isEmpty(state) ? null : state;
  }

  beforeUpload = (file, fileList) => {
    const { beforeUpload, rule, len } = this.props;
    let { max = 0, suffix = '' } = rule;
    // 校验上传数量
    const total = this.state.fileList.length + fileList.length;
    const isLtLength = !len || total <= len;
    if (!isLtLength) {
      message.destroy();
      message.error('超出最大上传数量!');
      return false;
    }
    // 校验上传大小
    const isLt2M = !max || file.size / 1024 / 1024 < max;
    if (!isLt2M) {
      message.error(`文件大小有误!`);
      return false;
    }
    // 校验上传类型
    suffix = handleSuffix(suffix);
    const isFile = suffix.length === 0 || suffix.some(type => (
      // 如果传递的是后缀则判断后缀, 否则判断type
      /^\./.test(type) ? file.name.toUpperCase().endsWith(type.toUpperCase()) : file.type === type
    ));
    if (!isFile) {
      message.error(`不支持的文件类型!`);
      return false;
    }
    // 校验结果
    let result = isFile && isLt2M && isLtLength;
    if (result && beforeUpload) {
      result = beforeUpload(file, fileList);
    }
    return result;
  };

  triggerChange = (info) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(info);
    }
  };

  customRequest = (info) => {
    let { file, filename, headers, data, action, onProgress, onError, withCredentials, onSuccess } = info;
    let formData = new window.FormData();
    let cancel;
    let config = {
      withCredentials,
      headers,
      cancelToken: new CancelToken(c => { cancel = c;}),
      onUploadProgress: ({ total, loaded }) => {
        onProgress({ percent: parseFloat(Math.round(loaded / total * 100).toFixed(2)) }, file);
      }
    };
    if (data) {
      Object.keys(data).map(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);
    axios.post(action, formData, config)
      .then(({ data: response }) => {
        if (response.code === '1000') {
          // 处理文件显示
          response.url = response.data;
          onSuccess(response, file);
        } else {
          message.destroy();
          message.error(response.msg);
          onError(new Error(response.msg), response);
        }
      })
      .catch(error => {
        if (isCancel(error)) {
          // 获取 取消请求 的相关信息
          console.warn('Request canceled', error.message); // eslint-disable-line
        } else {
          // 处理其他异常
          message.destroy();
          message.error(error.message);
          onError(error);
        }
      });

    return {
      abort() { cancel('停止上传文件'); }
    };
  };

  handleChange = (info) => {
    let fileList = info.fileList;
    // 根据服务器的响应过滤上传失败(或没有状态)的文件
    fileList = fileList.filter((file) => {
      return file.status && file.status !== 'error';
    });
    // 从响应中读取并显示文件信息
    fileList = fileList.map(file => {
      if (file.response && file.response.url) {
        file.url = file.response.url;
        let more = {};
        if (this.props.mapResponseToFileItem) {
          more = this.props.mapResponseToFileItem(file.response);
        }
        file = Object.assign({}, file, more);
      }
      return file;
    });
    this.setState({ fileList });
    info.fileList = fileList;
    this.triggerChange(info);
  };

  render() {
    const { data, rule, authToken, sessionId, empty, bucket, action, headers, tipStatus, tipContent, len } = this.props;
    // 不做处理的 antd 自带 props
    const {
      children, directory, disabled, listType,
      multiple, name, showUploadList, supportServerRender,
      withCredentials, openFileDialogOnClick, onPreview, onRemove
    } = this.props;
    /**
     * 忽略一些 antd 自带的 props
     * 1. accept --> 请使用 rule.suffix 代替
     * 2. customRequest
     */
    let acceptAry = handleSuffix(rule.suffix);
    let isCard = listType === 'picture-card';
    let content = handleContent(tipContent, rule);
    const props = {
      fileList: this.state.fileList,
      action: action || BUCKET_MAP[bucket], // action 存在 bucket 设置失效
      accept: acceptAry.join(','),
      customRequest: this.customRequest,
      beforeUpload: this.beforeUpload,
      onChange: this.handleChange,
      headers: {
        'Authorization': authToken,
        'sessionId': sessionId,
        ...headers
      },
      data: handleData(data, {
        'bizzCode': rule.bizzCode
      }),
      disabled,
      directory,
      listType,
      multiple,
      name,
      showUploadList,
      supportServerRender,
      withCredentials,
      openFileDialogOnClick,
      onPreview,
      onRemove
    };
    const tipProps = {
      translate: !isCard, status: tipStatus, content
    };
    const uploadChildren = (isCard && this.state.fileList.length >= len) ? null :
      (children || <span style={{ cursor: 'pointer' }}><Icon type="upload" /> 上传</span>);
    return (props.headers['Authorization'] && props.headers['sessionId'] ?
        <div className='oss-upload clearfix'>
          <Upload {...props}>
            {uploadChildren}
          </Upload>
          <UploadTips {...tipProps} />
        </div> : empty
    );
  }
}

export default withCore;
