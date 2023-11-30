import { RequestHandler } from "express";
import createHttpError from "http-errors";

import NoteModel from "./../models/note";
import mongoose from "mongoose";

/**
 * Get All Notes
 */
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

/**
 * Get one note by noteId
 */
export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(404, "Invalid Note Id !");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found !");
    }

    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

/**
 * Create a new Note
 */
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title.");
    }

    const newNote = await NoteModel.create({
      title,
      text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
