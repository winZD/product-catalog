import { ProductCatalog } from "./components/ProductCatalog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  /*  const [products, setProducts] = useState(0); */

  return (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        <header className="flex p-3 justify-center items-center bg-blue-400">
          CATALOG
        </header>
        <ProductCatalog />{" "}
      </QueryClientProvider>
    </>
  );
}

export default App;
