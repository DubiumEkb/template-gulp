# template-gulp
## Scripts gulp
`yarn run svgSpriteBuild` - Build file sprite.svg

`yarn run dev` - Development

`yarn run devToFTP` - Development and send in FTP server

`yarn run build` - Build

`yarn run buildScripts` - Build compression JavaScripts  

`yarn run buildImages` - Build compression images to webp

`yarn run buildToZIP` - Build and send to ZIP

`yarn run buildToFTP` - Build and send in FTP server

## File structure
```
template-gulp/
├── dist
├── src/
│   ├── fonts
│   ├── img
│   ├── js/
│   │   ├── components/
│   │   │   └── webp.js
│   │   └── app.js
│   ├── layout/
│   │   └── index.html
│   ├── scss/
│   │   ├── components/
│   │   │   └── _fonts.scss
│   │   └── style.scss
│   ├── svgSprite
│   └── template/
│       ├── footer.html
│       ├── head.html
│       └── header.html
├── gulp/
│   ├── config/
│   │   ├── ftp.js
│   │   ├── path.js
│   │   └── plugins.js
│   ├── tasks/
│   │   ├── fonts.js
│   │   ├── ftp.js
│   │   ├── html.js
│   │   ├── images.js
│   │   ├── reset.js
│   │   ├── scripts.js
│   │   ├── scss.js
│   │   ├── server.js
│   │   ├── svgSprite.js
│   │   └── zip.js
│   └── version.json
├── .gitignore
├── package.json
├── gulpfile.js
├── README.md
└── yarn.lock
```
