import React,{Fragment} from 'react';
import { Form, Icon,Divider, Input,Button,Popconfirm,Table,message,Row,Col} from 'antd'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';       
class Taxes extends React.Component {
 
  index = 0;
  cacheOriginData = {};
  constructor(props) {
      super(props);
      this.state = {
        data:[{
          name: '',
          mobile_no: '',
          role: '',
          role: '',
          editable: true,
          isNew: true,
          // AddField: false
     
        }],
        New : '',
        taxesData:[],
        edit: false
      };
    }      
  
    

    getRowByKeyLocationContact(key, newData) {
      console.log(key,newData)
      const { data } = this.state;
      return (newData || data).filter(item => item.key === key)[0];
    }
  
    toggleEditableLocationContact = (e, key) => {
      e.preventDefault();
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      const target = this.getRowByKeyLocationContact(key, newData);
      console.log(target);
     
      if (target) {
        if (!target.editable) {
          
          this.cacheOriginData[key] = { ...target };
        }
        target.editable = !target.editable;
        this.setState({ data: newData });
        // this.AddNewLocationContact();
      }
      // this.AddNewLocationContact();
    };
  
    AddNewLocationContact = () => {
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      newData.unshift({
        key: this.index,
        TaxName: '',
        TaxRate: '',
        Type: '',
        Option: '',
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
  
    handleKeyPressContact(e, key) {
      if (e.key === 'Enter') {
        this.saveLocationContact(e, key);
      }
    }
    getById = (item) =>{
      console.log(item);
      const { dispatch} = this.props;
      this.setState({edit: true})
      dispatch({
          type: 'ClientsForm/byId',
          payload: item.user_id,
        });
        
        
  }
    handleFieldChangeContact(e, fieldName, key) {
      console.log(key);
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      const target = this.getRowByKeyLocationContact(key, newData);
      if (target) {
        target[fieldName] = e.target.value;
        this.setState({ data: newData });
      }
    }

    handleSave = (e) =>{
      const values =  this.state.data[0];
      console.log(values);
      this.setState({edit: false});
      const { dispatch } = this.props;
     
      var obj = {
        user_id : '',
        password : '',
        name: values.name,
        email_id : values.email_id,
        role : values.role,
        mobile_no : values.mobile_no
    }
      dispatch({
        type: 'ClientsForm/Save',
        payload: obj,
    });
        // this.saveLocationContact(e);
        // this.AddNewLocationContact();
    }
    deleteConfirm = (item) =>{
      console.log(item.user_id);
      const { dispatch} = this.props;
      dispatch({
          type: 'ClientsForm/remove',
          payload: item.user_id,
        });
  }
    saveLocationContact(e, key) {
      console.log(this.state.data);
      console.log(key);
      
      // const data =  this.state.data;
      // console.log(data[key].name);
      // e.persist();
      // if(data[key].name === "" || data[key].designation === "" || data[key].mobile === "" ||  data[key].email ==="" ){
      //   console.log('hi');
      //   message.info('Please Enter Contact Persons Details');
      // }
      // else {
      // this.props.getContactPersonsDetails(this.state.data)
       const target = this.getRowByKeyLocationContact(key) || {};
      delete target.isNew;
      this.toggleEditableLocationContact(e, key);
     
      // this.setState({
      //     editable:true,
  
      //   });
        // this.AddNewLocationContact();
      // }
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
    componentWillReceiveProps(nextProps) {
      console.log(nextProps);
       if (nextProps.data.users !== undefined && !this.state.edit){
         
          var temp = nextProps.data.users;
          console.log(temp);
          temp.unshift({
            //key: this.index,
            name: '',
            mobile_no: '',
            role: '',
            role: '',
            editable: true,
            isNew: true,
          });
          this.setState({data: nextProps.data.users});
         }
      if (nextProps.ClientsData.user !== undefined && this.state.edit){
          this.setState({taxesData:nextProps.ClientsData.user})
        }
        
  }
      
  componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'ClientsForm/List',
        payload: {},
      });
  }

render() {
  const { getFieldDecorator, getFieldValue} = this.props.form;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  
  const columns = [{
      title:'Tax Name',
      dataIndex: 'name',
      key: 'TaxName',
      width: '200px',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeContact(e, 'name', record.key)}
              onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Tax Name"
            />
          );
        }
        return text;
      },
    },{
      title:'Tax Rate',
      dataIndex: 'mobile_no',
      key: 'TaxRate',
      width: '200px',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeContact(e, 'mobile_no', record.key)}
              onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Tax Rate "
            />
          );
        }
        return text;
      },
    },
    {
      title:'Type',
      dataIndex: 'role',
      key: 'role',
      width: '200px',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeContact(e, 'role', record.key)}
              onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Type"
            />
          );
        }
        return text;
      },
    },
    {
      title:'Option',
      dataIndex: 'role',
      key: 'Option',
      width: '150px',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeContact(e, 'role', record.key)}
              onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Option"
            />
          );
        }
        return text;
      },
    },
    {
    
      key: 'action',
      render: (text, record) => {
        const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          console.log(record)
          // this.setState({New : record.key});
          // if (record.isNew) {
         
          //   return (
          //     <span>
          //       <a onClick={e => this.saveLocationContact(e, record.key)}><Icon type="save" /></a>
          //       <Divider type="vertical" />
          //         <Popconfirm title="Delete?" onConfirm={() => this.removeBankDetail(record.key)}>
          //         <a><Icon type="delete" /></a>
          //       </Popconfirm>
          //     </span>
          //   );
          // }
          // return (
          //   <span>
          //     <a onClick={e => this.saveLocationContact(e, record.key)}><Icon type="save" /></a>
          //     <Divider type="vertical" />
          //     <a onClick={e => this.cancelActionLocationContact(e, record.key)}><Icon type="close" /></a>
          //   </span>
          // );
        }
        else{
        return (
          <span>
            <a onClick={e => this.toggleEditableLocationContact(e,record)}><Icon type="edit" /></a>
            <Divider type="vertical" />
            <Popconfirm title="are you sure?" onConfirm={() => this.deleteConfirm(record)}>
              <a><Icon type="delete" /></a>
            </Popconfirm>
          </span>
        );
        }
      },
    },
  ];
  const {data } = this.state;
  console.log(this.state.taxesData);

    return (
      <Form style = {{width:'100%',border: '1px rgba(0, 0, 0, 0.25)'}}>
         <Fragment>
         <Row style={{display:'flex',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}>    
          <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
            <h3 className = "text"style={{marginLeft:'13px',marginTop:'24px'}} > New Taxes</h3> 
          </Col>
          <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 16 }}>
            <Button onClick={(e)=> this.handleSave(e)} shape="omitted" type="primary" style={{background:'#54D0B2',borderRadius:'28px',marginTop:'22px',marginBottom:'10px'}} >Save</Button>
          </Col>
          <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 0 }}>
            <Link to={`/`}><Button  shape="omitted"  style={{color : '#505050',borderRadius:'28px',marginLeft:'30px',marginTop:'22px',marginBottom:'10px'}} >Cancel</Button></Link>
          </Col>
            
        </Row>
            <Table style={{marginTop:'20px',marginLeft:'100px',marginRight:'18px',width:'1000px'}} rowSelection={rowSelection} size="small" columns={columns}
              dataSource={data} pagination={false}              
               />
            {/* <Button type="dashed" onClick={this.AddNewLocationContact} style={{margin:'8px 5px 10px 900px'}} >
              <Icon type="plus"  size="large"/> Add Contact Person
            </Button>  */}
          </Fragment>
      
    
      </Form>
    );
  }
}


const mapStateToProps=(state)=> {
  console.log(state);
  return {
     
      data: state.ClientsForm.reducerList,
      // loading: state.loading.models.ClientsForm,
      ClientsData: state.ClientsForm.reducerbyId,
    
  }  
}

export default Form.create()(
  connect(mapStateToProps)(Taxes),
);

// export default Form.create()(Taxes);