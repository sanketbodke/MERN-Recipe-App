import React from "react";
import { Modal, Form, Input, Button } from "antd";
const { TextArea } = Input;

const RecipeEditModal = ({
        visible,
        onCancel,
        onUpdate,
        editedRecipe,
        setEditedRecipe,
    }) => {
    return (
        <Modal
            title="Edit Recipe"
            visible={visible}
            onOk={onUpdate}
            onCancel={onCancel}
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
    );
};

export default RecipeEditModal;
