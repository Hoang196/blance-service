import { Document } from 'mongoose';

export interface Secret extends Document {
  id: string;
  secret: string;
}
