import ProductList from './components/ProductList';
import useFetch from './hooks/useFetch';
import { CatFactsSchema } from './schemas/catFacts';
import type { CatFact } from './types';

function App() {
  const { data, error, loading } = useFetch('https://catfact.ninja/fact', CatFactsSchema);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Zod Runtime Validation</h1>

      <p style={{ textAlign: 'center' }}>{data?.fact}</p>

      <ProductList />
    </div>
  );
}

export default App;
