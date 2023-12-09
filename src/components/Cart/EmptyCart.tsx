import React from 'react';
import EmptyCartImage from '../../assets/img/empty-cart.svg';
import { Link } from 'react-router-dom';

export const EmptyCart: React.FC = () => {
    return (
        <div className='cart'>
            <div className="cart__container empty-cart">
                <h1 className="empty-cart__title">Cart is empty 😕</h1>
                <p>You have no orders. To order, you need to return to the home page.</p>
                <div className="empty-cart__image">
                    <img src={EmptyCartImage} alt="" />
                </div>
                <div className="empty-cart__home-btn">
                    <Link to={"/"}>Go to orders</Link>
                </div>
            </div>
        </div>
    )
}