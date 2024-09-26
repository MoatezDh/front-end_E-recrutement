import React, { useState } from "react";
import { Form, Select, Input, Button, Upload, Row, Col } from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import AnswerList from "../Answer/AnswerList";
import UploadImage from "./UploadImage"
const { Option } = Select;


export default function QuestionForm(props) {
  
   console.log('type',props.type)

  const { TextArea } = Input;

  const DomaineOptions = [
    { label: "Informatique", value: "programmation" },
    { label: "Mathématiques", value: "Mathématiques" },
  ];
  const SkillsOptions = [
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "Python", label: "Python" },
  ];
  const difficultly = [
    { label: "Facile", value: "Facile" },
    { label: "Moyen", value: "Moyen" },
    { label: "Difficile", value: "Difficile" },
  ];
  const TypeQuestionOptions = [
    { value: "QCM", label: "Question a choix multiple" },
    { value: "VraiOuFaux", label: "Vrai ou Faux" },
    { value: "ChampLibre", label: "Champ Libre" },
    { value: "Image", label: "Image" },
    {/* value: "CodeSource", label: "Code Source" */},
  ];


  const handleTypeChange = (value) => {
    let copy = [];
  
    // Check if props.type is not null
    if (props.type !== null) {
      // Update the copy array at the index of question.key with the new value
      copy = [...props.type, ...typeQuestion];
      copy[question.key] = value;
    } else {
      // If props.type is null, update the copy array at the index of question.key with the new value
      // and add the new value at the end of the array
      
      copy[question.key] = value;
    }
  
    setTypeQuestion(copy);
  };
 

   let [typeQuestion, setTypeQuestion] = useState(["QCM"]);
  console.log("typeQuestion", typeQuestion)
  

  
 props.setTypeQuestion(typeQuestion)


  const { question } = props;
  
  const validateNumber = (_, value) => {
    if (value < 0 || isNaN(value)) {
      return Promise.reject('Veuillez entrer un nombre valide supérieur  à zéro');
    }
    return Promise.resolve();
  };
 
  
  return (
    <>
      <section className="Question-Form">
        <Row gutter={[16, 16]} >
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Domaine"
              name={[question.name, "domain"]}
              tooltip={{
                title: "indiqué quelle domaine à tester",
                icon: (
                  <InfoCircleOutlined
                    id="infocercle"
                    style={{
                      marginLeft: 100,
                      color: "#6284FF",
                      fontSize: "17px",
                    }}
                  />
                ),
              }}
              rules={[
                {
                  required: true,
                  message: "  Veuillez sélectionner une Domaine !",
                },
              ]}
       
            >
              <Select placeholder="Selectionner quelle domaine à tester"  >
                {DomaineOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Compétence"
              name={[question.name, "skill"]}
              tooltip={{
                title: "indique quelle compétence à tester",
                icon: (
                  <InfoCircleOutlined
                    id="infocercle"
                    style={{ marginLeft: 70, color: "#6284FF", fontSize: "17px" }}
                  />
                ),
              }}
              rules={[
                {
                  required: true,
                  message: "  Veuillez sélectionner une Compétence !",
                },
              ]}
            >
              <Select placeholder="Selectionner quelle Compétence à tester" defaultValue={question.skill}>
                {SkillsOptions.map((option) => (
                  <Option key={option.value} value={option.value} >
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Difficulté"
              name={[question.name, "difficulty"]}
              tooltip={{
                title: "indique quelle compétence à tester",
                icon: (
                  <InfoCircleOutlined
                    id="infocercle"
                    style={{
                      marginLeft: 100,
                      color: "#6284FF",
                      fontSize: "17px",
                    }}
                  />
                ),
              }}
              rules={[
                {
                  required: true,
                  message: "  Veuillez sélectionner une Difficulté !",
                },
              ]}
            >
              <Select placeholder="Selectionner la Difficulté de question" defaultValue={question.difficulty}>
                {difficultly.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Item
                label="Durée"
                name={[question.name, "duration"]}
                tooltip={{
                  title:
                    "indique la durée maximale pour cette question (En Minute) ",
                  icon: (
                    <InfoCircleOutlined
                      id="infocercle"
                      style={{
                        marginLeft: 70,
                        color: "#6284FF",
                        fontSize: "17px",
                      }}
                    />
                  ),
                }}
                rules={[
                  {
                    
                    required: true,
                    message:
                      " Veuillez indique la durée maximale pour cette question (En Minute)",
                  },{ validator: validateNumber }
                ]}
              >
                <Input type="number" maxLength={2} style={{ marginRight: 8 } } defaultValue={question.duration}
     />
              </Form.Item>
              <h5 style={{ fontSize: 14, marginLeft: 15, marginBottom: 0 }}>
                Minute(s)
              </h5>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Point"
              name={[question.name, "points"]}
              tooltip={{
                title: "indique le nombre de points pour cette question ",
                icon: (
                  <InfoCircleOutlined
                    id="infocercle"
                    style={{
                      marginLeft: 120,
                      color: "#6284FF",
                      fontSize: "17px",
                    }}
                  />
                ),
              }}
              rules={[
                {
                  required: true,
                  message:
                    " Veuillez indique le nombre de points pour cette question",
                },{ validator: validateNumber }
              ]}

            >
              <Input type="number" maxLength={2}/>
            </Form.Item>
          </Col>
        </Row>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item label="Type de Question" name={[question.name, "typeQuestion"]} required>
            <Select defaultValue="QCM"onChange={(value) => handleTypeChange(value)}>
              {TypeQuestionOptions.map((option) => (
                <Option key={option.label} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>



        </Col>

        {typeQuestion[question.key]=== "QCM" || typeQuestion[question.key] === "VraiOuFaux" || question.typeQuestion=== "QCM" || question.typeQuestion=== "VraiOuFaux" ? (
          <Form.Item
            label="Question"
            name={[question.name, "Question"]}
            rules={[
              {
                required: true,
                message: " Veuillez saisir la description du question!",
              },
            ]}
            style={{ marginLeft: 25 }}
           
          >
            <TextArea rows={1} placeholder="Veuillez saisir la description du question!" maxLength={600}/>

          </Form.Item>
        ) : typeQuestion[question.key] === "ChampLibre" ? (
          <Form.Item label="Question"
            name={[question.name, "Question"]}
            rules={[
              {
                required: true,
                message: " Veuillez saisir la description du question!",
              },
            ]} style={{ marginLeft: 25 }}>
            <TextArea rows={1} placeholder="Veuillez saisir la description du question!" maxLength={600} />
          </Form.Item>


        ) :
          typeQuestion[question.key] === "Image" ? (

            <Form.Item
              label="Question"
              name={[question.name, "Question"]}
              rules={[
                {
                  required: true,
                  message: " Veuillez saisir la description du question!",
                },
              ]}
              style={{ marginLeft: 25 }}
            >
              { /*<UploadImage/>*/}
              <Upload>
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    height: "100px",
                    weight: "100px",
                    marginLeft: 100,
                  }}
                >
                  Upload Image
                </Button>
                </Upload>
            </Form.Item>
          ) /*: typeQuestion[question.key] === "CodeSource" ? (
            <Form.Item
              label="Question"
              name={[question.name, "Question"]}
              rules={[
                {
                  required: true,
                  message: " Veuillez saisir la description du question!",
                },
              ]}
              style={{ marginLeft: 25 }}
            >
              <Input maxLength={100} />
            </Form.Item>
          ) */: null}
      </section>

      <AnswerList typeQuestion={typeQuestion[question.key]} question={question} />
    </>

  );

}

