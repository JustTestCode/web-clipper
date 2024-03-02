import { Base64ImageToBlob } from '@/common/blob';
import { UploadImageRequest, ImageHostingService } from '../interface';
import md5 from '@web-clipper/shared/lib/md5';
import Container from 'typedi';

export interface Base64HostingOption {
  host: string;
}

export default class Base64ImageHostingService implements ImageHostingService {
  private secretToken?: string;
  constructor(info: { secretToken?: string }) {
    this.secretToken = info.secretToken;
  }
  getId = () => {
    return md5(this.secretToken ?? 'sm.ms');
  };

  uploadImage = async ({ data }: UploadImageRequest) => {
    const blob = Base64ImageToBlob(data);
    return this.uploadBlob(blob);
  };

  private uploadBlob = async (blob: Blob): Promise<string> => {
    const base64 = await blobToBase64(blob);
    return base64 as string;
  };
}

/**
* Blob 转 Base64
* @param blob Object blob对象
*/
export function blobToBase64(blob: Blob){
	return new Promise((resolve) => {
		var reader = new FileReader()
		reader.readAsDataURL(blob)
		//读取后，result属性中将包含一个data:URL格式的Base64字符串用来表示所读取的文件
		reader.onload = function(e){
			resolve(e.target.result)
		}
     })
}
