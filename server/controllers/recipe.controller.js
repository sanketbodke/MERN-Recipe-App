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

// get user recipe

const getUserRecipes = asyncHandler(async(req, resp) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        throw new ApiError(400, `User not found`)
    }

    try {
        const userRecipes = await Recipe.find({ userOwner: user._id });

        return resp.status(200).json(new ApiResponse(200, userRecipes, `recipes fetch successfully`));
    } catch (error) {
        throw new ApiError(400, `User not found : ${error}`)
    }

})

// user recipe (delete)

const deleteUserRecipes = asyncHandler(async(req, resp) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    console.log(recipe);

    if (!recipe) {
        throw new ApiError(400, `Recipe not found`)
    } else {
        return resp.status(200).json(new ApiResponse(202, `recipes deleted`));
    }
})

// user recipe (update)

const updateUserRecipe = asyncHandler(async(req, resp) => {
    const recipe = req.params.recipeId;
    const updateFields = req.body;

    if (!recipe) {
        throw new ApiError(400, `Recipe not found`)
    }

    if (!updateFields) {
        throw new ApiError(400, `updated fields not found`)
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipe,
        updateFields, { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
        throw new ApiError(400, `Recipe not found`)
    }

    return resp.status(200)
        .json(new ApiResponse(200, updateFields, "Recipe Updated Successfully"))
})

// remove saved recipes

const removeSaveRecipe = asyncHandler(async(req, res) => {
    const userId = req.params.userId;
    const recipeId = req.params.recipeId;

    if (!userId) {
        throw new ApiError(400, `User not found`);
    }

    if (!recipeId) {
        throw new ApiError(400, `Recipe not found`);
    }

    // Assuming you have a User model with a savedRecipes field
    const user = await User.findByIdAndUpdate(
        userId, { $pull: { savedRecipes: recipeId } }, // Removes the specified recipe from the savedRecipes array
        { new: true } // Returns the updated user document
    );

    if (!user) {
        throw new ApiError(404, `User not found`);
    }

    res.status(200).json(new ApiResponse(200, `Recipe removed from saved`, { savedRecipes: user.savedRecipes }));
});

// get specific recipe by id

const getRecipeById = asyncHandler(async (req,resp)=> {
    const recipeId = req.params.id;

    if (!recipeId) {
        throw new ApiError(400, `Recipe not found`);
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new ApiError(400, `Recipe not found`);
    }

    resp.status(200).json(new ApiResponse(200, recipe, "Recipe Fetch Successfully"))
})



export {
    getAllRecipes,
    createRecipe,
    savedRecipe,
    getIdsOfSavedRecipes,
    getSavedRecipe,
    getUserRecipes,
    deleteUserRecipes,
    updateUserRecipe,
    removeSaveRecipe,
    getRecipeById
}