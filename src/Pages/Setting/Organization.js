import React from 'react';
import {Form, Input, Row, Col,notification,Button,Radio,Upload,Tabs} from 'antd';
import {Link} from 'react-router-dom';
import ContactPersons from '../../Common/NewContactPersons';
import ExtraDetails from '../../Common/ExtraDetails';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const message = (msg,type) => {
	notification[type]({
	  message: msg,
	});
  };

class  Organization extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        text:'Organization Profile',
        ContactPersonsData:[],
        ExtraDetails : []
      };
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
    callback = (key) => {
      console.log(key);
      if(key ==='1')
          this.setState({text:'Organization Profile'});
      if(key ==='2')
          this.setState({text:'Organization Contacts'});
      
    }
    DeleteExtraDetails = () =>{
      var tmp_list = this.state.ExtraDetails;
      tmp_list.pop();
      this.setState({ExtraDetails:tmp_list})
  }
    DeleteContactPerson = () =>{
      var tmp_list = this.state.ContactPersonsData;
      tmp_list.pop();
      this.setState({ContactPersonsData:tmp_list})
  }
  saveExtraDetails = (position,lable_type,event) =>{
        
    var tmp_list = this.state.ExtraDetails;
    if(this.state.ExtraDetails.length<position){
        var rem = position - this.state.ExtraDetails.length;
        for(var m=0;m<rem;m++){
           tmp_list.push({
               Phone:'',
               Landline:'',
               Email:''
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
    this.setState({ExtraDetails:tmp_list});
}

handleSubmit = (e) => {
  const { dispatch } = this.props;
  e.preventDefault();
  this.props.form.validateFields((errors,values) => {
      if(errors){ 
          console.log('error');
      }        
      if (!errors) {
            
          // values.ContactPersonsData = this.state.ContactPersonsData;
          console.log('Received values of form: ', values);
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
render() {
  const { getFieldDecorator} = this.props.form;
  const uploadButton = (
    <div >
      {/* <Icon type={this.state.loading } /> */}
      <div className="ant-upload-text">Upload  Photo/Logo</div>
    </div>
  );
  const imageUrl = this.state.imageUrl;
    return (
      <Form style = {{width:'100%',border: '1px rgba(0, 0, 0, 0.25)'}} onSubmit={this.handleSubmit}>
        <Row style={{display:'flex',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}>    
          <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
            <h3 className = "text" style={{marginLeft:'13px',marginTop:'24px'}} > {this.state.text}</h3> 
          </Col>
          <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 16 }}>
            <Button htmlType="submit"  shape="omitted" type="primary" style={{background:'#8854D0',borderRadius:'28px',marginTop:'22px',marginBottom:'10px'}} >Save</Button>
          </Col>
          <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 0 }}>
            <Link to={`/`}><Button  shape="omitted"  style={{color : '#505050',borderRadius:'28px',marginLeft:'30px',marginTop:'22px'}} >Cancel</Button></Link>
          </Col>
            
        </Row>

        <Tabs
          defaultActiveKey="1"
          tabPosition='right'
        //   style={{ height: 501 }}
          onChange = {this.callback}
        >
        
        <TabPane tab="Profile" key="1">
        <Row>
        <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>

          <FormItem style={{marginLeft:"450px",marginTop:'60px',width:'140px',height:'140px'}} >
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
        </Row>
        <Row>
          <Col span={5} offset={6}>
              <FormItem  style={{marginLeft:'0px'}} label="Company Name">
                {getFieldDecorator('name', { //initialValue: ClientsData.name,
                  rules: [  
                  { required: true, message: 'Please Enter Company Name!' },
                  { pattern: /^[a-zA-Z ]+$/, message: 'Company Name must be alhabets only!' },
                  { max: 30, message: 'Name 30 characters only!' }
                                  ]                      
                })(
                <Input placeholder="Enter Company Name"  type="text" name="name"  />
              )}
            </FormItem>

          </Col>
          <Col span={5} offset={1}>
              <FormItem  style={{marginLeft:'0px'}} label="Industry">
                {getFieldDecorator('Industry', { //initialValue: ClientsData.name,
                  rules: [  
                  { required: true, message: 'Please Industry!' },
                  { pattern: /^[a-zA-Z ]+$/, message: 'Industry Name must be alhabets only!' },
                  { max: 30, message: 'Name 30 characters only!' }
                                  ]                      
                })(
                <Input placeholder="Enter Industry"  type="text" name="Industry"  />
              )}
            </FormItem>

          </Col>

        </Row>
        <Row>
          <Col span={5} offset={6}>
              <FormItem  style={{marginLeft:'0px'}} label="PAN">
                {getFieldDecorator('PAN', { //initialValue: ClientsData.name,
                  rules: [  
                  { required: true, message: 'Please Enter PAN!' },          ]                      
                })(
                <Input placeholder="Enter PAN"  type="text" name="PAN"  />
              )}
            </FormItem>

          </Col>
          <Col span={5} offset={1}>
              <FormItem  style={{marginLeft:'0px'}} label="CIN">
                {getFieldDecorator('CIN', { //initialValue: ClientsData.name,
                  rules: [  
                  { required: true, message: 'Please Enter CIN !' },
                                  ]                      
                })(
                <Input placeholder="Enter CIN"  type="text" name="CIN"  />
              )}
            </FormItem>

          </Col>

        </Row>
        </TabPane>
        <TabPane tab="Contacts" key="2" style={{marginTop:'30PX'}}>
            <Row >
            <Col span={5} offset={0}>
                        <FormItem  style={{marginLeft:'15px'}} label="Address Type">
                            {getFieldDecorator('type', {// initialValue: ClientsData.name,
                                rules: [  
                                    { required: true, message: 'Please Enter Address Type!' },
                                ]                      
                            })(
                            <Input placeholder="Enter Address Type"  type="text" name="type"  />
                            )}
                        </FormItem>

                    </Col>

                   <Col span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Street 1">
                            {getFieldDecorator('Street1', {// initialValue: ClientsData.role,
                                rules: [  
                                    { required: true, message: 'Please Enter Street 1!' },
                                ]                      
                            })(
                            <Input placeholder="Enter Street 1"  type="text" name="Street1"  />
                            )}
                        </FormItem>

                    </Col>
                    <Col span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Street 2">
                            {getFieldDecorator('Street2', {// initialValue: ClientsData.role,
                                rules: [  
                                    { required: true, message: 'Please Enter Street 2!' },
                                ]                      
                            })(
                            <Input placeholder="Enter Street 2"  type="text" name="Street2"  />
                            )}
                        </FormItem>

                    </Col>
                    <Col  span={5} offset={1}>
                        <FormItem style={{marginLeft:"15px"}} label="Country/State/city/Zip" >
                            {getFieldDecorator('country', { //initialValue: ClientsData.Street_1,
                                rules: [  
                                    { required: false, message: 'Please Enter Country/State/city/Zip !' },
                                ] 
                            })(
                            <Input placeholder="Country/State/city/Zip" type="text" name="country" />
                            )}
                        </FormItem>
                        
                    </Col>
                    
                    <Col span={20} offset={0}><FormItem>
                    {getFieldDecorator('ExtraDetails', {
                        initialValue: this.state.ExtraDetails,
                    })(<ExtraDetails saveExtraDetails={this.saveExtraDetails} DeleteExtraDetails = {this.DeleteExtraDetails} clear = {this.state.clear} />)}
                    
                </FormItem> </Col>
                </Row>
              <div>
                    {getFieldDecorator('ContactPersonsDetails', {
                        initialValue: this.state.ContactPersonsData,
                    })(<ContactPersons ContactPersonsData = {this.state.ContactPersonsData} saveContactPerson={this.saveContactPerson} DeleteContactPerson = {this.DeleteContactPerson} clear = {this.state.clear} />)}
                    
                </div> 
        </TabPane>
        </Tabs>
      </Form>
    );
  }
}

export default Form.create()(Organization);