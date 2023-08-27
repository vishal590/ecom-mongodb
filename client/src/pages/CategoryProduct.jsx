import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

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
            <div className="d-flex flex-wrap ">
            {products?.map((p) => (
              <Link
                to={`/dashboard/admin/product/${p.slug}`}
                key={p._id}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">$ {p.price}</p>
                    <p className="card-text">
                      {p.description.substring(0, 25)}...
                    </p>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-primary ms-1" onClick={() => setCart([...cart, p])}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct