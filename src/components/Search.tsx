import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { changeSearch } from "../redux/slices/searchSlice";
import debounce from "lodash.debounce";


const Search: React.FC = () => {

    const dispatch = useDispatch();
    const searchRef = useRef<HTMLInputElement>(null);

    const plaseholderValue = 'Pizza search ...';
    const [placeholder, setPlaceholder] = useState(plaseholderValue);
    const [searchValue, setSearchValue] = useState('');

    const debounceChecker = useCallback(
        debounce((value: string) => {
            dispatch(changeSearch(value));
        }, 500),
        []
    );

    const onChangeInput = (value: string) => {
        setSearchValue(value);
        debounceChecker(value);
    };

    const clearSearch = () => {
        setSearchValue('');
        debounceChecker('');
        if (searchRef.current) searchRef.current.focus();
    }

    return (
        <div className="search">
            <input
                ref={searchRef}
                type="text"
                className="search__input"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => onChangeInput(e.target.value)}
                onFocus={() => setPlaceholder('')}
                onBlur={() => setPlaceholder(plaseholderValue)}
            />
            {
                searchValue &&
                <svg 
                    onClick={() => clearSearch()}
                    className="search__clear" 
                    fill="currentColor"
                    viewBox="0 0 512 512" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                </svg>
            }
        </div>
    )
}

export default Search;