import express from "express";
import {
  createCombos,
  deleteCombos,
  getCombo,
  getCombos,
  updateCombos,
} from "../controllers/comboController";
import validateToken from "../../middleware/validateTokenHandler";

const comboRouter = express.Router();

const API_URI = "/api/v1/combos";

comboRouter.use(validateToken);
comboRouter.get(`${API_URI}/`, getCombos);
comboRouter.get(`${API_URI}/:id`, getCombo);
comboRouter.post(`${API_URI}/`, createCombos);
comboRouter.patch(`${API_URI}/:id`, updateCombos);
comboRouter.delete(`${API_URI}/:id`, deleteCombos);

export default comboRouter;
