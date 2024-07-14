import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const ActiveLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
const cart = (
  <span className={styles.cart}>
    <NavLink to="/cart" className={ActiveLink}>
      <FaShoppingCart />
      <p>0</p>
    </NavLink>
  </span>
);

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch();

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.displayName === null){
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName)
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            useName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );

      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [displayName, dispatch]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={`${styles["nav-wrapper"]}  
                ${showMenu ? `${styles["show-nav-wrapper"]}` : ``}
              `}
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#eee" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={ActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={ActiveLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>


              <ShowOnLogout>
                <NavLink to="/login" className={ActiveLink}>
                  Login
                </NavLink>
                <NavLink to="/register" className={ActiveLink}>
                  Register
                </NavLink>
              </ShowOnLogout>


              <ShowOnLogin>
                <a
                  href="#home"
                  style={{ color: '#ff7722', gap: "8px" }}
                >
                  <FaUserCircle size={16} /> Hi, {displayName}
                </a>

                <NavLink to="/order" className={ActiveLink}>
                  My Orders
                </NavLink>

                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>

            </span>

            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]} onClick={toggleMenu}>
          {cart}
          <HiOutlineMenuAlt3 size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
