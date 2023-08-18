import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import {useAuth} from '../context/auth'
import axios from 'axios'

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // get products 
  const getAllProducts = async () => {
    try{
      const {data} = await axios.get(`/api/v1/product/get-product`);
      if(data?.success){
        console.log(data.products);
        setProducts(data.products);
      }else{
        console.log(data.message);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout title={'Homepage'}>
       <div className="row mt-3">
        <div className="col-md-3">
          <h3 className="text-center">Filters by Category</h3>
        </div>
        <div className="col-md-9">
          <h3 className="text-center">All Products</h3>
          <h3>Products</h3>
          <div className="d-flex flex-wrap ">
          
              {products.map(item => (
                <div className="col-md-3 mx-3">
                  <h2 className="">{item.name}</h2>
                  <div>
                    <img src={`/api/v1/product/product-photo/${item._id}`} width='100%' height='100%' alt="" />
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
          
          </div>
        </div>
       </div>
    </Layout>
  )
}

export default HomePage