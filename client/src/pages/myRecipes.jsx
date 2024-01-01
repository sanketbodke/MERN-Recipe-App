import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { List, Button, Card, message, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import {useSelector} from "react-redux"

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({});

  const {currentUser} = useSelector(state => state.user)
  const userId = currentUser.data.data.user._id


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/recipe/${userId}`
        );
        setRecipes(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, [userId]);

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/recipe/${recipeId}`);

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );

      message.success("Recipe deleted successfully");
    } catch (error) {
      message.error("Failed to delete recipe");
    }
  };

  const handleEdit = (recipe) => {
    setEditedRecipe(recipe);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/v1/recipe/${userId}`,
        editedRecipe
      );

      setIsModalVisible(false);
      message.success("Recipe updated successfully");

      // Fetch updated recipes
      const response = await axios.get(
        `http://localhost:3001/api/v1/recipe/${userId}`
      );
      setRecipes(response.data.data);
    } catch (error) {
      message.error("Failed to update recipe");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Navbar />
      <div className="myRecipesContainer container">
        <p className="sectionHeading">My Recipes</p>
        <List
          grid={{ gutter: 16, column: 3 }}
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
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </Button>,
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit
                  </Button>,
                ]}
              >
                <p>
                  <strong>Description:</strong> {recipe.description}
                </p>
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <p>
                  <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                </p>
              </Card>
            </List.Item>
          )}
        />

        {/* Update Recipe Modal */}
        <Modal
          title="Edit Recipe"
          visible={isModalVisible}
          onOk={handleUpdate}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item label="Name">
              <Input
                value={editedRecipe.name}
                onChange={(e) =>
                  setEditedRecipe({ ...editedRecipe, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                value={editedRecipe.description}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe,
                    description: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Ingredients">
              <Input
                value={editedRecipe.ingredients}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe,
                    ingredients: e.target.value.split(","),
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Instructions">
              <TextArea
                value={editedRecipe.instructions}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe,
                    instructions: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Cooking Time">
              <Input
                type="number"
                value={editedRecipe.cookingTime}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe,
                    cookingTime: parseInt(e.target.value, 10),
                  })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
