import React,{ Component } from 'react';
import {Form, Input, Row, Col,notification,Icon,Button,Radio,Cascader,Upload,Tabs} from 'antd';
import { connect } from 'react-redux';
// import { Link , withRouter} from 'react-router-dom';
import '../../Styles/Clients.css';
import {options} from '../../Common/SelectCountry';
import ContactPersons from '../../Common/NewContactPersons';
import BankDetails from '../../Common/BankDetails'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;


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
           ContactPersonsData:[],
           BankDetailsData:[],
           more: false,
           loading : false,
           submitting: false,
           visible : false,
           text : 'Details',
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

   beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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


    saveContactPerson = (position,lable_type,event) =>{
        
         var tmp_list = this.state.ContactPersonsData;
         if(this.state.ContactPersonsData.length<position){
             var rem = position - this.state.ContactPersonsData.length;
             for(var m=0;m<rem;m++){
                tmp_list.push({
                    Name:'',
                    Designation:'',
                    Mobile:'',
                    Email:''
                });
             }
         }
         if(lable_type==='Name'){
            tmp_list[position-1].Name = event.target.value;
         }else if(lable_type==='Designation'){
            tmp_list[position-1].Designation = event.target.value;
         }else if(lable_type==='Mobile'){
            tmp_list[position-1].Mobile = event.target.value;
        }else if(lable_type==='Email'){
            tmp_list[position-1].Email = event.target.value;
        }
        console.log(tmp_list);
         this.setState({ContactPersonsData:tmp_list});
    }
    
    saveBankDetails = (position,lable_type,event) =>{
        
        var tmp_list = this.state.BankDetailsData;
        if(this.state.BankDetailsData.length<position){
            var rem = position - this.state.BankDetailsData.length;
            for(var m=0;m<rem;m++){
               tmp_list.push({
                Bank_Name:'',
                Account_Holder_Name:'',
                Account_No:'',
                Account_Type:'',
                IFSC_Code:'',
                Branch:'',
               });
            }
        }
        if(lable_type==='Bank_Name'){
           tmp_list[position-1].Bank_Name = event.target.value;
        }else if(lable_type==='Account_Holder_Name'){
           tmp_list[position-1].Account_Holder_Name = event.target.value;
        }else if(lable_type==='Account_No'){
           tmp_list[position-1].Account_No = event.target.value;
       }else if(lable_type==='Account_Type'){
           tmp_list[position-1].Account_Type = event.target.value;
       }else if(lable_type==='IFSC_Code'){
            tmp_list[position-1].IFSC_Code = event.target.value;
        }else if(lable_type==='Branch'){
            tmp_list[position-1].Branch = event.target.value;
    }
       console.log(tmp_list);
        this.setState({BankDetailsData:tmp_list});
   }
    DeleteContactPerson = () =>{
        var tmp_list = this.state.ContactPersonsData;
        tmp_list.pop();
        this.setState({ContactPersonsData:tmp_list})
    }

    DeleteBankDetails = () =>{
        var tmp_list = this.state.BankDetailsData;
        tmp_list.pop();
        this.setState({BankDetailsData:tmp_list})
    }
    
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }
    callback = (key) => {
        console.log(key);
        if(key ==='1')
            this.setState({text:'Details'});
        if(key ==='2')
            this.setState({text:'Payments Terms'});
        if(key ==='3')
            this.setState({text:'Location Details'});
        if(key ==='4')
            this.setState({text:'Contact Person'});
        if(key ==='5')
            this.setState({text:'Bank Details'});
      }
    render(){
        const { getFieldDecorator} = this.props.form;
        const ClientsData = this.state.ClientsData;
        const submitting =  this.state.submitting;
        console.log(ClientsData);

        const uploadButton = (
            <div >
              {/* <Icon type={this.state.loading } /> */}
              <div className="ant-upload-text">Upload  Photo/Logo</div>
            </div>
          );
          const imageUrl = this.state.imageUrl;
        return(
            <div>
               <Form style={{width:'100% '}} onSubmit={this.handleSubmit} id="form" >
               <Row style={{display:'flex',borderBottom:'1px dashed #B8B8B8'}}>    
                    <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
                        <h3 className = "text" style={{marginLeft:'13px',marginTop:'24px'}}> {this.state.text} </h3> 
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 16 }}>
                        <Button  shape="omitted" type="primary" style={{background:'#8854D0',borderRadius:'28px',marginTop:'22px',marginBottom:'10px'}} onClick = {this.handleSubmit}>Save</Button>
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 0 }}>
                        <Button  shape="omitted"  style={{color : '#505050',borderRadius:'28px',marginLeft:'30px',marginTop:'22px',marginBottom:'10px'}} onClick={this.clear} >Cancel</Button>
                    </Col>
            </Row>

        <Tabs
          defaultActiveKey="1"
          tabPosition='right'
        //   style={{ height: 501 }}
          onChange = {this.callback}
        >
        
          <TabPane tab="Details" key="1">
            {/* <Row style={{display:'flex',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}>    
                    <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
                        <h3 className = "text" > Details </h3> 
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 16 }}>
                        <Link to={`/New_Clients`}><Button  shape="omitted" type="primary" style={{background:'#8854D0',borderRadius:'28px'}} >Save</Button></Link>
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 0 }}>
                        <Link to={`/`}><Button  shape="omitted"  style={{color : '#505050',borderRadius:'28px',marginLeft:'30px'}} >Cancel</Button></Link>
                    </Col>
            </Row> */}
            <Row >
                    <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>

                            <FormItem style={{marginLeft:"15px",marginTop:'34px',width:'140px',height:'140px'}} >
                                {getFieldDecorator('upload', {//initialValue: imageUrl,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    rules: [  
                                        { required: false, message: 'Please Upload Photo/Logo!' },
            
                                    ]   
                                 })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
                                )}
                            </FormItem>
     
                    </Col>
                    <Col span={5} offset={1}>
                        <FormItem  style={{marginLeft:'15px',marginTop:'32px'}} label="Name">
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
                        <FormItem style={{marginLeft:"15px",marginTop:'32px'}} label="Display Name">
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
                        <FormItem style={{marginLeft:"15px",marginTop:'32px'}} label="Company Type" >
                            {getFieldDecorator('CompanyType', { //initialValue: ClientsData.Street_1,
                                rules: [  
                                    { required: false, message: 'Please Enter  Company Type!' },
                                ] 
                            })(
                            <Input placeholder="Enter Company Type" type="text" name="CompanyType" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Phone No" >
                            {getFieldDecorator('phoneNo', { initialValue: ClientsData.mobile_no,
                                rules: [  
                                    { required: false, message: 'Please Enter Phone No!' },
                                ] 
                            })(
                            <Input placeholder="Enter Phone No." type="text" name="Landline" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Email" >
                            {getFieldDecorator('Email', {  //initialValue: ClientsData.Email,
                                rules: [  
                                    { required: false, message: 'Please Enter Email!' },
                                    { type: 'email', message: 'The input is not valid E-mail!',
                                }
                                ] 
                            })(
                            <Input placeholder="Enter Email" type="text" name="Email" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Web" >
                            {getFieldDecorator('Web', { //initialValue: ClientsData.Web,
                                rules: [  
                                    { required: false, message: 'Please Enter Web!' },
                                ] 
                            })(
                            <Input placeholder="Enter Web" type="text" name="Web" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={6}>
                        <FormItem style={{marginLeft:"15px"}} label=" Fax " >
                            {getFieldDecorator('Fax', { //initialValue: ClientsData.Fax,
                                rules: [  
                                    { required: false, message: 'Please Enter Fax!' },
                                ] 
                            })(
                            <Input placeholder="Enter Fax." type="text" name="Fax" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1} >
                        <FormItem style={{marginLeft:"15px"}} label="GST Type  " >
                            {getFieldDecorator('gstType', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter GST Type' },
                                ] 
                            })(
                            <Input placeholder="Enter GST Type " type="text" name="gstType" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="GST No." >
                            {getFieldDecorator('gstNo', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter GST No.' },
                                ] 
                            })(
                            <Input placeholder="Enter GST No " type="text" name="gstNo" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={6}>
                        <FormItem style={{marginLeft:"15px"}} label="TIN No" >
                            {getFieldDecorator('tinNo', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter TIN No.' },
                                ] 
                            })(
                            <Input placeholder="Enter TIN No " type="text" name="tinNo" />
                            )}
                        </FormItem>
                    </Col> 
                    <Col  span={5} offset={1} >
                        <FormItem style={{marginLeft:"15px"}} label="VAT" >
                            {getFieldDecorator('VAT', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter VAT' },
                                ] 
                            })(
                            <Input placeholder="Enter VAT " type="text" name="VAT" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="PAN No" >
                            {getFieldDecorator('panNo', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter PAN No.' },
                                ] 
                            })(
                            <Input placeholder="Enter PAN No " type="text" name="panNo" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={5} offset={6}>
                        <FormItem style={{marginLeft:"15px"}} label="Currency" >
                            {getFieldDecorator('currency', { // initialValue: ClientsData.Street_2,
                                rules: [  
                                    { required: false, message: 'Please Enter Currency' },
                                ] 
                            })(
                            <Input placeholder="Enter Currency  " type="text" name="currency" />
                            )}
                        </FormItem>
                    </Col>     
                </Row>
               
          </TabPane>
          <TabPane tab="Payments Terms" key="2"> <Row>
                    {/* <Col span={24} offset={0}>
                        <h3 className = "text" style={{marginLeft:'15px',marginTop:'0px',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}> Payments Terms 
                        </h3>
                    </Col> */}
                </Row>
                <Row >
                        <Col  span={5} offset={0}>
                            <FormItem style={{marginLeft:"17px",marginTop:'21px'}} label="No. of days" >
                                {getFieldDecorator('No.ofdays', { // initialValue: ClientsData.BillingAddressStreet_1,
                                    rules: [  
                                    { required: false, message: 'Please Enter No. of days!' },
                                    ] 
                                })(
                                <Input placeholder="Enter No. of days" type="text" name="No.ofdays" />
                                )}
                            </FormItem>
                        </Col>
                        <Col  span={10} offset={1}>
                            <FormItem style={{marginLeft:"15px",marginTop:'21px'}} label="Description " >
                                {getFieldDecorator('Description', { //initialValue: ClientsData.BillingAddressStreet_2,
                                    rules: [  
                                    { required: false, message: 'Please Enter Description!' },
                                    ] 
                                })(
                                <Input placeholder="Enter Description" type="text" name="Description" />
                                )}
                            </FormItem>
                    </Col>
                    <Col  span={5} offset={1}>
                            <FormItem style={{marginLeft:"15px",marginTop:'21px'}} label="Credit Limit " >
                                {getFieldDecorator('CreditLimit', { //initialValue: ClientsData.BillingAddressStreet_2,
                                    rules: [  
                                    { required: false, message: 'Please Enter Credit Limit!' },
                                    ] 
                                })(
                                <Input placeholder="Enter Credit Limit" type="text" name="Credit Limit" />
                                )}
                            </FormItem>
                    </Col>


                </Row></TabPane>
          <TabPane tab="Location Details" key="3">
            {/* <h3 className = "text" style={{marginLeft:'15px',marginTop:'0px',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}> Location Details 
            </h3> */}
                <div style={{display:'flex'}}>
                    <div>
                        <h4 className = "text" style={{marginLeft:'15px',marginTop:'21px'}}> Billing Address </h4>
                        <Row >
                        <Col  span={10} offset={0}>
                            <FormItem style={{marginLeft:"15px",marginTop:'18px'}} label="Street 1" >
                                {getFieldDecorator('BillingAddressStreet_1', { // initialValue: ClientsData.BillingAddressStreet_1,
                                    rules: [  
                                    { required: false, message: 'Please Enter Street_1!' },
                                    ] 
                                })(
                                <Input placeholder="Enter Street 1" type="text" name="BillingAddressStreet_1" />
                                )}
                            </FormItem>
                        </Col>
                        <Col  span={10} offset={1}>
                            <FormItem style={{marginLeft:"15px",marginTop:'18px'}} label="Street 2 " >
                                {getFieldDecorator('BillingAddressStreet_2', { //initialValue: ClientsData.BillingAddressStreet_2,
                                    rules: [  
                                    { required: false, message: 'Please Enter Street_2!' },
                                    ] 
                                })(
                                <Input placeholder="Enter Street 2" type="text" name="BillingAddressStreet_2" />
                                )}
                            </FormItem>
                    </Col>

                </Row>
                <Row >
                    <Col  span={21} offset={0}>
                        <FormItem style={{marginLeft:"15px"}} label="Country / State / City / Pincode" >
                            {getFieldDecorator('BillingAddressCountry', {  //initialValue: ClientsData.BillingAddressCountry,
                                rules: [  
                                    { required: false, message: 'Please Select' },
                                ] 
                            })(
                            <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} placeholder = "Please Select" options={options}  />,  
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col  span={10} offset={0}>
                        <FormItem style={{marginLeft:"15px"}} label="Landline" >
                            {getFieldDecorator('BillingAddressLandline', { //initialValue: ClientsData.BillingAddressLandline,
                                rules: [  
                                    { required: false, message: 'Please Enter Landline!' },
                                ] 
                            })(
                            <Input placeholder="Enter Landline" type="text" name="BillingAddressLandline" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={10} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label=" Fax " >
                            {getFieldDecorator('BillingAddressFax', {// initialValue: ClientsData.BillingAddressFax,
                                rules: [  
                                    { required: false, message: 'Please Enter Fax!' },
                                ] 
                            })(
                            <Input placeholder="Enter Fax" type="text" name="BillingAddressFax" />
                            )}
                        </FormItem>
                    </Col>

                </Row>         
                    </div>
                    <div style= {{marginLeft:'110px'}}>
                        <h4 className = "text" style={{marginLeft:'15px',marginTop:'21px'}}> Shipping Address </h4>
                        <Row >
                        <Col  span={10} offset={0}>
                            <FormItem style={{marginLeft:"15px",marginTop:'18px'}} label="Street 1" >
                                {getFieldDecorator('ShippingAddressStreet_1', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                    rules: [  
                                    { required: false, message: 'Please Enter Street_1!' },
                                    ] 
                                })(
                                <Input placeholder="Enter Street 1" type="text" name="ShippingAddressStreet_1" />
                                )}
                            </FormItem>
                        </Col>
                        <Col  span={10} offset={1}>
                            <FormItem style={{marginLeft:"15px",marginTop:'18px'}} label="Street 2 " >
                                {getFieldDecorator('ShippingAddressStreet_2', { //initialValue: ClientsData.ShippingAddressStreet_2,
                                    rules: [  
                                    { required: false, message: 'Please Enter Street_2!' },
                                    ] 
                                })(
                                <Input placeholder="Enter Street 2" type="text" name="ShippingAddressStreet_2" />
                                )}
                            </FormItem>
                    </Col>

                </Row>
                <Row >
                    <Col  span={21} offset={0}>
                        <FormItem style={{marginLeft:"15px"}} label="Country / State / City / Pincode" >
                            {getFieldDecorator('ShippingAddressCountry', {// initialValue: ClientsData.ShippingAddressCountry,
                                rules: [  
                                    { required: false, message: 'Please Select' },
                                ] 
                            })(
                            <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options}  />,  
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col  span={10} offset={0}>
                        <FormItem style={{marginLeft:"15px"}} label="Landline" >
                            {getFieldDecorator('ShippingAddressLandline', {// initialValue: ClientsData.ShippingAddressLandline,
                                rules: [  
                                    { required: false, message: 'Please Enter Landline!' },
                                ] 
                            })(
                            <Input placeholder="Enter Landline" type="text" name="ShippingAddressLandline" />
                            )}
                        </FormItem>
                    </Col>
                    <Col  span={10} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label=" Fax " >
                            {getFieldDecorator('ShippingAddressFax', { //initialValue: ClientsData.ShippingAddressFax,
                                rules: [  
                                    { required: false, message: 'Please Enter Fax!' },
                                ] 
                            })(
                            <Input placeholder="Enter Fax" type="text" name="ShippingAddressFax" />
                            )}
                        </FormItem>
                    </Col>

                </Row>         
                    </div>
                </div> 
          </TabPane>
          <TabPane tab="Contact Person" key="4">
            {/* <h3 className = "text" style={{marginLeft:'15px',marginTop:'0px',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}> Contact Persons
            </h3> */}
            <div>
                    {getFieldDecorator('ContactPersonsDetails', {
                        initialValue: this.state.ContactPersonsData,
                    })(<ContactPersons ContactPersonsData = {this.state.ContactPersonsData} saveContactPerson={this.saveContactPerson} DeleteContactPerson = {this.DeleteContactPerson} clear = {this.state.clear} />)}
                    
                </div> 
          </TabPane>
          <TabPane tab="Bank Details" key="5">
          {/* <h3 className = "text" style={{marginLeft:'15px',marginTop:'0px',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}> Bank Details
          </h3> */}
          <div>
                    
          {getFieldDecorator('BankDetails', {
                        initialValue: this.state.BankDetailsData,
                    })(<BankDetails BankDetailsData = {this.state.BankDetailsData} saveBankDetails={this.saveBankDetails} DeleteBankDetails = {this.DeleteBankDetails}  />)}
                    
                    
                </div> 
          </TabPane>
         
        </Tabs>
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

  