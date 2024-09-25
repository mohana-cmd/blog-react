import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import logo from '../../assets/img/logo.png';
import axios from "axios";
import CryptoJS from "crypto-js";


const Login = () =>{

    // const APP_URL = "https://dev-blog-api.myamberinnovations.com/";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const passwordRef = useRef(null);
    const toast = React.useRef(null);

    const encryptionKey = 'AMBERINNOVATIONSBLOG';
    const encryptData = (data) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    };
    

    const validate = () => {
        
        let error = {};
        if (!email) {
            error.email = 'Email is required';
        }
        if (!password) {
            error.password = 'Password is required';
        }
        return error;
      };

    const handleChange = (e) =>{
        const {id , value} = e.target  // extracts the id and value from the event target (the input field).
        setError((prevError) => ({...prevError, [id]: ''})) // it uses current state (prevErrors) to create a new state object where the error message for the specific field being typed in is cleared. // ...prevError -- which copies all properties from prevErrors into a new object.
        if( id === 'email'){
            setEmail(value)
        }
        if( id === 'password'){
            setPassword(value)
        }
    }
    
    const handleLogin = async (e) =>{
        e.preventDefault();
        const validateError = validate();
        console.log(validateError)
        if (Object.keys(validateError).length > 0) {
            setError(validateError);
            return;
          }
        setError({});
        setLoading(true);

        try{
            const encryptedData = encryptData({email,password})
            const response = await axios.post('https://dev-blog-api.myamberinnovations.com/user/login', {
                data: encryptedData
            });
            console.log(response)
            const apiKey = response.data.jwtToken;
            localStorage.setItem('apiKey', apiKey);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category added successfully', life: 3000 });
            navigate('/category-list')

        } catch(err){
            console.log(`Error: ${err.message}`)

        }finally {
            setLoading(false);
        }

        // if (email === "admin" && password === "1234"){
        //     setAuthenticated(true)
        //     navigate('/blog-list')

        // }else{
            
        //     alert('Invalid User')
        //     setEmail('')
        //     setPassword('')
        // }
    }
    
    useEffect(() => {
        if (passwordRef.current) {
            const inputElement = document.querySelector('input.p-password-input');
            if (inputElement) {
              inputElement.id = 'password';
            }
        }

    }, [])
   

    return(
        <div className="top blog-list header-banner">
             <Toast ref={toast} />
            <div className="top-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid">
                                    <a className="navbar-brand">
                                        <img src={logo} alt="logo" />
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="all">
                        <div className="login-screen">
                            <div className="logo"></div>
                            <div className="card">
                                <div className="card-body">
                                    <h3>Login to your account</h3>
                                    <form className="m-4" onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <InputText className="loginInput" id="email" value={email} onChange={handleChange}  placeholder="Email" />
                                            {error.email && <div className="text-danger text-start">{error.email}</div> } 
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <Password className="loginPwd" ref={passwordRef} value={password} onChange={handleChange} toggleMask placeholder="Password"  />
                                            
                                           {error.password && <div className="text-danger text-start">{error.password}</div> } 
                                        </div>
                                       
                                        <Button className="btn btn-primary w-100 mb-2 mt-3 justify-content-center" label="Submit" icon="pi pi-check" loading={loading} />
                                        {/* <button pButton type="button" class="btn btn-primary w-100 mb-2 mt-3 justify-content-center"> 
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span>Login</span></button> */}
                                        <Link to="/forgot-password">Forgot password?</Link>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login