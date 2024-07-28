import { parseJsonAndResolveComma } from '../shared/utils';

function loadAsync(key: string): Promise<string | undefined> {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get([key], function (items) {
      const data = items[key];
      if (!data) {
        return resolve(undefined);
      }

      return resolve(data);
    });
  });
}

export class SharedStorageService {
  public static async save(key: string, data: string) {
    chrome.storage.local.set({ [key]: data.trim() }, function () {});
  }

  public static get = async (key: string): Promise<string | undefined> => {
    const items = await loadAsync(key);
    if (!items) {
      return undefined;
    }

    return items;
  };

  public static getAndParseJson = async <T>(key: string): Promise<T | undefined> => {
    const items = await loadAsync(key);
    if (!items) {
      return undefined;
    }

    return parseJsonAndResolveComma(items);
  };
}
