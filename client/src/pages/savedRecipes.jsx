import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Card, message } from 'antd';
import {DeleteOutlined, DownOutlined} from '@ant-design/icons';
import Navbar from '../components/Navbar.jsx';

import { useSelector } from 'react-redux';
import API_BASE_URL from "../constant.js";
import RecipeDetailsModal from "../components/RecipeDetailsModal.jsx";

export default function SavedRecipes() {
    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser.data.data.user._id;

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [selectedRecipeDetails, setSelectedRecipeDetails] = useState({});

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/v1/recipe/savedRecipes/${userId}`
                );
                setSavedRecipes(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSavedRecipes();
    }, [userId]);

    const getMoreDetailsOfRecipe = async (savedRecipeId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/recipe/${savedRecipeId}`
            );
            setSelectedRecipeDetails(response.data.data);
            setDetailsModalVisible(true);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch recipe details");
        }
    };

    const removeSavedRecipe = async (recipeID) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/v1/recipe/removeSaved/${recipeID}/${userId}`,
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

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 10) {
            return words.slice(0, 10).join(' ') + '...';
        }
        return description;
    };

    const closeModal = () => {
        setDetailsModalVisible(false);
        setSelectedRecipeDetails({});
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
                                        Remove
                                    </Button>,
                                    <Button
                                        type="primary"
                                        icon={<DownOutlined />}
                                        onClick={() => getMoreDetailsOfRecipe(savedRecipe._id)}
                                    >
                                        Read More
                                    </Button>,
                                ]}
                            >
                                <p>
                                    {truncateDescription(savedRecipe.description)}
                                </p>
                            </Card>
                        </List.Item>
                    )}
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
