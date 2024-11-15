'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Category } from './interfaces/ICategory';
import { Ingredient } from './interfaces/IIngredients';
import { Meal } from './interfaces/IMeal';

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const fetchMeals = async () => {
    try {
      const mealPromises = Array.from({ length: 6 }, async () => {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/random.php',
        );
        const data = await response.json();
        return data.meals[0];
      });
      const fetchedMeals = await Promise.all(mealPromises);
      setMeals(fetchedMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
      );
      const data = await response.json();
      setIngredients(data.meals);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMeals();
    fetchIngredients();
  }, []);

  return (
    <>
      <Navbar />
      <section>
        <div
          className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'
          style={{ backgroundColor: 'var(--background)' }}
        >
          <header>
            <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
              Meal Collection
            </h2>
            <p className='mt-4 max-w-md text-gray-500'>
              Explore a variety of delicious meals from around the world!
            </p>
          </header>

          <div className='mt-8'>
            <p className='text-sm text-gray-500'>
              Showing <span>{meals.length}</span> of {meals.length} meals
            </p>
          </div>

          <ul className='mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6'>
            {meals.map((meal, index) => (
              <li key={index}>
                <Link
                  href={`/meals/${meal.idMeal}`}
                  className='group block overflow-hidden'
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={400}
                    height={400}
                    className='h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]'
                  />
                  <div className='relative bg-white pt-3'>
                    <h3 className='text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4'>
                      {meal.strMeal}
                    </h3>
                    <p className='mt-2'>
                      <span className='tracking-wider text-gray-900'>
                        Cat: {meal.strCategory}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <hr className='my-12 h-0.5 border-t-0 text-gray-900' />

          <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
            Recherche par catégories
          </h2>
          <p className='mt-4 max-w-md text-gray-500'>
            Explore les différentes catégories pour trouver le plat qui te
            convient!
          </p>
          <ul className='space-y-1'>
            {categories.map((categories, index) => (
              <li key={index}>
                <Link
                  href={`/recipe/${categories.strCategory}`}
                  className='block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700'
                >
                  {categories.strCategory}
                </Link>
              </li>
            ))}
          </ul>

          <hr className='my-12 h-0.5 border-t-0 text-gray-900' />

          <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
            Recherche par Ingredients
          </h2>
          <p className='mt-4 max-w-md text-gray-500'>
            Explore les différentes ingredients pour trouver le plat qui te
            convient!
          </p>
          <div className='flow-root'>
            {ingredients.map((ingredient, index) => (
              <Link
                key={index}
                href={`ingredients/${ingredient.strIngredient}`}
              >
                <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                  <dt className='font-medium text-gray-900'>
                    {ingredient.strIngredient}
                  </dt>
                  <dd className='text-gray-700 sm:col-span-2'>
                    {ingredient.strDescription}
                  </dd>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
