import { ImageHostingServiceMeta } from '../interface';
import Service from './service';
import form from './form';

export default (): ImageHostingServiceMeta => {
  return {
    name: 'base64',
    icon: 'base64',
    type: 'base_64',
    form,
    service: Service,
    permission: {
      origins: ['https://sm.ms/*'],
    },
  };
};
