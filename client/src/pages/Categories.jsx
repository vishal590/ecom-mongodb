import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'


const Categories = () => {
    const categories = useCategory();

  return (
    <Layout title={'All Categories'}>
        <div className="container">
            <div className="row">
                {categories?.map((c) => (
                    <div className="col-md-6 g-5" key={c._id}>
                        <Link to={`/category/${c.slug}`} className='btn btn-warning'>{c.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories