import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Row, Tooltip, Button } from "antd";
import { DeleteOutlined   , FormOutlined,StockOutlined } from "@ant-design/icons";
import axios from "axios";
import { deleteTest } from "../../services/example/deleteTest";
import { updateTest } from "../../services/example/updateTest";

import SuiviTest from "./SuiviTest";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const { confirm } = Modal;

const { Column } = Table;

export default function TestsList() {
  const location = useLocation();

  const [tests, setTests] = useState([]);
  console.log("tests", tests);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("/getTest")
        .then((res) => {
          setTests(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  const data = tests.map((test, index) => {
    return {
      id: index + 1,
      key: test._id,
      Titre: test.title,
    };
  });

  const handleDelete = (id) => {
    confirm({
      title: "Souhaitez-vous vraiment supprimer ce test ?",
      okText: "Oui",
      okType: "primary",
      cancelText: "Non",
      onOk() {
        deleteTest(id);
      },
    });
  };

  const handleUpdate = (id) => {
    updateTest(id);
  };

  return (
    <Row gutter={[16, 16]} justify="space-between">
      <div
        style={{
          display: "block",
          width: "70%",
          margin: "auto",
          marginTop: 60,
        }}
      >
      <h1 style={{color:"#6F88FC"}}>Liste des tests</h1>
        <Table
           dataSource={data}
           sort={{ field: "Name", order: "asc" }}
           bordered={true}
           scroll={{ x: 300 }}
           pagination={{
             pageSize: 4,
             position: ["bottomCenter"],
             showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} Test`,
           }}
        >
          <Column align="center" title="" dataIndex="id" key="id" 
            render={(id) => (
              <span style={{ fontSize:"17px",fontFamily:"aria"}}>{id}</span>
            )}/>

          <Column align="center" title="Titre" dataIndex="Titre" key="titre" sorter={(a, b) => a.Titre.localeCompare(b.Titre)} sortDirections={['ascend', 'descend']}
            render={(Titre) => (
              <span style={{ fontSize:"17px",fontFamily:"aria"}}>{Titre}</span>
            )}/>

          {location.pathname === "/candidate/TestsList" ? (
            <Column
              align="center"
              render={(key, record) => (
                <Link to={`/candidate/ConsulterTest/${record.key}`}>
                  <Button className="Consulter_test">Consulter</Button>
                </Link>
              )}
              dataIndex="tags"
              key="tags"
            />
          ) : (
            <>
              {" "}
             
              <Column
                align="center"
                render={(key, record) => (
                  <Link to={`/company/resultTest/${record.key}`}>
                    <Button className="Consulter_test">Résultats <StockOutlined /></Button>
                  </Link>
                )}
                dataIndex="tags"
                key="tags"
              />
            </>
          )}

          {location.pathname !== "/candidate/TestsList" && (
            <Column
              align="center"
              title="Actions"
              key="action"
              render={(key, record) => (
                <Space size="middle">
                  <Tooltip title={"Supprimer Test"} color={"blue"}>
                    <DeleteOutlined    style={{color:"#FF0000" ,fontSize:"x-large"}}  onClick={() => handleDelete(record.key)} />
                  </Tooltip>
                  <Tooltip title={"Supprimer Test"} color={"blue"}>
                  <SuiviTest id={record.key} />
                  </Tooltip>
                  <Link to={`/company/updateTest/${record.key}`}>
                    <Tooltip title={"Modifier Test"} color={"blue"}>
                      <FormOutlined style={{color:"#00D476" ,fontSize:"x-large"}} onClick={() => handleUpdate(record.key)} />
                    </Tooltip>
                  </Link>
                </Space>
              )}
            />
          )}
        </Table>
      </div>
    </Row>
  );
}
