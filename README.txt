# ZER° CIDER / Tilda scroll block

Почему Tilda ругалась:
исходный файл `index_2.html` весил около 2.7 МБ, потому что внутри было 55 встроенных base64-картинок.
Tilda считает их обычным текстом внутри блока, поэтому появляется ошибка "слишком много текста".

Что внутри:
- `index_clean_local.html` — очищенная версия с картинками в папке `assets/`.
- `index_split_local.html` — локальная версия, где CSS и JS вынесены отдельно.
- `tilda_T123_insert.html` — короткий код для вставки в Tilda T123.
- `zerocider.css` — стили.
- `zerocider.js` — скрипты.
- `assets/` — извлечённые изображения и логотип.

Как вставить в Tilda:
1. Загрузите `zerocider.css`, `zerocider.js` и папку `assets` на хостинг.
2. Получите ссылку на папку, например:
   `https://site.ru/zerocider/`
3. Откройте `tilda_T123_insert.html`.
4. Замените все `https://sidrhaus-create.github.io/si/` на вашу ссылку.
5. Вставьте итоговый код в блок T123.
6. Сохраните страницу.

Если хостинга нет:
можно загрузить файлы на Timeweb, GitHub Pages, Netlify, Vercel или в файловый менеджер Tilda, если он отдаёт прямые ссылки.
