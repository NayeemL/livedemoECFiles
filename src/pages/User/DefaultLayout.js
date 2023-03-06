import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Registration from "./Registration";
import "../../component/Sidebar/Sidebar.css";
import ECFILE from "../../assets/ecfile2.png";
import "./userstyle.css"

function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const UserName = localStorage.getItem("name");

  const [logout, setLogout] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("USER_AUTH_STATE")) navigate("/EmployeeLogin");
  }, [logout]);
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("USER_AUTH_STATE");
    localStorage.removeItem("Role");
    localStorage.removeItem("id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("name");
    setLogout(true);
  };
  return (
    <>
      <div>
        <div onChange={handleChange}>
          <div className="dashboards__headerNavs">
            <div className="dashboards__headerNavs--container">
              <div className="d-flex flex-row align-items-center">
                <img
                  className="NkDecibels_logo"
                  src={ECFILE}
                  alt="add"
                  onClick={() => navigate("/")}
                />
              </div>
              {/* <span className="navName px-2" onClick={() => navigate("/")}>
                {UserName}
              </span> */}
              <div onClick={logoutHandler}>
                <Link to="/" className="login-btn-clr">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="registration-page" style={{paddingTop:"70px", margin:"10px"}}>
        <Registration/>
      </div>
    </>
  );
}

export default DefaultLayout;
