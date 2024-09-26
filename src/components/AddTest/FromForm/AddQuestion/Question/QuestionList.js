import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import { Form, Pagination, Button, Space, message,Modal } from "antd";
import {CloseCircleOutlined,PlusOutlined, SendOutlined} from "@ant-design/icons/lib/icons";
const { confirm } = Modal;



export default function QuestionList({ onFinish, initialValues }) {
 
  console.log('initialValues',initialValues)
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const pageSize =1; // nombre de questions par page

  const handlePageChange = (pageIndex) => {
    setCurrentPageIndex(pageIndex - 1);
  };

  const info = () => {
    setTimeout(() => {
      message.info(
        "Il est nécessaire que vous renseigniez les informations  pour  cette Question.",
        6
      );
    }, 300);
  };

  let initialValuesToUse = initialValues.length === 0 ? 
    {
      questions: [
        {
          Question: '',
          difficulty: 'Facile',
          domain: 'Informatique',
          duration: '',
          points: '',
          skill: 'Java',
          typeQuestion: 'QCM',
          answers: [
            {
              AnswerType: 'Text',
              CorrectAnswer: false,
              ValueAnswer: '',
            },
            {
              AnswerType: 'Text',
              CorrectAnswer: false,
              ValueAnswer: '',
            },
          ],
        },
      ],
    } 
    : 
    Array.isArray(initialValues) ? 
    {
      questions: initialValues.map((question) => {
        // Transform the question object as needed
        // Return the transformed object
        return {
          ...question,
          // Update properties or perform other operations
        };
      }),
    }
    : { questions: [] };
    console.log('initialValues',initialValuesToUse)

  let type=[]

  for (let index = 0; index < initialValues.length; index++) {
     type.push(initialValues[index].typeQuestion)
      
  }
 
 
 
  const [typeQuestion,setTypeQuestion]=useState([...type])

console.log("typeQuestionTypeQoestion",typeQuestion);


  return (
    <section className="AddQuestion">
      <Form onFinish={onFinish} layout="vertical" initialValues={initialValuesToUse}>
        <Form.List name={"questions"}>
          {(questions, { add, remove  }) => {
             
         
             console.log("questions",questions);
             //let question = questions[currentPageIndex];
             const question = questions[currentPageIndex] || null;
             
             console.log("question", question);
            const showDeleteConfirm = () => {
              confirm({
                title: 'Souhaitez-vous vraiment supprimer cette question?',
                okText: 'Oui',
                okType: 'danger',
                
                cancelText: 'Non',
                onOk() {
                  remove(question.name);
                  handleRemoveQuestion();
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            };

            const handleRemoveQuestion = () => {
              if (currentPageIndex) setCurrentPageIndex(currentPageIndex - 1);
            };
            return (
              <>
                <div className="Setup-Question">
                  <React.Fragment key={question}>
                    {question && (
                      <>
                        <Space
                          style={{
                            display: "flex",
                            justifyContent: " space-between",
                            marginBottom: 30,
                          }}
                        >
                          <p style={{ marginLeft: 10 }}>
                            Question {question.name +1}
                          </p>
                          {questions.length > 1 ? (
                            <CloseCircleOutlined
                              style={{
                                height: 40,
                                color: "#EE1C1C",
                                opacity: 0.8,
                                marginLeft: "auto",
                                fontSize: "30px",
                                marginRight: 20,
                              }}
                              onClick={() => {
                               showDeleteConfirm()
                              }}
                            />
                          ):null}
                        </Space>
                        <QuestionForm question={question} setTypeQuestion={setTypeQuestion} type={type}/>
                        
                      </>
                    )}
                    {questions.length >= 1 ? (
                      <Form.Item>
                        <Button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "auto",
                            marginTop: 20,
                          }}
                        
                          type="primary"
                          onClick={() => {
                          
                            add(
                              {
                              Question: "",
                              difficulty: "Facile",
                              domain: "Informatique",
                              duration: "",
                              points: "",
                              skill: "Java",
                              typeQuestion:"QCM",
                              answers: [
                                {
                                  AnswerType: "Text",
                                  CorrectAnswer: false,
                                  ValueAnswer: "",
                                },
                                {
                                  AnswerType: "Text",
                                  CorrectAnswer: false,
                                  ValueAnswer: "",
                                },
                              ],
                            },
                         typeQuestion.push("QCM")
                            );
                            info();
                        setCurrentPageIndex(
                         currentPageIndex+ 1
                            );
                         
                           }
                         }
                          
                          icon={<PlusOutlined />}
                        >
                          Nouvelle Question
                        </Button>
                      </Form.Item>
                    ):null}
                    <Pagination
                      style={{ marginTop: 16, textAlign: "center",marginBottom:15 }}
                      current={currentPageIndex + 1}
                      pageSize={pageSize}
                      total={questions.length}
                      onChange={handlePageChange}
                      block
                    />
                  </React.Fragment>
                </div>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "6px auto 6px auto ",
                    alignItems: "center",
                  }}
                >
                  <Button
                    htmlType="Submit"
                    type="primary"
                    style={{ backgroundColor: "#0093E9" }}
                    disabled={questions.length < 1}
                  >
                    Suivant
                    <SendOutlined style={{ fontSize: "16px" }} />
                  </Button>
                </span>
              </>
            );
          }}
        </Form.List>
      </Form>
    </section>
  );
}
