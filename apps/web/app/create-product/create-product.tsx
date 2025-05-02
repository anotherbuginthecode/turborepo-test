import createProduct from "./actions/create-product";

export default async function CreateProduct(){
  return(
    <div>
      <h1>Create Product</h1>
      <form action={createProduct}>
        <label>
          Product Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Product Price:
          <input type="number" name="price" />
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>
    </div>
  )
}