"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// THIS IS ULTRA BETA
var textarea = document.getElementById('textarea');
var inputRegex = document.getElementById('regex');
var inputText = document.getElementById('text');
var divResult = document.getElementById('result');
var divFinal = document.getElementById('final');
function getStorage3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // @ts-ignore
            return [2 /*return*/, chrome.storage.local.get(['page-text-replacer']).then(function (result) {
                    return result['page-text-replacer'];
                })];
        });
    });
}
function getLocalStorageData3() {
    return __awaiter(this, void 0, void 0, function () {
        var items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getStorage3()];
                case 1:
                    items = _a.sent();
                    if (!items) {
                        return [2 /*return*/, ''];
                    }
                    return [2 /*return*/, items];
            }
        });
    });
}
getLocalStorageData3().then(function (item) {
    textarea.value = item;
});
function normalize2(text) {
    return text.replace('', ' ');
}
function saveStorage(data) {
    // @ts-ignore
    chrome.storage.local.set({ 'page-text-replacer': data }, function () { });
}
// textarea.focus();
textarea.addEventListener('input', function () {
    saveStorage(textarea.value);
});
/////
inputRegex.addEventListener('input', function () {
    // @ts-ignore
    var regex = (String(inputRegex.value) || '');
    divFinal.textContent = JSON.stringify(regex);
    try {
        var regexContent = new RegExp(regex, 'g');
        if (regexContent.test(normalize2(inputText.value))) {
            divResult.textContent = '✅ ENCONTROU TEXTO';
            return;
        }
        divResult.textContent = '🤨 NÃO ENCONTROU TEXTO';
    }
    catch (error) {
        divResult.textContent = '❌ REGEX É INVÁLIDO';
    }
});
