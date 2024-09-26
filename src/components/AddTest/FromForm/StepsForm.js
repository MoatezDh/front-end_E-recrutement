import React, { useEffect, useState } from "react";
import {
  Steps,
  Button,
  notification,
  Row,
  Tooltip,
  message,
  Modal,
} from "antd";

import {
  SettingOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SendOutlined,
  SaveOutlined,
  FileProtectOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { Link, Outlet, useParams } from "react-router-dom";

import FormFrom from "./FromForm";
import QuestionList from "./AddQuestion/Question/QuestionList";
import ReviewTest from "../../Review/ReviewTest";
import { addTest } from "../../../services/example/addTest";
import axios from "axios";
import { updateTest } from "../../../services/example/updateTest";
const { confirm } = Modal;

export default function StepsForm(props) {


  const { id } = useParams();

  console.log("useParams", id);
  const [FromFormDetails, setFromFromDetails] = useState();

  useEffect(() => {
    if (id !== undefined ) {
    async function fetchData() {
      try {
        const res = await axios.get(`/getTest/${id}`);

        setFromFromDetails({
          Experience: res.data.Experience,
          NumberDays: res.data.NumberDays,
          PointTotal: res.data.PointTotal,
          Stopwatch: res.data.Stopwatch,
          TotalDuration: res.data.TotalDuration,
          description: res.data.description,
          language: res.data.language,
          languageCandidate: res.data.languageCandidate,
          title: res.data.title,
        });
        setQuestions(res.data.questions);
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }
  }, [id]);
  const [QuestionsDetails, setQuestions] = useState([]);
  console.log("QuestionsDetails", QuestionsDetails);
  console.log("FromFormDetailsFromFormDetailsFromFormDetails", FromFormDetails);

  const onFinishTestSettings = (values) => {
    console.log("Received values of form:", values);
    props.setFromFormDetails(values);
    setFromFromDetails(values);
if (values.PointTotal !== undefined) {
  if (values.PointTotal < 0 || isNaN(values.PointTotal)) {
    notification.warning({
      description: "Veuillez vous assurer que le nombre total de points est positif. Merci de vérifier !",
      className: "custom-class",
      style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
    });
    return;
  }
}
if (values.TotalDuration !== undefined) {
    if (values.TotalDuration < 0|| isNaN(values.TotalDuration)) {
      notification.warning({
        description: "Merci de vérifier que la durée totale est un nombre positif. Veuillez vous assurer de cela. Merci !",
        className: "custom-class",
        style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
      });
      return;
    }}
    if (values.NumberDays !== undefined) {
    if (values.NumberDays < 0|| isNaN(values.NumberDays)) {
      notification.warning({
        description: "Merci de vérifier que le nombre des jours  est un nombre positif. Veuillez vous assurer de cela. Merci !",
        className: "custom-class",
        style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
      });
      return;
    }}
    if (values.languageCandidate === undefined) {
      notification.warning({
        description: "Merci de vérifier votre Paramètres par défaut!",
        className: "custom-class",
        style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
      });
      return;
    }

    setTimeout(() => {
      message.info(
        "Il est nécessaire que vous renseigniez les informations  pour  cette Question.",
        6
      );
    }, 300);

    setCurrent(1);
  };

  const onFinishQuestion = (values) => {
    console.log("Received values of Questions:", values);

    const questions = values.questions;
    props.setQuestionsDetails(values);
    setQuestions(values);

    //const questions=values.questions
    let PointTotal = Number(FromFormDetails.PointTotal);
    console.log("PointTotal", PointTotal);
    let TotalDuration = Number(FromFormDetails.TotalDuration);
    console.log("TotalDuration", TotalDuration);
    let totalPoints = 0;
    let totalDuration = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      totalPoints += Number(question.points);
      console.log("totalPoints" + (i + 1), totalPoints);
    }
    if (!isNaN(FromFormDetails.PointTotal)) {
      if (PointTotal !== totalPoints) {
        notification.warning({
          description:
            "La somme des points de chaque question est égale a  " +
            totalPoints +
            "  doit etre égale a la valeur des points total  " +
            PointTotal +
            " !",

          className: "custom-class",
          style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
        });
        return;
      }
    }
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      totalDuration += Number(question.duration);
      console.log("totalDurations" + (i + 1), totalDuration);
    }
    if (!isNaN(FromFormDetails.TotalDuration)) {
      if (TotalDuration !== totalDuration) {
        notification.warning({
          description:
            "Il faut que la somme des durées de chaque question soit égale à  " +
            TotalDuration +
            " minutes !",
          className: "custom-class",
          style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
        });
        return;
      }
    }
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.duration < 0) {
        notification.warning({
          description: "Veuillez vous assurer que la durée  de la question " + (i + 1) + " est un nombre positif. Merci de vérifier.!",
          className: "custom-class",
          style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
        });
        return;
      }
      if (question.points < 0) {
        notification.warning({
          description: "Veuillez vous assurer que le nombre de points de la question " + (i + 1) + " est positif. Merci de vérifier.!",
          className: "custom-class",
          style: { width: 600, backgroundColor: "#fff3cd", marginTop: "5rem" },
        });
        return;
      }
    }
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (question.typeQuestion !== "ChampLibre") {
        let valid = question.answers.filter((a) => a.CorrectAnswer);

        if (!valid.length) {
          notification.warning({
            description:
              "Question " + (i + 1) + " doit contenir une reponse correcte !",
            className: "custom-class",
            style: {
              width: 600,
              backgroundColor: "#fff3cd",
              marginTop: "5rem",
            },
          });
          return;
        }
      }
    }

    setCurrent(2);
  };

  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent(current - 1);
  };
  let index = 0;
  const submitHandler = () => {
    const data = {
      Experience: FromFormDetails.Experience,
      NumberDays: FromFormDetails.NumberDays,
      PointTotal: FromFormDetails.PointTotal,
      Stopwatch: FromFormDetails.Stopwatch,
      TotalDuration: FromFormDetails.TotalDuration,
      description: FromFormDetails.description,
      language: FromFormDetails.language,
      languageCandidate: FromFormDetails.languageCandidate,
      title: FromFormDetails.title,
      questions: QuestionsDetails,
    };
    
    if (id !== undefined) {

      updateTest(id, data);  // Make sure the URL used here is valid
    } else {
   
      addTest(data);
    }
  };
  

  const showConfirm = () => {
    confirm({
      icon: <CheckCircleOutlined style={{ color: "green" }} />,
      title:
        'Votre test a été enregistré avec succès. Si vous souhaitez commencer le test en tant que candidat, cliquez sur "Oui" et appuyez sur le bouton "Consulter le test".',
      okText: "Oui",
      okType: "primary",
      cancelText: "Non",
     
      onCancel() {
        window.location.href = "/company/TestsList";
      },
    });
  };


  const forms = [
    <FormFrom
      onFinish={onFinishTestSettings}
      initialValues={FromFormDetails}
    />,
    <QuestionList
      onFinish={onFinishQuestion}
      initialValues={QuestionsDetails}
    />,
    <ReviewTest
      QuestionsDetails={QuestionsDetails}
      FromFormDetails={FromFormDetails}
    />,
  ];
  

  const isStepDisabled = (stepNumber) => {
    if (stepNumber === 0) {
     
      return false;
    }
    if (stepNumber === 1) {
    
      return FromFormDetails === null;
      
    }
    if (stepNumber === 2) {
      
      return (
        
        FromFormDetails === null ||
        QuestionsDetails === null ||
        QuestionsDetails.length === 0
      );
    }
    if (stepNumber === 3) {
      return (
        FromFormDetails === null ||
        QuestionsDetails === null ||
        QuestionsDetails.length === 0 ||
        index === 0
      );
    }
  };

  return (
    <div className="Steps">
      {" "}
      <Steps
        style={{ padding: "32px 8px" }}
        onChange={setCurrent}
        current={current}
      >
        <Steps.Step
          disabled={isStepDisabled(0)}
          title="Paramètres du test"
          icon={<SettingOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(1)}
          title="Ajout question"
          icon={<PlusCircleOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(2)}
          title="Aperçu du test "
          icon={<EyeOutlined />}
        />
      </Steps>
      {forms[current]}
      {current === 1 && (
        <Button
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "-38px 260px 4px auto",
            zIndex: 1,
            backgroundColor: "#0093E9",
          }}
          type="primary"
          onClick={() => prev()}
        >
          <SendOutlined
            style={{
              fontSize: "16px",
              transform: "rotate(180deg)",
              marginTop: 3,
            }}
          />
          Précédent
        </Button>
      )}
      {current === 2 && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Row>
            <Button
              style={{ marginRight: 15, marginBottom: 4, marginTop: 21 }}
              type="primary"
              onClick={() => prev()}
            >
              <SendOutlined
                style={{
                  fontSize: "16px",
                  transform: "rotate(180deg)",
                  marginTop: 3,
                }}
              />
              Précédent
            </Button>

            <Button
              style={{ marginRight: 20, marginBottom: 4, marginTop: 20 }}
              type="primary"
              onClick={() => {
                submitHandler();
                showConfirm();
              }}
            >
              Enregistrer
              <SaveOutlined
                style={{
                  fontSize: "16px",
                  transform: "rotate(180deg)",
                  marginTop: 3,
                }}
              />
            </Button>
            <Link to="/company/addTest/FromForm/ConsulterTest">
              <Tooltip
                placement="top"
                title={
                  "démarrer le test en tant que candidat avant de le sauvegarder"
                }
              >
                <Button
                  style={{ marginRight: 45, marginBottom: 4, marginTop: 20 }}
                  type="primary"
                >
                  Consulter le test
                  <FileProtectOutlined
                    style={{ fontSize: "16px", marginTop: 3 }}
                  />
                </Button>
              </Tooltip>
            </Link>
            <Outlet />
          </Row>
        </div>
      )}
    </div>
  );
}
