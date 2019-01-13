import React,{Fragment} from 'react';
import { Form, Icon,Divider, Input,Button,Popconfirm,Table,message} from 'antd'

            
class ContactPersons extends React.Component {
 
  index = 0;
  cacheOriginData = {};
  constructor(props) {
      super(props);
      this.state = {
        data:[{
          name: '',
          designation: '',
          mobile: '',
          email: '',
          editable: true,
          isNew: true,
        }],
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
      console.log(target);
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
        name: '',
        designation: '',
        mobile: '',
        email: '',
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
  
    handleFieldChangeContact(e, fieldName, key) {
      const { data } = this.state;
      const newData = data.map(item => ({ ...item }));
      const target = this.getRowByKeyLocationContact(key, newData);
      if (target) {
        target[fieldName] = e.target.value;
        this.setState({ data: newData });
      }
    }

  
    saveLocationContact(e, key) {
      console.log(key);
      
      const data =  this.state.data;
      // console.log(data[key].name);
      e.persist();
      // if(data[key].name === "" || data[key].designation === "" || data[key].mobile === "" ||  data[key].email ==="" ){
      //   console.log('hi');
      //   message.info('Please Enter Contact Persons Details');
      // }
      // else {
      this.props.getContactPersonsDetails(this.state.data)
       const target = this.getRowByKeyLocationContact(key) || {};
      delete target.isNew;
      this.toggleEditableLocationContact(e, key);
      this.setState({
          editable:true
        });
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


render() {
  const { getFieldDecorator, getFieldValue} = this.props.form;
  const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              // onChange={e => this.handleFieldChangeContact(e, 'name', record.key)}
              // onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Name"
            />
          );
        }
        return text;
      },
    },{
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeContact(e, 'designation', record.key)}
              onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Designation "
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeContact(e, 'mobile', record.key)}
              onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Mobile"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChangeContact(e, 'email', record.key)}
              onKeyPress={e => this.handleKeyPressContact(e, record.key)}
              placeholder="Email"
            />
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
                  <Popconfirm title="Delete?" onConfirm={() => this.removeBankDetail(record.key)}>
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
            <Popconfirm title="are you sure?" onConfirm={() => this.removeBankDetail(record.key)}>
              <a><Icon type="delete" /></a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const {data } = this.state;
  
    return (
      <Form style = {{width:'100%',border: '1px rgba(0, 0, 0, 0.25)'}}>
         <Fragment>
           
            <Table size="small" columns={columns}
              dataSource={data} pagination={false}              
               />
            <Button type="dashed" onClick={this.AddNewLocationContact} style={{margin:'8px 5px 10px 900px'}} >
              <Icon type="plus"  size="large"/> Add Contact Person
            </Button> 
          </Fragment>
      
    
      </Form>
    );
  }
}

export default Form.create()(ContactPersons);