import React from 'react';
import AddFromFile from './AddFromFile';
import AddFromDB from './AddFromDB';
import AddFromForm from './AddFromForm';
import { Row, Col } from 'antd';
import {  Link,Outlet } from "react-router-dom"; 

export default function Parent() {
  return (

    <section className='btn'>
      <Row span={24} justify="space-around">
        <Col xs={24} sm={12} md={12} lg={8}>
          <div id="btn1">
          <Link to="/company/addTest/Upload">    <AddFromFile  /> </Link> 
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <div id="btn2">
          <Link to="/company/addTest/FromDB">  <AddFromDB /></Link>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div id="btn3">
          <Link to="/company/addTest/FromForm">  <AddFromForm  /></Link>
          </div>
        </Col>
       
      </Row>
      <Outlet />
    </section>

  );
}


