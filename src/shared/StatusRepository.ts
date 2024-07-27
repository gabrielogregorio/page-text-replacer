import { SharedStorageService } from '../services/SharedStorageService';

const key = 'page-text-replacer-status-enabled';
type statusType = 'enabled' | 'disabled';

export class StatusRepository {
  public static async save(status: statusType) {
    SharedStorageService.save(key, status);
  }

  public static get = async (): Promise<statusType> => {
    const result = (await SharedStorageService.get(key)) || 'enabled';

    return result as statusType;
  };
}
