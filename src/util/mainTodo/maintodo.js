import React, { useState, useEffect, useReducer } from 'react';
import { Card, Popconfirm, notification, Button  } from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import ModalForm from '../modal/createTodo';
import axios from 'axios';


export default (props) => {
    const [visible, setVisible] = useState(false);
    const [alltodo, setAllTodo] = useState([]);
    const token = props.location.state.token;
    const [isupdate, setUpdate] = useState('');
    const reducer = (state, action) => {
        var result = initialFields.filter((element) => {
            switch (element.name[0]) {
                case 'title':
                    return element.value = action.title
                case 'description':
                    return element.value = action.description
                case '_id':
                    return element.value = action._id
                default:
                    return element
            }
        })
        return result
    }
    const initialFields = [
        {
            name: ['title'],
            value: '',
        },
        {
            name: ['description'],
            value: '',
        },
        {
            name: ['_id'],
            value: '',
        }
    ]
    const [fields, setFields] = useReducer(reducer, initialFields);
    const config = {
        headers: {
            Authorization: `Bearer ${token.token}`,
            contentType: 'application/json',
        }
    }
    useEffect(() => {
        axios.get('https://candidate.neversitup.com/todo/todos', config)
            .then(result => {
                console.log(result)
                if (result.data.length > 0) {
                    setAllTodo(result.data);
                }
            }, (error) => {
                openNotificationWithIcon('error', error.response)
            })
    }, [])

    const getTodoByid = (detail) => {
        axios.get('https://candidate.neversitup.com/todo/todos/' +  detail._id, config)
            .then(result => {
                setFields(result.data)
                setUpdate(true);
                setVisible(true);
            })
    }
    const createTodo = (request) => {
        axios.post('https://candidate.neversitup.com/todo/todos', request, config)
            .then(result => {
                alltodo.push(result.data)
                setAllTodo([...alltodo]);

            })
    }
    const updateTodo = (detail, id) => {
        var request = {
            title: detail.title,
            description: detail.description
        }
        axios.put('https://candidate.neversitup.com/todo/todos/'+ id, request, config)
            .then(result => {
                for(var index = 0; index< alltodo.length; index++){
                    if(alltodo[index]._id === result.data._id){
                        alltodo[index] = result.data;
                        break;
                    }
                }
                setAllTodo([...alltodo]);
            },(error)=>{
                openNotificationWithIcon('error', error.response)
            })
    }
    const deleteTodo = (detail, event) => {
        event.stopPropagation();
        axios.delete('https://candidate.neversitup.com/todo/todos/'+detail._id, config)
        .then(() => {
                for(var index=0; index< alltodo.length; index++){
                    console.log(alltodo[index]._id === detail._id)
                    if(alltodo[index]._id === detail._id){
                        alltodo.splice(index, 1)
                        break;
                    }
                }
                setAllTodo([...alltodo]);
        },(error)=>{
            openNotificationWithIcon('error', error.response)
        })
    }
    const createNewTodo = () => {
        setFields({title: null, description: null, _id: null})
        setUpdate(false);
        setVisible(true)
    }
    const viewTodo = (detail, event) => {
        event.stopPropagation();
        getTodoByid(detail)
        
    }
    const onCreate = (values) => {
        createTodo(values)
        setVisible(false);
    };
    const onUpdate = (values, id) => {
        updateTodo(values, id);
        setVisible(false);
    }
    const openNotificationWithIcon = (type, body) => {
        notification[type]({
          message: 'Eorror Status Code '+body.status,
          description:
            body.statusText,
        });
      };
    return (
        <>
            <Button type="primary"   icon={<PlusCircleFilled />} onClick={() => createNewTodo()} style={{margin: '8px'}}>Create Todo</Button>
            {alltodo.map((detail, index) => {
                return <div key={index}>
                    <Card title={detail.title} onClick={(event) => viewTodo(detail, event)}
                        extra={
                            <Popconfirm title={"Sure to delete "+detail.title+"?"} onClick={(event) => { event.stopPropagation() }} onConfirm={(event) => deleteTodo(detail, event)} onCancel={(event) => { event.stopPropagation() }}>
                                <a>Delete</a>
                            </Popconfirm>
                        }
                        style={{ width: 300 }}>
                        <p>{detail.description}</p>
                    </Card>
                </div>
            })}
            <ModalForm
                destroyOnClose= {true}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                fields= {fields}
                isUpdate={isupdate}
                onUpdate={onUpdate}
            />
        </>
    )
}
