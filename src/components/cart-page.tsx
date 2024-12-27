import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { ShoppingBag } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export default function CartPage() {
  const { cartItems } = useContext(CartContext);
  return (
    <Popover>
      <PopoverTrigger className="rounded-full bg-orange-400 p-4 shadow-lg hover:bg-orange-500 transition-colors">
        <div className="relative ">
          <ShoppingBag className="w-8 h-8 text-white" />
          <span className="bg-slate-500 text-white text-xs absolute left-5 -top-1 border-2 border-white h-5 w-5 rounded-full flex items-center justify-center">
            {cartItems?.length}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-[70vh]">
        <ScrollArea className="h-full w-full rounded-md border p-1">
          {cartItems && cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/64x64?text=Error";
                    }}
                  />
                  <div className="flex flex-col">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-blue-500">
                      unit price - ৳{" "}
                      {(
                        item.price -
                        (item.price * item.discountPercentage) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="text-blue-500">
                      item total - ৳{" "}
                      {(
                        (item.price -
                          (item.price * item.discountPercentage) / 100) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="sticky bottom-0 bg-white border-t pt-4">
                <p className="font-bold">
                  Total: ৳{" "}
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total +
                        (item.price -
                          (item.price * item.discountPercentage) / 100) *
                          item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
