const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
