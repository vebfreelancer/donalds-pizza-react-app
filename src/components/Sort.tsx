import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { changeSortType, changeSortDisplay } from '../redux/slices/filterSlice';
import sortIcon from '../assets/img/sort.svg';

function useOutsideClick(ref: React.RefObject<HTMLDivElement>, handler: () => void) {
    useEffect(
        () => {
            const listener = ({ target }: MouseEvent | TouchEvent) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(target as Node)) {
                    return;
                }

                handler();
            };

            document.body.addEventListener("mousedown", listener);
            document.body.addEventListener("touchstart", listener);

            return () => {
                document.body.removeEventListener("mousedown", listener);
                document.body.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

type SortProps = {
    sortType: string;
    sortDisplay: string;
}

const Sort: React.FC<SortProps> = ({ sortType, sortDisplay }) => {
    
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const sortDropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(sortDropdownRef, () => setOpen(false));

    const sortTypesList: any = ['rating', 'price', 'alphabetically'];
    const indexTypeSelected = sortTypesList.findIndex((el: string) => el === sortType);

    const selectOption = (index: number) => {
        dispatch(changeSortType(sortTypesList[index]));
        setOpen(!open);
    }

    const radioCheckedValue = (target: any) => {
        dispatch(changeSortDisplay(target.value));
    }

    const isChecked = (value: string) => value === sortDisplay;

    return (
        <div className="sort">
            <div className={`sort__type`} onClick={() => setOpen(!open)}>
                <div className="sort__row">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C" />
                    </svg>
                    <b>Sorting by:</b>
                </div>
                <span>{sortType}</span>
                {
                    open && 
                    <div ref={sortDropdownRef} className="sort__popup">
                        <ul>
                            {
                                sortTypesList.map((item: string, i: number) => 
                                    <li 
                                        key={i} 
                                        className={indexTypeSelected === i ? 'active' : ''} 
                                        onClick={() => selectOption(i)}
                                    >
                                        {item}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className='sort__display'>
                <img src={sortIcon} alt="Sort" />
                <div className="sort__items">
                    <label htmlFor="ascending">
                        <input 
                            type="radio"   
                            id="ascending" 
                            name="arrange-by" 
                            value="ascending"
                            checked={isChecked('ascending')}
                            onChange={(e) => radioCheckedValue(e.target)}
                        />
                        <span>
                            ascending
                            <i></i>
                        </span>
                    </label>
                    <label htmlFor="descending">
                        <input 
                            type="radio" 
                            id="descending" 
                            name="arrange-by"
                            value="descending"
                            checked={isChecked('descending')}
                            onChange={(e) => radioCheckedValue(e.target)}
                        />
                        <span>
                            desscending
                            <i></i>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
};

export default Sort;