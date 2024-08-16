import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import GoogleImg from '../../assets/images/google.png';
import { MyContext } from '../../App';

const Forgot = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const onChangeField = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormFields(() => ({
            ...formFields,
            [name]: value,
        }));
    };

    const signIn = async () => {
        if (formFields.email !== "" && formFields.password !== "") {
            setShowLoader(true);
            try {
                const response = await axios.post('https://10min.in/api/api/user/signin', {
                    email: formFields.email,
                    password: formFields.password,
                });

                // Handle success
                setShowLoader(false);
                console.log('User signed in successfully!', response.data);

                localStorage.setItem('isLogin', true);
                context.signIn();
                navigate('/');
            } catch (error) {
                setShowLoader(false);
                console.error('Error signing in:', error);
                alert(error.response?.data?.message || 'Failed to sign in');
            }
        } else {
            alert("Please fill all the details");
        }
    };

    

    return (
        <>
            <section className='signIn mb-5'>
                <div className="breadcrumbWrapper">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Home</Link></li>
                            <li>Sign In</li>
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

                        <h3>Forgot Password</h3>
                        <form className='mt-4'>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100'
                                    onChange={onChangeField} value={formFields.email} />
                            </div>
                            {/* <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100'
                                        onChange={onChangeField} value={formFields.password} />
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </Button>
                                </div>
                            </div> */}

                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button className='btn btn-g btn-lg w-100' onClick={signIn}>Reset</Button>
                            </div>

                            {/* <div className='form-group mt-5 mb-4 w-100 signInOr'>
                                <p className='text-center'>OR</p>
                                <Button className='w-100' variant="outlined" onClick={signInWithGoogle}><img src={GoogleImg} alt="Google logo" />
                                    Sign In with Google</Button>
                            </div> */}

                            <p className='text-center'>Not have an account
                                <b> <Link to="/signup">Sign Up</Link>
                                </b>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Forgot;
