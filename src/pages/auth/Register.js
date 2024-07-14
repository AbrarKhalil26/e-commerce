import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/register.png";
import styles from "./auth.module.scss";
// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Firebase
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
// components
import Loader from "../../components/loader/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const createUserwithEmail = {}

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        setIsLoading(false);
        toast.success("Registeration Successful...");
        navigate('/login')
      })
      .catch((error) => {
        console.log(error.message)
        toast.error("Error: "+ error.message);
        setIsLoading(false)
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.form}>
          <h2>Register</h2>

          <form onSubmit={registerUser}>
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
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              style={{ marginTop: "2.5rem" }}
            >
              Register
            </button>
          </form>

          <span className={styles.register}>
            <p>Already an account ?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>

        <div className={styles.img}>
          <img src={registerImg} alt="registerImg" width={500} />
        </div>
      </section>
    </>
  );
};

export default Register;
