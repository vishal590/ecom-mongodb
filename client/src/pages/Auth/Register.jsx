import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css'


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/api/v1/auth/register',
      {name, email, password, phone, address, answer}
        );
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
    <Layout title={'Register - Ecommerce App'}>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3>Register Form</h3>
              <label htmlFor="exampleInputName" className="form-label">Name</label>
              <input 
               type="text" 
               value={name}
               onChange={(e) => setName(e.target.value)} 
               className="form-control" 
               id="exampleInputEmail1" 
               aria-describedby="emailHelp" required/>
              
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
              <label htmlFor="exampleInputEmail" className="form-label">Phone</label>
              <input  
               type="text" 
               value={phone} 
               onChange={e => setPhone(e.target.value)}
               className="form-control" 
               id="exampleInputEmail1" 
               aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">Address</label>
              <input 
               type="text" 
               value={address}
               onChange={e => setAddress(e.target.value)} 
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
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">Answer</label>
              <input  
               type="text" 
               value={answer} 
               onChange={e => setAnswer(e.target.value)}
               className="form-control" 
               id="exampleInputEmail1" 
               aria-describedby="emailHelp" required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    </Layout>
  )
}

export default Register