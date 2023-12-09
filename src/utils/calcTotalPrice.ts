import { OrderItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: OrderItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
    }, 0);
};