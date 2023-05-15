# imge2text

# Installation
```shellscript
1. https://github.com/hieund12/imge2text.git
cd to imge2text folder
2. npm install express multer cors
3. npm install --save text-from-image
4. RUN APP

node app.js

```

REFER: https://www.npmjs.com/package/text-from-image
```javascript
const ReadText = require('text-from-image')

ReadText('./image.png').then(text => {
    console.log(text);
}).catch(err => {
    console.log(err);
})
```
