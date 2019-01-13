
import React from 'react';
import 'antd/dist/antd.css';

import {
  Form, Input, Icon, Button, Row,Col
} from 'antd';

let id = 0;

class BankDetails extends React.Component {

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
  
//   componentWillReceiveProps(){
//     console.log(this.props.clear);
//     if(this.props.clear)
//       this.props.form.resetFields();
//   }
  add = () => {
    const { form } = this.props;
    
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
    <div style={{border:'0.77px solid #E3E7F1',boxSizing:'border-box',borderRadius:'1px',height:'116px',marginTop:'5px'}}>
      <Form.Item
        required={false}
        key={k}
      >
        {getFieldDecorator(`Bank_Name[${index}]`, {//initialValue: this.state.data.name,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input all the details ",
          }],
        })(
          <Input placeholder="Bank Name" style={{ width: '200px',marginLeft:'25px',marginTop:'15px'  }} onChange={(e) => this.props.saveBankDetails(index+1,'Bank_Name', e)}/>
        )}

        {getFieldDecorator(`Account_Holder_Name[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input Account Holder Name ",
          }],
        })(
          <Input placeholder="Account Holder Name " style={{ width: '200px',marginLeft:'25px' }} onChange={(e) => this.props.saveBankDetails(index+1,'Account_Holder_Name', e)} />
        )}
         {getFieldDecorator(`Account_No[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input  Account No.",
          }],
        })(
          <Input placeholder="Account No" style={{ width: '200px', marginLeft:'25px'  }} onChange={(e) => this.props.saveBankDetails(index+1,'Account_No', e)}  />
        )}
         {getFieldDecorator(`Account_Type[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: 'Please input  Account Type',
          }],
        })(
          <Input placeholder="Account Type" style={{ width: '200px',marginLeft:'25px' }} onChange={(e) => this.props.saveBankDetails(index+1,'Account_Type', e)} />
        )}
        {getFieldDecorator(`IFSC_Code[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: 'Please input  IFSC Code',
          }],
        })(
          <Input placeholder="IFSC Code" style={{ width: '200px',marginLeft:'25px' }} onChange={(e) => this.props.saveBankDetails(index+1,'IFSC_Code', e)} />
        )}
        {getFieldDecorator(`Branch[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: 'Please input  Branch',
          }],
        })(
          <Input placeholder="Branch" style={{ width: '200px',marginLeft:'25px' }} onChange={(e) => this.props.saveBankDetails(index+1,'Branch', e)} />
        )}
        {keys.length > 1 ? (
          <Icon
            style={{marginLeft:'50px'}}
            type="delete"
            disabled={keys.length === 1}
            // onClick={() => this.remove(k)}
            onClick={() => {this.remove(k);this.props.DeleteBankDetails()}} 
          />
        ) : null}
      </Form.Item>
      </div>
      
    ));
    
    return (
      <Form >
        <div style={{marginTop:'20px',marginLeft:'13px'}}>{formItems}</div>
        <Form.Item >

            <Row><Col xs={2} sm={4} md={6} lg={8} xl={{ span: 3, offset: 21 }} ><span onClick={()=>{this.add()}} style={{color:'#8854D0'}}>Add Bank Details</span></Col></Row>
       
        </Form.Item>
        {/* <Form.Item >
          <Button type="primary" onClick={this.clear}>Submit</Button>
        </Form.Item> */}
      </Form>
    );
  }
}

export default  Form.create()(BankDetails);


          