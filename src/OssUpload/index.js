import Upload from './Upload';
import { UploadTips } from './withCore';
import Dragger from './Dragger';

let OssUpload = Upload;
OssUpload.Dragger = Dragger;
OssUpload.UploadTips = UploadTips;
export default OssUpload;
