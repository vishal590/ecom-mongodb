import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Order = () => {

  return (
    <Layout title={'Orders'}>
        <div className="container-fluid m-2 p-2">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h3>orders</h3>
                </div>
            </div>
        </div>
        
    </Layout>
  )
}

export default Order