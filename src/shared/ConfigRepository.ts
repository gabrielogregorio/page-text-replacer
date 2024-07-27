import { SharedStorageService } from '../services/SharedStorageService';
import { parseJsonAndResolveComma } from '../shared/utils';
import { modelConfigSchema, modelType } from './types';

const key = 'page-text-replacer-model';

export class ConfigRepository {
  public static async save(data: string) {
    if (data.trim()) {
      modelConfigSchema.parse(parseJsonAndResolveComma(data));
    }

    SharedStorageService.save(key, data.trim());
  }

  public static get = async (): Promise<modelType | undefined> => {
    return SharedStorageService.getAndParseJson(key);
  };
}
