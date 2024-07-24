const textarea = document.getElementById("textarea") as HTMLTextAreaElement;

function saveStorage(data: string) {
  // @ts-ignore
  chrome.storage.local.set({ "page-text-replacer": data }, function () {});
}

textarea.focus();

textarea.addEventListener("input", () => {
  saveStorage(textarea.value);
});
