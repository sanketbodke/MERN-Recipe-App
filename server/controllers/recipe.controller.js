import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Recipe } from "../models/recipe.model.js";
import { User } from "../models/user.model.js";

// get all recipes

const getAllRecipes = asyncHandler(async(_, resp) => {
    try {
        const recipe = await Recipe.find({})

        return resp.status(200).json(
            new ApiResponse(200, recipe, `All recipes fetched successfully`)
        )
    } catch (error) {
        throw new ApiError(400, `Couldn't find recipes ${error}`)
    }
})

// crate recipe

const createRecipe = asyncHandler(async(req, resp) => {
    const recipe = new Recipe(req.body)
    try {
        const response = await recipe.save()

        return resp.status(200).json(
            new ApiResponse(200, response, `Recipe created successfully`)
        )
    } catch (error) {
        throw new ApiError(400, `Couldn't Create Recipe : ${error}`)
    }
})

// save recipe

const savedRecipe = asyncHandler(async(req, resp) => {
    const recipe = await Recipe.findById(req.body.recipeID)
    const user = await User.findById(req.body.userID)

    try {
        user.savedRecipes.push(recipe);
        await user.save();
        resp.status(201).json(
            new ApiResponse(200, { savedRecipes: user.savedRecipes }, `Recipe Saved successfully`));
    } catch (err) {
        throw new ApiError(400, `Couldn't Save Recipe ${err}`)
    }
})

// ids of saved recipes

const getIdsOfSavedRecipes = asyncHandler(async(req, resp) => {
    try {
        const user = await User.findById(req.params.userId);
        resp.status(201).json(new ApiResponse(200, user, `Recipe saved successfully`))
    } catch (error) {
        throw new ApiError(400, `Couldn't not get ids of saved recipes`)
    }
})

// get saved recipe

const getSavedRecipe = asyncHandler(async(req, resp) => {
    try {
        const user = await User.findById(req.params.userId);
        const savedRecipes = await Recipe.find({
            _id: { $in: user.savedRecipes },
        });

        resp.status(201).json(new ApiResponse(200, savedRecipes, `saved Recipes fetch successfully`))

    } catch (error) {
        throw new ApiError(400, `Couldn't not find saved recipes`)
    }
})


export {
    getAllRecipes,
    createRecipe,
    savedRecipe,
    getIdsOfSavedRecipes,
    getSavedRecipe,
}