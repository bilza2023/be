import mongoose from 'mongoose';

//
// 📘 User
//
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
export const User = mongoose.model('User', UserSchema);

//
// 📘 Tcode
//
const TcodeSchema = new mongoose.Schema({
  tcode: { type: String, required: true },
  chapter: { type: Number, required: true },
  exercise: { type: String, required: true },
  questionNo: { type: Number },
  sortOrder: { type: Number },
  slides: { type: mongoose.Schema.Types.Mixed }
});
export const Tcode = mongoose.model('Tcode', TcodeSchema);

//
// 📘 Message
//
const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  senderType: { type: String, enum: ['user', 'system'], required: true },
  content: { type: String, required: true },
  tags: [String],
  props: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});
export const Message = mongoose.model('Message', MessageSchema);

//
// 📘 Subscription
//
const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tcodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tcode' },
  subscriptionType: { type: String },
  startDate: { type: Date },
  durationDays: { type: Number },
  status: { type: String }
});
export const Subscription = mongoose.model('Subscription', SubscriptionSchema);
