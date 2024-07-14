import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
// Firebase
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase/config'
// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Loader from "../../components/loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false)
        toast.success("Login Successful.");
        navigate('/')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error("Error: "+ error.message);        
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successful.");
        navigate('/');
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="loginImg" width={500} />
        </div>

        <div className={styles.form}>
          <h2>Login</h2>
          <form  onSubmit={registerUser}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
            <p>Or</p>
          </form>

          <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
            <FaGoogle color="#fff" style={{ marginRight: "8px" }}/> Login With
            Google
          </button>

          <span className={styles.register}>
            <p>Don't have an account ?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </section>
    </>
  );
}

export default Login
