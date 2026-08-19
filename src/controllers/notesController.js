import mongoose from 'mongoose';
import createHttpError from 'http-errors';

import { Note } from '../models/notes.js';

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
  } catch {
    throw createHttpError(404, 'Note not found');
  }

  const note = await Note.findById(noteObjectId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
}

export async function createNote(req, res) {
  const note = await Note.create(req.body);
  res.status(201).json(note);
}

export async function deleteNote(req, res) {
  const { noteId } = req.params;

  // This is done to catch invalid note ids, and respond with
  // "404 Not Found" instead of "500 Internal Error"
  let noteObjectId;
  try {
    noteObjectId = new mongoose.Types.ObjectId(noteId);
  } catch {
    throw createHttpError(404, 'Note not found');
  }

  const note = await Note.findOneAndDelete({
    _id: noteObjectId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
}

export async function updateNote(req, res) {
  const { noteId } = req.params;

  // This is done to catch invalid note ids, and respond with
  // "404 Not Found" instead of "500 Internal Error"
  let noteObjectId;
  try {
    noteObjectId = new mongoose.Types.ObjectId(noteId);
  } catch {
    throw createHttpError(404, 'Note not found');
  }

  const note = await Note.findOneAndUpdate(
    {
      _id: noteObjectId,
    },
    req.body,
    { returnDocument: 'after' },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
}
