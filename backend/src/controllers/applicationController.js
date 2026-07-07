import Application, { APPLICATION_STATUSES } from '../models/Application.js';

// GET /api/applications — список заявок (с фильтром по статусу и поиском)
export async function listApplications(req, res, next) {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && APPLICATION_STATUSES.includes(status)) {
      filter.status = status;
    }

    if (search) {
      const rx = new RegExp(escapeRegExp(search), 'i');
      filter.$or = [{ name: rx }, { phone: rx }, { email: rx }, { message: rx }];
    }

    const items = await Application.find(filter).sort({ createdAt: -1 });
    res.json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

// GET /api/applications/:id — одна заявка
export async function getApplication(req, res, next) {
  try {
    const item = await Application.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Заявка не найдена' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// POST /api/applications — создать заявку (с публичной формы пользователя)
export async function createApplication(req, res, next) {
  try {
    const { name, phone, email, project, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Поля name и phone обязательны' });
    }

    const item = await Application.create({ name, phone, email, project, message });
    res.status(201).json(item);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

// PATCH /api/applications/:id — обновить заявку (например, сменить статус)
export async function updateApplication(req, res, next) {
  try {
    const { name, phone, email, project, message, status } = req.body;
    const update = {};

    if (name !== undefined) update.name = name;
    if (phone !== undefined) update.phone = phone;
    if (email !== undefined) update.email = email;
    if (project !== undefined) update.project = project;
    if (message !== undefined) update.message = message;

    if (status !== undefined) {
      if (!APPLICATION_STATUSES.includes(status)) {
        return res.status(400).json({
          error: `Недопустимый статус. Разрешены: ${APPLICATION_STATUSES.join(', ')}`,
        });
      }
      update.status = status;
    }

    const item = await Application.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ error: 'Заявка не найдена' });
    res.json(item);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

// DELETE /api/applications/:id — удалить заявку
export async function deleteApplication(req, res, next) {
  try {
    const item = await Application.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Заявка не найдена' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    next(err);
  }
}

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
