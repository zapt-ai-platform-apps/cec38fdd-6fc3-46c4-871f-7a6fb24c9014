import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import staticRecipes from './data/staticRecipes';
import RecipeList from './components/RecipeList';

export default function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient.");
      return;
    }
    setError('');
    setLoading(true);
    console.log("Searching recipes for:", ingredients);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const inputIngredients = ingredients
        .toLowerCase()
        .split(',')
        .map(item => item.trim())
        .filter(item => item);
      const filteredRecipes = staticRecipes.filter(recipe =>
        recipe.ingredients.some(ing =>
          inputIngredients.some(input => ing.toLowerCase().includes(input))
        )
      );
      console.log("Recipes found:", filteredRecipes);
      setRecipes(filteredRecipes);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      Sentry.captureException(err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-3xl font-bold">Zero Waste Cooking</h1>
      </header>
      <main className="flex-grow p-4 flex flex-col">
        <section className="mb-6">
          <p className="mb-4">Enter the ingredients you have in your kitchen (separate by commas):</p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., tomato, pasta, basil"
              className="box-border p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-green-500 hover:bg-green-700 text-white p-2 rounded disabled:opacity-50"
            >
              {loading ? "Finding Recipes..." : "Find Recipes"}
            </button>
          </form>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </section>
        <section>
          <RecipeList recipes={recipes} loading={loading} ingredients={ingredients} />
        </section>
      </main>
      <footer className="bg-gray-100 p-4 text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}