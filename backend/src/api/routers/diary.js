import express from "express";
import {
  createDiary,
  deleteDiary,
  getDiaries,
  getDiary,
  updateDiary,
} from "../controllers/diaries.js";
import { isAuth } from "../../utils/auth.js";

const router = express.Router();

router.route("/api/diary").get(isAuth, getDiaries).post(isAuth, createDiary);
router
  .route("/api/diary/:id")
  .get(isAuth, getDiary)
  .delete(isAuth, deleteDiary)
  .put(isAuth, updateDiary);

export default router;
