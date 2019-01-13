import React from 'react';
import {Button,Card,Row,Col, Form, Icon, Input, Checkbox,} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const FormItem = Form.Item;
var bg=require('../Images/desktop2.jpg.jpg')
class SignUpPage extends React.Component{

    state={

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    responseFacebook = (response) => {
        console.log(response);
      }
    

    render(){
        const { getFieldDecorator} = this.props.form;
        return(
            <div style={{height:"100vh",backgroundImage: "url("+bg+")", backgroundSize: "cover", backgroundRepeat: "no-repeat",textAlign: "-webkit-right"}}> 
                <Card style={{ width: 300,float:'left',marginLeft:'980px',marginTop:'20px',height:'600px' }}>
                <Row>
                        <Col style={{marginTop: '10px' }}>
                            <div>
                                <img src={require('../Images/logo.png')} style={{width: '60px',marginRight:'90px',marginTop:'0px'}} /> 
                                <h1  style={{marginTop:'10px',marginRight:'40px',color: '#153552'}}><b>Accounting</b></h1>
                                {/* <Button shape="omitted" type="primary" style={{marginTop:'0px',marginLeft:'25px',background:'#8854D0',borderRadius:'28px'}} >Sign Up</Button> */}
                            </div>
                        </Col>
                    </Row>
                    
                <Form onSubmit={this.handleSubmit} >
                     <FormItem >
                            {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                             )}
                        </FormItem>
                        <FormItem >
                            {getFieldDecorator('mobile_no', { 
                                rules: [  
                                    { required: true, message: 'Please Enter Mobile Number!' },
                                    { pattern: /^[0-9 ]+$/, message: 'Mobile Number must be numric only!' },
                                    { max: 10, message: 'phone 10 digit only!' }
                                ] 
                            })(
                            <Input placeholder="Enter Mobile No." type="text" name="mobile_no" />
                            )}
                        </FormItem>
                        <FormItem>
			                {getFieldDecorator('email', {
				            rules: [{
					        type: 'email', message: 'The input is not valid E-mail!',
				            }, {
					        required: true, message: 'Please input your E-mail!',
				            }],
			                })(
					        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)',fontSize: '16px' }} />} placeholder="Email Address" />
			                )}
			            </FormItem>
                        
                        <FormItem>
                             {getFieldDecorator('password', {
                             rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button shape="omitted" type="primary" style={{marginTop:'0px',width:'250px',height:'35px',background:'#8854D0',borderRadius:'28px',marginRight:'10px'}} >Sign up</Button>
                            <Link style={{marginRight:'60px',marginTop:'0px'}} to={`/Login`}>Already Registred?</Link>
                        </FormItem>
                        <Row>
                            <p style={{marginTop:'0px',float:'left',color:'#8A8A8A'}} >or Sign Up using</p>
                        </Row>
                        <div style={{display:'flex'}}>
                        <Row>
                            <GoogleLogin
                                clientId="631622036950-ua2e95jmv39qh9tlhnnqiede8468ocl5.apps.googleusercontent.com"
                                render={renderProps => (
                                // <button onClick={renderProps.onClick}></button>
                                    <img onClick={renderProps.onClick } src={require('../Images/gmail.png')} style={{width: '30px',height:'30px',marginTop:'0px'}} /> 

                                )}
                                buttonText=""
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                             <FacebookLogin
                                appId="194052944870721"
                                autoLoad
                                callback={this.responseFacebook}
                                render={renderProps => (
                                    <img onClick={renderProps.onClick } src={require('../Images/fb.png')} style={{width: '30px',height:'30px',marginTop:'0px',marginLeft:'10px'}} /> 

                                )}
                            /> 
                            <img src={require('../Images/yahoo.png')} style={{width: '30px',height:'30px',marginLeft:'10px',marginTop:'0px'}} /> 
                            <img src={require('../Images/in.png')} style={{width: '30px',height:'30px',marginLeft:'10px',marginTop:'0px'}} />
                            <img src={require('../Images/twitter.png')} style={{width: '30px',height:'30px',marginLeft:'10px',marginTop:'0px'}} />
                            </Row>
                        </div>
                        
                </Form> 
                </Card>,
          
            </div>
        );
    }
}


export default Form.create()(
    connect()(SignUpPage),
  );