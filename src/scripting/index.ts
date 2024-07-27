import { ONE_SECOND_IN_MS } from '../shared/utils';
import { runningScript } from './script';

setInterval(() => {
  runningScript();
}, ONE_SECOND_IN_MS * 2);
