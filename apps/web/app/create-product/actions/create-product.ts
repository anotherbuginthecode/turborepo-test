"use server";

import { revalidateTag } from "next/cache";

export default async function createProduct(formData: FormData) {
  const data = Object.fromEntries(formData);
  Object.keys(data).forEach((key) => {
    if (key.startsWith("$ACTION_ID_")) {
      delete data[key];
    }
  });
  await fetch(`${process.env.API_URL}/products`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  revalidateTag("products");
}