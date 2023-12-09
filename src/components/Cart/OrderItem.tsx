import React from "react";
import { useDispatch } from "react-redux";
import { currency } from "../../utils/currency";
import { minusItem, plusItem, removeItem } from "../../redux/slices/cartSlice";

type OrderItemProps = {
    title: string,
    type: string,
    size: number,
    price: number,
    count: number,
    imageUrl: string,
    index: number
}

export const OrderItem: React.FC<OrderItemProps> = ({ title, type, size, price, count, imageUrl, index }) => {
    const dispatch = useDispatch();

    const onClickPlus = () => {
        dispatch(plusItem(index));
    }

    const onClickMinus = () => {
        dispatch(minusItem(index));
    }

    const onClickRemove = () => {
        if (window.confirm('Do you really want to delete this order?')) dispatch(removeItem(index));
    }

    return (
        <li className="order-item">
            <div className="order-item__info">
                <img src={imageUrl} alt="" />
                <div className="order-item__wrapper">
                    <h4 className="order-item__title">{title}</h4>
                    <span>{type}</span>
                    <span>{size} cm.</span>
                </div>
            </div>
            <div className="order-item__row">
                <div className="order-item__quantity">
                    <button type="button" className="decrement" disabled={count === 1} onClick={onClickMinus}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" />
                        </svg>
                    </button>
                    <span>{count}</span>
                    <button type="button" className="increment" onClick={onClickPlus}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" />
                            <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" />
                        </svg>
                    </button>
                </div>
                <span className="order-item__price">{currency(price * count)}</span>
                <button type="button" className="order-item__delete" onClick={onClickRemove}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="15" fill="#f9f9f9" strokeWidth="2" />
                        <path d="M19.7479 17.9557L17.4993 15.7071L19.7479 13.4585C20.1618 13.0446 20.1618 12.3734 19.7479 11.9595C19.334 11.5455 18.6628 11.5455 18.2488 11.9595L16.0002 14.2081L13.7516 11.9595C13.3377 11.5455 12.6665 11.5455 12.2526 11.9595C11.8386 12.3734 11.8386 13.0446 12.2526 13.4585L14.5012 15.7071L12.2526 17.9557C11.8386 18.3696 11.8386 19.0409 12.2526 19.4548C12.6665 19.8687 13.3377 19.8687 13.7516 19.4548L16.0002 17.2062L18.2488 19.4548C18.6628 19.8687 19.334 19.8687 19.7479 19.4548C20.1618 19.0409 20.1618 18.3696 19.7479 17.9557Z" />
                    </svg>
                </button>
            </div>
        </li>
    );
};