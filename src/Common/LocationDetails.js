
import React from 'react';
import 'antd/dist/antd.css';

import {
  Form, Input, Icon, Button, Row,Col
} from 'antd';
import ContactPersons from './ExtraDetails';
let id = 0;

class BankDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ContactPersonsData : [],  
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

addExtra = (index,e) => {
  console.log(index,e);
  const { form } = this.props;
  
  // can use data-binding to get 
  const keys1 = form.getFieldValue(`keys1${index}`);
  console.log(keys1)
  const nextKeys = [++id].concat(keys1);
  // const nextKeys = keys.concat(++id);
  // const nextKeys = [uuid].concat(ph_keys);
  // can use data-binding to set
  // important! notify form to detect changes
  form.setFieldsValue({
    keys1: nextKeys,
  });
}
  add = () => {
    const { form } = this.props;
    
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = [++id].concat(keys);
    // const keys1 = form.getFieldValue('keys1');
    // const nextKeys1 = [++id].concat(keys1);
    // const nextKeys = keys.concat(++id);
    // const nextKeys = [uuid].concat(ph_keys);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
      // keys1: nextKeys1,
    });
  }
  saveContactPerson = (position,lable_type,event) =>{
        
    var tmp_list = this.state.ContactPersonsData;
    if(this.state.ContactPersonsData.length<position){
        var rem = position - this.state.ContactPersonsData.length;
        for(var m=0;m<rem;m++){
           tmp_list.push({
               Phone:'',
               Email:'',
               Landline:'',
              
           });
        }
    }
    if(lable_type==='Phone'){
       tmp_list[position-1].Phone = event.target.value;
    }else if(lable_type==='Landline'){
       tmp_list[position-1].Landline = event.target.value;
    }else if(lable_type==='Email'){
       tmp_list[position-1].Email = event.target.value;
   }
   console.log(tmp_list);
    this.setState({ContactPersonsData:tmp_list});
}
  DeleteContactPerson = () =>{
    var tmp_list = this.state.ContactPersonsData;
    tmp_list.pop();
    this.setState({ContactPersonsData:tmp_list})
 }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    getFieldDecorator('keys1', { initialValue: [this.state.data] });
    const keys1 = getFieldValue('keys1');
    console.log(keys1);
    const extraformItems = keys1.map((k, index) => (
    <div style={{width:'800px',border:'0.77px solid #E3E7F1',boxSizing:'border-box',borderRadius:'1px',marginTop:'5px',marginLeft:'20px'}}>
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
          <Input placeholder="Phone" style={{ width: '200px',marginLeft:'20px',marginTop:'15px'  }} onChange={(e) => this.props.saveContactPerson(index+1,'Phone', e)}/>
        )}
         {getFieldDecorator(`Landline[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input Landline",
          }],
        })(
          <Input placeholder="Landline" style={{ width: '200px', marginLeft:'20px'  }} onChange={(e) => this.props.saveContactPerson(index+1,'Landline', e)}  />
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
        {keys1.length > 1 ? (
          <Icon
            style={{marginLeft:'50px'}}
            type="delete"
            disabled={keys1.length === 1}
            // onClick={() => this.remove(k)}
            onClick={() => {this.remove(k);this.props.DeleteContactPerson()}} 
          />
        ) : null}
      </Form.Item>
      </div>
      
    ));
    
    getFieldDecorator('keys', { initialValue: [this.state.data] });
    const keys = getFieldValue('keys');
    console.log(keys);
    const formItems = keys.map((k, index) => (
    <div style={{border:'0.77px solid #E3E7F1',boxSizing:'border-box',borderRadius:'1px',marginTop:'5px'}}>
      <Form.Item
        required={false}
        key={k}
      >
        {getFieldDecorator(`Address_Type[${index}]`, {//initialValue: this.state.data.name,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input all the details ",
          }],
        })(
          <Input placeholder="Address Type" style={{ width: '200px',marginLeft:'25px',marginTop:'15px'  }} onChange={(e) => this.props.saveLocationDetails(index+1,'Address_Type', e)}/>
        )}

         {getFieldDecorator(`Street 1[${index}]`, {//initialValue: this.state.data.name,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input all the details ",
          }],
        })(
          <Input placeholder="Street 1" style={{ width: '200px',marginLeft:'25px',marginTop:'15px'  }} onChange={(e) => this.props.saveLocationDetails(index+1,'Street 1', e)}/>
        )}
         {getFieldDecorator(`Street 2[${index}]`, {//initialValue: this.state.data.name,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input all the details ",
          }],
        })(
          <Input placeholder="Street 2" style={{ width: '200px',marginLeft:'25px',marginTop:'15px'  }} onChange={(e) => this.props.saveLocationDetails(index+1,'Street 2', e)}/>
        )}
         {getFieldDecorator(`Country[${index}]`, {//initialValue: this.state.data.name,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input all the details ",
          }],
        })(
          <Input placeholder="Country/State/city/Zip" style={{ width: '200px',marginLeft:'25px',marginTop:'15px'  }} onChange={(e) => this.props.saveLocationDetails(index+1,'Country', e)}/>
        )}
         
         <div>
                {getFieldDecorator(`extra_details[${index}]`, {
                        // initialValue: this.state.ContactPersonsData,
                    })(<ContactPersons index = {index} saveContactPerson={this.saveContactPerson} DeleteContactPerson = {this.DeleteContactPerson} clear = {this.state.clear}  />)}
                    
                </div> 
        {/* <div>
                {getFieldDecorator(`extra_details[${index}]`, {
                        initialValue: this.state.ContactPersonsData,
                    })(<ContactPersons ContactPersonsData = {this.state.ContactPersonsData} saveContactPerson={this.saveContactPerson} DeleteContactPerson = {this.DeleteContactPerson} clear = {this.state.clear}  />)}
                    
                </div>  */}


        {keys.length > 1 ? (
          <Icon
            style={{marginLeft:'50px'}}
            type="delete"
            disabled={keys.length === 1}
            // onClick={() => this.remove(k)}
            onClick={() => {this.remove(k);this.props.DeleteLocationDetails()}} 
          />
        ) : null}
      </Form.Item>
      </div>
      
    ));
    
    return (
      <Form >
        <div style={{marginTop:'10px'}}>{formItems}</div>
        {/* <div style={{marginTop:'20px',}}>{extraformItems}</div> */}
        <Form.Item >
        {/* <Row><Col xs={2} sm={4} md={6} lg={8} xl={{ span: 3, offset: 23 }} ><Icon  onClick={()=>{this.add()}} style={{marginLeft:'10px'}} type="plus-circle" /> </Col> </Row> */}

            <Row><Col xs={2} sm={4} md={6} lg={8} xl={{ span: 3, offset: 23 }} ><Icon  onClick={()=>{this.add()}} style={{marginLeft:'10px'}} type="plus-circle" /> </Col> </Row>
       
        </Form.Item>
        {/* <Form.Item >
          <Button type="primary" onClick={this.clear}>Submit</Button>
        </Form.Item> */}
      </Form>
    );
  }
}

export default  Form.create()(BankDetails);


          