import { model, Model, Schema } from 'mongoose';
import { DOCUMENTS } from './constants';
import { Secret } from './types';

export const secretSchema = new Schema(
  {
    id: { type: String, required: true },
    secret: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

secretSchema.index({ id: 1 }, { unique: true });

const SecretModel: Model<Secret> = model<Secret>(DOCUMENTS.SECRET, secretSchema);
export default SecretModel;
