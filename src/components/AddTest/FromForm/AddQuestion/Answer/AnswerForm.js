import React, { useState } from "react";
import { Form, Input, Select, Row, Button, Upload } from "antd";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Typography, Stack } from "@mui/material";
import SwitchButton from "./SwitchButton";


const { Option } = Select;
export default function AnswerForm(props) {
  const { TextArea } = Input;
  const TypeOptions = [
    { label: "Text", value: "Text" },
    { label: "Image", value: "Image" },
    { /*label: "Code Source", value: "Code Source" */},
  ];


  const handleTypeChange = (value) => {
    
    setAnswer(value);
  };
  const [AnswerType, setAnswer] = useState('Text');
  const { answer } = props;

  return (
   
    <>
     
      <Row xs={{ span: 24 }} md={{ span: 12 }}>
        <Form.Item
          label=" Type de réponse :"
          style={{ marginLeft: 16 }}
          name={[answer.name, "AnswerType"]}
          
              required
              
            
         
        >
         
            <Select
             
              style={{ width: "70%", marginLeft: 16 }}
              
              defaultValue='Text'
              onChange={(value) => handleTypeChange(value)}
            >
              {TypeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          
        </Form.Item>
      </Row>

      <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
        
        {AnswerType === "Text" && (
          <Form.Item
            name={[answer.name, "ValueAnswer"]}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: " Veuillez saisir la description du réponse!",
              },
            ]}
          >
            
            <TextArea rows={1} placeholder=" Veuillez saisir la description du réponse!" maxLength={600} />
         
          </Form.Item>
        )}
       
        {AnswerType === "Image" && (
          
          <Form.Item
            name={[answer.name, "ValueAnswer"]}
            rules={[
              {
                required: true,
                message: " Veuillez saisir la description du question!",
              },
            ]}
          >
            <Upload>
              <Button
                icon={<PlusOutlined />}
                style={{
                  height: "100px",
                  weight: "100px",
                  marginLeft: 100,
                }}
              >
                Upload
              </Button>
            </Upload>
           
          </Form.Item>
          
       
       
        )}
        {/*AnswerType === "Code Source" && (
          <Form.Item
            name={[answer.name, "ValueAnswer"]}
            style={{ width: "80%" }}
            rules={[
              {
                required: true,
                message: " Veuillez saisir la description du question!",
              },
            ]}
          >
            <Input maxLength={100} />
          </Form.Item>
        )*/}
       <Stack direction="row" alignItems="center">
    <Typography marginTop={-2.6} marginRight={1} marginLeft={1} >
      <CloseOutlined />
    </Typography>
    <SwitchButton answer={answer}/* correctAnswer={CorrectAnswer} setCorrectAnswer={handleChange}*/ />
    <Typography marginTop={-2.6} marginLeft={1} marginRight={2}>
      <CheckOutlined />
    </Typography>
  </Stack>
      
        
      </div>
 
    </>
    
  );
}
