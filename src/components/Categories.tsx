import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../redux/slices/filterSlice';

const Categories: React.FC<{category: number}> = ({ category }) => {

    const [startScroll, setStartScroll] = useState(true);
    const [endScroll, setEndScroll] = useState(false);
    
    const dispatch = useDispatch();

    const scrollPosition = (e: any) => {

        const target = e.target

        if (target.scrollLeft <= 5 && !startScroll) {
            target.classList.add('start');
            setStartScroll(true);
        }

        if (target.scrollLeft > 5 && startScroll) {
            target.classList.remove('start');
            setStartScroll(false);
        }

        if ((target.scrollLeft + target.clientWidth) >= (target.scrollWidth - 5) && !endScroll) {
            target.classList.add('end');
            setEndScroll(true);
        }

        if ((target.scrollLeft + target.clientWidth) < (target.scrollWidth - 5) && endScroll) {
            target.classList.remove('end');
            setEndScroll(false);
        }
    }

    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

    return (
        <ul 
            className="categories start"
            onScroll={(e) => scrollPosition(e)}
        >
            {
                categories.map((cat, i) => 
                    <li key={i}
                        onClick={() => dispatch(changeCategory(i))}
                        className={category === i ? 'active' : ''}
                    >
                        {cat}
                    </li>
                )
            }
        </ul>
    );
};

export default Categories;