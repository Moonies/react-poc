import React from 'react';
import { Row, Col, input, Layout, notification } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [sortingNumber, setSortingNumber,] = React.useState([])
  const Inputnumber = React.createRef();
  const Sorting = () => {
    if (Inputnumber.current.validity.valid) {
      sortingNumber.push(Inputnumber.current.value)
      sortingNumber.sort();
      setSortingNumber([...sortingNumber])
    } else {
      notification.open({
        message: Inputnumber.current.validationMessage,
        description: 'Please input number only.',
      });
    }
  }
  return (
    <>
      <Layout>
        <Header className="layout-header"></Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Row>
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
            </Row>
          </div>
        </Content>
        <Footer ></Footer>
      </Layout>


    </>
  );
}

export default App;
