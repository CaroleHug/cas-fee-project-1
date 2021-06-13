import express from 'express';
import * as notesController from '../controllers/notesController.js';

const router = express.Router();

// router.get('/', notesController.showIndex);
router.get('/notes', notesController.getNotes);
router.post('/notes', notesController.createNote);
router.get('/notes/:id/', notesController.showNote);
// router.post('/notes/:id/', notesController.editNote);
router.delete('/notes/:id/', notesController.deleteNote);

// eslint-disable-next-line import/prefer-default-export
export const noteRoutes = router;
