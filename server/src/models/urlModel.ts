import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    customShortId: { type: String, unique: true, sparse: true },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
});

const Url = mongoose.model('Url', urlSchema);

export default Url;