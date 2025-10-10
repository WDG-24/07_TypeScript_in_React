import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components';
import { useEffect, useState } from 'react';

import type { Destination } from '../types';

export default function MainLayout() {
  const [destinations, setDestinations] = useState<Destination[]>();

  useEffect(() => {
    fetch('/travel.json')
      .then((res) => res.json())
      .then((data) => setDestinations(data as Destination[]));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='container mx-auto px-4 py-8 mb-auto'>
        {destinations ? <Outlet context={destinations} /> : <span className='loading loading-dots loading-xl'></span>}
      </main>
      <Footer />
    </div>
  );
}
