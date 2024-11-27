import { ProductCatalog } from "./components/ProductCatalog";

function App() {
  /*  const [products, setProducts] = useState(0); */

  return (
    <>
      <header className="flex p-3 justify-center items-center bg-blue-400">
        CATALOG
      </header>
      <ProductCatalog />
    </>
  );
}

export default App;
