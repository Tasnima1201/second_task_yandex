## Библиотека, предоставляющая API для работы с расписанием лекций

В папке `src/js/schedule` находятся файлы библиотеки. Реализованы 3 класса: школа, аудитория, лекция,
и методы для их исопользования: добавление нового экземпляра, редактирование существующего, просмотр расписания школы в 
интервале дат, просмотр графика лекций в аудитории в заданный интервал дат.

В файле `src/js/app.js` представлен веб-интерфейс для работы с библиотекой.

Для сборки проекта использовался **webpack**, позволяющий компоновать модули, отвечащие за различные задачи. Он не ограничивается 
javaScript файлами, может работать и со статическими файлами, такими как css, картинки.

Для динамической генерации некоторых HTML блоков использовался шаблонизатор **Handlebars**. Это один из наиболее популярных, 
быстрых и многофункциональных шаблонизаторов для JavaScript.

Для использования возможностей EcmaScript6 без проблем взаимодействия с браузерами был использован транспайлер **babel.js**,
переводящий код в код со стандартами ES5.
