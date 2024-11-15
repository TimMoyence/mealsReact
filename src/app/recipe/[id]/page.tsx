'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { MealCategory } from '../../interfaces/IMealCategory';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const [mealCategory, setMeals] = useState<MealCategory[] | null>(null);

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`,
      );
      const data = await response.json();

      setMeals(data.meals);
    };

    fetchCategoryMeals();
  }, [id]);

  console.log(mealCategory);

  if (!mealCategory) return <p>Loading...</p>;
  return (
    <>
      <Navbar />
      <section>
        <div
          className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'
          style={{ backgroundColor: 'var(--background)' }}
        >
          <ul className='mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6'>
            {mealCategory.map((meal, index) => (
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
                    <h3 className='text-xl text-center text-gray-700 bold group-hover:underline group-hover:underline-offset-4'>
                      {meal.strMeal}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className='flex justify-end items-end m-4'>
            <Link
              href='/'
              className='block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 grid-cols-6'
            >
              Retour
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
