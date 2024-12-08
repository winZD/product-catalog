import { useState } from "react";
import { Product } from "../model/product";
import { Modal } from "./ProductModal";
import { store } from "../store/store";
import { toast } from "react-toastify";

export const ProductCard: React.FC<Product> = ({
  id,
  thumbnail,
  title,
  description,
  price,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const notify = () => toast.info("Added to cart!");

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <p className="text-green-700 font-bold mt-2">${price}</p>
        <button
          onClick={handleOpenModal}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Details
        </button>
      </div>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p>{description}</p>
        <p className="text-green-700 font-bold mt-2">${price}</p>
        <button
          className="bg-blue-500 uppercase hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 text-white"
          onClick={() => {
            const existingCart = JSON.parse(
              localStorage.getItem("product") || "[]"
            );

            const updatedCart = [
              ...existingCart,
              { id, thumbnail, title, description, price },
            ];
            localStorage.setItem("product", JSON.stringify(updatedCart));
            store.cart = updatedCart;
            notify();
          }}
        >
          add to cart
        </button>
      </Modal>
    </div>
  );
};
