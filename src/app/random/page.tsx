'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Meal } from '../interfaces/IMeal';

export default function RandomMeals() {
  const [meal, setMeals] = useState<Meal | null>(null);

  useEffect(() => {
    const fetchRandomMeals = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/random.php`,
      );
      const data = await response.json();
      setMeals(data.meals[0]);
    };

    fetchRandomMeals();
  }, []);

  if (!meal) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center p-4 group block'>
        <h1 className='text-2xl font-bold mb-2'>{meal.strMeal}</h1>

        <Image
          src={meal.strMealThumb || '/images/notFound.webp'}
          alt={meal.strMeal || 'Not Found'}
          width={400}
          height={400}
          className='h-[350px] w-full object-cover sm:h-[450px]'
        />

        <div className='mt-1.5'>
          <p className='text-l text-gray-500'>
            {meal.strCategory} - {meal.strArea}
          </p>

          <div className='mt-1.5 gap-1'>
            <h4 className='text-gray-500'>Ingredients : </h4>

            <ul className='  text-gray-500 '>
              {[
                meal.strIngredient1,
                meal.strIngredient2,
                meal.strIngredient3,
                meal.strIngredient4,
                meal.strIngredient5,
                meal.strIngredient6,
              ].map((ingredient, index) => (
                <li className=' text-gray-500' key={index}>
                  - {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-1.5 gap-1 text-xl text-gray-900'>
            {meal.strInstructions}
          </div>

          <div className='mt-3 mb-3 flex justify-between text-m'>
            <h3 className='text-gray-900 group-hover:underline group-hover:underline-offset-4'>
              {meal.strMeal}
            </h3>
          </div>
          <Link
            href={meal.strYoutube || '#'}
            className='block mt-4 rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 grid-cols-6'
          >
            Recette video
          </Link>
        </div>
      </div>
    </>
  );
}
