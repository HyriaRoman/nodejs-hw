import { Note } from "../models/notes.js";

export async function getAllNotes(req, res) {
  const notes = await Note.find();
  res.status(200).json(notes);
}

export async function getNoteById(req, res) {
  res.status(200).json({});
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
