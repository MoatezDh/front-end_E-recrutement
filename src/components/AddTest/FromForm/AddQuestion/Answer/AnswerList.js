import React from 'react'
import AnswerForm from "../Answer/AnswerForm";
import { Form,Space,Button,Modal } from 'antd';
import {CloseCircleOutlined,PlusOutlined} from "@ant-design/icons/lib/icons";
const { confirm } = Modal;

export default function AnswerList({typeQuestion,question}) {


  return (
    <div>
 
        {typeQuestion === "QCM" ||
   typeQuestion === "Image" ||
  typeQuestion === "Image" ? (
      <Form.List name={[question.name, "answers"]}>
        {(answers, { add, remove }) => (
           <section className="Add-Answer">
          <>
           
              {answers.map((answer) => (
                <React.Fragment
                  key={question.key + "Answer" + answer.key}
                >
                  <div className="AddAnswer">
                  <Space
                    style={{
                      display: "flex",
                      justifyContent: " space-between",
                      marginBottom: 30,
                    }}
                  >
                    <p
                      style={{
                        marginLeft: 20,
                        marginBottom: 0,
                        fontSize: 16,
                      }}
                    >
                    Réponse  {answer.name + 1}
                    </p>
                    {answers.length >= 3 && (
                      <CloseCircleOutlined
                        style={{
                          height: 40,
                          color: "#EE1C1C",
                          opacity: 0.8,
                          marginLeft: "auto",
                          fontSize: "30px",
                          marginRight: 20,
                          marginTop: 8,
                        }}
                        onClick={() => {
                          const  showDeleteConfirm = () => {
                            confirm({
                              title: 'Souhaitez-vous vraiment supprimer cette réponse?',
                              okText: 'Oui',
                              okType: 'danger',
                              cancelText: 'Non',
                              onOk() {
                                remove(answer.name);
                              },
                              onCancel() {
                                console.log('Cancel');
                              },
                            });
                          };
                          showDeleteConfirm();
                        }}
                      />
                    )}
                  </Space>
                  
                  <AnswerForm
                   
                    answer={answer}
                    typeQuestion={question.typeQuestion}
                  />
                  </div>
                </React.Fragment>
              ))}
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() =>
                    add({
                      AnswerType: "Text",
                      CorrectAnswer: false,
                      ValueAnswer: "",
                    })
                  }
                  style={{
                    marginTop: 5,
                    marginLeft: 20,
                    
                  }}
                  icon={<PlusOutlined />}
                >
                  Nouvelle Réponse
                </Button>
              </Form.Item>
            
          </>
          </section>
        )}
      </Form.List>
    ) : typeQuestion === "VraiOuFaux" ? (
      <Form.List name={[question.name, "answers"]}>
        {(answers) => (
          <>
            <div>
            {answers.map((answer) => (
                <React.Fragment
                  key={question.key + "Answer" + answer.key}
                >
                  <div className="AddAnswer">
                  <Space
                    style={{
                      display: "flex",
                      justifyContent: " space-between",
                      marginBottom: 30,
                    }}
                  >
                    
                    <p
                      style={{
                        marginLeft: 20,
                        marginBottom: 0,
                        fontSize: 16,
                      }}
                    >
                     Réponse  {answer.name + 1}
                    </p>
                  </Space>

                  <AnswerForm
                    key={answer.key}
                    answer={answer}
                    typeQuestion={question.typeQuestion}
                  />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </Form.List>
    ) : null}{" "}

    </div>
  )
}
