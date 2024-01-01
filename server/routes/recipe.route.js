import { Router } from "express";
import { getAllRecipes, createRecipe, savedRecipe, getSavedRecipe, getIdsOfSavedRecipes, getUserRecipes, deleteUserRecipes, updateUserRecipe, removeSaveRecipe } from "../controllers/recipe.controller.js";

const router = Router()

router.route("/").get(getAllRecipes)
router.route("/create").post(createRecipe)
router.route("/save").put(savedRecipe)
router.route("/savedRecipes/ids/:userId").get(getIdsOfSavedRecipes)
router.route("/savedRecipes/:userId").get(getSavedRecipe)
router.route("/:userId").get(getUserRecipes)
router.route("/:recipeId").delete(deleteUserRecipes)
router.route("/:recipeId").put(updateUserRecipe)
router.route("/removeSaved/:recipeId/:userId").put(removeSaveRecipe)

export default router