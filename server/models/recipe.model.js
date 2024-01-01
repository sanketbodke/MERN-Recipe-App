import mongoose, { Schema } from "mongoose"

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    ingredients: [{
        type: String,
        required: true,
    }],

    instructions: {
        type: String,
        required: true,
    },

    recipeImg: {
        type: String,
        required: true,
    },

    cookingTime: {
        type: Number,
        required: true,
    },

    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true })

export const Recipe = mongoose.model("Recipe", RecipeSchema)