import { Router } from "express";
import { getAllRecipes, createRecipe, savedRecipe, getSavedRecipe, getIdsOfSavedRecipes } from "../controllers/recipe.controller.js";

const router = Router()

router.route("/").get(getAllRecipes)
router.route("/create").post(createRecipe)
router.route("/save").put(savedRecipe)
router.route("/savedRecipes/ids/:userId").get(getIdsOfSavedRecipes)
router.route("/savedRecipes/:userId").get(getSavedRecipe)

export default router