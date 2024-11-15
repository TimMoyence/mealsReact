'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/meals?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className='bg-gray-800 text-white mb-6'>
      <div className='container mx-auto flex justify-between items-center px-4 py-3'>
        {/* Logo */}
        <div className='text-2xl font-bold'>
          <Link href='/'>MyLogo</Link>
        </div>

        <button
          className='md:hidden block text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <ul
          className={`md:flex items-center md:space-x-6 absolute md:static top-14 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-transform ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li className='border-b md:border-none'>
            <Link href='/'>
              <span className='block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent'>
                Home
              </span>
            </Link>
          </li>
          <li className='border-b md:border-none'>
            <Link href='/meals'>
              <span className='block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent'>
                Toutes les recettes
              </span>
            </Link>
          </li>
          <li className='border-b md:border-none'>
            <Link href='/random'>
              <span className='block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent'>
                Recettes aléatoires
              </span>
            </Link>
          </li>
        </ul>

        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search meals...'
            className='px-2 py-1 text-black rounded'
          />
          <button
            onClick={handleSearch}
            className='bg-blue-500 px-4 py-1 rounded text-white'
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
