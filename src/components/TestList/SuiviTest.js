import React, { useState,useEffect } from "react";
import { Pagination,Row,Col,Modal, Tooltip } from "antd";
import axios from 'axios';
import {EyeOutlined} from "@ant-design/icons";

export default function SuiviTest(id) {



    const [test,setTest]=useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/getTest/${id.id}`);
       
        setTest(res.data)
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  },[id]);
 
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
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pageSize = 4; // number of questions per page

  const handlePageChange = (pageIndex) => {
    setCurrentPageIndex(pageIndex - 1);
  };

  const startIndex = currentPageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuestions = test && test.questions ? test.questions.slice(
    startIndex,
    endIndex
  ) : [];
  console.log("currentQuestions",currentQuestions)
  let PointTotal=0;
  let TotalDuration=0;
  if (open===true) {
    if (test.TotalDuration === undefined) {
     
      for (let index = 0; index < test.questions.length; index++) {
        TotalDuration += Number(test.questions[index].duration);
      }
     }else{
      TotalDuration=Number(test.TotalDuration)
    }
     if (test.PointTotal === undefined) {
     
      for (let index = 0; index < test.questions.length; index++) {
          PointTotal += Number(test.questions[index].points);
      }
     }else{
      PointTotal=Number(test.PointTotal)
    }
  }
  return (
    <div>
   

   <Tooltip title={"Suivi Test"} color={"blue"}>
            <EyeOutlined  style={{color:"blue" ,fontSize:"x-large"}} onClick={() => {showModal()}}/> 
             </Tooltip>
    

     <Modal
        title="Aperçu du test"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
       
      >
{ open===true ?(
    <div className="Suivi-Test">
      <h6 className="Description" style={{paddingTop:25}}>{test.title}</h6>
      <p className="Description">{test.description}</p>
      <div className="secondary-Setup">
      <Row span={24}>
        <Col>
        <p>
          <strong>Experience:</strong> {test.Experience}
        </p>
        </Col>
        <Col>
        <p>
          <strong>language:</strong> {test.language}
        </p>
        </Col>
        <Col>
        <p>
          <strong>Durée totale: </strong>
          {TotalDuration}
        </p>
        </Col>
        <Col>
        <p>
          <strong>Points Totale:</strong> {PointTotal}
        </p>
        </Col>
        </Row>
      </div>
      <hr />
      <div>
        { currentQuestions.map((question, index) => (
          <>
            <div className="Content-Question" key={index}>
              <h5 className="h5">Questions {startIndex+index + 1}</h5>

              {question.typeQuestion=== "QCM" ||question.typeQuestion === "VraiOuFaux" ||question.typeQuestion === "ChampLibre"? (
               
                <p className="Questions-Para">{question.Question}  ?</p>
                
              ) : question.typeQuestion=== "Image" ? (
                <p className="Questions-Para">
                  <img
                    height={300}
                    width={"68%"}
                    src={URL.createObjectURL(
                      question.Question.file.originFileObj
                    )}
                    alt="Question"
                  />
                </p>
              ) : null}

              {question.answers.map((answer, index) => (
                 <>
                {  question.typeQuestion !== "ChampLibre" ?(
                 
                  <ul>
                  <li
                    className="ul"
                    style={{
                      backgroundColor:
    answer.CorrectAnswer ? "#11D165" : answer.AnswerType === "Image" && answer.CorrectAnswer === false ? "red" : "",
                      opacity: 0.96,
                      width: answer.AnswerType === "Image"  ? "50%" : "auto",
                     
                    }}
                    key={index}
                  >
                    {answer.AnswerType === "Text" ? (
                      answer.ValueAnswer
                    ) : answer.AnswerType === "Image" ? (
                      <img
                        height={300}
                        width={"100%"}
                        src={URL.createObjectURL(
                          answer.ValueAnswer.fileList[0].originFileObj
                        )}
                        alt="Answer"
                      />
                    ):  answer.ValueAnswer}
                  </li>
                </ul>):null}
                </>
              ))}
              <hr style={{boxShadow:"10px grey"}} />
              <div className="secondary-Setup-Question">
                <Row span={24}>
                  <Col >
                <p>
                  <strong>Domaine:</strong> {question.domain}
                </p>
                </Col>
                <Col >
                <p>
                  <strong>Difficulté: </strong>
                  {question.difficulty}
                </p>
                </Col >
                <Col>
                <p>
                  <strong>Compétence:</strong> {question.skill}
                </p>
                </Col>
                <Col>
                <p>
                  <strong>Durée:</strong> {question.duration} (minute)
                </p>
                </Col>
                <Col >
                <p>
                  <strong>Point(s):</strong> {question.points}
                </p>
                </Col>
                </Row>
              </div>
            </div>
          </>
        ))}
      </div>
      <Pagination
        style={{ marginTop: 16, textAlign: "center" }}
        current={currentPageIndex + 1}
        pageSize={pageSize}
        total={test.questions.length}
        onChange={handlePageChange}
        block
      />
      
    </div>
  ):null}
    </Modal>
   </div>
  );
}
