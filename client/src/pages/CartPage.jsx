import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // total price
    const totalPrice = () => {
        try{
            let total = 0;
           cart?.map(item => {
            total = total + parseInt(item.price);
            // console.log(typeof total)
        })
            return total

        }catch(error){
            console.log(error)
        }
    }


    // delete item
    const removeCartItem = (pid) => {
        try{    
            let myCart = [...cart];
            const index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        }catch(error){
            console.log(error)
        }
    }

  return (
    <Layout>
        <div className="container">
            <div className="row">   
                <div className="col-md-12">
                    <h2 className="text-center bg-light p-2 mb-1">
                        {`Hello ${auth?.token && auth?.user?.name} `}
                    </h2>
                    <h4 className="text-center">
                        {cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "YOu have to login to checkout"} ` : 'Your cart is Empty'}
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    {
                        cart?.map(p => (
                            <div className="row card flex-row my-2" >
                                <div className="col-md-4">
                                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='card-img-top' width={'200px'} height={'200px'}/>
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 20)}...</p>
                                    <h4>Price: {p.price}</h4>
                                    <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-4">
                    <h4>Cart Summary</h4>
                    <hr />
                    <h5>Total: {totalPrice()}</h5>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage