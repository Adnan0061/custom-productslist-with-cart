import { Eye, HeartIcon, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import DiscountBadge from "../../assets/discount-badge.svg";
import CartIcon from "../../assets/cart.svg";
import type { Product } from "@/types/type";
import { useContext, useMemo } from "react";
import { CartContext } from "@/context/cart-context";

export default function Product({ product }: { product: Product }) {
  const { title, brand, price, discountPercentage, thumbnail } = product;
  const { cartItems, increaseQuantity, decreaseQuantity, deleteFromCart } =
    useContext(CartContext);

  const productQuantity = useMemo(
    () => (id: number) => {
      const item = cartItems?.find((item) => item.id === id);
      return item?.quantity ?? 0;
    },
    [cartItems]
  );

  return (
    <div className="flex flex-col group hover:shadow-neutral-300 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white text-gray-500 w-60 rounded-lg p-1.5">
      {/* badge and heart icon section */}
      <div className="relative top-6 left-1 flex justify-between">
        {/* badgee section */}
        <div>
          {!!discountPercentage && (
            <>
              <img
                src={DiscountBadge}
                alt=""
                className="absolute top-0 -left-2"
              />
              <p className="absolute top-1 left-2 text-xs text-white">
                ৳ {((price * discountPercentage) / 100).toFixed(2)}
              </p>
            </>
          )}
        </div>
        {/* heart icon section */}
        <button className="invisible group-hover:visible bg-transparent absolute -top-2 right-2 rounded-xl p-2">
          <HeartIcon className="text-white" />
        </button>
      </div>
      {/* image section */}
      <div className="w-full bg-neutral-200 group-hover:bg-neutral-500 rounded-lg p-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-full rounded-lg h-48 object-contain"
        />
      </div>
      {/* button section */}
      <div className="relative invisible group-hover:visible group-hover:block w-full">
        <div className="absolute -top-28 flex flex-col gap-2 w-full px-4">
          <div className="w-full">
            {cartItems &&
            cartItems.length > 0 &&
            cartItems.some((item) => item.id === product.id) ? (
              // already in cart
              <div className="w-full bg-green-600 border-2 text-white font-medium py-2 flex justify-center items-center gap-2 rounded-lg text-sm">
                <button
                  onClick={() => deleteFromCart(product.id)}
                  className="rounded flex items-center justify-center"
                >
                  <Trash2Icon className="w-5 h-5 inline-block" />
                </button>
                <button
                  onClick={() => decreaseQuantity(product)}
                  className={`rounded text-2xl flex items-center justify-center ${
                    productQuantity(product.id) === 1 ? "hidden" : ""
                  }`}
                >
                  <MinusIcon className="w-4 h-4 inline-block" />
                </button>
                <p className="flex items-center justify-center">
                  {productQuantity(product.id)} added in cart
                </p>
                <button
                  onClick={() => increaseQuantity(product)}
                  className="rounded text-2xl flex items-center justify-center"
                >
                  <PlusIcon className="w-5 h-5 inline-block" />
                </button>
              </div>
            ) : (
              // not in cart
              <button
                onClick={() => increaseQuantity(product)}
                className="w-full backdrop-blur-sm border-2 border-white text-white font-medium px-4 py-2 flex justify-center items-center gap-2 rounded-lg text-sm"
              >
                <img
                  src={CartIcon}
                  alt="cart-icon"
                  className="w-5 h-5 inline-block "
                />
                Add to Cart
              </button>
            )}
          </div>
          <button className="w-full backdrop-blur-sm border-2 border-white text-white font-medium px-4 py-2 flex justify-center items-center gap-2 rounded-lg text-sm">
            <Eye className="w-5 h-5 inline-block" /> Quick View
          </button>
        </div>
      </div>
      {/* title and price section */}
      <div className="flex flex-col mt-2 px-2">
        <p className="text-sm text-gray-500">{brand}</p>
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-lg font-semibold">
            ৳ {(price - (price * discountPercentage) / 100).toFixed(2)}
          </span>
          <span className="line-through text-gray-400 text-sm">৳ {price}</span>
        </div>
      </div>
    </div>
  );
}
