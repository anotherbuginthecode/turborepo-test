import { Product } from "@repo/types";

export default async function Products() {

  // Fetch products from the API
  const response = await fetch(`${process.env.API_URL}/products`, {
    next: { tags: ["products"] },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products: Product[] = await response.json();

  return (
    <div>
      <h1>Products</h1>
      <p>List of products will be displayed here.</p>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}