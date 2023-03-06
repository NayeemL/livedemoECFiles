import React, { useState } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { Radio, Space } from "antd";
import "./Loginpage.css";
import EmployerLogin from "./EmployerLogin";
import AdminLogin from  "./AdminLogin";
import ECFile from "../../assets/ecfile2.png";
import CustomerLoginPage from "./CustomerLoginPage";

const Login = () => {
  const [role, setrole] = useState("User");
  const onChange = (e) => {
    setrole(e.target.value);
  };

  return (
    <div className="Login-page-main">
      <div className="d-flex justify-content-center align-items-center">
        <Container>
          <Row className="login_page">
            <Col sm={12} md={4} className="d-grid align-items-center">
              <div>
                <Card className="left-contents" style={{ height: "300px" }}>
                <div className="img-div">
                <img src={ECFile} alt="ec-files" className="login-png-alt"/>
                </div>
                    <div className="contents">
                    <Radio.Group
                      className="contents"
                      onChange={onChange}
                      value={role}
                    >
                      <Space direction="vertical">
                      <Radio value={"User"} className="login-option mt-1">
                          <span className="login-option-name">User</span>
                        </Radio>
                        <Radio value={"Employer"} className="login-option mt-1">
                          <span className="login-option-name">Employer</span>
                        </Radio>
                        <Radio value={"Admin"} className="login-option mt-1">
                          <span className="login-option-name">Admin</span>
                        </Radio>
                      </Space>
                    </Radio.Group>
                    </div>
                </Card>
              </div>
            </Col>
            <Col sm={12} md={8} className="mt-1">
              <Card
                className="right-contents py-5 px-5"
                style={{ height: "440px" }}
              >
                 <h4
                className="d-flex justify-content-center"
                style={{ fontWeight: "bold", fontFamily: "sans-serif" }}
              >
                {/* {`${stateCheck + " " + "Login"}`} */}
                <span style={{ color: "red" }}> EC</span><span style={{ color: "blue" }}>FILE </span>&nbsp; Login
              </h4>
                <br />
                {role === "User" ? (
                    <CustomerLoginPage />
                  ) :role === "Employer" ? (
                    <EmployerLogin />
                    ) : role === "Admin" ? (
                    <AdminLogin />
                  ) : null}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
