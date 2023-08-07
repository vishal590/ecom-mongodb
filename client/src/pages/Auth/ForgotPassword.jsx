import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css'
import { useAuth } from '../../context/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate()
  
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      try{
        const res = await axios.post('/api/v1/auth/forgot-password',{
          email, 
          newPassword,
          answer,
        });
          if(res.data.success){
            toast.success(res.data.message)
  
            navigate('/login');
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
    <Layout title={'Forgot Password'}>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3>Reset Forgot Password</h3>
              
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
              <label htmlFor="exampleInputEmail" className="form-label">Secret Answer</label>
              <input 
               type="text" 
               value={answer} 
               onChange={e => setAnswer(e.target.value)}
               className="form-control" 
               id="exampleInputEmail1" 
               aria-describedby="emailHelp" required/>
              
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
              <input 
               type="password" 
               value={newPassword}
               onChange={e => setNewPassword(e.target.value)} 
               className="form-control" 
               id="exampleInputPassword1" />
            </div>
            <div style={{marginBottom: '7px'}}>
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Reset Password</button>
            </div>
            
          </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword