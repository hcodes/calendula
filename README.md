# Calendula [![Build Status](https://img.shields.io/travis/kalendaro/calendula.svg?style=flat)](https://travis-ci.org/kalendaro/calendula) [![devDependency Status](https://img.shields.io/david/dev/kalendaro/calendula.svg?style=flat)](https://david-dm.org/kalendaro/calendula#info=devDependencies)

Особенный календарь 📅 на JavaScript

![Calendula](https://raw.githubusercontent.com/kalendaro/calendula/master/examples/theme.default.png)

Возможности:
+ эргономичный дизайн;
+ отсутствие зависимостей от сторонних библиотек;
+ отложенная инициализация;
+ темы оформления;
+ подсветка праздничных дней: `ru`, `tr` и `uk`;
+ локализация.

Поддержка в браузерах:
+ Internet Explorer 11 и выше;
+ Mozilla Firefox 46 и выше;
+ Google Chrome 67 и выше;
+ Safari 8 и выше.

## Примеры
+ [Все темы](http://hcodes.github.io/calendula/examples/many.html)
+ [Расширенный](http://hcodes.github.io/calendula/examples/api.html)
+ [Цветные подсказки](http://hcodes.github.io/calendula/examples/color_title.html)
+ [Моя тема](http://hcodes.github.io/calendula/examples/my_theme.html)
+ [Простой](http://hcodes.github.io/calendula/examples/simple.html)

## Подключение
```
npm install calendula
```

```HTML
<link rel="stylesheet" href="node_modules/calendula/dist/calendula.all.css" />
<script src="node_modules/calendula/dist/calendula.all.js"></script>
```

Для подключения только нужной локали и темы:
```HTML
<link rel="stylesheet" href="node_modules/calendula/dist/calendula.css" />
<link rel="stylesheet" href="node_modules/calendula/dist/themes/default.css" />
<script src="node_modules/calendula/dist/calendula.js"></script>
<script src="node_modules/calendula/dist/locales/en.js"></script>
```

Или воспользуйтесь [инструментом для сборки](http://hcodes.github.io/calendula-download/index.ru.html).

## Использование
```JavaScript
var c = new Calendula({
    theme: 'ios',
    locale: 'en',
    value: '2014-10-11'
    //...
});
```

| №  | Свойство  | Тип                  | По умолчанию  | Описание                                    |
|:---|:----------|:---------------------|:--------------|:--------------------------------------------|
| 1. | autocloseable | `Boolean`            | `true`        | Закрытие календаря при клике мимо него.     |
| 2. | closeAfterSelection| `Boolean`   | `true`        | Закрытие календаря при выборе даты.         |
| 3. | locale    | `String`             | `en`          | Язык интерфейса.<br>`be` `de` `en` `es` `fr` `it` `pl` `ru` `tr` `uk` |
| 4. | max       | `String`<br>`Date`<br>`Number` |               | Максимальная дата.                          |
| 5. | min       | `String`<br>`Date`<br>`Number` |               | Минимальная дата.                           |
| 6. | position  | `String`             | `auto auto`   | Позиция календаря относительно `switcher`.<br/>Формат: `x y`.<br/>`x`: `auto`, `left`, `center` или `right`.<br/>`y`: `auto`, `top`, `center` или `bottom`.|
| 7. | switcher  | `DOMElement`         |               | Кнопка, при клике на которую открывается и позиционируется календарь. |
| 8. | theme     | `String`               | `default`     | Тема оформления.<br>`default` `black` `ios` `metro` `android`|
| 9. | value     | `String`<br>`Date`<br>`Number` | текущая дата   | Выбранная дата.                            |
| 10. | years     | `String`               | `-11:1`       | Установка диапазона для списка лет.         |

Поддерживаемые форматы дат:
 + `2014-11-22` `2014/11/22` `2014.11.22`
 + `22-11-2014` `22/11/2014` `22.11.2014`
 + `new Date(2014, 11, 12)`
 + `1418328000000`
 + `{day: 22, month: 10 /* 0-11 */, year: 2014}`

## API
### .open()
Открыть календарь.

### .close()
Закрыть календарь.

### .toggle()
Открыть/закрыть календарь.

### .isOpened()
Проверка открытия календаря.

### .setting(name, [value])
Получить или установить значение настройки.

### .on(type, callback)
Установить событие.
  ```JavaScript
c.on('select', function(e, data) {
    console.log(data.day, data.month, data.year);
});
  ```

### .off(type, callback)
Снять событие.

### .title.set(data)
Установить цветную подсказку на дату.
```JavaScript
c.title.set({date: '2014-12-15', text: 'Hello world!', color: 'red'});

c.title.set([
    {date: '2014-12-11', text: 'Hello world!', color: 'red'},
    {date: '2014-12-12', text: 'Hello world!', color: 'orange'},
    {date: '2014-12-13', text: 'Hello world!', color: 'blue'}
]);
```
### .title.remove(date)
Удалить цветную подсказку.
```JavaScript
c.title.remove('2014-12-15');

c.title.remove(['2014-12-11', '2014-12-12', '2014-12-13']);
```

### .title.removeAll()
Удалить все цветные подсказки.

### .destroy()
Уничтожить календарь: привязку событий, DOM-элементы и пр.

## События
### open
Календарь открыт.


### close
Календарь закрыт.

### select
Выбрана дата.

## Разработка
[Сборка на сайте](http://hcodes.github.io/calendula-download/index.ru.html)

Тесты:
```
npm test
```

Пересборка:
```
gulp
```

## [Лицензия](https://github.com/hcodes/calendula/blob/master/LICENSE)
MIT License
