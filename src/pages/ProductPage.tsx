import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import { currency } from '../utils/currency';
import { Loading } from '../components';

type Item = {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}[]

const ProductPage: React.FC = () => {
    const [items, setItems] = useState<Item>();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                // https://my.api.mockaroo.com/pizzas.json?key=a152ed40
                const { data } = await axios.get('https://my.api.mockaroo.com/pizzas.json?key=a152ed40');
                setItems(data);
            } catch (error) {
                alert('An error occurred while receiving data😕');
                navigate('/');
            }
        }
        fetchData();
    }, []);

    if (!items) {
        return (
            <Loading />
        );
    } 
    
    if (id) {
        const findId = items.find(obj => obj.id === +id);
    
        return (
            findId && 
            <div className='page-wrapper'>
                <div className='content-wrapper'>
                    <div className='content'>
                        <div className="container">
                            <div className="product-page">
                                <div className="product-page__image">
                                    <img src={findId.imageUrl} alt="Pizza" />
                                </div>
                                <div className='product-page__info'>
                                    <h1 className="product-page__title">{findId.title}</h1>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis totam, pariatur omnis eius doloremque explicabo, vero reiciendis dolor similique voluptatum assumenda dolore beatae in. Eveniet ipsum corporis obcaecati facere!
                                    </p>
                                    <div className="product-page__bottom">
                                        <span className="product-page__price">{currency(findId.price)}</span>
                                        <Link to={"/"} className="come-back-btn">
                                            <svg viewBox="0 0 8 14" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 13L1 6.93015L6.86175 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Come back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default ProductPage;