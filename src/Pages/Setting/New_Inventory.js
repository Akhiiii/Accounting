import React,{ Component } from 'react';
import {Form, Input, Row, Col,notification,Button,Radio,} from 'antd';
import { connect } from 'react-redux';
import '../../Styles/Clients.css';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const message = (msg,type) => {
	notification[type]({
	  message: msg,
	});
  };

class ClientsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
           ClientsData : [],
           data : [],
           loading : false,
           submitting: false,
           visible : false,
           clear: false           
           
           };            
    }

    componentWillReceiveProps(nextProps) {
       console.log(nextProps);
       if (nextProps.ClientsData.user !== undefined ){
           this.setState({ClientsData:nextProps.ClientsData.user,loading : nextProps.loading,submitting:nextProps.submitting})
           }
       if (nextProps.ClientsData.user === undefined ){
           this.setState({ClientsData:[],loading : nextProps.loading,visible:false})
       }
   }  
 

  handleSubmit = (e) => {
        const { dispatch } = this.props;
        e.preventDefault();
        this.props.form.validateFields((errors,values) => {
            if(errors){ 
                console.log('error');
            }        
            if (!errors) {

               this.setState({
                    imageUrl:'',
                    loading: false,
                    expand3: false
                  });
                  
                values.ContactPersonsData = this.state.ContactPersonsData;
                console.log('Received values of form: ', values);
                var email_id = 'akhi@mail.com';
                var password ='123';
                var obj = {
                    user_id : values.user_id,
                    name:values.name,
                    email_id : email_id,
                    password : password,
                    mobile_no : values.Landline,
                    role : values.DisplayName 
                }
                console.log(obj);
                if(this.state.ClientsData.user_id!=null){  
                    obj.user_id=this.state.ClientsData.user_id;
                 
                    dispatch({
                        type: 'ClientsForm/Edit',
                        payload: obj,
                    });
                    this.props.form.resetFields();
                   
                }
                else{
                    dispatch({
                        type: 'ClientsForm/Save',
                        payload: obj,
                    });
                    this.props.history.push('/Clients');
                    this.props.form.resetFields();
                }

                message("Record is successfully sumbitted. !",'success');
        }
      });   
   
    }
    clear = () =>{
         this.props.form.resetFields(); 
    }

    render(){
        const { getFieldDecorator} = this.props.form;
        const ClientsData = this.state.ClientsData;

        console.log(ClientsData);

       
        return(
            <div>
            <Form style={{width:'100% ',}} onSubmit={this.handleSubmit} id="form" >
               <Row style={{display:'flex',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}>    
                    <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
                        <h3 className = "text" style={{marginLeft:'13px',marginTop:'24px'}} >Inventory Details </h3> 
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 16 }}>
                        <Button  shape="omitted" type="primary" style={{background:'#8854D0',borderRadius:'28px',marginTop:'22px',marginBottom:'10px'}} onClick = {this.handleSubmit}>Save</Button>
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 0 }}>
                        <Button  shape="omitted"  style={{color : '#505050',borderRadius:'28px',marginLeft:'30px',marginTop:'22px',marginBottom:'10px'}} onClick={this.clear} >Cancel</Button>
                    </Col>
            </Row>

          <div>
            <Row >
            <Col span={10} >
                            <FormItem style={{marginLeft:"15px",display:'flex'}} label="Inventory Type :">
                                {getFieldDecorator('InventoryType', {   initialValue: this.state.value,
                                    rules: [  
                                        { required: false, message: 'Please Select!' },
                                        
                                    ]                   
                                })(
                                <RadioGroup style={{marginLeft:"10px"}} value={this.state.value}>
                                        <Radio value={1}>Goods</Radio>
                                        <Radio value={2}>Service </Radio>
                                 </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
            </Row>
            <Row>
                    <Col span={5} offset={0}>
                        <FormItem  style={{marginLeft:'15px'}} label="Name">
                            {getFieldDecorator('name', { initialValue: ClientsData.name,
                                rules: [  
                                    { required: true, message: 'Please Enter Name!' },
                                    { pattern: /^[a-zA-Z ]+$/, message: 'Name must be alhabets only!' },
                                    { max: 30, message: 'Name 30 characters only!' }
                                ]                      
                            })(
                            <Input placeholder="Enter Name"  type="text" name="name"  />
                            )}
                        </FormItem>

                    </Col>

                   <Col span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Display Name">
                            {getFieldDecorator('DisplayName', { initialValue: ClientsData.role,
                                rules: [  
                                    { required: true, message: 'Please Enter Display Name!' },
                                    { pattern: /^[a-zA-Z ]+$/, message: 'Display Name must be alhabets only!' },
                                    { max: 30, message: 'Display Name 30 characters only!' }
                                ]                      
                            })(
                            <Input placeholder="Enter Display Name"  type="text" name="DisplayName"  />
                            )}
                        </FormItem>

                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="ID" >
                            {getFieldDecorator('ID', { //initialValue: ClientsData.Street_1,
                                rules: [  
                                    { required: false, message: 'Please Enter ID !' },
                                ] 
                            })(
                            <Input placeholder="Enter ID" type="text" name="ID" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Group" >
                            {getFieldDecorator('Group', { initialValue: ClientsData.mobile_no,
                                rules: [  
                                    { required: false, message: 'Please Enter Group!' },
                                ] 
                            })(
                            <Input placeholder="Enter Group" type="text" name="Group" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={0}>
                        <FormItem style={{marginLeft:"15px"}} label="Sub Group" >
                            {getFieldDecorator('SubGroup', {  //initialValue: ClientsData.Email,
                                rules: [  
                                    { required: false, message: 'Please Enter Sub Group!' },
                    
                                ] 
                            })(
                            <Input placeholder="Enter Sub Group" type="text" name="SubGroup" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Sub Group Category" >
                            {getFieldDecorator('SubGroupCategory', { //initialValue: ClientsData.Web,
                                rules: [  
                                    { required: false, message: 'Please Enter Sub Group Category!' },
                                ] 
                            })(
                            <Input placeholder="Enter Sub Group Category" type="text" name="SubGroupCategory" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label=" Qty " >
                            {getFieldDecorator('Fax', { //initialValue: ClientsData.Fax,
                                rules: [  
                                    { required: false, message: 'Please Enter Qty!' },
                                ] 
                            })(
                            <Input placeholder="Enter Qty" type="text" name="Qty" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1} >
                        <FormItem style={{marginLeft:"15px"}} label="Unit" >
                            {getFieldDecorator('Unit', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter Unit' },
                                ] 
                            })(
                            <Input placeholder="Enter Unit " type="text" name="Unit" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={0}>
                        <FormItem style={{marginLeft:"15px"}} label="SKU" >
                            {getFieldDecorator('SKU', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter SKU' },
                                ] 
                            })(
                            <Input placeholder="Enter SKU" type="text" name="SKU" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Cost" >
                            {getFieldDecorator('Cost', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter Cost' },
                                ] 
                            })(
                            <Input placeholder="Enter Cost " type="text" name="Cost" />
                            )}
                        </FormItem>
                    </Col> 
                    <Col  span={5} offset={1} >
                        <FormItem style={{marginLeft:"15px"}} label="Price" >
                            {getFieldDecorator('Price', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter Price' },
                                ] 
                            })(
                            <Input placeholder="Enter Price " type="text" name="Price" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Supplier Name" >
                            {getFieldDecorator('Supplier', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter Supplier Name' },
                                ] 
                            })(
                            <Input placeholder="Enter Supplier Name" type="text" name="Supplier" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={0}>
                        <FormItem style={{marginLeft:"15px"}} label="HSN Code" >
                            {getFieldDecorator('HSN', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter HSN Code' },
                                ] 
                            })(
                            <Input placeholder="Enter HSN Code " type="text" name="HSNCode" />
                            )}
                        </FormItem>
                    </Col> 
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="SAC Code" >
                            {getFieldDecorator('SAC', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter SAC Code' },
                                ] 
                            })(
                            <Input placeholder="Enter SAC Code " type="text" name="SACCode" />
                            )}
                        </FormItem>
                    </Col>         
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Taxes" >
                            {getFieldDecorator('Taxes', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter Taxes' },
                                ] 
                            })(
                            <Input placeholder="Enter Taxes " type="text" name="Taxes" />
                            )}
                        </FormItem>
                    </Col>     
                   
                </Row>
                <Row>
                    <a  ><p style={{ marginLeft:'1000px', fontSize: 12,fontFamily:'Roboto',fontStyle:'Regular' }}>More Taxes</p></a>
                </Row>
               
          </div>
    
         
         
        
        </Form>
            </div>
    )
  }
}

const mapStateToProps=(state)=> {
    console.log(state);
    return {
       
        data: state.ClientsForm.reducerSave,
        loading: state.loading.models.ClientsForm,
        submitting: state.loading.effects['ClientsForm/Save'],
        ClientsData: state.ClientsForm.reducerbyId,
      
    }  
 }

export default Form.create()(
    connect(mapStateToProps)(ClientsForm),
  );

  