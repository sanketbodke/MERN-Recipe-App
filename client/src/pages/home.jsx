import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Button, Card, message } from "antd";
import { SaveOutlined, CheckOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar.jsx";
import "../styles/home.css";

import { useSelector } from "react-redux";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const userID = currentUser.data.data.user._id;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://letscook-u1xm.onrender.com/api/v1/recipe");
        setRecipes(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://letscook-u1xm.onrender.com/api/v1/recipe/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://letscook-u1xm.onrender.com/api/v1/recipe/save",
        {
          recipeID,
          userID,
        }
      );
      setSavedRecipes(response.data.data.savedRecipes);
      message.success("Recipe saved!");
    } catch (err) {
      console.error(err);
      message.error("Failed to save recipe");
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <>
      <Navbar />
      <div className="homeContainer container">
        <p className="sectionHeading">Recipes</p>
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
            }}
          dataSource={recipes}
          renderItem={(recipe) => (
            <List.Item>
              <Card
                className="recipeCard"
                title={recipe.name}
                cover={<img alt={recipe.name} src={recipe.recipeImg} />}
                actions={[
                  <Button
                    type="primary"
                    icon={
                      isRecipeSaved(recipe._id) ? (
                        <CheckOutlined />
                      ) : (
                        <SaveOutlined />
                      )
                    }
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </Button>,
                ]}
              >
                <p>
                  <strong>Description : </strong>
                  {recipe.description}
                </p>
                <p>
                  <strong>Ingredients : </strong>
                  {recipe.ingredients.join(", ")}
                </p>
                <p>
                  <strong>Instructions : </strong> {recipe.instructions}
                </p>
                <p>
                  <strong>Cooking Time : </strong> {recipe.cookingTime} minutes
                </p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}