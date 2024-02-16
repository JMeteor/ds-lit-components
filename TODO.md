# TODO:
* Uspójnić nazewnictwo wszystkich komponentów, żeby nazwy html były takie same jak w figmie
  * Dodać jakiś prefix bo w przypadku Buttona i Selecta coś krzyczy że nazwa koliduje z natywnymi elementami
  np. <ds-button>
* Uspójnić nazwy propsów po stronie Figmy i kodu najlepiej żeby były napisane camelCase 
## Button
* Zweryfikować czy rzeczywiscie potrzebne są propsy `iconBefore`, `iconAfter`. Najlepiej będzie zrobić z
  nich sloty po stronie kody i figmy ewentualnie po stronie figmy zrobić nested prop dla showError który będzie miał 
  oznaczenie (Figma only property z emoji 👁️ )
## InputText
* Zweryfikować czy rzeczywiscie potrzebne są propsy `showLabel`, `showHint`, `showIcon`, `showError`. Najlepiej 
  będzie zrobić z nich sloty po stronie kody i figmy
* dodać propa placeholder
* dodać stan error żeby można było rozróżnić jaki kolor hint
## Select
* to samo co z InputText  `show*`.
* dodać propa `placeholder` sprzężonego z UserState Filled
* może dodać error jako osobny prop żeby można było rozróżnić jaki kolor hinta (?)
* zmienić State na UserState z jakimś emoji i (Active, Focus, Hover, Filled)