// Простая защита админ-эндпоинтов ключом из заголовка x-admin-key.
// Публичную отправку заявки (POST /api/applications с сайта) НЕ трогаем —
// этот middleware вешается только на чтение/изменение/удаление.
export function requireAdminKey(req, res, next) {
  const provided = req.header('x-admin-key');
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_API_KEY не настроен на сервере' });
  }

  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Неверный или отсутствующий ключ доступа' });
  }

  next();
}