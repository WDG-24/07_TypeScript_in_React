import { Route, Routes } from 'react-router';
import { About, Contact, Destinations, Home, NotFound, SingleDestination } from './pages';
import MainLayout from './layouts/MainLayout.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/destinations' element={<Destinations />} />
        <Route path='/destinations/:slug' element={<SingleDestination />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
