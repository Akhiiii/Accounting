import React,{Fragment} from 'react';
import { Form, Icon,Divider, Input,Button,Select,Cascader,Popconfirm,Table} from 'antd';
import { connect } from 'react-redux';
import {options} from './SelectCountry';

const FormItem = Form.Item;
const Option = Select.Option;
let uuid = 0;
        

class LocationDetailsForm extends React.Component {
 
  index = 0;
  cacheOriginData = {};
  constructor(props) {
      super(props);
      this.state = {
        data:[{
            street1: '',
            street2: '',
            country: '',
            typeOfLocation: '',
            editable: true,
            isNew: true,
          }],
        options,
        loading: false,
      };
    }      
  
    

    getRowByKeyLocationContact(key, newData) {
      const { data } = this.state;
      return (newData || data).filter(item => item.key === key)[0];
    }
  
    toggleEditableLocationContact = (e, key) => {
      e.preventDefault();
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      const target = this.getRowByKeyLocationContact(key, newData);
      if (target) {
        if (!target.editable) {
          this.cacheOriginData[key] = { ...target };
        }
        target.editable = !target.editable;
        this.setState({ data: newData });
      }
    };
  
    AddNewLocationContact = () => {
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      newData.unshift({
        key: this.index,
        typeOfLocation: '',
        streetName1: '',
        streetName2: '',
        country: [],
        editable: true,
        isNew: true,
      });
      this.index += 1;
      this.setState({ data: newData });
    };
  
    removeBankDetail(key) {
      const { data } = this.state;
      const { onChange } = this.props;
      const newData = data.filter(item => item.key !== key);
      this.setState({ data: newData });
      // onChange(newData);
    }
  
    handleKeyPressLocationContact(e, key) {
      if (e.key === 'Enter') {
        this.saveLocationContact(e, key);
      }
    }
  
    handleFieldChangeLocationContact(e, fieldName, key) {
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      const target = this.getRowByKeyLocationContact(key, newData);
      if (target) {
        target[fieldName] = e.target.value;
        this.setState({ data: newData });
      }
    }

    handleFieldChangeLocationContact1(e, fieldName, key) {
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      const target = this.getRowByKeyLocationContact(key, newData);
      if (target) {
        //target[fieldName] = e.target.value;
        target[fieldName] = e;
        this.setState({ data: newData });
      }
    }
  
    saveLocationContact(e, key) {
      console.log(this.state.data);
      e.persist();
      this.props.getLocationDetails(this.state.data)
        const target = this.getRowByKeyLocationContact(key) || {};
       
        delete target.isNew;
        this.toggleEditableLocationContact(e, key);

        this.setState({
          editable:true
        });
     
    }
  
    cancelActionLocationContact(e, key) {
      this.clickedCancel = true;
      e.preventDefault();
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      const target = this.getRowByKeyLocationContact(key, newData);
      if (this.cacheOriginData[key]) {
        Object.assign(target, this.cacheOriginData[key]);
        target.editable = false;
        delete this.cacheOriginData[key];
      }
      this.setState({ data: newData });
      this.clickedCancel = false;
    }

 
  remove_phone = (k) => {
    const { form } = this.props;
    const ph_keys = form.getFieldValue('ph_keys');
    if (ph_keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      ph_keys: ph_keys.filter(key => key !== k),
    });
  }

  add_phone = () => {
    const { form } = this.props;
    const ph_keys = form.getFieldValue('ph_keys');
    // const nextKeys = ph_keys.concat(uuid);
    const nextKeys = [uuid].concat(ph_keys);
    
    uuid++;
    form.setFieldsValue({
      ph_keys: nextKeys,
    });
  }
  
  remove_landline = (k) => {
    const { form } = this.props;
    const landline_keys = form.getFieldValue('landline_keys');
    if (landline_keys.length === 1) {
      return;
    }
    form.setFieldsValue({
        landline_keys: landline_keys.filter(key => key !== k),
    });
  }
  
  add_landline = () => {
    const { form } = this.props;
    const landline_keys = form.getFieldValue('landline_keys');
    // const nextKeys = ph_keys.concat(uuid);
    const nextKeys = [uuid].concat(landline_keys);
    
    uuid++;
    form.setFieldsValue({
        landline_keys: nextKeys,
    });
  }
 

  remove_email = (k) => {
    const { form } = this.props;
    const email_keys = form.getFieldValue('email_keys');
    if (email_keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      email_keys: email_keys.filter(key => key !== k),
    });
  }

  add_email = () => {
    const { form } = this.props;
    const email_keys = form.getFieldValue('email_keys');
    // const nextKeys = email_keys.concat(uuid);
    const nextKeys = [uuid].concat(email_keys);
    uuid++;
    form.setFieldsValue({
      email_keys: nextKeys,
    });
  }

