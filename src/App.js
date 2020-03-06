import React from 'react';
import { Row, Col, input, Layout, notification } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import Router from './util/routesConfig/routerConfig'
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <>
      <Layout style={{height:"100vh"}}>
        <Header className="layout-header"></Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{overflow: 'auto', height: '100%'}}>
            {/* <Row justify="space-around" align="middle"></Row> */}
            {/* <Forminput></Forminput> */}
            {/* <Row>
              <Col span={4} offset={6}>
                <input type="text" pattern="[0-9]*" ref={Inputnumber} placeholder="Basic Sorting" />
              </Col>
              <Col span={4}>
                <button onClick={Sorting}>Submit Number</button>
              </Col>
            </Row>
            <Row style={{ padding: '8px' }}>
              <Col span={6} offset={6}>
                  Sort:
                  {sortingNumber.map((number, index) => {
                        return <li key={index}> {number}</li>
                      })}
              </Col>
            </Row> */}
            <Router />
          </div>
        </Content>
        <Footer ></Footer>
      </Layout>


    </>
  );
}

export default App;
