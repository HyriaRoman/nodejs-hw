import mongoose from "mongoose";
import { Note } from "../models/notes.js";

export async function getAllNotes(req, res) {
  const notes = await Note.find();
  res.status(200).json(notes);
}

export async function getNoteById(req, res) {
  const { noteId } = req.params;

  // This is done to catch invalid note ids, and respond with
  // "404 Not Found" instead of "500 Internal Error"
  let noteObjectId;
  try {
    noteObjectId = new mongoose.Types.ObjectId(noteId);
  } catch (err) {
    console.error(`Invalid noteId: ${noteId}`, err);
    return res.status(404).json({ message: `Note "${noteId}" not found`});
  }

  const note = await Note.findById(noteObjectId);
  if (!note) {
    res.status(404).json({ message: `Note "${noteId}" not found`});
  } else {
    res.status(200).json(note);
  }
}

export async function createNote(req, res) {
  res.status(200).json({});
}

export async function deleteNote(req, res) {
  res.status(200).json({});
}

export async function updateNote(req, res) {
  res.status(200).json({});
}
