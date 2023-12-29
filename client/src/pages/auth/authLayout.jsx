import { Outlet, Navigate } from "react-router-dom";
import authImg from "../../../public/assets/authImg.png"
import "../../styles/authLayout.css"

export default function authLayout() {
    const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="authContainer">
          <section className="authComponentContainer">
            <Outlet />
          </section>

          <img className="authBgImg"
            src={authImg}
            alt="logo"
          />
        </div>
      )}
    </>
  )
}
