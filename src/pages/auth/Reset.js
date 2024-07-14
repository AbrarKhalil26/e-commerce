import React, { useState } from "react";
import styles from "./auth.module.scss";
import forgetImg from "../../assets/forgot.png";
import { Link, useNavigate } from "react-router-dom";
// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
// components
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for a reset link");
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={forgetImg} alt="resetImg" width={500} />
        </div>

        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form onSubmit={resetPassword}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              style={{ marginTop: "2.5rem" }}
            >
              Register
            </button>

            <span className={styles.links}>
              <p>
                <Link to="/login">- Login</Link>
              </p>
              <p>
                <Link to="/register">- Register</Link>
              </p>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default Reset;