render() {
  const { getFieldDecorator, getFieldValue} = this.props.form;
  const disable=this.props.disable;
  console.log("ghfhgf", this.props.users)

  const columns = [
    {
      title: 'Type Of Address',
      dataIndex: 'typeOfLocation',
      key: 'typeOfLocation',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Select name="typeOfLocation"
              placeholder="Select Type Of Location"
              style={{ width: '100%' }}
              onChange={e => this.handleFieldChangeLocationContact1(e, 'typeOfLocation', record.key)}
              >
              <Option value="Office">Office</Option>
              <Option value="Work">Work</Option>
              <Option value="Home">Home</Option>
              <Option value="Postal">Postal</Option>
          </Select>
          );
        }
        return text;
      },
    },
    {
      title: 'Street 1',
      dataIndex: 'street1',
      key: 'street1',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeLocationContact(e, 'street1', record.key)}
              onKeyPress={e => this.handleKeyPressLocationContact(e, record.key)}
              placeholder="StreetName 1"
            />
          );
        }
        return text;
      },
    },{
      title: 'Street 2',
      dataIndex: 'street2',
      key: 'street2',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeLocationContact(e, 'street2', record.key)}
              onKeyPress={e => this.handleKeyPressLocationContact(e, record.key)}
              placeholder="StreetName 2"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Country/State/City/Pin Or Zip',
      dataIndex: 'country',
      key: 'country',
      width: '30%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              onChange={e => this.handleFieldChangeLocationContact1(e, 'country', record.key)}
              changeOnSelect  />
          );
        }
        return text;
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => {
        const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => this.saveLocationContact(e, record.key)}><Icon type="save" /></a>
                <Divider type="vertical" />
                  <Popconfirm title="Delete" onConfirm={() => this.removeBankDetail(record.key)}>
                  <a><Icon type="delete" /></a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.saveLocationContact(e, record.key)}><Icon type="save" /></a>
              <Divider type="vertical" />
              <a onClick={e => this.cancelActionLocationContact(e, record.key)}><Icon type="close" /></a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditableLocationContact(e, record.key)}><Icon type="edit" /></a>
            <Divider type="vertical" />
            <Popconfirm title="Are you want to Delete" onConfirm={() => this.removeBankDetail(record.key)}>
              <a><Icon type="delete" /></a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const { loading, data } = this.state;
  
    
   
getFieldDecorator('ph_keys', { initialValue: [{}] });
const ph_keys = getFieldValue('ph_keys');
const Phone_FormItems = ph_keys.map((k, index) => {
  return (
    <Fragment>
    <FormItem 
      required={false}
      key={k}
    >
      {getFieldDecorator(`phone[${k}].ph`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{ required: true, whitespace: true, message: "Please enter phone",  }],
      })(
        <Input style={{width:'300px',marginLeft:'5px'}} placeholder="Enter phone number"  />
      )}
      {ph_keys.length > 1 ? (
        <Icon
          style={{marginLeft:'5px'}}
          type="minus-circle-o"
          disabled={ph_keys.length === 1}
          onClick={() => this.remove_phone(k)}
        />
      ) : null}
    </FormItem>
   </Fragment>

  );
});


