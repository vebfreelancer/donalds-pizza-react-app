import React, { Suspense } from "react";
import {
	Routes,
	Route,
    HashRouter
} from "react-router-dom";

import { store } from './redux/store';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Header from './components/Header';
import './scss/app.scss';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart'*/'./pages/Cart'));
const ProductPage = React.lazy(() => import(/*webpackChunkName: 'ProductPage'*/'./pages/ProductPage'));
const NotFound = React.lazy(() => import(/*webpackChunkName: 'NotFound'*/'./pages/NotFound'));

function App() {

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <HashRouter>
                    <Provider store={store}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={
                                <Suspense fallback={<div className="container">Loading cart...</div>}>
                                    <Cart />
                                </Suspense>
                            } />
                            <Route path="/product/:id" element={
                                <Suspense fallback={<div className="container">Loading...</div>}>
                                    <ProductPage />
                                </Suspense>
                            } />
                            <Route path="*" element={
                                <Suspense fallback={<div className="container">Loading...</div>}>
                                    <NotFound />
                                </Suspense>
                            } />
                        </Routes>
                    </Provider>
                </HashRouter>
            </div>
        </div>
    );
}

export default App;
