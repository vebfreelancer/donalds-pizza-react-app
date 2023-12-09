import React from 'react';
import { useSelector } from 'react-redux';

import { ContentCart, EmptyCart } from "../components/Cart";

const Cart: React.FC = () => {
    const items = useSelector((state: any) => state.cart.items);

    return (
        <div className="container">
            {
                items.length ? 
                    <ContentCart /> : 
                    <EmptyCart />
            }
        </div>
    )
}

export default Cart;