import {create as apicreate} from 'apisauce';
import {API_URI} from 'react-native-dotenv';
import {
  applicationJsonContentType,
  defaultHeaders,
  defaultTimeout,
} from './index';

export class BaseServiceImpl {
  api;

  constructor(baseUrl = API_URI) {
    this.api = apicreate({
      baseURL: baseUrl,
      headers: {...defaultHeaders},
      timeout: defaultTimeout,
    });
  }

  getBaseUrl = () => {
    return this.api.getBaseURL();
  };

  getContentType = () => {
    return applicationJsonContentType;
  };

  getGetRequestConfig = () => {
    return {
      data: null,
      headers: {
        ...applicationJsonContentType,
      },
    };
  };
}
