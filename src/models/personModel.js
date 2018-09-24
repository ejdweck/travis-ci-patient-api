import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

export const PersonSchema = new Schema ({
  id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  terms_accepted: {
    type: Number,
    required: true,
  },
  terms_accepted_at: {
    type: String,
    required: true,
  },
  address_street: {
    type: String,
    required: true,
  },
  address_city: {
    type: String,
    required: true,
  },
  address_state: {
    type: String,
    required: true,
  },
  address_zip: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
})

PersonSchema.plugin(mongoosePaginate);
