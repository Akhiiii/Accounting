import React from 'react';
import {Button,Card,Row,Col, Form, Icon, Input} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';


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

    render(){
        const { getFieldDecorator} = this.props.form;
        return(
            <div style={{height:"100vh",backgroundImage: "url("+bg+")", backgroundSize: "cover", backgroundRepeat: "no-repeat",textAlign: "-webkit-right"}}> 
                <Card style={{ width: 320,float:'left',marginLeft:'980px',marginTop:'80px',height:'300px' }}>
                <Row>
                        <Col style={{marginTop: '10px' }}>
                            <div>
                                <img src={require('../Images/logo.png')} style={{width: '60px',marginRight:'110px',marginTop:'0px'}} /> 
                                <h1  style={{marginTop:'10px',marginRight:'60px',color: '#153552'}}><b>Accounting</b></h1>
                                {/* <Button shape="omitted" type="primary" style={{marginTop:'0px',marginLeft:'25px',background:'#8854D0',borderRadius:'28px'}} >Sign Up</Button> */}
                            </div>
                        </Col>
                    </Row>
                    
                <Form onSubmit={this.handleSubmit} >
                     
                    <FormItem >
                            {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Enter your registered email or Mobile' }],
                            })(
                            <Input placeholder="Enter your registered email or Mobile" />
                             )}
                    </FormItem>

                        <FormItem>
                            <Button shape="omitted" type="primary" style={{marginTop:'0px',marginRight:'40px',background:'#8854D0',borderRadius:'28px',width:'80px'}} >Send</Button>
                            <Link  to={`/Login`}><Button shape="omitted" type="danger" style={{marginTop:'0px',borderRadius:'28px',width:'80px',marginRight:'40px'}} >Cancel</Button></Link>
                        
                        </FormItem>
                        
                        
                </Form> 
                </Card>,
          
            </div>
        );
    }
}


export default Form.create()(
    connect()(SignUpPage),
  );