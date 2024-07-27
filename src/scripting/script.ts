import { LogService } from '../services/LogService';
import { ConfigRepository } from '../shared/ConfigRepository';
import { removeExtraneousCharacters } from '../shared/utils';

export const runningScript = async () => {
  const models = await ConfigRepository.get();
  if (!models) {
    LogService.log('not has model');
    return;
  }

  const pageUrl = window.location.href;

  models.forEach((model) => {
    const notEnableInThisUrl = new RegExp(model.regexActiveOnUrl, 'g').test(pageUrl) === false;
    if (notEnableInThisUrl) {
      LogService.log('url not match');
      return;
    }

    const htmlTags = Array.from(document.querySelectorAll(model.querySelectorAllTextContent));
    if (!htmlTags.length) {
      LogService.log('not found query selector')
      return;
    }

    htmlTags.forEach((htmlTag) => {
      let tagTextContent = removeExtraneousCharacters(htmlTag.textContent || '');

      model.replacers.forEach((replacer) => {
        if (replacer.regexSearchToApply) {
          const pattern = new RegExp(replacer.regexSearchToApply, 'g');
          if (!pattern.test(tagTextContent)) {
            return;
          }
        }

        const pattern = new RegExp(replacer.regexGlobalFound, 'g');
        tagTextContent = tagTextContent.replace(pattern, replacer.replaceBy);
      });

      htmlTag.textContent = tagTextContent;
    });
  });
};
