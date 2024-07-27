import { parseJsonAndResolveComma } from '../shared/utils';

export class SharedStorageService {
  public static async save(key: string, data: string) {
    chrome.storage.local.set({ [key]: data.trim() }, function () {});
  }

  public static getAndParseJson = async <T>(key: string): Promise<T | undefined> => {
    const items = (await chrome.storage.local.get([key]))[key];
    if (!items) {
      return undefined;
    }

    return parseJsonAndResolveComma(items);
  };
}
