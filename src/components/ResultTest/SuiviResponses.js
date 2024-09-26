import React, { useEffect, useState } from "react";
import { Pagination,Row,Col,Modal, Button } from "antd";
import axios from 'axios'
import {EyeOutlined} from "@ant-design/icons";
import { useParams } from "react-router-dom";

export default function SuiviResponses({candidateResponses}) {
const {id}=useParams();
    

    const [test,setTest]=useState([])
    console.log("testtesttesttest",test)
    const [detailsTest,setDetailsTest]=useState([])
    useEffect(() => {
        async function fetchData() {

            setTest(candidateResponses)
        
        }
        fetchData();
      },[candidateResponses]);
       
      useEffect(() => {
        console.log("id", id);
        async function fetchData() {
          try {
            const res = await axios.get(`/getTest/${id}`);
            setDetailsTest(res.data);
            console.log("res2.data", res.data);
          } catch (err) {
            console.log(err.message);
          }
        }
        fetchData();
      }, [id]);
     

 
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
  const pageSize = 1; // number of questions per page

  const handlePageChange = (pageIndex) => {
    setCurrentPageIndex(pageIndex - 1);
  };

  const startIndex = currentPageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuestions = test && test ? test.slice(
    startIndex,
    endIndex
  ) : [];
  
  let PointTotal=0;
  let TotalDuration=0;
  if (open===true) {
    if (detailsTest.TotalDuration === undefined) {
     
      for (let index = 0; index < test?.length; index++) {
        TotalDuration += Number(test[index].question.duration);
      }
     }else{
      TotalDuration=Number(detailsTest.TotalDuration)
    }
     if (detailsTest.PointTotal === undefined) {
     
      for (let index = 0; index < test?.length; index++) {
          PointTotal += Number(test[index].question.points);
      }
     }else{
      PointTotal=Number(detailsTest.PointTotal)
    }
  }
  console.log("candidateResponses.QuestionsDetails[0].Experience",candidateResponses)
  return (
    <div>
   

    <Button type="dashed" onClick={() => {showModal()}} className="Suivi_test">
             <span>Suivi réponses <EyeOutlined /></span>  
            </Button>
    

     <Modal
        title="Aperçu des réponses fournies par le candidat pendant le test"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
       
      >
{ open===true ?(
    <div className="Suivi-Test">
      <h6 className="Description" style={{paddingTop:25}}>{detailsTest.title}</h6>
      <p className="Description">{detailsTest.description}</p>
      <div className="secondary-Setup">
      <Row span={24}>
        <Col>
        <p>
          <strong>Experience:</strong> {detailsTest.Experience}
        </p>
        </Col>
        <Col>
        <p>
          <strong>language:</strong> {detailsTest.language}
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
        {  currentQuestions.map((response, index) => (
          <>
            <div className="Content-Question" key={index}>
              <h5 className="h5">Questions {index + 1}</h5>

              {response.question.typeQuestion=== "QCM" ||response.question.typeQuestion === "VraiOuFaux" ||response.question.typeQuestion === "ChampLibre"? (
               
                <p className="Questions-Para">{response.question.Question}  ?</p>
                
              ) : response.question.typeQuestion=== "Image" ? (
                <p className="Questions-Para">
                  <img
                    height={300}
                    width={"68%"}
                    src={URL.createObjectURL(
                        response.question.Question.file.originFileObj
                    )}
                    alt="Question"
                  />
                </p>
              ) : null}

              {response.question.answers.map((answer, index) => (
                 <>
                {  response.question.typeQuestion !== "ChampLibre" ?(
                 
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
              <div className="secondary-Setup">
               
                         <p>Les réponses fournie par le candidat : </p>
                       { response.answer.map((candidateAnswer) => (
                         <ul>
                         <li
                         className="ul"
                         style={{
                          backgroundColor:
                            response.question.answers.some(
                              (answer) =>
                                candidateAnswer === answer.ValueAnswer && answer.CorrectAnswer
                            )
                              ? "#11D165"
                              : "#f20c0c",
                          opacity: 0.85,
                        }}>
                          {candidateAnswer}
                            </li>
                             </ul>
                       ))}
                   
              
              </div>
            </div>
          </>

        ))}
      </div>
      <Pagination
        style={{ marginTop: 16, textAlign: "center" }}
        current={currentPageIndex + 1}
        pageSize={pageSize}
        total={test?.length}
        onChange={handlePageChange}
        block
      />
      
    </div>
  ):null}
    </Modal>
   </div>
  );
}
