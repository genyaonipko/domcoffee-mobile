import {BaseServiceImpl} from '../BaseService';

class PackService extends BaseServiceImpl {
  getPacks = () => {
    return this.api.get('/api/packs');
  };
}

export default new PackService();
