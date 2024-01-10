// SavedRecipes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Card, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar.jsx';

import { useSelector } from 'react-redux';

export default function SavedRecipes() {
  const {currentUser} = useSelector(state => state.user)
  const userId = currentUser.data.data.user._id

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://letscook-u1xm.onrender.com/api/v1/recipe/savedRecipes/${userId}`
        );
        setSavedRecipes(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [currentUser._id]);

  const removeSavedRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `https://letscook-u1xm.onrender.com/api/v1/recipe/removeSaved/${recipeID}/${userId}`,
        {
          recipeID,
          userID: currentUser._id,
        }
      );
      setSavedRecipes(response.data.data.savedRecipes);
      message.success('Recipe removed from saved!');
    } catch (err) {
      console.error(err);
      message.error('Failed to remove recipe from saved');
    }
  };

  return (
    <>
      <Navbar />
      <div className="savedRecipesContainer container">
        <p className="sectionHeading">Saved Recipes</p>
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
            }}
          dataSource={savedRecipes}
          renderItem={(savedRecipe) => (
            <List.Item>
              <Card
                className="recipeCard"
                title={savedRecipe.name}
                cover={<img alt={savedRecipe.name} src={savedRecipe.recipeImg} />}
                actions={[
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => removeSavedRecipe(savedRecipe._id)}
                  >
                    Remove from Saved
                  </Button>,
                ]}
              >
                <p>
                  <strong>Description:</strong> {savedRecipe.description}
                </p>
                <p>
                  <strong>Ingredients:</strong> {savedRecipe.ingredients.join(', ')}
                </p>
                <p>
                  <strong>Instructions:</strong> {savedRecipe.instructions}
                </p>
                <p>
                  <strong>Cooking Time:</strong> {savedRecipe.cookingTime} minutes
                </p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
