import React,{useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const Spinner = ({path = 'login'}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)

        count === 0 && navigate(`/${path}`,{
            state: location.pathname
        })

        return () => clearInterval(interval)

    }, [count, navigate, location, path])

  return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 ">
                <h1 
                    className="text-center mb-12"
                    style={{marginBottom: '42px'}}
                >
                    Redirecting to Login page in {count} seconds....</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
  )
}

export default Spinner