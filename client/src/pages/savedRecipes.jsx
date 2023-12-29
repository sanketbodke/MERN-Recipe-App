import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId.js";
import axios from "axios";

export default function savedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/recipe/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
