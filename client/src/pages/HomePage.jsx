import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import {useAuth} from '../context/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Checkbox} from 'antd'


const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        console.log(`all categories: ${JSON.stringify(data.category, null, 4)}`)
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // get products 
  const getAllProducts = async () => {
    try{
      const {data} = await axios.get(`/api/v1/product/get-product`);
      if(data?.success){
        console.log(`All products: ${JSON.stringify(data.products, null, 4)}`);
        setProducts(data.products);
      }else{
        console.log(data.message);
      }
    }catch(error){
      console.log(error);
    }
  }
  
  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, [])

  return (
    <Layout title={'Homepage'}>
       <div className="row mt-3">
        <div className="col-md-3">
          <h3 className="text-center">Filters by Category</h3>
          <p>{JSON.stringify(checked, null, 4)}</p>
          <div className="d-flex flex-column">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={e => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <h3 className="text-center">All Products</h3>
          <h3>Products</h3>
          <div className="d-flex flex-wrap ">
          {products?.map((p) => (
            <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link">
              <div className="card m-2" style={{ width: "18rem" }} >
                <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description}
                  </p>
                  <button className="btn btn-primary ms-1">
                    More Details
                  </button>
                  <button className="btn btn-primary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
       </div>
    </Layout>
  )
}

export default HomePage