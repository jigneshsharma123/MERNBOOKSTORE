import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <div className='container mx-auto p-4'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold'>BookifyHub</h1>
          <Link to='/books/create'>
            <MdOutlineAddBox className='text-blue-500 text-3xl' />
          </Link>
        </div>
        <div className='flex justify-center items-center gap-x-4 mb-8'>
          <button
            className={`${
              showType === 'table' ? 'bg-blue-500' : 'bg-gray-500'
            } hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all`}
            onClick={() => setShowType('table')}
          >
            Table
          </button>
          <button
            className={`${
              showType === 'card' ? 'bg-blue-500' : 'bg-gray-500'
            } hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all`}
            onClick={() => setShowType('card')}
          >
            Card
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
