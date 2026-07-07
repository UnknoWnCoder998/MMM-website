import mongoose from 'mongoose';

// Возможные статусы заявки
export const APPLICATION_STATUSES = ['new', 'in_progress', 'done', 'rejected'];

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Имя обязательно'],
      trim: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: [true, 'Телефон обязателен'],
      trim: true,
      maxlength: 40,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
      default: '',
    },
    project: {
      type: String,
      trim: true,
      maxlength: 200,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: 'new',
      index: true,
    },
  },
  { timestamps: true } // добавляет createdAt и updatedAt
);

export default mongoose.model('Application', applicationSchema);
