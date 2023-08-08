import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout title={'Users'}>
        <div className="container-fluid m-2 p-2">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                <h4>Users</h4>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Users