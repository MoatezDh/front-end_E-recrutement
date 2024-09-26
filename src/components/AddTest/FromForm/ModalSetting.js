import React, { useState } from "react";
import {Form, Modal, Checkbox ,Radio} from "antd";
import {SettingFilled } from "@ant-design/icons/lib/icons";
export default function ModalSetting() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 900);
  };

  const plainLangueOptions = ["Français", "Anglais"];
  const [selectedOption, setSelectedOption] = useState('Un Chronométre Par Question');
  
  const plainStopwatchOptions = ['Un Chronométre Par Question', 'Un Chronométre Global'];

 
  const onChange = (e) => {
    setSelectedOption(e.target.value);
  };
 

   

    const  initialValues={
        Stopwatch:"Un Chronométre Par Question",
        languageCandidates:"Français"
      
  }
  const defaults = ["Français"];
  
  return (
    <div>
      <SettingFilled
        style={{
          color: "#002fff",
          fontSize: "25px",
          marginRight: 30,
          marginTop: -5,
        }}
        onClick={showModal}
      />
      <Modal
        title="Paramètres par défaut"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        initialValues={initialValues}
      >
       
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#717171" }}>
          En quelle langue les questions doivent-elles être posées à vos
          candidats ?
        </p>
       <Form.Item name="languageCandidate" initialValue={defaults}>
        <Checkbox.Group
        name="languageCandidate"
          options={plainLangueOptions}
        
        />
        </Form.Item >
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#717171" }}>
          Comment souhaitez-vous que le candidat soit chronométré ?  
        </p>
        <Form.Item   name="Stopwatch" initialValue={"Un Chronométre Par Question"}>
        <Radio.Group options={plainStopwatchOptions} value={selectedOption} onChange={onChange} />
        </Form.Item>
       
      </Modal>
    </div>
  );
}
