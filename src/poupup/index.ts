import {
  htmlDivRegexAsString,
  htmlRegexMath,
  htmlInputRegex,
  htmlInputText,
  htmlTextareaConfig,
  htmlDivResultText,
  htmlInputReplaceBy,
  htmlDivAlerts,
  htmlButtonOff,
  htmlButtonOn
} from './inputs';
import { removeExtraneousCharacters } from '../shared/utils';
import { z } from 'zod';
import { ConfigRepository } from '../shared/ConfigRepository';
import { LocalStorageService } from '../services/LocalStorageService';
import { StatusRepository } from '../shared/StatusRepository';

const processRegexUpdated = () => {
  const regex: string = htmlInputRegex.value || '';

  htmlDivRegexAsString.textContent = `{
  "regexSearchToApply": "",
  "name": "",
  "regexGlobalFound": ${JSON.stringify(regex, undefined, 2)},
  "replaceBy": "${htmlInputReplaceBy.value}"
}`;

  try {
    const inputTextValue = removeExtraneousCharacters(htmlInputText.value) || '';
    const inputReplaceByValue = htmlInputReplaceBy.value || '';
    const regexContent = new RegExp(regex, 'g');
    if (regexContent.test(inputTextValue)) {
      htmlRegexMath.textContent = '✅';

      try {
        htmlDivResultText.textContent = inputTextValue.replace(regexContent, inputReplaceByValue) || '🧹';
      } catch (error) {
        htmlRegexMath.textContent = `ERRO, não foi possível aplicar esse regex com esse replace by, tem algum erro "${error}"`;
      }
      return;
    }

    htmlDivResultText.textContent = '🧹';
    htmlRegexMath.textContent = '🤨 NOT FOUND TEXT';
  } catch (error) {
    htmlDivResultText.textContent = '🧹';
    htmlRegexMath.textContent = '❌ REGEX IS INVALID';
  }
};

(function syncLocalStatesOnLocalStorageService() {
  htmlInputText.addEventListener('input', () => {
    LocalStorageService.save('htmlInputText', removeExtraneousCharacters(htmlInputText.value) || '');
    processRegexUpdated();
  });

  htmlInputRegex.addEventListener('input', () => {
    LocalStorageService.save('htmlInputRegex', htmlInputRegex.value || '');
    processRegexUpdated();
  });

  htmlInputReplaceBy.addEventListener('input', () => {
    LocalStorageService.save('htmlInputReplaceBy', htmlInputReplaceBy.value || '');
    processRegexUpdated();
  });

  htmlTextareaConfig.addEventListener('input', () => {
    ConfigRepository.save(htmlTextareaConfig.value)
      .then(() => {
        htmlDivAlerts.textContent = '✅';
        processRegexUpdated();
      })
      .catch((error) => {
        if (error instanceof z.ZodError) {
          htmlDivAlerts.textContent = `❌ SCHEMA IS INVALID, "${JSON.stringify(error.errors)}"`;
          return;
        }
        htmlDivAlerts.textContent = `❌ ERROR ON SAVE SCHEMA, ${error}`;
      });
  });
})();

(async function getInitialStage() {
  htmlDivAlerts.textContent = '✅';

  htmlInputRegex.value = LocalStorageService.get(htmlInputRegex.id) || '';
  htmlInputReplaceBy.value = LocalStorageService.get(htmlInputReplaceBy.id) || '';
  htmlInputText.value = LocalStorageService.get(htmlInputText.id) || '';

  ConfigRepository.get().then((model) => {
    if (model) {
      htmlTextareaConfig.value = JSON.stringify(model, undefined, 2);
    }
    htmlTextareaConfig.value = `[
  {
    "regexActiveOnUrl": "https.*github.*gabrielogregorio.*repositories",
    "name": "repo-greg",
    "url": "https://github.com/gabrielogregorio?tab=repositories",
    "querySelectorAllTextContent": "[itemprop=\\"name codeRepository\\"]",
    "replacers": [
      {
        "regexSearchToApply": "lab-",
        "name": "replace lab repositories to magic",
        "regexGlobalFound": "lab-(.*)",
        "replaceBy": "magic-$1"
      }
    ]
  }
]`;
  });

  processRegexUpdated();
})();

const markIsEnabled = (enabled: boolean) => {
  if (enabled) {
    htmlButtonOff.classList.remove('selected');
    htmlButtonOn.classList.add('selected');
    return;
  }
  
  htmlButtonOff.classList.add('selected');
  htmlButtonOn.classList.remove('selected');
};

htmlButtonOff.addEventListener('click', () => {
  StatusRepository.save('disabled');
  markIsEnabled(false);
});

htmlButtonOn.addEventListener('click', () => {
  StatusRepository.save('enabled');
  markIsEnabled(true);
});

StatusRepository.get().then((status) => {
  markIsEnabled(status === 'enabled');
});
