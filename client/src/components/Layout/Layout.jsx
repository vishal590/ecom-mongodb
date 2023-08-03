import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import {Helmet} from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children, title, description,keywords, author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{
        minHeight: '80vh',
      }}>
        {/* <Toaster /> */}
        {children}
      </main>
      <Footer/>
    </div>
  )
};

Layout.defaultProps = {
  title: 'Ecommerce App',
  description: 'mern project',
  keyowrds: 'mern, react',
  author: 'akshay',
}
  

export default Layout