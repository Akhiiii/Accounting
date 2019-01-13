
import React from 'react';
import 'antd/dist/antd.css';

import {
  Form, Input, Icon, Button, Row,Col
} from 'antd';

let id = 0;

class ContactPersons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           data : [],  
           };            
    }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  
  componentWillReceiveProps(){
    console.log(this.props.clear);
    if(this.props.clear)
      this.props.form.resetFields();
  }
  add = () => {
    const { form } = this.props;
    console.log(this.props.ContactPersonsData); 
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = [++id].concat(keys);
    // const nextKeys = keys.concat(++id);
    // const nextKeys = [uuid].concat(ph_keys);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    getFieldDecorator('keys', { initialValue: [this.state.data] });
    const keys = getFieldValue('keys');
    console.log(keys);
    const formItems = keys.map((k, index) => (
    <div style={{border:'0.77px solid #E3E7F1',boxSizing:'border-box',borderRadius:'1px',height:'66px',marginTop:'5px'}}>
      <Form.Item
        required={false}
        key={k}
      >
        {getFieldDecorator(`Name[${index}]`, {//initialValue: this.state.data.name,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input all the details ",
          }],
        })(
          <Input placeholder="Name" style={{ width: '200px',marginLeft:'20px',marginTop:'15px'  }} onChange={(e) => this.props.saveContactPerson(index+1,'Name', e)}/>
        )}

        {getFieldDecorator(`Designation[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input Designation ",
          }],
        })(
          <Input placeholder="Designation" style={{ width: '200px',marginLeft:'20px' }} onChange={(e) => this.props.saveContactPerson(index+1,'Designation', e)} />
        )}
         {getFieldDecorator(`Mobile[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input Mobile Number",
          }],
        })(
          <Input placeholder="Mobile" style={{ width: '200px', marginLeft:'20px'  }} onChange={(e) => this.props.saveContactPerson(index+1,'Mobile', e)}  />
        )}
         {getFieldDecorator(`Email[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            type: 'email', message: 'The input is not valid E-mail!',
          }],
        })(
          <Input placeholder="Email" style={{ width: '200px',marginLeft:'20px' }} onChange={(e) => this.props.saveContactPerson(index+1,'Email', e)} />
        )}
        {keys.length > 1 ? (
          <Icon
            style={{marginLeft:'50px'}}
            type="delete"
            disabled={keys.length === 1}
            // onClick={() => this.remove(k)}
            onClick={() => {this.remove(k);this.props.DeleteContactPerson()}} 
          />
        ) : null}
      </Form.Item>
      </div>
      
    ));
    
    return (
      <Form >
        <div style={{marginTop:'20px',marginLeft:'13px'}}>{formItems}</div>
        <Form.Item >

            <Row><Col xs={2} sm={4} md={6} lg={8} xl={{ span: 6, offset: 21 }} ><span onClick={()=>{this.add()}} style={{color:'#8854D0'}}>Add Contact Person</span></Col></Row>
       
        </Form.Item>
        {/* <Form.Item >
          <Button type="primary" onClick={this.clear}>Submit</Button>
        </Form.Item> */}
      </Form>
    );
  }
}

export default  Form.create()(ContactPersons);


          