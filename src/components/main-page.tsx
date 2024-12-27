import CartPage from "./cart-page";
import ProductList from "./product-list";

export default function MainPage() {
  return (
    <>
      <div className="p-2">
        <h1 className="text-4xl font-bold text-gray-800 text-center py-4">
          Product List
        </h1>
        <ProductList />
      </div>
      <div className="fixed bottom-8 right-8">
        <CartPage />
      </div>
    </>
  );
}
