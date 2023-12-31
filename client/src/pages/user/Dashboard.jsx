import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'


const Dashboard = () => {
  const [auth, setAuth] = useAuth()

  return (
    <Layout title={'User Dashboard'}>
      <div className="container-fluid m-2 p-2">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.address}</h3>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard