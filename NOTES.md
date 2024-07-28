# TODO:
* Jak podpiąć core do components
* Jak podpiąć components do storybook
* które paczki powinny być globalne a ktore package specific? (prettier/linter?) - raczej wydzielić żeby każda 
  paczka miala wszystkie potrzebne dependency. Każda paczka powinna być samowystarczalna
* .env package specific czy global?
* // dbanie o typesafety (ryje banie)
* wtyczka https://www.npmjs.com/package/vite-plugin-dts

## Components package
* good practice to import each components
* 
* managing dependencies
* niekoniecznie separowac storybook do osobnej paczki latwiej dodac do folderu komponentu: stories, test, styles, 

dodatkowy folder apps dla apek ktore nie beda publikowane jako paczki. Ważne żeby dodać "private": true w package.json
* docs - dokumentacja, strona statyczna 
* preview - storybook

## Build & Packages

* ogarnąć i vite-plugin-dts -D
* const variables = require('@ds/core/variables');


## CommonJS


npm package 'elemental/internal/polyfils'

componentEntries() 
zwraca epcyfikacje i scieżkę
arrajka tupli (Touples) [name, path]
wewnatrz entry vite.config.js zwracca 'ds-button': '/src/components/ds-button/index.tsx'

fileName: 


afterBuild() copyFileSync d.ts replaceValue: d.cts

### package.json
w package.json "files" zawieramy wszystko to co ma być spakowane w paczce ktora pozniej zostanie opublikowana w npm np. 
można dodać 
"docs"
code type gen na podstawi jsdoców generuje pliki markdown

npm pack - pakowanie i tworzenie tar.g.z

#### "types"
"module" => d.ts
"cjs" => d.cts

#### "main"
main (CommonJS) to plik który jest importowany przez require('ds-components') w przypadku core to index.js
module (ESModules) to plik który jest importowany przez import { Button } from 'ds-components' w przypadku core to 
index.ts

#### "types"
types to plik który jest importowany przez import { Button } from 'ds-components' w przypadku core to index.d.ts
w przypadku common.js warto sprwadzić czy są typy w formacie `.d.cts`

#### imports
dzięki temu że mamy w package.json "module" i "main" możemy importować paczki zarówno w formacie ESModules

#### "exports"
"exports" to obiekt który pozwala na eksportowanie paczki

"." to domyślny eksport
```json
{
  "imports": {
    "./index": {
        "import": {
          "types": "./index.d.ts",
          "default": "./index.js"
        },
      "require": {
        "types": "./index.d.cts",
        "default": "./index.cjs"
      }
    }
  }
}
```

API Extractor - narzedzie od Microsoftu
Jeżeli ustawi się `"rollupTypes": true` to wtedy nie trzeba dodawać types do exports. Wtedy jest najwygodniej 


Najlepszy i najprostszy sposob - PACKAGE ROLL
Najlepiej jak src jest mapowany do dist razem z typami

poprostu używając tsc 

trzeba odpalac dwie osobne buildy jeden na ES Modules i drugi na CommonJS

```json

```