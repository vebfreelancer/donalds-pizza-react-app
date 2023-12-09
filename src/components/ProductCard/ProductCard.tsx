import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { currency } from '../../utils/currency';

import { useDispatch, useSelector } from 'react-redux';
import { OrderItem, addItem } from '../../redux/slices/cartSlice';

const thickness = ['thin', 'traditional'];

type ProductCardProps = {
    id: number,
    imageUrl: string,
    price: number,
    title: string,
    types: number[],
    sizes: number[],
    rating: number
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, price, title, types, sizes, rating }) => {
    const [size, setSize] = useState(0);
    const [type, setType] = useState(0);
    const dispatch = useDispatch();

    const addedCount = useSelector((state: any) => state.cart.items
        .filter((obj: any) => obj.id === id)
        .reduce((sum: number, item: any) => sum + item.count, 0));

    const stars = [
        '223.34 97.45 206.77 88.82 190.27 97.58 193.36 79.16 179.94 66.17 198.41 63.41 206.61 46.63 214.94 63.35 233.44 65.97 220.11 79.05 223.34 97.45',
        '294.23 97.45 277.66 88.82 261.16 97.58 264.25 79.16 250.83 66.17 269.3 63.41 277.5 46.63 285.83 63.35 304.32 65.97 291 79.05 294.23 97.45',
        '365.12 97.45 348.55 88.82 332.05 97.58 335.14 79.16 321.72 66.17 340.19 63.41 348.39 46.63 356.72 63.35 375.22 65.97 361.89 79.05 365.12 97.45',
        '436.01 97.45 419.44 88.82 402.94 97.58 406.03 79.16 392.61 66.17 411.08 63.41 419.28 46.63 427.61 63.35 446.11 65.97 432.78 79.05 436.01 97.45',
        '503.68 79.06 506.91 97.45 490.33 88.83 490.31 88.83 473.84 97.58 476.92 79.16 463.5 66.17 481.97 63.42 490.18 46.63 490.31 46.9 498.5 63.35 516.99 65.97 503.68 79.06',
    ];

    const onClickAdd = () => {
        const item: OrderItem = {
            id,
            imageUrl,
            price,
            title,
            type: thickness[type],
            size: sizes[size],
            count: 0
        }

        dispatch(addItem(item));
    };

    return (
        <div className="pizza-card">
            <Link to={`/product/${id}`}>
                <img src={imageUrl} className="pizza-card__image" alt="Pizza" />
            </Link>
            <div className="pizza-card__info">
                <div className="pizza-card__rating">
                    <div className="pizza-card__rate-wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.29 147.67">
                            <g data-name="Layer 2">
                                <g data-name="Layer 1">
                                    <path
                                        d="M508.33,121H79.64c-25.28,0-46-21.2-46-47.11h0c0-25.91,20.68-47.11,46-47.11H508.33c25.28,0,46,21.2,46,47.11h0C554.29,99.79,533.61,121,508.33,121Z"
                                        fill="#232323"
                                    />
                                    {stars.map((item, i) => (
                                        <polygon
                                            key={i}
                                            opacity={i < rating ? 1 : 0.5}
                                            points={item}
                                            fill="#fe5f1e"
                                        />
                                    ))}
                                    <circle className="rate-circle" cx="73.84" cy="73.84" r="73.9" fill="#fe5f1e" />
                                </g>
                            </g>
                        </svg>
                        <span>{rating}</span>
                    </div>
                </div>
                <Link className='pizza-card__link' to={`/product/${id}`}>
                    <h4 className="pizza-card__title">{title}</h4>
                </Link>
                <div className="pizza-card__selector">
                    <ul>
                        {types.map((el, i) => (
                            <li
                                key={el}
                                className={type === i ? 'active' : ''}
                                onClick={() => setType(i)}>
                                {thickness[el]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((el, i) => (
                            <li
                                key={i}
                                className={size === i ? 'active' : ''}
                                onClick={() => setSize(i)}>
                                {el} cm.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-card__bottom">
                    <div className="pizza-card__price">{currency(price)}</div>
                    <button className="button button--outline button--add" onClick={onClickAdd}>
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                fill="#EB5A1E"
                            />
                            <path
                                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                fill="#EB5A1E"
                            />
                        </svg>
                        <span>Add</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