getFieldDecorator('landline_keys', { initialValue: [{}] });
const landline_keys = getFieldValue('landline_keys');
const Landline_FormItems = landline_keys.map((k, index) => {
  return (
    <Fragment>
    <FormItem 
      required={false}
      key={k}
    >
      {getFieldDecorator(`Landline[${k}].ph`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{ required: true, whitespace: true, message: "Please enter Landline ",  }],
      })(
        <Input style={{width:'200px',marginLeft:'5px'}} placeholder="Enter Landline number"  />
      )}
      {landline_keys.length > 1 ? (
        <Icon
          style={{marginLeft:'5px'}}
          type="minus-circle-o"
          disabled={landline_keys.length === 1}
          onClick={() => this.remove_landline(k)}
        />
      ) : null}
    </FormItem>
   </Fragment>

  );
});

getFieldDecorator('email_keys', { initialValue: [{}] });
const email_keys = getFieldValue('email_keys');
const Email_FormItems = email_keys.map((k, index) => {
  return (
    <Fragment>
      
    <FormItem 
      style = {{width:'95%',marginLeft : '5px'}}
      required={false}
      key={k}
    >
      {getFieldDecorator(`email[${k}].emailid`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{ required: true, whitespace: true, message: "Please enter email address",  }],
      })(
        <Input style={{width:'300px',marginLeft:'5px'}} placeholder="Enter email address" name="email" />
      )}
      {email_keys.length > 1 ? (
        <Icon
          style={{marginLeft:'5px'}}
          type="minus-circle-o"
          disabled={email_keys.length === 1}
          onClick={() => this.remove_email(k)}
        />
      ) : null}
    </FormItem>
   </Fragment>

  );
});

    const { users } = this.props;
    return (
      <div style = {{width:'100%'}}>
         <Fragment>
            <Button type="dashed" onClick={this.AddNewLocationContact} style={{margin:'8px 2px 10px 950px'}} disabled={disable}>
              <Icon type="plus"  size="large"/> Add Address
            </Button> 

            <Table size="small" loading={loading} columns={columns}
              dataSource={data} pagination={false}              
              rowClassName={record => {
                return record.editable ;
              }} 
               />
          </Fragment>
      
      <Form  onSubmit={this.handleSubmit} style={{width: '100%',height:'150px',marginTop:'0px',marginBottom:'0px',display: 'flex'}}>
       
          
         <FormItem  style = {{width:'400px',marginBottom : '2px',overflowY:'scroll',marginLeft:'15px' }}>
          
          <FormItem label = "Phone" style = {{width: '100%',height : '1%',display : 'flex'}} >
              <Button type="dashed" onClick={this.add_phone} style={{ marginLeft : '250px'}}>
                <Icon type="plus-circle" theme="outlined" />  
              </Button>
          
          </FormItem>
          {Phone_FormItems}
        </FormItem>
      
        

        <FormItem  style = {{width:'400px',marginBottom : '2px',overflowY:'scroll',marginLeft:'15px' }}>
          
          <FormItem label = "Email" style = {{width: '100%',height : '1%',display : 'flex'}} >
              <Button type="dashed" onClick={this.add_email} style={{ marginLeft : '250px'}}>
                <Icon type="plus-circle" theme="outlined" />  
              </Button>
          
          </FormItem>
          {Email_FormItems}
        </FormItem>
      
      

         <FormItem  style = {{width:'300px',marginBottom : '2px',overflowY:'scroll',marginLeft:'15px' }}>
          
          <FormItem label = "Landline" style = {{height : '1%',display : 'flex'}} >
              <Button type="dashed" onClick={this.add_landline} style={{ marginLeft : '150px'}}>
                <Icon type="plus-circle" theme="outlined" />  
              </Button>
          
          </FormItem>
          {Landline_FormItems}
        </FormItem>
      
        

      </Form>
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("stateEditdetails", state.phoneNumberTypeReducer);
  return {
    
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // phoneNumberType: (values) => { dispatch(phoneNumberType(values)) }
  }
}
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(LocationDetailsForm));