const express = require("express");
const Auth = require("../middleware/Auth");
const NoteController = require("../controllers/notes.controller");
const router = express.Router();

router.get("/:id", Auth, NoteController.getNote); // Get Single Note

router.get("/", Auth, NoteController.getNotes); // Get All Notes

router.post("/", Auth, NoteController.addNote); // Add a New Node

router.put("/:id", Auth, NoteController.updateNote); // Update a Note

router.delete("/:id", Auth, NoteController.deleteNote); // Delete a Note

module.exports = router;