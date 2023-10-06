## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run unit` - Запуск unit тестов с jest
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тесты

В проекте используются 2 вида тестов:

1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library -`npm run test:unit`
3) e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

----

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

----

## CI pipeline

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта

----

## Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

## Работа с feature-flags

Разрешено использовать feature flags только с помощью хелпера toggleFeatures

в него передается объект с опциями

{
name: название feature-flag,
on: функция, которая работает после Включения фичи,
off: функция, которая работает после Выключения фичи
}

Для автоматического удаления фичи использовать скрипт remove-feature.ts, который принимает 2 аргумента:

1. Название удаляемого feature-flag
2. Состояние (on/off)

----

## Сущности (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)
- [Movie](/src/entities/Movie)

## Фичи (features)

- [addCommentForm](/src/features/addCommentForm)
- [articleEditButton](/src/features/articleEditButton)
- [articlePageGreeting](/src/features/articlePageGreeting)
- [articleRating](/src/features/articleRating)
- [profileRating](/src/features/profileRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [articleSortSelector](/src/features/articleSortSelector)
- [articleViewSelector](/src/features/articlesViewSelector)
- [articleTypeTabs](/src/features/articleTypeTabs)
- [authByUsername](/src/features/authByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [backToArticlesButton](/src/features/backToArticlesButton)
- [editableProfileCard](/src/features/editableProfileCard)
- [langSwitcher](/src/features/langSwitcher)
- [notificationButton](/src/features/notificationsButton)
- [themeSwitcher](/src/features/themeSwitcher)
- [scrollToTopButton](/src/features/scrollToTopButton)
- [uiDesignSwitcher](/src/features/uiDesignSwitcher)
- [moviesCountryTabs](/src/features/moviesCountryTabs)
- [moviesGenreTabs](/src/features/moviesGenreTabs)
- [moviesSortSelector](/src/features/movieSortSelector)