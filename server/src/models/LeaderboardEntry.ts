import mongoose from 'mongoose';

const LeaderboardEntrySchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export const LeaderboardEntryModel = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);