import { handleFilter } from "../utils/filterProducts";

describe("handleFilter", () => {
  const mockData = {
    limit: 10,
    skip: 0,
    total: 5,
    products: [
      {
        title: "Apple iPhone",
        price: 999,
        thumbnail: "apple-thumbnail.jpg",
        description: "The latest Apple iPhone with advanced features.",
      },
      {
        title: "Samsung Galaxy",
        price: 799,
        thumbnail: "samsung-thumbnail.jpg",
        description: "A high-performance phone from Samsung.",
      },
      {
        title: "Google Pixel",
        price: 899,
        thumbnail: "google-thumbnail.jpg",
        description: "The ultimate Android experience with Google Pixel.",
      },
      {
        title: "OnePlus Nord",
        price: 499,
        thumbnail: "oneplus-thumbnail.jpg",
        description: "Affordable yet powerful phone from OnePlus.",
      },
      {
        title: "Sony Xperia",
        price: 699,
        thumbnail: "sony-thumbnail.jpg",
        description: "Stylish and capable phone from Sony.",
      },
    ],
  };

  it("filters products by title", () => {
    const result = handleFilter("Apple", mockData, "", { min: 0, max: 2000 });
    expect(result.products).toEqual([
      {
        title: "Apple iPhone",
        price: 999,
        thumbnail: "apple-thumbnail.jpg",
        description: "The latest Apple iPhone with advanced features.",
      },
    ]);
  });

  it("filters and sorts products by price ascending", () => {
    const result = handleFilter("", mockData, "price_asc", {
      min: 0,
      max: 2000,
    });
    expect(result.products).toEqual([
      {
        title: "OnePlus Nord",
        price: 499,
        thumbnail: "oneplus-thumbnail.jpg",
        description: "Affordable yet powerful phone from OnePlus.",
      },
      {
        title: "Sony Xperia",
        price: 699,
        thumbnail: "sony-thumbnail.jpg",
        description: "Stylish and capable phone from Sony.",
      },
      {
        title: "Samsung Galaxy",
        price: 799,
        thumbnail: "samsung-thumbnail.jpg",
        description: "A high-performance phone from Samsung.",
      },
      {
        title: "Google Pixel",
        price: 899,
        thumbnail: "google-thumbnail.jpg",
        description: "The ultimate Android experience with Google Pixel.",
      },
      {
        title: "Apple iPhone",
        price: 999,
        thumbnail: "apple-thumbnail.jpg",
        description: "The latest Apple iPhone with advanced features.",
      },
    ]);
  });

  it("applies price range filter", () => {
    const result = handleFilter("", mockData, "", { min: 500, max: 900 });
    expect(result.products).toEqual([
      {
        title: "Samsung Galaxy",
        price: 799,
        thumbnail: "samsung-thumbnail.jpg",
        description: "A high-performance phone from Samsung.",
      },
      {
        title: "Google Pixel",
        price: 899,
        thumbnail: "google-thumbnail.jpg",
        description: "The ultimate Android experience with Google Pixel.",
      },
      {
        title: "Sony Xperia",
        price: 699,
        thumbnail: "sony-thumbnail.jpg",
        description: "Stylish and capable phone from Sony.",
      },
    ]);
  });

  it("returns an empty array if no products match the criteria", () => {
    const result = handleFilter("Nonexistent", mockData, "", {
      min: 0,
      max: 2000,
    });
    expect(result.products).toEqual([]);
  });
});
