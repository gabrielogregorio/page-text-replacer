# page-text-replacer

page-text-replacer base on json template, click in extension and past your json model, example:

````json
[
  {
    "regexActiveOnUrl": "github.*gabrielogregorio.*vscode-config",
    "name": "",
    "url": "",
    "querySelectorAllTextContent": "'[class=\"react-directory-truncate\"]'",
    "replacers": [
      {
        "regexSearchToApply": ".*md|.*json",
        "regexGlobalFound": "(.*)\\.(.*)",
        "replaceBy": "$2 $1"
      }
    ]
  }
]```
````
