import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setCategory(data.product.category);
        setShipping(data.product.shipping);

        console.log(data.product);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to get all categories from category collection
  //   const getAllCategory = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/v1/category/get-category`);

  //       if (data?.success) {
  //         console.log(data.message);
  //         setCategories(data?.category);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    console.log('useEffect Runned')
    getSingleProduct();
  },[]);

  // Update Product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id } = category;
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        console.log("product updated successfully");
        console.log(data.product);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
        console.log(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async() => {
    try{
      let answer = window.confirm('Are you sure, you want to delete this entry?');
      if(!answer) {
        return ;
      }
      const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
      if(data?.success){
        console.log(data.message);
        navigate('/dashboard/admin/products')
      }else{
        console.log(data.message);
      }
    }catch(error){
      console.log(error);
    }
  }


  return (
    <Layout title={"Update Product"}>
      <div className="container-fluid m-2 p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Update Product</h2>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category.name}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  value={description}
                  name=""
                  id=""
                  cols="30"
                  rows="3"
                  placeholder="Write a Description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  placeholder="Write a Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  placeholder="Write a Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" 
                onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
