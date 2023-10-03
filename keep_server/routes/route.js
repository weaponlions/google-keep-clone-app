import { Router } from "express";
import { note_ADD, note_REMOVE, note_SEARCH, note_UPDATE } from "../controllers/controller.js";

const router = Router();

router.post('/note/add', note_ADD)
router.patch('/note/update', note_UPDATE)
router.delete('/note/remove', note_REMOVE)
router.get('/note/search', note_SEARCH)


export default router;