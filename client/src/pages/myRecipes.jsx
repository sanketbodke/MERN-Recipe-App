import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { List, Button, Card, message, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import API_BASE_URL from "../constant.js";
import RecipeDetailsModal from "../components/RecipeDetailsModal.jsx";

const { TextArea } = Input;
import RecipeEditModal from "../components/RecipeEditModal.jsx";

export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedRecipe, setEditedRecipe] = useState({});
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [selectedRecipeDetails, setSelectedRecipeDetails] = useState({});

    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser.data.data.user._id;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/v1/recipe/userRecipes/${userId}`
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
            await axios.delete(`${API_BASE_URL}/api/v1/recipe/delete/${recipeId}`);

            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== recipeId)
            );

            message.success("Recipe deleted successfully");
        } catch (error) {
            message.error("Failed to delete recipe");
        }
    };

    const handleEdit = (recipe) => {
        setEditedRecipe({
            _id: recipe._id,
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients.join(","),
            instructions: recipe.instructions,
            cookingTime: recipe.cookingTime.toString(),
        });
        setIsModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `${API_BASE_URL}/api/v1/recipe/update/${editedRecipe._id}`,
                editedRecipe
            );

            setIsModalVisible(false);
            message.success("Recipe updated successfully");

            const response = await axios.get(
                `${API_BASE_URL}/api/v1/recipe/userRecipes/${userId}`
            );
            setRecipes(response.data.data);
        } catch (error) {
            message.error("Failed to update recipe");
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const truncateDescription = (description) => {
        const words = description.split(" ");
        if (words.length > 10) {
            return words.slice(0, 10).join(" ") + "...";
        }
        return description;
    };

    const getMoreDetailsOfRecipe = async (recipeId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/recipe/${recipeId}`
            );
            setSelectedRecipeDetails(response.data.data);
            setDetailsModalVisible(true);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch recipe details");
        }
    };

    const closeModal = () => {
        setDetailsModalVisible(false);
        setSelectedRecipeDetails({});
    };

    return (
        <>
            <Navbar />
            <div className="myRecipesContainer container">
                <p className="sectionHeading">My Recipes</p>
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
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(recipe._id)}
                                    />,
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEdit(recipe)}
                                    />,
                                    <Button type="primary" icon={<DownOutlined />} onClick={() => getMoreDetailsOfRecipe(recipe._id)} />,
                                ]}
                            >
                                <p>
                                    {truncateDescription(recipe.description)}
                                </p>
                            </Card>
                        </List.Item>
                    )}
                />
                <RecipeEditModal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    onUpdate={handleUpdate}
                    editedRecipe={editedRecipe}
                    setEditedRecipe={setEditedRecipe}
                />

                <RecipeDetailsModal
                    visible={detailsModalVisible}
                    onCancel={closeModal}
                    recipeDetails={selectedRecipeDetails}
                />
            </div>
        </>
    );
}
