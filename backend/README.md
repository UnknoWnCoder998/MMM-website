# Miraziz Backend

Простой backend на Node.js + Express + MongoDB для приёма и управления заявками пользователей.

## Требования
- Node.js 18+
- MongoDB (локально или в облаке, например MongoDB Atlas)

## Установка
```bash
cd backend
npm install
cp .env.example .env   # при необходимости отредактируйте
```

## Запуск
```bash
npm run dev     # с авто-перезапуском (Node --watch)
# или
npm start
```
Сервер поднимется на `http://localhost:4000`.

## API

Базовый путь: `/api/applications`

| Метод  | Путь                     | Описание                              |
|--------|--------------------------|---------------------------------------|
| GET    | `/api/applications`      | Список заявок (`?status=`, `?search=`)|
| GET    | `/api/applications/:id`  | Получить одну заявку                   |
| POST   | `/api/applications`      | Создать заявку                         |
| PATCH  | `/api/applications/:id`  | Обновить заявку / сменить статус       |
| DELETE | `/api/applications/:id`  | Удалить заявку                         |
| GET    | `/api/health`            | Проверка состояния сервера             |

### Модель заявки
```json
{
  "name": "Иван",
  "phone": "+998901234567",
  "email": "ivan@mail.com",
  "message": "Хочу оставить заявку",
  "status": "new"
}
```
Статусы: `new`, `in_progress`, `done`, `rejected`.

### Пример создания заявки
```bash
curl -X POST http://localhost:4000/api/applications \
  -H "Content-Type: application/json" \
  -d '{"name":"Иван","phone":"+998901234567","message":"Тест"}'
```

## Админка
Смотрите папку `../admin` — простая веб-панель для просмотра и управления заявками.
