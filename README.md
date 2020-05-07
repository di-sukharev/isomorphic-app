# isomorphic-app

To launch an app in development mode:

```
$ git clone git@github.com:di-sukharev/isomorphic-app.git
$ cd isomorphic-app
$ npm install
$ npm start
```

Server starts on [http://localhost:3000](http://localhost:3000), click the link and open your browser.

## How it works

**Isomorphic app concept** — when browser asks for the first HTML with HTTP GET request, server renders all of the HTML code in SSR mode, attaches `SPA webpack build` of the whole app to the rendered HTML and sends it all back.
Browser renders full HTML instantly right after response and turns on SPA mode, providing high first-load speed and CSR speed on the rest of the HTML rendering.

1. `webpack.config.js` creates `main.bundle.js`
2. `./server/ssr.js` compiles isomorphic React.js code into HTML (SSR mode), attaches `main.bundle.js` to the HTML and sends it to the browser HTTP GET response.
3. browser gets SSR'ed HTML parses attached `main.bundle.js` and enters SPA mode.

## TODOs

- [ ] Fix emoji encoding on the server side
- [ ] Remove inline styling
- [ ] Make data.json parsing smarter, put it out of React components
- [ ] Configure HMR
- [ ] Make UI more responsive and beautiful
- [ ] Change embed iframe map to JS map
- [ ] Add tests
- [ ] Configure browser history context in <StaticRouter/> in SSR mode
- [ ] Configure babel to import css while in SSR mode
- [ ] Add typescript
- [ ] Optimize production build with webpack
- [ ] Deploy
