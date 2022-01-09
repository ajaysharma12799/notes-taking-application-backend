const NoteModel = require("../models/notes.model");

const getNote = async (req, res) => {
    try {
        const note = await NoteModel.findById(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

const getNotes = async (req, res) => { // Get All Notes
    try {
        const notes = await NoteModel.find({ user: req.user.id });
        res.status(200).json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

const addNote = async (req, res) => {
    try {
        const {title, description, priority} = req.body;
        const newNote = new NoteModel({title, description, priority, user: req.user.id});
        await newNote.save();
        res.status(200).json({msg: "Note Added Successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

const updateNote = async (req, res) => {
    try {
        const notesField = {};
        const {title, description, priority} = req.body;
        if(title) notesField.title = title;
        if(description) notesField.description = description;
        if(priority) notesField.priority = priority;

        let note = await NoteModel.findById(req.params.id);
        if(!note) {
            return res.status(404).json({error: "No Note Found"});
        }

        if(note.user.toString() !== req.user.id) {
            return res.status(401).json({error: "Not Authorized"});
        }

        note = await NoteModel.findByIdAndUpdate(req.params.id, {
            $set: notesField
        }, {
            new: true
        });
        res.status(200).json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

const deleteNote = async (req, res) => {
    try {
        let note = await NoteModel.findById(req.params.id);
        if(!note) {
            return res.status(404).json({error: "No Note Found"});
        }

        if(note.user.toString() !== req.user.id) {
            return res.status(401).json({error: "Not Authorized"});
        }

        await NoteModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Note Delete Successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

const NoteController = {
    getNote, getNotes, addNote, updateNote, deleteNote
};

module.exports = NoteController;