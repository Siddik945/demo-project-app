import React, { use } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from '../../fakeData/products.json';

const ProductDetail = () => {
    const {productId} = useParams(); 
    const product = fakeData.find(Pd=> Pd.id === productId);

    return (
        <div>
            <Product product={product} showDisplay="false"></Product>
        </div>
    );
};

export default ProductDetail;