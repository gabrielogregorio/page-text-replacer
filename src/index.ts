
// THIS IS ULTRA BETA
const textarea = document.getElementById('textarea') as HTMLTextAreaElement;
const inputRegex = document.getElementById('regex') as HTMLInputElement;
const inputText = document.getElementById('text') as HTMLInputElement;
const divResult = document.getElementById('result') as HTMLDivElement;
const divFinal = document.getElementById('final') as HTMLDivElement;

async function getStorage3() {
  // @ts-ignore
  return chrome.storage.local.get(['page-text-replacer']).then((result) => {
    return result['page-text-replacer'];
  });
}

async function getLocalStorageData3(): Promise<string> {
  const items = await getStorage3();
  if (!items) {
    return '';
  }

  return items;
}

getLocalStorageData3().then((item) => {
  textarea.value = item;
});

function normalize2(text: string) {
  return text.replace('', ' ');
}

function saveStorage(data: string) {
  // @ts-ignore
  chrome.storage.local.set({ 'page-text-replacer': data }, function () {});
}

// textarea.focus();

textarea.addEventListener('input', () => {
  saveStorage(textarea.value);
});

/////

inputRegex.addEventListener('input', () => {
  // @ts-ignore
  const regex = (String(inputRegex.value) || '') as string;
  divFinal.textContent = JSON.stringify(regex);

  try {
    const regexContent = new RegExp(regex, 'g');
    if (regexContent.test(normalize2(inputText.value))) {
      divResult.textContent = '✅ ENCONTROU TEXTO';
      return;
    }

    divResult.textContent = '🤨 NÃO ENCONTROU TEXTO';
  } catch (error) {
    divResult.textContent = '❌ REGEX É INVÁLIDO';
  }
});
