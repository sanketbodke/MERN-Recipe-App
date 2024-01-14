import React from 'react';
import { Modal } from 'antd';

const RecipeDetailsModal = ({ visible, onCancel, recipeDetails }) => {
    return (
        <Modal
            title="Recipe Details"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <p><strong>Name: </strong> {recipeDetails.name}</p>
            <p><strong>Description: </strong> {recipeDetails.description}</p>
            <p>
                <strong>Ingredients:</strong> {Array.isArray(recipeDetails.ingredients) ? recipeDetails.ingredients.join(', ') : ''}
            </p>
            <p><strong>Instructions: </strong> {recipeDetails.instructions}</p>
        </Modal>
    );
};

export default RecipeDetailsModal;
