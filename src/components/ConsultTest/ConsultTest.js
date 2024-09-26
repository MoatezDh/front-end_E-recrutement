import React, {  useState, useEffect } from "react";
import {  Link,Outlet, useParams } from "react-router-dom"; 
import { Form, Select, Button, Row, Input } from "antd";
//import axios from 'axios';
import { getTest } from '../../services/example/getTest'
const { Option } = Select;

export default function ConsulterTest(props) {

  const { id } = useParams();
 
  console.log("props",props)

  const [test, setTest] = useState({
    questions:props?.QuestionsDetails?.questions ?? [],
    FromFormDetails: props?.FromFormDetails ??{
      Experience: "",
      NumberDays: "",
      PointTotal: "",
      Stopwatch: "",
      TotalDuration: "",
      description: "",
      language: "",
      languageCandidate:[],
      title: "",
    },
  });
    
  useEffect(() => {
    console.log('useEffect is running');
    if (id) {
      getTest(id)
        .then(res => {
          let test=res.data
          test.FromFormDetails=res.data
          setTest(test);
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
      
   
      
  }, [id]);

console.log("test:", test);

  let totalDuration = 0;
 
  
 let {questions,FromFormDetails}=test
console.log("question",questions)
console.log("FromFormDetails",FromFormDetails)
if (id !== undefined){
props.setFromFormDetails(FromFormDetails);
props.setQuestionsDetails(questions);
}
  for (let i = 0; i < questions?.length; i++) {
    const question = questions[i];
    totalDuration += Number(question.duration);
  }
  const languageOptions = [
    { value: "Fr", label: "Français" },
    { value: "En", label: "Anglais" },
  ];

  return (
    <div
      className="ConsulterTest"
      
    >
     
      <p className="ConsulterTest-para">
        <strong>Titre: </strong>
        {FromFormDetails.title}{" "}
      </p>
      <p className="ConsulterTest-para">
        <strong>Description: </strong>
        {FromFormDetails.description}{" "}
      </p>
      <p className="ConsulterTest-para">
        <strong>Questions :</strong> Dans ce test, vous devriez répondre à{" "}
        <strong>{questions.length} </strong>questions.{" "}
      </p>
      {!isNaN(FromFormDetails.TotalDuration) ? (
        <p className="ConsulterTest-para">
          <strong>Durée totale :</strong> Tu as{" "}
          <strong>{FromFormDetails.TotalDuration}</strong>minutes pour faire ce
          test.{" "}
        </p>
      ) : (
        <p className="ConsulterTest-para">
          <strong>Durée totale :</strong> Tu as{" "}
          <strong>{totalDuration} </strong>minutes pour faire ce test.{" "}
        </p>
      )}

      {FromFormDetails.Stopwatch === "Un Chronométre Global" ? (
        <p className="ConsulterTest-paras">
          Vous pouvez gérer votre temps de façon indépendante pendant le test.
          Vous pouvez répondre aux questions par ordre de votre choix et
          apporter des changements autant de fois qu’ils le souhaitent.Au cas où
          vous auriez encore le temps
        </p>
      ) : (
        <p className="ConsulterTest-paras">
          Le test comprendra des questions chronométrées qui apparaîtront dans
          un ordre précis une fois commencé. Vous ne pourrez pas revenir à une
          question précédente pour changer la réponse.
        </p>
      )}
      {FromFormDetails?.languageCandidate && (FromFormDetails?.languageCandidate[0] === "Français" &&
      FromFormDetails?.languageCandidate[1] === "Anglais" ? (
        <div style={{ display: "block" }}>
          <Row>
            <Form.Item
              label="Dans quelle langue aimez-vous passer le test :"
              name="language"
              rules={[{ required: true }]}
            >
              <Select size="large" placeholder=" Veuillez choisir une langue .">
                {languageOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
        </div>
      ) : FromFormDetails.languageCandidate[0] === "Français" ? (
        <p className="ConsulterTest-paras">
          Vous passerez le test en français.
        </p>
      ) : FromFormDetails.languageCandidate[0] === "Anglais" ? (
        <p className="ConsulterTest-paras">Vous passerez le test en anglais </p>
      ) : null)}
      <div style={{ display: "flex", justifyContent: "center" }}>
      {id === undefined ? (
  <>
    <Link to="/company/addTest/FromForm/Consulter">
      <Button type="primary" style={{ marginTop: 10, marginBottom: 10 }}>
        Démarrer le test
      </Button>
    </Link>
    <Outlet />
  </>
) : (
  <>
    <Link to={`/candidate/Consulter/${id}`}>
      <Button type="primary" style={{ marginTop: 10, marginBottom: 10 }}>
        Démarrer le test
      </Button>
    </Link>
    <Outlet />
  </>
)}
      </div>
    </div>
  );
}
