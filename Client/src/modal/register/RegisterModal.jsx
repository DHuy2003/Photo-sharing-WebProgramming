import React from 'react'
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import {Modal, Form, Button, Input, Checkbox} from "antd"
import "./RegisterStyle.css"
import { useNavigate } from 'react-router-dom';


const RegisterModal = ({isModalOpen, setIsModalOpen}) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (userData) => {
      // console.log("huy!");
      console.log(userData);
      try {
        const data = await fetch("http://localhost:8081/api/register", 
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
        const res = await data.json();
        if(res.ok){
          alert("Registration successful");
          navigate("/login");
          form.resetFields(); //reset Form
          setIsModalOpen(false);
        } else{
          alert(res.msg);
        }
        console.log(res);
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred during registration.");
      }
    };
    return (
    <Modal
        className='wrapper'
        open={isModalOpen}
        footer={null}
        onCancel={() => {
            setIsModalOpen(false);
        }}
    >   
    <Form 
        className='register-wrapper'
        form={form} 
        onFinish={onFinish}
    >    
        <Form.Item>
          <h1>Registration</h1>
        </Form.Item>
        <Form.Item
            className='input-box'
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Enter your First_name" }]}
        >
          <Input className='input'/>
        </Form.Item>
        <Form.Item
            className='input-box'
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Enter your Last_name" }]}
        >
          <Input className='input'/>
        </Form.Item>
        <Form.Item
            className='input-box'
            label="Location"
            name="location"
            rules={[{ required: true, message: "Enter your Location" }]}
        >
          <Input className='input'/>
        </Form.Item>
        <Form.Item
            className='input-box'
            label="Description"
            name="description"
            rules={[{ required: true, message: "Enter your Description" }]}
        >
          <Input className='input'/>
        </Form.Item>
        <Form.Item
            className='input-box'
            label="Occupation"
            name="occupation"
            rules={[{ required: true, message: "Enter your Occupation" }]}
        >
          <Input className='input'/>
        </Form.Item>
        <Form.Item
            className='input-box'
            label="Username"
            name="username"
            rules={[
            { required: true, message: "Enter your Username" }
          ]}
        >
          <Input className='input' />
          {/* <FaUser className='icon'/> */}
        </Form.Item>
        <Form.Item
            className='input-box'
            label="Password"
            name="password"
            rules={[
            { required: true, message: "Enter your Password" }
          ]}
        >
          <Input.Password style={{borderRadius:"30px", height: "40px"}}/>
          {/* <FaLock className='icon'/> */}
        </Form.Item>
        <Form.Item
            className='remember'
        >
            <Checkbox className='checkbox'>
            I agree to the terms & condition
            </Checkbox>
        </Form.Item>
        <Form.Item style={{paddingLeft: "100px", paddingTop: "30px"}}>
          <Button className='button' type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item> 
      </Form>
    </Modal>
    )
}

export default RegisterModal