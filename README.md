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

```text
template-gulp/
├── dist
├── src/
│   ├── fonts
│   ├── img
│   ├── js/
│   │   ├── components/
│   │   │   └── webp.js
│   │   └── app.js
│   ├── pages/
│   │   └── index.html
│   ├── scss/
│   │   ├── components/
│   │   │   └── _fonts.scss
│   │   └── style.scss
│   ├── svgSprite
│   └── components/
│       ├── screen/
│       └── shared/
│           ├── footer.html
│           ├── head.html
│           └── header.html
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

## Будущее

### Новый этап развития

```text
.
├── gulp/
│   ├── config/
│   │   ├── path.js
│   │   ├── plugins.js
│   │   └── version.json
│   └── tasks/
│       ├── fonts.js
│       ├── html.js
│       ├── images.js
│       ├── reset.js
│       ├── scripts.js
│       ├── scss.js
│       ├── server.js
│       ├── svgSprite.js
│       └── zip.js
└── src/
    └── assets/
        ├── fonts/
        ├── images/
        │   └── favicon/
        ├── style/
        │   ├── fonts/
        │   │   ├── _typography.scss
        │   │   └── _fonts.scss
        │   ├── components/
        │   │   ├── _flexbox.scss
        │   │   └── _container.scss
        │   ├── mixins/
        │   │   └── _flexbox.scss
        │   ├── pages/
        │   │   ├── home/
        │   │   └── about/
        │   ├── layout/
        │   │   ├── _header.scss
        │   │   ├── _main.scss
        │   │   └── _footer.scss
        │   ├── _reset.scss
        │   └── style.scss
        ├── js/
        │   ├── components/
        │   │   └── webp.js
        │   └── app.js
        ├── pages/
        │   ├── index.html
        │   └── about.html
        └── components/
            ├── screens/
            │   ├── slider.html
            │   └── feedback.html
            └── shared/
                ├── header.html
                ├── head.html
                ├── main.html
                ├── footer.html
                ├── scripts.html
                └── svg.html
```
