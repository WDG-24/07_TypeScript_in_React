import { useEffect, useState } from 'react';
import z from 'zod';
import { ProductSchema } from '../schemas/products';
import type { Product } from '../types';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');

        const d = await res.json();

        // Statt das gesamte Array, wird hier das einzelne Produkt mit dem Schema verglichen
        const fetchedProducts = [];
        const productErrors = [];

        for (const product of d.products) {
          const { data, error, success } = ProductSchema.safeParse(product);
          if (success) {
            fetchedProducts.push(data);
          } else {
            productErrors.push(z.prettifyError(error));
          }
        }
        // Valide Produkte werden angezeigt
        setProducts(fetchedProducts);
        // Mit fehlerhaften Produkten kann gesondert umgegangen werden
        setErrors(productErrors);
      } catch (error) {
        if (error instanceof Error) {
          setErrors([error.message]);
        }
      }
    };

    fetchData();
  }, []);

  console.log(products);
  console.log(errors);

  return <div></div>;
}
