import React,{ Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css'; 
import {Form,Table,Popconfirm,Button,Icon,Divider,Dropdown,Menu,Modal,List,Card,Tooltip,Row,Col} from 'antd';
import { Link } from 'react-router-dom';
class VendorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VendorsList:[],
            loading : false,
            visible: true,
            showComponent: false,
            

        };           
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
         if (nextProps.data !== undefined ){
            this.setState({VendorsList: nextProps.data.users,loading : nextProps.loading});
           }
    }
        
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'VendorsForm/List',
          payload: {},
        });
    }
    

    deleteConfirm = (item) =>{
        console.log(item.user_id);
        const { dispatch} = this.props;
        dispatch({
            type: 'VendorsForm/remove',
            payload: item.user_id,
          });
    }

    getById = (item) =>{
        console.log(item.user_id);
        const { dispatch} = this.props;
        // this.setState({visible: true})
        dispatch({
            type: 'VendorsForm/byId',
            payload: item.user_id,
          });
          
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', 
          name: record.name,
        }),
      };
    changeView=()=>{
      this.setState({visible: !this.state.visible});
    }

      
  render(){

    const VendorsList = this.state.VendorsList;
    console.log(VendorsList);

    const CardInfo = (item) => (
      <div>
          <p style={{marginLeft:'2px',marginTop:'3px',fontFamily:'Roboto',fontSize:'14px',fontStyle:' Medium '}}>{item.user_id}</p>

        <div style={{display:'flex'}}>

            <div>
              <p style={{marginLeft:'6px',marginTop:'3px',fontFamily:'Roboto',fontSize:'10px',fontStyle:' Medium Italic'}}> Total Amount</p>
              <p style={{marginLeft:'6px',marginTop:'1px',fontFamily:'Roboto',fontSize:'13px',fontStyle:' Medium '}}> {item.mobile_no}</p>
              <p style={{marginLeft:'6px',marginTop:'3px',fontFamily:'Roboto',fontSize:'10px',fontStyle:' Medium Italic'}}> Invoice Date</p>
              <p style={{marginLeft:'6px',marginTop:'1px',fontFamily:'Roboto',fontSize:'13px',fontStyle:' Medium'}}> {item.created_at}</p>
              <p style={{marginLeft:'6px',marginTop:'3px',fontFamily:'Roboto',fontSize:'10px',fontStyle:' Medium Italic'}}> Invoice Type </p>

            </div>
            <div>
            <p style={{marginLeft:'50px',marginTop:'3px',fontFamily:'Roboto',fontSize:'10px',fontStyle:' Medium Italic'}}>Due Amount</p>
            <p style={{marginLeft:'50px',marginTop:'1px',fontFamily:'Roboto',fontSize:'13px',fontStyle:' Medium '}}> {item.mobile_no}</p>
            <p style={{marginLeft:'50px',marginTop:'3px',fontFamily:'Roboto',fontSize:'10px',fontStyle:' Medium Italic'}}> Due Date</p>
            <p style={{marginLeft:'50px',marginTop:'1px',fontFamily:'Roboto',fontSize:'13px',fontStyle:' Medium'}}> {item.created_at}</p>
            <p style={{marginLeft:'50px',marginTop:'3px',fontFamily:'Roboto',fontSize:'13px',fontStyle:' Medium '}}>{item.role}</p>
        
            </div>
        </div>
      </div>
      );
    const Delete = (currentItem) => {
       
      
          Modal.confirm({
            title :  ' Are you sure to delete ' ,
            Content :  ' Are you sure to delete this task? ' ,
            okText :  ' confirm ' ,
            cancelText :  ' Cancel ' ,
            onOk : () =>  this.deleteConfirm ( currentItem),
            
          });
    };

    const MoreBtn = props => (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => Delete(props.current)}>
              <Menu.Item key="delete">delete</Menu.Item>
            </Menu>
          }
        >
          <a>
             <Icon type="ellipsis" />
          </a>
        </Dropdown>
      );
    
    const tableColumns = [
        {
          title: 'S.No',
          width:120,
          dataIndex: 'user_id',
          id: 'user_id',
        },
        {
          title: 'Company Name',
          dataIndex: 'role',
          width: 400,
        }, 
        {
            title: 'Display Name',
            dataIndex: 'role',
            width: 250,
        },
    
        {   title: 'Company Type',
            width: 350,
            dataIndex: 'created_at',
        },
        
        {   title: 'Contact Person',
            width: 300,
            dataIndex: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'mobile_no',
            width: 250,
        },
    
        {   title: 'Email',
            width: 400,
            dataIndex: 'email_id',
        },
        
        {   title: 'Address',
            width: 300,
            dataIndex: 'mobile_no',
        },

        {
          title: 'Actions',
          width: 150,
          render: item => (
            <div> 
              <Link to={`/Clients/Edit/${item.user_id}`}>
                <a onClick={() => { this.getById(item)}}> 
                    <Icon type="edit"  />
                </a>
             </Link>
            
            
             <Divider type="vertical" />
             <Popconfirm
            title="are you sure?"
             onConfirm={() => this.deleteConfirm(item, 'success')}
            okText="Ok"
            cancelText="Cancel"
            placement="topRight"
          >
            <Icon type="delete"  />
          </Popconfirm>
            
             {/* <MoreBtn current={item} /> */}
            </div>
          ),
        },
    
      ];
     
    return(
      <div>
        <Row style={{display:'flex',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}>    
          <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
            <h3 className = "text" style={{marginLeft:'13px',marginTop:'24px'}} > Vendor Lists</h3> 
          </Col>
          <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 15 }}>
            <Link to={`/New_Vendors`}><Button  shape="omitted" type="primary" style={{background:'#3867D6',borderRadius:'28px',marginTop:'22px',marginBottom:'10px'}} >New Customer</Button></Link>
          </Col>
          <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 1 }}>
            <Link to={`/`}><Button  shape="omitted"  style={{color : '#505050',borderRadius:'28px',marginLeft:'30px',marginTop:'22px',marginBottom:''}} >Import</Button></Link>
          </Col>
            
        </Row>
               {/* {this.state.visible && <Button style={{marginLeft: '950px',marginTop:'5px'}} onClick={this.changeView} size='large'type="dashed" icon="idcard" >Card View</Button>} */}
               {/* {!this.state.visible && <Button  style={{marginLeft: '950px',marginTop:'5px'}} onClick={this.changeView}  size='large' type="dashed" icon="table" >Table View</Button>} */}
                <div style={{background:'#FFFFFF',marginTop: '15px',marginLeft:'13px',marginRight:'18px'}}>
                    {this.state.visible && <Row> <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 24, offset: 0 }}>
                      <Table
                        bordered
                        rowSelection={this.rowSelection} 
                        loading={this.state.loading}
                        columns={tableColumns}
                        dataSource={VendorsList}
                        
                        rowKey="user_id"
                    /></Col></Row> }

                    {!this.state.visible && <List
                      rowKey="id"
                      style={{ marginTop: 24 }}
                      grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                      loading={this.state.loading}
                      dataSource={VendorsList}
                      renderItem={item => (
                      <List.Item key={item.user_id}>
                      <Card
                        hoverable
                        bodyStyle={{ paddingBottom: 20 }}
                        actions={[
                        <Tooltip title = " Edit " >
                          <Link to={`/Clients/Edit/${item.user_id}`}>
                            <a onClick={() => { this.getById(item)}}> 
                              <Icon type="edit"  />
                            </a>
                          </Link>
                        </Tooltip>,
                        < Tooltip title = " mail " >
                          <Icon type="mail" />
                        </Tooltip>,
                        < Tooltip title = " print " >
                          <Icon type="printer" />
                        </Tooltip>,
                        <MoreBtn current={item} />
                   
                        ]}
                        >
                      <Card.Meta  title={item.name} />
                      <div >
                      {CardInfo(item)}
                      </div>
                     </Card>
                  </List.Item>
                )}
              />}
              </div>

          </div>             
    )
  }
}

const mapStateToProps=(state)=> {
    console.log(state);
    return {
        
        data: state.VendorsForm.reducerList,
        loading: state.loading.models.VendorsForm,
        VendorsData: state.VendorsForm.reducerbyId,
      
    }  
 }
/*
export default Form.create()(
    connect(({ form }) => ({
      data: form.reducerList,                   // another way to export
   
    }))(AdminForm),
  );
*/
export default Form.create()(
    connect(mapStateToProps)(VendorsList),
  );