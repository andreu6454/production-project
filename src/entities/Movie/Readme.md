## Сущность фильма

Описание: сущность фильма.

#### Public api

- Components

`MovieAbout` - компонент с информацией о статье

`MovieDetails` - Компонент со списком статей

`MovieList` - Компонент переключатель отображения списка статьей (плитка, список)

`MovieListItem` - Компонент с выбором сортировки списка статьей

`MovieTrailer` - Компонент с выбором типа статьи

- types

`MovieDetailsSchema` - Схема, описывающая сущность фильма

- selectors

`getMovieDetailsData` - Селектор для получения информации о текущем открытом фильме

`getMovieDetailsIsLoading` - Селектор для получения информации о состоянии загрузки

`getMovieDetailsError` - Селектор для получения информации о состоянии ошибки

- services

`fetchMovieById` - Сервис для получения фильма по айди
 