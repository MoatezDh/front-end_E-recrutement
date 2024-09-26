import React, { useState } from "react";
import {Modal, Button } from "antd";

import {EyeOutlined} from "@ant-design/icons";
import Result from "../ConsultTest/Result";

export default function ResultCandidate(candidateResponses) {


console.log(candidateResponses)
console.log(candidateResponses.QuestionsDetails)
console.log(candidateResponses.time)
console.log(candidateResponses.Name)
    
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
      }, 100);
    };
  
  return (
    <div>
   

    <Button type="dashed" onClick={() => {showModal()}} className="Suivi_test">
             <span>Résultat <EyeOutlined /></span>  
            </Button>
    

     <Modal
        title={"Le score obtenu par " + candidateResponses.Name + " dans le " + candidateResponses.QuestionsDetails[0].title + " est"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
       
      >
{ open===true ?(
       <Result selectedAnswer={candidateResponses.candidateResponses} QuestionsDetails={candidateResponses.QuestionsDetails} lastRenderTime={candidateResponses.time} />
):null}
    </Modal>
   </div>
  );
}
