import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();

    const getProductByCat = async () => {
        try{
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            
            if(data.success){
                console.log(data.products);
                setProducts(data?.products);
                setCategory(data?.category);
            }else{
                console.log(data.message);
            }

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(params?.slug) getProductByCat();
    },[params?.slug])

  return (
    <Layout>
        <div className="container">
            <h4 className="text-center">Category: {category?.name}</h4>
            <h4 className="text-center">{products?.length} result found</h4>
        </div>
    </Layout>
  )
}

export default CategoryProduct