import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import atorat from './../assets/MascotSIgnupin.0d5717a1a11571a65015529ba00c49e0.svg'
import star from './../assets/Star3green.24e93312558a164fd9e02634909138a2.svg'
import caka from './../assets/TennisGreenMoon.13a3470604224dd86e26f71f5024309b.svg'
import { motion } from 'framer-motion';
import google from './../assets/icons8-google.svg';
import github from './../assets/icons8-github.svg'
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';
import auth from '../Firebase/Firebase.in';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

const LogIn = () => {
    const [Sesscss, setSesscss] = useState(false);
    const [error, setError] = useState('')
    const [showEyes, setShowEyes] = useState(false)
    const refemail=useRef()
    
 
    const handelonSubmit = (e) => {
        setSesscss(false)
        setError('')
        setShowEyes(true)

        e.preventDefault();
        const password = e.target.password.value;
        const email = e.target.email.value;
        console.log(email, password)
        //Sign in firebase.........
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                //
                if(!result.user.emailVerified) {
                    setError('Please your Email Varification')
                }
                else { setSesscss(true) }
            })

            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    //sent a password reset email........./
    const handelforgetPassword =()=>{
       const email=refemail.current.value;
        setSesscss(false)
        if(!email){
            setError("Please enter your email")}
        else{
            sendPasswordResetEmail(auth , email)
            .then(()=>{
                toast("Password reset email sent!");
            })
            .catch((error)=>{
                setError(error.message)
            })
        }
            
    }

     //Google log in atuo....
    const provider = new GoogleAuthProvider();
    const handelgoogle = () => {
        setSesscss(false)
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                setSesscss(true)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    // //Github log in atuo.............>>
    const provoiderGithub = new GithubAuthProvider();
    const handelGithub = () => {
        setSesscss(false)
        signInWithPopup(auth, provoiderGithub)
            .then((result) => {
                console.log(result)
                setSesscss(true)
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    return (
        <div className='bg-neutral-900 min-h-screen' >
            <div><ToastContainer /></div>
            <div className='mx-4 py-15 grid justify-center items-center md:min-h-screen  '>
                {/* grid justify-center items-center min-h-screen */}
                <section className='relative'>
                    <div className=''>
                        <h1 className='font-bold text-center text-3xl mb-8 text-amber-50'>Welcome <span className='font-bold text-lime-300'>black!</span></h1>
                    </div>

                    <form onSubmit={handelonSubmit} className='mb-6 w-auto md:w-95 relative'>

                        {/* User Email addess.. */}
                        <div className='mb-5'>
                            <h1 className='text-xl text-gray-400 mb-2'>Email*</h1>
                            <input ref={refemail} type="email" name="email" id="" className='input bg-gray-600 w-full mb-2' />
                        </div>
                        {/* user Password... */}

                        <h1 className='text-xl text-gray-400 mb-2'>Password*</h1>
                        <input type={showEyes ? "password" : "text"} name="password" id="" className='input bg-gray-600 w-full mb-2 ' />

                        {/* ShowPassWord.......eyes */}
                        <a onClick={() => setShowEyes(!showEyes)} className='text-xl absolute right-3 mt-2.5'>{showEyes ? <FaEye /> : <FaEyeSlash />}</a>

                        <Link onClick={handelforgetPassword} className='flex gap-1 justify-end text-md text-gray-300  mb-5 hover:underline'>Forget Password !</Link>

                        {/*Sign Up  Button..... */}
                        <button className='text-gray-700 font-bold text-xl py-3 rounded-xl w-full bg-lime-400 hover:bg-lime-200'>Log in</button>

                        {/* Error && Sesscss messess */}
                        <div className='text-center mt-2'>
                            {Sesscss && <p className='text-green-300'>Log In Success</p>}
                            {error && <p className='text-red-400 '>{error}</p>}
                        </div>

                    </form>


                    <div className="divider divider-primary font-bold">OR</div>
                    {/*users  google && GitHub Sign Up*/}

                    <div className='md:flex gap-3 mb-2'>
                        <div className='md:w-1/2 mb-3'>

                            <button onClick={handelgoogle} className=' bg-gray-500 w-full text-xl py-3 rounded-xl font-bold flex items-center justify-center gap-2'> <img className='w-7' src={google} alt="" />Google</button>
                        </div>

                        <div className='md:w-1/2'>
                            <button onClick={handelGithub} className=' bg-gray-500 w-full text-xl py-3 rounded-xl font-bold flex justify-center items-center gap-2'>
                                <img className='w-7' src={github} alt="" />  GithHub</button>
                        </div>
                    </div>

                    <div className='text-center'>
                        <h1 className='text-gray-400 text-xl'>Don't have an account? <Link to='/' className='font-bold text-lime-200 '>Sign up</Link> </h1>
                    </div>

                    {/*..............Image...add....&&.....animation .......................................>>> */}
                    <div className='hidden md:block'>
                        {/* Right side img && animation */}
                        <div>
                            <motion.img className='absolute left-150 bottom-10 w-60 '
                                src={atorat} alt=""


                                animate={{
                                    opacity: 1, y: [0, 20, 0],
                                    rotate: [-5, 0, -5],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                    repeatDelay: 4
                                }}
                            />

                            <motion.img src={star}
                                animate={{ rotate: [0, 60, 0], scale: [1, 1.3, 1], }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', repeatDelay: 6 }}
                                className='absolute -right-140 top-20 w-15 ' alt="" />

                            <motion.img src={star}
                                animate={{ rotate: [0, 60, 0], scale: [1, 1.3, 1], }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', repeatDelay: 2 }}
                                className='absolute -right-90 top-140 w-10 ' alt="" />
                        </div>
                        {/* left side img && animation */}
                        <motion.img animate={{ rotate: [0, 60, 0], scale: [1, 1.3, 1], }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', repeatDelay: 2.5 }} src={star} className='absolute right-90 -top-20 w-10 ' alt="" />

                        < motion.img animate={{ rotate: [0, 60, 0], scale: [1, 1.3, 1], }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', repeatDelay: 5 }}
                            src={star} className='absolute -left-140 top-0 w-18 ' alt="" />

                        <motion.img animate={{ rotate: [0, 60, 0], scale: [1, 1.3, 1], }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', repeatDelay: 3 }}
                            src={star} className='absolute -left-135 bottom-25 w-10 ' alt="" />
                        <img src={caka} className='absolute right-180 bottom- w-40 ' alt="" />


                    </div>
                </section>

            </div>
            <div className='text-center'>
                <h1 className='text-gray-400'>By sign up, you agree to our</h1>
                <h1 className='text-gray-400'><span className='text-emerald-50 font-bold'>Terms of Service</span> and <span className='text-emerald-50 font-bold'>Privacy Policy</span></h1>
            </div>
        </div>
    );
};

export default LogIn;