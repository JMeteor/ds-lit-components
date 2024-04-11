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