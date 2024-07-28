const isDisabled = true;

export class LogService {
  public static log(message?: any, ...optionalParams: any[]) {
    if (isDisabled) {
      return;
    }

    console.log('[page-text-replacer] ' + message, ...optionalParams);
  }

  public static error(message?: any, ...optionalParams: any[]) {
    if (isDisabled) {
      return;
    }

    console.error('[page-text-replacer] ' + message, ...optionalParams);
  }

  public static warn(message?: any, ...optionalParams: any[]) {
    if (isDisabled) {
      return;
    }

    console.warn('[page-text-replacer] ' + message, ...optionalParams);
  }
}

