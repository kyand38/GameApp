import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
//import {  Button } from 'react-bootstrap';
import { LoginMutations } from '../apollo/mutations'; // Import ADD_USER mutation
//import { Form, Input, Button, message, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';
import { gsap } from 'gsap';
import { AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';


import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

/******************************************************* */

const Login = ({ handleForm }: { handleForm: () => void }) => {
 // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LoginMutation] = useMutation(LoginMutations);/*CONSULTAR*/


  const handleSubmit = async () => {
    //e.preventDefault();
    try {
      const { data } = await LoginMutation({ variables: { email, password } });
      if (data?.login?.token && data?.login?.user ) {// Verifica si el usuario existe
       // localStorage.setItem('id_token', data.login.token);
        Auth.login(data.login.token);

      } else {
        console.error('Invalid credentials or user does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

const useStyle = createStyles(({ prefixCls, css }) => ({
      linearGradientButton: css`
          &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
              border-width: 0;
  
              > span {
                  position: relative;
              }
  
              &::before {
                  content: '';
                  background: linear-gradient(135deg, #6253e1, #04befe);
                  position: absolute;
                  inset: 0;
                  opacity: 1;
                  transition: all 0.3s;
                  border-radius: inherit;
              }
  
              &:hover::before {
                  opacity: 0;
              }
          }
      `,
        // display: flex;
          // justify-content: center;
          // align-items: center;
         // Text: #000000E0
      container: css`
        
         color: #000000;
          height: 50vh;
          background-color: black;
      `,
      formWrapper: css`
          background-color: #2c2c2c;
          padding: 30px;
          border-radius: 10px;
          width: 400px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          color: white;
      `,
      formTitle: css`
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 20px;
      `,
      input: css`
      margin-bottom: 20px;
      width: 100%;
      border-radius: 5px;
      padding: 10px;
      background-color: #d3d3d3;
      color: #000;
      border: 1px solid #ccc;
  
      &:focus {
          background-color: #b0b0b0; /* Slightly darker grey on focus */
          border-color: #6253e1; /* Border color when focused */
      }
  
      &::placeholder {
          color: #777; /* Darker grey for placeholder text */
      }
  `,
      button: css`
          width: 100%;
          background-color: #6253e1;
          color: white;
          font-size: 1.2rem;
          padding: 10px;
          border: none;
          border-radius: 5px;
          transition: background-color 0.3s ease-in-out;
          &:hover {
              background-color: #04befe;
          }
      `,
      modalOverlay: css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
      `,
      modalContent: css`
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          max-width: 100%;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          z-index: 10000;
      `,
      closeButton: css`
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #333;
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
      `,
  }));
 
   const { styles } = useStyle();
  //  useEffect(() => {
  //   //         // GSAP animation for form appearance
  //   //         gsap.from('.formWrapper', { opacity: 0, y: -50, duration: 1, ease: 'easeOut' });
  //   //         gsap.from('.input', { opacity: 0, y: 20, stagger: 0.2, duration: 1, ease: 'easeOut' });
  //   //         gsap.from('.submitButton', { opacity: 0, y: 20, duration: 1, ease: 'easeOut', delay: 0.5 });
  //   //     }, []);
    
  //   //     const onFinish = (values: SignInFormValues) => {
  //   //         console.log('Success:', values);
  //   //         message.success('Login Successful!');
  //   //     };
    
  //   //     const onFinishFailed = (errorInfo: any) => {
  //   //         console.log('Failed:', errorInfo);
  //   //         message.error('Please check your credentials');
  //   //     };
    
  //   //     const [showModal, setShowModal] = useState(false);
  //   //     const [showLoginModal, setshowLoginModal] = useState(false); 
  return (
    <div  
    className={styles.container}
    >
      {/* <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

      </form> */}
      <Form 
              layout={"vertical"} 
           onFinish={handleSubmit}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
          /*  onFinish={onFinish}*/
            autoComplete="off"
          >
            <Form.Item<FieldType>
                className={styles.formTitle}
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input                        
                        //async (e: React.FormEvent)
                        className={styles.input}           
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e:React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
        >
                          
              </Input>
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                    className={styles.input}     
                   type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
              >
              </Input.Password>
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
        </Form>



    </div>
  );

}
export default Login;



interface SignInFormValues {
    username: string;
    password: string;
}

// const useStyle = createStyles(({ prefixCls, css }) => ({
//     linearGradientButton: css`
//         &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
//             border-width: 0;

//             > span {
//                 position: relative;
//             }

//             &::before {
//                 content: '';
//                 background: linear-gradient(135deg, #6253e1, #04befe);
//                 position: absolute;
//                 inset: 0;
//                 opacity: 1;
//                 transition: all 0.3s;
//                 border-radius: inherit;
//             }

//             &:hover::before {
//                 opacity: 0;
//             }
//         }
//     `,
//     container: css`
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 100vh;
//         background-color: black;
//     `,
//     formWrapper: css`
//         background-color: #2c2c2c;
//         padding: 30px;
//         border-radius: 10px;
//         width: 400px;
//         box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//         text-align: center;
//         color: white;
//     `,
//     formTitle: css`
//         font-size: 2rem;
//         color: #ffffff;
//         margin-bottom: 20px;
//     `,
//     input: css`
//     margin-bottom: 20px;
//     width: 100%;
//     border-radius: 5px;
//     padding: 10px;
//     background-color: #d3d3d3;
//     color: #000;
//     border: 1px solid #ccc;

//     &:focus {
//         background-color: #b0b0b0; /* Slightly darker grey on focus */
//         border-color: #6253e1; /* Border color when focused */
//     }

//     &::placeholder {
//         color: #777; /* Darker grey for placeholder text */
//     }
// `,
//     button: css`
//         width: 100%;
//         background-color: #6253e1;
//         color: white;
//         font-size: 1.2rem;
//         padding: 10px;
//         border: none;
//         border-radius: 5px;
//         transition: background-color 0.3s ease-in-out;
//         &:hover {
//             background-color: #04befe;
//         }
//     `,
//     modalOverlay: css`
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0, 0, 0, 0.7);
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         z-index: 9999;
//     `,
//     modalContent: css`
//         background-color: white;
//         padding: 20px;
//         border-radius: 10px;
//         width: 400px;
//         max-width: 100%;
//         text-align: center;
//         box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
//         z-index: 10000;
//     `,
//     closeButton: css`
//         background: none;
//         border: none;
//         font-size: 1.5rem;
//         color: #333;
//         position: absolute;
//         top: 10px;
//         right: 10px;
//         cursor: pointer;
//     `,
// }));