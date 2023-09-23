## Фича с формой изменения профиля

Описание: авторизация по имени пользователя.

#### Public api

- Components

`EditableProfileCard` - компонент с формой для авторизации

`EditableProfileCardHeader` - компонент с модальным окном для формы авторизации

- types

`ValidateProfileError` - Тип, описывающий ошибки профиля

`ProfileSchema` - Схема данных карточки профиля

- selectors

`getProfileData` - Селектор для получения данных профиля

`getProfileError` - Селектор для получения ошибок

`getProfileForm` - Селектор для получения данных формы профиля

`getProfileIsLoading` - Селектор для состояния загрузки

`getProfileReadonly` - Селектор для получения состояния "Readonly"

`getProfileValidateErrors` - Селектор для получения валидационных ошибок формы профиля

- slices

`profileSlice` - Слайс для обработки карточки профиля

- services

`fetchProfileData` - асинхронный сервис для получения данных с бэкэнда

`updateProfileData` - асинхронный сервис для обновления данных на бэкэнде

`validateProfileData` - сервис для валидации данных формы профиля