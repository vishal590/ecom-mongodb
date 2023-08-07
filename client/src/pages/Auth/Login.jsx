import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css'
import { useAuth } from '../../context/auth';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth();


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/api/v1/auth/login',{
        email, 
        password,
      });
        if(res.data.success){
          toast.success(res.data.message)
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });

          localStorage.setItem('auth', JSON.stringify(res.data))
          // localStorage is web storage api, its an object and store data only in string format.
          
          navigate('/');
        }else{
          toast.error(res.data.message)
        }
    }catch(error){
      console.log(`catch error: ${error}`)
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <Layout title={'Register - Ecommerce App'}>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3>Register Form</h3>
              
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">Email</label>
              <input 
               type="email" 
               value={email} 
               onChange={e => setEmail(e.target.value)}
               className="form-control" 
               id="exampleInputEmail1" 
               aria-describedby="emailHelp" required/>
              
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input 
               type="password" 
               value={password}
               onChange={e => setPassword(e.target.value)} 
               className="form-control" 
               id="exampleInputPassword1" />
            </div>
            <div style={{marginBottom: '7px'}}>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <div>
              <button type="submit" className="btn btn-primary" onClick={() => navigate('/forgot-password')}>Forgot Password</button>
            </div>
          </form>
        </div>
    </Layout>
  )
}

export default Login;