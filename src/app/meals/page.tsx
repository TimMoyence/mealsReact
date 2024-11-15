'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Meal } from '../interfaces/IMeal';

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams?.get('search') || '';

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
        );
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchAllMeals();
  }, [search]);

  console.log(meals);

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
              Showing <span>{meals.length}</span> meals
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
        </div>
      </section>
    </>
  );
}
