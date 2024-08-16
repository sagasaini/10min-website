import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const auth = getAuth(app);

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isAdmin: false // Assuming default value for isAdmin
    });

    const signUp = async () => {
        if (formFields.email !== "" && formFields.password !== "" && formFields.confirmPassword !== "" && formFields.name !== "" && formFields.phone !== "") {
            setShowLoader(true);
            try {
                const userData = {
                    name: formFields.name,
                    email: formFields.email,
                    phone: formFields.phone,
                    password: formFields.password,
                    isAdmin: formFields.isAdmin
                };

                // Example using axios
                const response = await axios.post('https://10min.in/api/api/user/signup', userData);

                // Handle success
                setShowLoader(false);
                console.log('User signed up successfully!', response.data);

                // Reset formFields state
                setFormFields({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    isAdmin: false
                });
            } catch (error) {
                setShowLoader(false);
                console.error('Error signing up:', error);
                alert(error.message || 'Failed to sign up');
            }
        } else {
            alert("Please fill all the details");
        }
    };

    const onChangeField = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    return (
        <>
            <section className='signIn mb-5'>
                <div className="breadcrumbWrapper res-hide">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Home</Link></li>
                            <li>SignUp</li>
                        </ul>
                    </div>
                </div>

                <div className='loginWrapper'>
                    <div className='card shadow'>
                        <Backdrop
                            sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={showLoader}
                            className="formLoader"
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <h3>SignUp</h3>
                        <form className='mt-4'>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="name" type="text" name='name' label="Name" className='w-100' onChange={onChangeField} value={formFields.name} />
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100' onChange={onChangeField} value={formFields.email} />
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="phone" type="tel" name='phone' label="Phone" className='w-100' onChange={onChangeField} value={formFields.phone} />
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100' onChange={onChangeField} value={formFields.password} />
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="confirmPassword" type={showPassword1 === false ? 'password' : 'text'} name='confirmPassword' label="Confirm Password" className='w-100' onChange={onChangeField} value={formFields.confirmPassword} />
                                    <Button className='icon' onClick={() => setShowPassword1(!showPassword1)}>
                                        {showPassword1 === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>

                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button className='btn btn-g btn-lg w-100' onClick={signUp}>Sign Up</Button>
                            </div>

                            <p className='text-center'>Already have an account
                                <b> <Link to="/signIn">Sign In</Link>
                                </b>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
