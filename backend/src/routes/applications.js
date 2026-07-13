import { Router } from 'express';
import {
  listApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../controllers/applicationController.js';
import { requireAdminKey } from '../middleware/requireAdminKey.js';

const router = Router();

// Публичный эндпоинт — сюда шлёт данные форма заявки на сайте
router.post('/', createApplication);

// Защищённые эндпоинты — только для админки
router.get('/', requireAdminKey, listApplications);
router.get('/:id', requireAdminKey, getApplication);
router.patch('/:id', requireAdminKey, updateApplication);
router.delete('/:id', requireAdminKey, deleteApplication);

export default router;