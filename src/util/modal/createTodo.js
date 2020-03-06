import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel, isUpdate, onUpdate, fields}) => {
    const [form] = Form.useForm();
    let stringOkButton = (isUpdate)?'Update':'Create';
    let stringTitleModal = (isUpdate)?'Update Todo': 'Create a new Todo';
    return (
      <Modal
        destroyOnClose={true}
        visible={visible}
        title= {stringTitleModal}
        okText= {stringOkButton}
        cancelText="Cancel"
        onCancel={()=>{
          form.resetFields()
          onCancel()
        }}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              if(isUpdate){
                var id = fields.find(element =>{
                  if(element.name[0] === '_id'){
                    return element
                  }
                })
                onUpdate(values, id.value)
              }else{
                onCreate(values);
              }
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          fields= {fields}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input the title !!!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  export default CollectionCreateForm;
