import { useEffect, useState } from "react";
import { Product } from "../model/product";
import { Modal } from "./ProductModal";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const ProductCard: React.FC<Product> = ({
  thumbnail,
  title,
  description,
  price,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let invalid = false;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const at = localStorage?.getItem("at");
  const decoded = at ? jwtDecode(at!) : 0;
  console.log(decoded);
  /* 
  useEffect(() => {
    if ((decoded && decoded.exp!) < Date.now() / 1000) {
      localStorage.clear();
      const authenticate = async (): Promise<void> => {
        try {
          const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: "emilys",
              password: "emilyspass",
              expiresInMins: 30, // optional, defaults to 60
            }),
            // credentials: "include", // Include cookies (e.g., accessToken) in the request
          });

          const data = await response.json();

          if (data) {
            localStorage.setItem("at", data.accessToken);
            localStorage.setItem("rt", data.refreshToken);
            invalid = false;
          }

          console.log(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      authenticate();
    }
  }, [decoded]); */

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
          Detalji
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
          className="bg-blue-800 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2"
          disabled={invalid}
        >
          KOŠARICA
        </button>
      </Modal>
    </div>
  );
};
