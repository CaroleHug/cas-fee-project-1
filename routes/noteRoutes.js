import express from 'express';
import * as notesController from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', notesController.getNotes);
router.post('/notes', notesController.createNote);
router.get('/notes/:id/', notesController.showNote);
router.delete('/notes/:id/', notesController.deleteNote);

// eslint-disable-next-line import/prefer-default-export
export const noteRoutes = router;
