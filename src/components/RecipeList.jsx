import React from 'react';

export default function RecipeList({ recipes, loading, ingredients }) {
  if (loading) {
    return <p>Loading recipes...</p>;
  }
  if (!loading && recipes.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 border border-gray-200 rounded shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="mb-2">
              <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
          </div>
        ))}
      </div>
    );
  }
  if (!loading && recipes.length === 0 && ingredients.trim()) {
    return <p className="mt-4">No recipes found for the given ingredients.</p>;
  }
  return null;
}