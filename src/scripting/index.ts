import { LogService } from '../services/LogService';
import { StatusRepository } from '../shared/StatusRepository';
import { ONE_SECOND_IN_MS } from '../shared/utils';
import { runningScript } from './script';

console.log('page-text-replacer started');

setInterval(async () => {
  LogService.log('processing');
  if (document.hidden) {
    LogService.log('is hidden');
    return;
  }

  const status = await StatusRepository.get();
  if (status !== 'enabled') {
    LogService.log('is disabled');
    return;
  }

  LogService.log('is enabled');

  runningScript();
}, ONE_SECOND_IN_MS * 2);
