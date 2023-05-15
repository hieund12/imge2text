# imge2text

# Installation
```shellscript
npm install express multer cors
npm install --save text-from-image
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
