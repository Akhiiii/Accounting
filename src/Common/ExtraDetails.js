
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
    const keys = form.getFieldValue(`keys`);
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
    const keys = form.getFieldValue(`keys`);
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
    <div >
      <Form.Item
        required={false}
        key={k}
     
      >
        {getFieldDecorator(`Phone[${index}]`, {//initialValue: this.state.data.name,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input all the details ",
          }],
        })(
          <Input placeholder="Phone" style={{ width: '200px',marginLeft:'20px',marginTop:'15px'  }} onChange={(e) => this.props.saveExtraDetails(index+1,'Phone', e)}/>
        )}
         {getFieldDecorator(`Landline[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input Landline",
          }],
        })(
          <Input placeholder="Landline" style={{ width: '200px', marginLeft:'60px'  }} onChange={(e) => this.props.saveExtraDetails(index+1,'Landline', e)}  />
        )}
         {getFieldDecorator(`Email[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            type: 'email', message: 'The input is not valid E-mail!',
          }],
        })(
          <Input placeholder="Email" style={{ width: '200px',marginLeft:'60px' }} onChange={(e) => this.props.saveExtraDetails(index+1,'Email', e)} />
        )}
        {keys.length > 1 ? (
          <Icon
            style={{marginLeft:'50px'}}
            type="delete"
            disabled={keys.length === 1}
            // onClick={() => this.remove(k)}
            onClick={() => {this.remove(k);this.props.DeleteExtraDetails()}} 
          />
        ) : null}
      </Form.Item>
      </div>
      
    ));
    
    return (
      <Form >
        <div style={{border:'0.77px solid #E3E7F1',boxSizing:'border-box',borderRadius:'1px'}} >{formItems}<Icon  onClick={()=>{this.add()}} style={{marginLeft:'790px',marginTop:'0px',marginBottom:'20px'}}  type="plus-circle" />
        </div>
        <Form.Item >
            {/* <Row><div><Icon  onClick={()=>{this.add()}} style={{marginLeft:'700px',marginTop:'-100px'}} type="plus-circle" /> </div> </Row> */}

        </Form.Item>
        {/* <Form.Item >
          <Button type="primary" onClick={this.clear}>Submit</Button>
        </Form.Item> */}
      </Form>
    );
  }
}

export default  Form.create()(ContactPersons);


          