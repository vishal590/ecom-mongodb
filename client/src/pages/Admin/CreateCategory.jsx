import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data && data.success) {
        toast.success(data.message);
        getAllCategory()
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Create Category"}>
      <div className="container-fluid m-2 p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Create Category</h2>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-50">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2">Edit</button>
                          <button className="btn btn-danger ms-2">Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
