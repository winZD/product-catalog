import { proxy } from "valtio";
import { CartModel } from "../model/cart";

export const store = proxy<{
  cart: CartModel[];
}>({
  cart: [],
});
