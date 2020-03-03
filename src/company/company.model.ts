import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email_address: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    available_sizes: { type: Array }
  }
});

export interface Companies extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  email_address: string;
  image: { available_sizes: Array<String> }
}