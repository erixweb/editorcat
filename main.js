import * as monaco from "monaco-editor"
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"

import './style.css'

window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === "html") {
      return new HtmlWorker()
    } else if (label === "javascript") {
      return new JsWorker()
    } else if (label === "css") {
      return new CssWorker()
    }
  }
}

const htmleditor = monaco.editor.create(document.querySelector("#html"), {
  value: '',
  language: "html",
  theme: "vs-dark",
})
const jseditor = monaco.editor.create(document.querySelector("#js"), {
  value: '',
  language: "javascript",
  theme: 'vs-dark',
})
const csseditor = monaco.editor.create(document.querySelector("#css"), {
  value: '',
  language: "css",
  theme: 'vs-dark',
})

htmleditor.onDidChangeModelContent(update)
csseditor.onDidChangeModelContent(update)
jseditor.onDidChangeModelContent(update)


async function update () {
  const html = htmleditor.getValue()
  const css = csseditor.getValue()
  const js = jseditor.getValue()



  const body = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Editor.cat</title>
      <script defer>
        ${js}
      </script>
      <style>
        ${css}
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>

  `
  document.querySelector("iframe").srcdoc = await body
}