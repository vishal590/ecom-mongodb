import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";


const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        // console.log(
        //   `all categories: ${JSON.stringify(data.category, null, 4)}`
        // );
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.success) {
        // console.log(`All products: ${JSON.stringify(data.products, null, 4)}`);
        setProducts(data.products);
      } else {
        setLoading(false);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      if (data?.success) {
        // console.log(data.total);
        setTotal(data.total);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(page === 1) return;
    loadMore();
  },[page]);

  const loadMore = async () => {
    try{
      setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products])
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      if (data?.success) {
        console.log(data.products);
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Homepage"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h3 className="text-center">Filters by Category</h3>
          <p>{JSON.stringify(checked, null, 4)}</p>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter */}
          <h3 className="text-center mt-4">Filters by Price</h3>
          <p>{JSON.stringify(radio, null, 4)}</p>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h3 className="text-center">All Products</h3>
          <h3>Products</h3>
          <div className="d-flex flex-wrap ">
            {products?.map((p) => (
              // <Link
              //   to={`/dashboard/admin/product/${p.slug}`}
              //   key={p._id}
              //   className="product-link"
              // >
                <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
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
                    <button className="btn btn-primary ms-1" onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success('item added to cart');
                    }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning"
                onClick={e => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
