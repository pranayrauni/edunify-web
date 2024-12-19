'use client';

import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <h1 className="text-3xl font-bold mb-6">School Management Portal</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigateTo('/add-school')}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Add School
        </button>
        <button
          onClick={() => navigateTo('/show-school')}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Show Schools
        </button>
      </div>
    </div>
  );
};

export default HomePage;
