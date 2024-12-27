import { CartContextProvider } from "./context/cart-context-provider";
import MainPage from "./components/main-page";

function App() {
  return (
    <div className="flex justify-center items-center min-w-full min-h-full">
      <div className="flex flex-col mx-auto max-w-7xl w-full">
        <CartContextProvider>
          <MainPage />
        </CartContextProvider>
      </div>
    </div>
  );
}

export default App;
