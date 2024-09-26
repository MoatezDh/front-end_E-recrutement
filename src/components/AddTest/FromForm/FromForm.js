import React from "react";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import SelectLanguage from "./SelectLanguage";
import SelectExperience from "./SelectExperience";
import DurationInput from "./DurationInput";
import PointInput from "./PointInput";
import NumberDays from "./NumberDays";
import ModalSetting from "./ModalSetting";
import { Form, Col, Row, Button , Tooltip} from "antd";
import {SendOutlined } from "@ant-design/icons/lib/icons";




export default function FormFrom({onFinish,initialValues}) {
 

  console.log('initialValues',initialValues)
  


  
    return (
  
   

      <section className="items">
      
      <Form layout="vertical" initialValues={initialValues} onFinish={onFinish} >
          <div className="Setup-Test">
            <h1 > Paramètres du test</h1> 
            <div style={{display:"flex"}}>
            <hr style={{ width: "90%" ,height:1}}/>
            
            <Tooltip title=" Paramètres par défaut!" color={"#6F88FC"}  open>
           <ModalSetting/>
           </Tooltip>
            </div>
           <div style={{marginLeft:20}}>
            <Row gutter={[16, 16]} justify="space-between">
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <TitleInput/>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionInput  />
              </Col>
            </Row>
  
            <Row gutter={[16, 16]} justify="space-between">
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <SelectLanguage />
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <SelectExperience />
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <DurationInput />
                <h5 style={{ fontSize: 14, marginLeft: 15 ,marginBottom:0 }}>Minutes</h5>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <PointInput />
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="space-between">
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <NumberDays />
              </Col>
            </Row>
            </div>
          
          </div>
        <span  style={{display:"flex",justifyContent:"flex-end",margin:"6px auto 6px auto " , alignItems: "center" }}>
        <Button htmlType="Submit" type="primary"  style={{ backgroundColor:"#0093E9"  }} /*onClick={info}*/>
          Suivant
          <SendOutlined style={{fontSize: "16px"  }}/>
          </Button>
          </span>
        </Form>
      </section>
    );
  
  
}
