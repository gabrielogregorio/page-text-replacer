/**
 * There is a user's localstorage, and another for the extension,
 * everything saved here is only from the unconnected localstorage,
 * so to share states between the poup up and the script it is necessary to use SharedStorage
 */
export class LocalStorageService {
  public static save(key: string, item: string) {
    localStorage.setItem(key, item);
  }

  public static get(key: string): string | null {
    return localStorage.getItem(key);
  }
}
