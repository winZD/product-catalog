import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../components/ProductCard";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

describe("ProductCard Component", () => {
  const product = {
    id: 1,
    thumbnail: "image.jpg",
    title: "Product Title",
    description: "This is a great product with lots of features.",
    price: 20.99,
  };

  beforeEach(() => {
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(jest.fn());
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => "[]");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render product details correctly", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText("$20.99")).toBeInTheDocument();
  });

  test("should open modal when 'Detalji' button is clicked", () => {
    render(<ProductCard {...product} />);
    fireEvent.click(screen.getByText(/Detalji/));
    expect(
      screen.getByRole("heading", { level: 2, name: product.title })
    ).toBeInTheDocument();
  });

  test("should close modal when close button is clicked", () => {
    render(<ProductCard {...product} />);
    fireEvent.click(screen.getByText(/Detalji/));
    fireEvent.click(screen.getByRole("button", { name: "×" }));
    expect(
      screen.queryByRole("heading", { level: 2, name: product.title })
    ).not.toBeInTheDocument();
  });

  test("should add item to cart when 'add to cart' button is clicked", () => {
    render(<ProductCard {...product} />);
    fireEvent.click(screen.getByText(/Detalji/));
    fireEvent.click(screen.getByText(/add to cart/));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "product",
      JSON.stringify([product])
    );
  });
});
