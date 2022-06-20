import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const schema = new Schema(
  {
    description: {type: String, required: true},
    done: {type: Boolean, default: false},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Todo', schema);
