import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";


const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h5>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h5>
          <div className="d-flex flex-wrap ">
            {values.results?.map((p) => (
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
  );
};

export default Search;
