import React from "react";
import { Navbar,Container } from "react-bootstrap";
import logo from "../media/Rec-inov.png";

import {ContainerOutlined} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

export default function NavBar() {

 
  const location = useLocation();

  return (
    <>
     
        <Navbar bg="dark" variant="dark">
        
        <  Container className="d-flex justify-content-center align-items-center">
        <a href="/">
      <img
        src={logo}
        width="80"
        height="80"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
     <span className="myCustomStyle">ec-Inov</span>
     </a>
        </Container> 
     
       
        
        {(location.pathname === "/" || location.pathname === "/candidate/TestsList" || location.pathname === `/candidate/Consulter` ) ? (
          null
        ):<div
        style={{
          display: "flex",
          width: "18%",
          margin: " 39px auto auto auto ",
        }}
      >
        <a href="/company/TestsList">
          <span className="iconList">
            <ContainerOutlined />
          </span>{" "}
          <span className="list"> LISTE DES TEST</span>{" "}
        </a>
      </div>}
        
        </Navbar>
    </>
  );
}

