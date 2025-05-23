import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import atorat from './../assets/MascotSIgnupin.0d5717a1a11571a65015529ba00c49e0.svg'
import star from './../assets/Star3green.24e93312558a164fd9e02634909138a2.svg'
import caka from './../assets/TennisGreenMoon.13a3470604224dd86e26f71f5024309b.svg'
import { motion } from 'framer-motion';
import './Singup.css';
import google from './../assets/icons8-google.svg';
import github from './../assets/icons8-github.svg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup, updateProfile } from "firebase/auth";
import auth from '../Firebase/Firebase.in';
import { ToastContainer, toast } from 'react-toastify';

const SignUP = () => {
    const [showEyes, setShowEyes] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [Lowercase, setLowercase] = useState(false)
    const [UpparCase, setUpparCase] = useState(false)
    const [SpecialChar, setSpecialChar] = useState(false)
    const [numberchack, setNumberchack] = useState(false)

    //notification toast.....
    

    //user ar parsonal data lode...handleOneSubmit...>>
    const handelOnSubmit = (event) => {
        //Onclick all massess false.....
        setPasswordLength(false)
        setSuccess(false)
        setError('')
        setShowEyes(true)
        setLowercase(false)
        setUpparCase(false)
        setSpecialChar(false)
        setNumberchack(false)

        //user input data...value
        event.preventDefault()
        const FirstName = event.target.firstname.value;
        const LastName = event.target.lastname.value
        const email = event.target.email.value
        const password = event.target.password.value
        // const Email=event
        console.log(FirstName, LastName, email, password)
        //password-6 digits chacks......>
        if (password.length < 6) {
            setPasswordLength(true)
            return;
        }
        // Number.. password .. add ..chack...>
        const number = /[0-9]/
        if (!number.test(password)) {
            setNumberchack(true)
            return;
        }
        //Lower...case..Chacks..>
        const Lower = /[a-z]/;
        if (!Lower.test(password)) {
            setLowercase(true)
            return;
        }
        //Upper...case..Chack...>
        const Uppar = /[A-Z]/;
        if (!Uppar.test(password)) {
            setUpparCase(true)
            return;
        }
        //Special Character.....Chack...>
        const specialChar = /[!@#$%^&*]/;
        if (!specialChar.test(password)) {
            setSpecialChar(true)
            return;
        }


        //Firebase add Email && Password........>
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result)
                // setSuccess(true)
                

                //Update a user profile data .........>>
                const name = { displayName: `${FirstName} ${LastName}` }
                updateProfile(auth.currentUser, name)
                    .then(() => {
                        console.log("update data")
                    })
                //user a Varification email...........
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                   toast("Verification email sent!");
                })
                setSuccess(true)
            })

            //Error show             
            .catch((error) => {
                console.log(error)
                setError(error.message)
            })

    }
    //Google log in atuo....
    const provider = new GoogleAuthProvider();
    const handelgoogle = () => {
        setSuccess(false)
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                setSuccess(true)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    // //Github log in atuo.............>>
    const provoiderGithub = new GithubAuthProvider();
    const handelGithub = () => {
        setSuccess(false)
        signInWithPopup(auth, provoiderGithub)
            .then((result) => {
                console.log(result)
                setSuccess(true)
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    return (
        <div className='bg-neutral-900 min-h-screen pt-0 -mt-5' >
            <div><ToastContainer /></div>
            <div className='mx-4 py-15 grid justify-center items-center md:min-h-screen  '>
                {/* grid justify-center items-center min-h-screen */}
                <section className='relative'>
                    <div className=''>
                        <h1 className='font-bold text-center text-3xl mb-8 text-amber-50'>Sign up With your <span className='font-bold text-lime-300'>work email.</span></h1>
                    </div>

                    <form onSubmit={handelOnSubmit} className='mb-6 relative'>
                        {/* User name..> */}
                        <div className='md:flex gap-2 mb-5'>
                            <div className='w-full md:w-1/2'>
                                <h3 className='text-xl text-gray-400 mb-1'>First Name*</h3>
                                <input type="text" name="firstname" className='input bg-gray-600 w-full ' required />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <h3 className='text-xl text-gray-400 mb-1'>Last Name*</h3>
                                <input type="text" name="lastname" className='input bg-gray-600 w-full' required />
                            </div>
                        </div>
                        {/* User Email addess.. */}
                        <div className='mb-5'>
                            <h1 className='text-xl text-gray-400 mb-1'>Work email ID*</h1>
                            <input type="email" name="email" className='input bg-gray-600 w-full' required />
                        </div>
                        {/* user Password... */}
                        <div>
                            <h1 className='text-xl text-gray-400 mb-1'>Password*</h1>
                            <input type={showEyes ? "password" : "text"} name="password" className='input bg-gray-600 w-full mb-6' required />
                        </div>

                        {/* ShowPassWord.......eyes */}
                        <a onClick={() => setShowEyes(!showEyes)} className='text-xl absolute -mt-13 ml-95 md:-mt-13 md:ml-95'>{showEyes ? <FaEye /> : <FaEyeSlash />}</a>

                        {/*Sign Up  Button..... */}
                        <button className='text-gray-700 font-bold text-xl py-3 rounded-xl w-full bg-lime-300 hover:bg-lime-200'>Sign up With work email</button>

                        {/* Error....&&....Sesscss......messess............. */}
                        <div className='text-center mt-2'>
                            {passwordLength && <p className='text-red-400 '>Please enter a password with at least 6 characters</p>}
                            {success && <p className='font-bold text-green-600'>Sign up successful</p>}
                            {error && <p className='text-red-400 '>{error}</p>}
                            {Lowercase && <p className='text-red-400 '>Please include at least one lowercase letter</p>}
                            {UpparCase && <p className='text-red-400 '>Please include at least one Uppar case letter</p>}
                            {SpecialChar && <p className='text-red-400 '>Please include at least one SpecialChar </p>}
                            {numberchack && <p className='text-red-400 '>Please include at least one Number </p>}
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
                        <h1 className='text-gray-400 text-xl'>Already using web Page? <Link to='/login' className='font-bold text-lime-200 '>Log in</Link> </h1>
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
                                className='absolute -right-120 top-30 w-15 ' alt="" />

                            <motion.img src={star}
                                animate={{ rotate: [0, 60, 0], scale: [1, 1.3, 1], }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', repeatDelay: 2 }}
                                className='absolute -right-80 top-150 w-10 ' alt="" />
                        </div>
                        {/* left side img && animation */}
                        <motion.img animate={{ rotate: [0, 60, 0], scale: [1, 1.3, 1], }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', repeatDelay: 2.5 }} src={star} className='absolute right-100 -top-20 w-10 ' alt="" />

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

export default SignUP;