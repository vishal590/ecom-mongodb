import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom'
import "../styles/ProductDetailsStyles.css";


const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);

    useEffect(() => {
        if(params.slug) getProduct()
    },[params?.slug])

    
    const getProduct = async () => {
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            if(data.success){
                console.log(data.product);
                setProduct(data?.product);
                getSimilarProduct(data?.product._id, data?.product.category._id);
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.log(error);
        }
    }

    // get similar product 
    const getSimilarProduct = async (pid, cid) => {
        try{
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            if(data?.success){
                setRelatedProduct(data?.product);
            }else{
                console.log(`Error message: ${data.message}`);
            }
        }catch(error){
            console.log(error);
        }
    }

  return (
    <Layout>
        <div className="row container mt-2">
            <div className="col-md-6">
                <img className="card-img-top" src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} height='450px' width='300px'/>
            </div>
            <div className="col-md-6 text-center">
                <h2>Product Details</h2>
                <h6>Name: {product.name}</h6>
                <h6>Description: {product.description}</h6>
                <h6>Price: {product.price}</h6>
            </div>
        </div>
        <div className="row">
            <h4>Similar Product</h4>
            {relatedProduct.length < 1 && (<p className='text-danger text-center'>No Similar Product Found</p>)}
            <div className="d-flex flex-wrap ">
            {relatedProduct?.map((p) => (
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
                   
                    <button className="btn btn-primary ms-1">
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

export default ProductDetails