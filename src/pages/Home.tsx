import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters } from '../redux/slices/filterSlice';
import { FetchItem, fetchData } from '../redux/slices/getResponseSlice';
import { useAppDispatch } from '../redux/store';

import { Sort, Categories, Sceleton, ProductCard, Crash } from '../components';

const patternCategory = (category: number) => {
    return (item: FetchItem) => category ? item.category === category : item;
}

const patternSort = (sortType: 'rating' | 'price' | 'alphabetically', sortDisplay: 'ascending' | 'descending') => {

    const rules = {
        type: {
            rating: 'rating',
            price: 'price',
            alphabetically: 'alphabetically'
        },
        display: {
            ascending: (a: any, b: any) => a[rules.type[sortType]] - b[rules.type[sortType]],
            descending: (a: any, b: any) => b[rules.type[sortType]] - a[rules.type[sortType]]
        },
        abcDisplay: {
            ascending: (a: FetchItem, b: FetchItem) => a.title[0].localeCompare(b.title[0]),
            descending: (a: FetchItem, b: FetchItem) => b.title[0].localeCompare(a.title[0])
        }
    }
    
    return sortType !== 'alphabetically' ? rules.display[sortDisplay] : rules.abcDisplay[sortDisplay];
}

const patternSearch = (searchValue: string) => {
    return (item: FetchItem) => item.title.toLowerCase().includes(searchValue.toLowerCase())
}

const Home: React.FC = () => {
    const isParams = useRef(false);
    const isMounted = useRef(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const search = useSelector((state: any) => state.search.value);
    const filter = useSelector((state: any) => state.filter);
    const { items, status } = useSelector((state: any) => state.response);

    const category = filter.category;
    const sortType = filter.sort.type;
    const sortDisplay = filter.sort.displayBy;

    let DATAFILTER = [...items]
        .filter(patternCategory(category))
        .sort(patternSort(sortType, sortDisplay));

    if (search) {
        DATAFILTER = [...DATAFILTER].filter(patternSearch(search));
    }

    const getResponse = () => {
        // fetch('http://localhost:3000/db.json')
        //     .then((res) => res.json())
        //     .then((JSON) => {
        //         setData(JSON);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         alert('An error occurred while receiving data from the server.');
        //     })

        // https://my.api.mockaroo.com/pizzas.json?key=a152ed40

        dispatch(fetchData());
    }

    useEffect(() => {
        if (!isParams.current) getResponse();

        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (window.location.search) {
            const params: any = qs.parse(window.location.search.substring(1));
            
            dispatch(setFilters(params));

            isParams.current = true;
        }
    }, [dispatch])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                category: category,
                type: sortType,
                displayBy: sortDisplay
            })
            
            navigate(`?${queryString}`)
        }

        isMounted.current = true;
    }, [category, sortType, sortDisplay, navigate])

    const listCategories = ['All pizzas', 'Meat pizzas', 'Vegetarian pizzas', 'Pizza grill', 'Spicy pizzas', 'Closed pizzas']
    
    return (
        <div className="content">
            <div className="content__container container">
                {   
                    status === 'error' ? <Crash status={status} />
                        :
                    status === 'loading' ?
                        <div className="content__sceleton">
                            {
                                [...Array(8)].map((_, i) => <Sceleton key={i} />)
                            }
                        </div> 
                            :
                        DATAFILTER.length ?
                        <>
                            <div className="content__header options">
                                <div className='options__categories'>
                                    <Categories category={category} />
                                </div>
                                <div className='options__filters'>
                                    <h2 className="options__title">{listCategories[category]}</h2>
                                    <Sort sortType={sortType} sortDisplay={sortDisplay} />
                                </div>
                            </div>
                            <div className="content__items">
                                {
                                    DATAFILTER.map((item) => <ProductCard key={item.id} {...item}/>)
                                }
                            </div>
                        </> 
                            : 
                        <Crash status={status} />
                }
            </div>
        </div>
    )
}

export default Home;