import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { List, Button, Card, message, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import { useSelector } from "react-redux";

export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedRecipe, setEditedRecipe] = useState({});

    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser.data.data.user._id;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    `https://letscook-u1xm.onrender.com/api/v1/recipe/savedRecipes/${userId}`
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
            await axios.delete(`https://letscook-u1xm.onrender.com/api/v1/recipe/delete/${recipeId}`);

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
                `https://letscook-u1xm.onrender.com/api/v1/recipe/update/${userId}`,
                editedRecipe
            );

            setIsModalVisible(false);
            message.success("Recipe updated successfully");

            // Fetch updated recipes
            const response = await axios.get(
                `https://letscook-u1xm.onrender.com/api/v1/recipe/${userId}`
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

                                    <Button type="primary" icon={<DownOutlined />} />,
                                ]}
                            >
                                <p>
                                    {truncateDescription(recipe.description)}
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
