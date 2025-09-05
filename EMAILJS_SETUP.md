# Настройка EmailJS для формы контактов

## Шаг 1: Регистрация в EmailJS

1. Перейдите на сайт [EmailJS.com](https://www.emailjs.com/)
2. Зарегистрируйтесь или войдите в аккаунт
3. Создайте новый проект

## Шаг 2: Настройка Email Service

1. В панели управления EmailJS перейдите в раздел "Email Services"
2. Нажмите "Add New Service"
3. Выберите ваш email провайдер (Gmail, Outlook, Yahoo и т.д.)
4. Следуйте инструкциям для подключения вашего email аккаунта
5. Запишите **Service ID** (например: `service_abc123`)

## Шаг 3: Создание Email Template

1. Перейдите в раздел "Email Templates"
2. Нажмите "Create New Template"
3. Используйте следующий шаблон:

```
Subject: Новое сообщение с сайта MaraMaund Studios - {{subject}}

Здравствуйте!

Вы получили новое сообщение через форму контактов на сайте MaraMaund Studios:

Имя: {{from_name}}
Email: {{from_email}}
Тема: {{subject}}

Сообщение:
{{message}}

---
Отправлено с сайта maramaund.com
```

4. Сохраните шаблон и запишите **Template ID** (например: `template_xyz789`)

## Шаг 4: Получение Public Key

1. Перейдите в раздел "Account" → "General"
2. Найдите "Public Key" и скопируйте его
3. Запишите **Public Key** (например: `user_abc123def456`)

## Шаг 5: Обновление кода

Откройте файл `js/main.js` и найдите строки 307-309:

```javascript
const serviceID = 'service_maramaund'; // Замените на ваш Service ID
const templateID = 'template_contact'; // Замените на ваш Template ID
const publicKey = 'your_public_key'; // Замените на ваш Public Key
```

Замените значения на ваши реальные данные:

```javascript
const serviceID = 'service_abc123'; // Ваш реальный Service ID
const templateID = 'template_xyz789'; // Ваш реальный Template ID
const publicKey = 'user_abc123def456'; // Ваш реальный Public Key
```

## Шаг 6: Настройка получателя

В строке 326 измените email адрес получателя:

```javascript
to_email: 'info@maramaund.com' // Замените на ваш email
```

## Шаг 7: Тестирование

1. Откройте сайт в браузере
2. Заполните форму контактов
3. Отправьте тестовое сообщение
4. Проверьте, что email пришел на указанный адрес

## Альтернативный метод (mailto)

Если EmailJS не настроен, форма автоматически будет использовать метод `mailto`, который откроет почтовый клиент пользователя с предзаполненным письмом.

## Безопасность

- Public Key безопасно использовать в клиентском коде
- EmailJS имеет встроеную защиту от спама
- Рекомендуется настроить ограничения по домену в настройках EmailJS

## Поддержка

Если возникли проблемы:
1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что все ID указаны правильно
3. Проверьте настройки email сервиса в EmailJS
4. Убедитесь, что шаблон создан правильно
