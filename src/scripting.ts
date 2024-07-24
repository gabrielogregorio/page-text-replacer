type model = {
  regexActiveOnUrl: string;
  url?: string;
  querySelectorAllTextContent: string;
  name: string;
  replacers: {
    regexSearchToApply?: string;
    regexGlobalFound: string;
    replaceBy: string;
  }[];
}[];

async function getStorage2() {
  // @ts-ignore
  return chrome.storage.local.get(["page-text-replacer"]).then((result) => {
    return result["page-text-replacer"]
  });
}

async function getLocalStorageData(): Promise<model | undefined> {
  const items = await getStorage2();
  if (!items) {
    return undefined;
  }

  return JSON.parse(items) as model;
}

async function runningFunction() {
  const model = await getLocalStorageData();
  if (!model) {
    return;
  }

  const pageUrl = window.location.href;

  model.forEach((item) => {
    const notEnableExtension = new RegExp(item.regexActiveOnUrl, "g").test(pageUrl) === false;
    if (notEnableExtension) {
      // console.log(`[page-text-replacer] not enable, page is "${pageUrl}" and regex is "${item.regexActiveOnUrl}"`);
      return;
    }

    // console.log(`[page-text-replacer] running validation in page with selector '${item.querySelectorAllTextContent}'`);
    const selector = item.querySelectorAllTextContent;

    const itemsQuery = Array.from(document.querySelectorAll(selector));

    if (!itemsQuery.length) {
      // console.warn(`[page-text-replacer] not found items with query selector "${selector}"`);
      return;
    }

    itemsQuery.forEach((itemQuery) => {
      let textContent = itemQuery.textContent || "";

      item.replacers.forEach((itemReplacer) => {
        if (itemReplacer.regexSearchToApply) {
          // console.info(`[page-text-replacer] search pattern to apply replacers using regex '${itemReplacer.regexSearchToApply}'`);
          const pattern = new RegExp(itemReplacer.regexSearchToApply, "g");
          if (!pattern.test(textContent)) {
            // console.warn(`[page-text-replacer] text content don't match pattern, text context "${JSON.stringify(textContent)}"`);
            return;
          }
        }

        // console.warn(`[page-text-replacer] replacing content, to "${itemReplacer.regexGlobalFound}" from "${itemReplacer.replaceBy}"`);
        const pattern = new RegExp(itemReplacer.regexGlobalFound, "g");
        textContent = (textContent || "")?.replace(pattern, itemReplacer.replaceBy);
      });

      itemQuery.textContent = textContent;
    });
  });
}

setInterval(() => {
  runningFunction();
}, 1000);
