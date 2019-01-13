import React, {Fragment} from 'react';
import {Link,Route, Switch as React_Switch,withRouter} from 'react-router-dom';
import { Layout, Menu, Icon ,Row,Col,message,Affix,Button,Drawer,List,Anchor,Avatar,Card,Popover,Switch as Antd_Switch} from 'antd';

import ColorPicker from './ColorPicker';
import Dashboard from '../Pages/Dashboard/Dashboard';
import ClientsList from '../Pages/Clients/ClientsList';
import ClientsForm from '../Pages/Clients/ClientsForm';
import VendorsList from '../Pages/Vendors/VendorsList';
import VendorsForm from '../Pages/Vendors/VendorsForm';
import Invoice from '../Pages/Invoice/InvoiceForm';
import Theme_Customizer from '../Pages/Setting/Theme_Customizer';
import Invoice_Template from '../Pages/Setting/Invoice_Template';
import Currency from '../Pages/Setting/CurrenciesForm';
import Taxes from '../Pages/Setting/Taxes';
import Email from '../Pages/Setting/Email';
import Inventory from '../Pages/Setting/Inventory';
import New_Inventory from '../Pages/Setting/New_Inventory';
import Organization from '../Pages/Setting/Organization';

import '../less/components/sider.less'
const { Header, Sider, Content, Footer } = Layout;
const { Meta } = Card;


const content = (
  <div>
    <Link to={`/`} ><p>Profile</p></Link>
    <Link to={`/login`} ><p>Log Out</p></Link>
  </div>
);

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
};

const data = [
  {
    title: 'Live Menu Customizer',
    description: 'Customize Theme color ',
    image: <Avatar src={require('../Images/paint.png')}/>,
    path:'Theme_Customizer'
  },
  {
    title: 'Organization',
    description: 'Create Organization Profile',
    image: <Avatar src={require('../Images/network.png')}/>,
    path:'Organization'
  },
  {
    title: 'Template ',
    description: 'Invoice template setup',
    image: <Avatar src={require('../Images/theme.png')}/>,
    path:'Invoice_Template'
  },
  {
    title: 'Currency ',
    description: 'Currency setup ',
    image: <Avatar src={require('../Images/coin.png')}/>,
    path:'Currency'
  },
  {
    title: 'Taxes ',
    description: 'Taxes setup ',
    image: <Avatar src={require('../Images/taxes.png')}/>,
    path:'Taxes'
  },
  {
    title: 'Inventory ',
    description: 'Inventory setup',
    image: <Avatar src={require('../Images/inventory.png')}/>,
    path:'Inventory'
  },
  {
    title: 'Email ',
    description: 'Email template',
    image: <Avatar src={require('../Images/email.png')}/>,
    path:'Email'
  },
];

class SiderLayout extends React.Component{
      constructor(props) {
        super(props);
        let initialValue = {
          '@primary-color': '#1987a7',
          // '@secondary-color': '#0000ff',
          '@text-color': '#000000',
          // '@text-color-secondary': '#eb2f96',
          '@heading-color': '#fa8c16',
          '@layout-sider-background': '#8854D0',
           '@layout-header-background': '#8854D0',
          '@btn-primary-bg': '#397dcc',
          '@bg-color': '#ffffff'
    
        };
        let vars = {};
    
        try {
          vars = Object.assign({},initialValue, JSON.parse(localStorage.getItem('app-theme')));
        } finally {
           this.state = { vars, initialValue,
            visible: true,
            Drawer: false,
            iconChange: true,
            collapsed: true,
            userName: 'Akhilesh',
            MasterSider : false,
            
          };
          window.less
            .modifyVars(vars)
            .then(() => { })
            .catch(error => {
              console.log(error);
              message.error(`Failed to update theme`);
            });
        }
        
      }
      onChangeComplete = (varName, color) => {
        console.log(varName,color);
        const { vars } = this.state;
        vars[varName] = color;
        this.setState({ vars });
      };
    
      handleColorChange = (varname, color) => {
        console.log(varname,color);
        const { vars } = this.state;
        if (varname) vars[varname] = color;
        console.log(vars);
        window.less
          .modifyVars(vars)
          .then(() => {
             //message.success(`Theme updated successfully`);
            this.setState({ vars });
            localStorage.setItem("app-theme", JSON.stringify(vars));
          })
          .catch(error => {
            console.log(error);
            message.error(`Failed to update theme`);
          });
      };

      showDrawer = () => {
        this.setState({
          Drawer: true,
          iconChange: false,
        });
      };
    
      onClose = () => {
        this.setState({
          Drawer: false,
          iconChange: true,
        });
      };
      getColorPicker = (varName) => (
        <Fragment key={varName}>
          <Col >{varName}</Col>
          <Col >
            <ColorPicker
              type="sketch"
              small
              color={this.state.vars[varName]}
              // position=""
              presetColors={[
                '#F5222D',
                '#FA541C',
                '#FA8C16',
                '#FAAD14',
                '#FADB14',
                '#A0D911',
                '#52C41A',
                '#13C2C2',
                '#1890FF',
                '#2F54EB',
                '#722ED1',
                '#EB2F96',
              ]}
              onChangeComplete={color => this.handleColorChange(varName, color)}
            />
          </Col>
        </Fragment>
      )
    
      resetTheme = () => {
        console.log('hii');
        localStorage.setItem('app-theme', '{}');
        this.setState({ vars: this.state.initialValue });
        window.less
          .modifyVars(this.state.initialValue)
          .catch(error => {
            message.error(`Failed to reset theme`);
          });
      }
      handleClick = (e) => {
        console.log('click ', e);
        if(e.key == '/'){
          this.handleColorChange('@layout-sider-background','#8854D0');
          this.handleColorChange('@primary-color','#8854D0');
          this.handleColorChange('@btn-primary-bg','#8854D0');
          this.handleColorChange('@heading-color','#8854D0');

        }
        if(e.key == '/Clients'){
          this.handleColorChange('@layout-sider-background','#A55EEA');
          this.handleColorChange('@primary-color','#A55EEA');
          this.handleColorChange('@btn-primary-bg','#A55EEA');
          this.handleColorChange('@heading-color','#A55EEA');

        }
        if(e.key == '/Vendors'){
          this.handleColorChange('@layout-sider-background','#3867D6');
          this.handleColorChange('@primary-color','#3867D6');
          this.handleColorChange('@btn-primary-bg','#3867D6');
          this.handleColorChange('@heading-color','#3867D6');

        }
        if(e.key == '/Invoices'){
          this.handleColorChange('@layout-sider-background','#2D98DA');
          this.handleColorChange('@primary-color','#2D98DA');
          this.handleColorChange('@btn-primary-bg','#2D98DA');
          this.handleColorChange('@heading-color','#2D98DA');

        }
        if(e.key == '/Banking'){
          this.handleColorChange('@layout-sider-background','#20BF6B');
          this.handleColorChange('@primary-color','#20BF6B');
          this.handleColorChange('@btn-primary-bg','#20BF6B');
          this.handleColorChange('@heading-color','#20BF6B');

        }
        if(e.key == '/Expenses'){
          this.handleColorChange('@layout-sider-background','#F7B731');
          this.handleColorChange('@primary-color','#F7B731');
          this.handleColorChange('@btn-primary-bg','#F7B731');
          this.handleColorChange('@heading-color','#F7B731');

        }
        if(e.key == '/Reports'){
          this.handleColorChange('@layout-sider-background','#FA8231');
          this.handleColorChange('@primary-color','#FA8231');
          this.handleColorChange('@btn-primary-bg','#FA8231');
          this.handleColorChange('@heading-color','#FA8231');

        }
        if(e.key == '/Theme_Customizer'){
          this.handleColorChange('@layout-sider-background','#54D0B2');
          this.handleColorChange('@primary-color','#54D0B2');
          this.handleColorChange('@btn-primary-bg','#54D0B2');
          this.handleColorChange('@heading-color','#54D0B2');

        }
        if(e.key == '/Organization'){
          this.handleColorChange('@layout-sider-background','#54D0B2');
          this.handleColorChange('@primary-color','#54D0B2');
          this.handleColorChange('@btn-primary-bg','#54D0B2');
          this.handleColorChange('@heading-color','#54D0B2');

        }
        if(e.key == '/Invoice_Template'){
          this.handleColorChange('@layout-sider-background','#54D0B2');
          this.handleColorChange('@primary-color','#54D0B2');
          this.handleColorChange('@btn-primary-bg','#54D0B2');
          this.handleColorChange('@heading-color','#54D0B2');

        }
        if(e.key == '/Currency'){
          this.handleColorChange('@layout-sider-background','#54D0B2');
          this.handleColorChange('@primary-color','#54D0B2');
          this.handleColorChange('@btn-primary-bg','#54D0B2');
          this.handleColorChange('@heading-color','#54D0B2');

        }
        if(e.key == '/Taxes'){
          this.handleColorChange('@layout-sider-background','#54D0B2');
          this.handleColorChange('@primary-color','#54D0B2');
          this.handleColorChange('@btn-primary-bg','#54D0B2');
          this.handleColorChange('@heading-color','#54D0B2');

        }
        if(e.key == '/Inventory'){
          this.handleColorChange('@layout-sider-background','#54D0B2');
          this.handleColorChange('@primary-color','#54D0B2');
          this.handleColorChange('@btn-primary-bg','#54D0B2');
          this.handleColorChange('@heading-color','#54D0B2');

        }
        if(e.key == '/Email'){
          this.handleColorChange('@layout-sider-background','#54D0B2');
          this.handleColorChange('@primary-color','#54D0B2');
          this.handleColorChange('@btn-primary-bg','#54D0B2');
          this.handleColorChange('@heading-color','#54D0B2');

        }
       
      }
       onChange =(checked)=> {
        console.log(`switch to ${checked}`);
        if(checked){
          this.handleColorChange('@bg-color','#222');
          this.handleColorChange('@text-color','#fff');
        }
        else{
          this.handleColorChange('@bg-color','#fff');
        }
      }
      toggleSider = () =>{
    
        this.setState({MasterSider:true});
        this.handleColorChange('@layout-sider-background','#54D0B2');
        this.handleColorChange('@primary-color','#54D0B2');
        this.handleColorChange('@btn-primary-bg','#54D0B2');
        this.handleColorChange('@heading-color','#54D0B2');
      }
      // componentWillUpdate(){
      //   const { location } = this.props;
      //   console.log(location);
      //   if(location.pathname == '/Theme_Customizer')
      //     this.setState({MasterSider:true});
          
      // }
      back = () =>{
        this.props.history.push(`/`);
        this.setState({MasterSider:false});
        this.handleColorChange('@layout-sider-background','#8854D0');
        this.handleColorChange('@primary-color','#8854D0');
        this.handleColorChange('@btn-primary-bg','#8854D0');
        this.handleColorChange('@heading-color','#8854D0');
      }
    render(){
      const { location } = this.props;
      console.log(location);
      const colorPickers = Object.keys(this.state.vars).map(varName => this.getColorPicker(varName));
      console.log(colorPickers);
      return(
 
        <Layout style={{ minHeight: '100vh'}}>
        <Sider
          // trigger={null}
          className= "sider"
          width='99px'
          height='624px'
          
           style={{boxShadow:'2px 0px 2px rgba(0, 0, 0, 0.25)'}}
          // collapsed={this.state.collapsed}
        >
         
          <div >
            <Row >
              <Col xs={2} sm={4} md={6} lg={8} xs={{ span: 2, offset: 5 }} ><img src={require('../Images/logo.png')} style={{width: '54px',height:'54px',marginTop:'10px'}} /> </Col>

            </Row>
          </div>
          {this.state.MasterSider && <span style={{marginLeft:'20px'}} onClick={this.back}><Icon type="arrow-left" />Back</span>}
          {!this.state.MasterSider && <Menu selectedKeys={[location.pathname]}  onClick={this.handleClick} theme="dark"  style={{marginTop:'100px',background:'#FFFFFF',width:'44px',height:'339px',marginLeft:'28px',borderRadius: '36px'}}  mode="inline" defaultSelectedKeys={['/']}>
         
            {/* <div  shape = "omitted" style={{marginTop:'54px',width:'44px',height:'389px',background:'#FFFFFF',marginLeft:'17px',borderRadius: '36px'}}> */}
              <Menu.Item key="/"  >
                <Popover  placement="right" trigger="hover" content={<div style={{color:'#8854D0'}} >Dashboard</div>}>
                  <Link  style={{color:"white"}} to={`/`} > <img  src={require('../Images/dashboard.png')} style={{width: '30px', marginLeft:'-17px',}} /></Link>   
                </Popover>
              </Menu.Item>
              <Menu.Item key="/Clients" >
                <Popover  placement="right" trigger="hover" content={<div style={{color:'#A55EEA'}} >Clients</div>}>
                  <Link style={{color:"white"}} to={`/Clients`} > <img src={require('../Images/customer.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
                </Popover>
              </Menu.Item>
              <Menu.Item key="/Vendors" >
                <Popover  placement="right" trigger="hover" content={<div style={{color:'#3867D6'}} >Vendors</div>}>
                  <Link style={{color:"white"}} to={`/Vendors`} > <img src={require('../Images/vendor.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
                </Popover>
              </Menu.Item>
              <Menu.Item key="/Invoices" >
                <Popover  placement="right" trigger="hover" content={<div style={{color:'#2D98DA'}} >Invoices</div>}>
                  <Link style={{color:"white"}} to={`/Invoices`} > <img src={require('../Images/invoice.png')} style={{width: '30px', marginLeft:'-17px',}} /></Link>    
                </Popover>
              </Menu.Item>
              <Menu.Item key="/Banking" >
                <Popover  placement="right" trigger="hover" content={<div style={{color:'#20BF6B'}} >Banking</div>}>
                  <Link style={{color:"white"}} to={`/Banking`} > <img src={require('../Images/bank.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
                </Popover>
              </Menu.Item>
              <Menu.Item key="/Expenses" >
                <Popover  placement="right" trigger="hover" content={<div style={{color:'#F7B731'}} >Expenses</div>}>
                  <Link style={{color:"white"}} to={`/Expenses`} > <img src={require('../Images/expense.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
                </Popover>
              </Menu.Item>
              <Menu.Item key="/Reports" >
                <Popover  placement="right" trigger="hover" content={<div style={{color:'#FA8231'}} >Reports</div>}>
                 <Link style={{color:"white"}} to={`/Reports`} > <img src={require('../Images/report.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
                </Popover>
              </Menu.Item>
              
              
            {/* </div> */}
           
          </Menu>}
          {this.state.MasterSider && <Menu selectedKeys={[location.pathname]}  onClick={this.handleClick} theme="dark"  style={{marginTop:'100px',background:'#FFFFFF',width:'44px',height:'339px',marginLeft:'28px',borderRadius: '36px'}}  mode="inline" defaultSelectedKeys={['/Theme_Customizer']}>
         
         {/* <div  shape = "omitted" style={{marginTop:'54px',width:'44px',height:'389px',background:'#FFFFFF',marginLeft:'17px',borderRadius: '36px'}}> */}
           <Menu.Item key="/Theme_Customizer"  >
             <Popover  placement="right" trigger="hover" content={<div style={{color:'#8854D0'}} >Live Menu Customizer</div>}>
               <Link  style={{color:"white"}} to={`/Theme_Customizer`} > <img  src={require('../Images/paint.png')} style={{width: '30px', marginLeft:'-17px',}} /></Link>   
             </Popover>
           </Menu.Item>
           <Menu.Item key="/Organization" >
             <Popover  placement="right" trigger="hover" content={<div style={{color:'#A55EEA'}} >Organization</div>}>
               <Link style={{color:"white"}} to={`/Organization`} > <img src={require('../Images/network.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
             </Popover>
           </Menu.Item>
           <Menu.Item key="/Invoice_Template" >
             <Popover  placement="right" trigger="hover" content={<div style={{color:'#3867D6'}} >Template</div>}>
               <Link style={{color:"white"}} to={`/Invoice_Template`} > <img src={require('../Images/theme.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
             </Popover>
           </Menu.Item>
           <Menu.Item key="/Currency" >
             <Popover  placement="right" trigger="hover" content={<div style={{color:'#2D98DA'}} >Currency</div>}>
               <Link style={{color:"white"}} to={`/Currency`} > <img src={require('../Images/coin.png')} style={{width: '30px', marginLeft:'-17px',}} /></Link>    
             </Popover>
           </Menu.Item>
           <Menu.Item key="/Taxes" >
             <Popover  placement="right" trigger="hover" content={<div style={{color:'#20BF6B'}} >Taxes</div>}>
               <Link style={{color:"white"}} to={`/Taxes`} > <img src={require('../Images/taxes.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
             </Popover>
           </Menu.Item>
           <Menu.Item key="/Inventory" >
             <Popover  placement="right" trigger="hover" content={<div style={{color:'#F7B731'}} >Inventory</div>}>
               <Link style={{color:"white"}} to={`/Inventory`} > <img src={require('../Images/inventory.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
             </Popover>
           </Menu.Item>
           <Menu.Item key="/Email" >
             <Popover  placement="right" trigger="hover" content={<div style={{color:'#FA8231'}} >Email</div>}>
              <Link style={{color:"white"}} to={`/Email`} > <img src={require('../Images/email.png')} style={{width: '30px', marginLeft:'-17px'}} /></Link>    
             </Popover>
           </Menu.Item>
           
           
         {/* </div> */}
        
       </Menu>}
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0,zIndex:'10',boxShadow:"0px 3px 3px rgba(0, 0, 0, 0.25)" }}>
            <Popover placement="bottomRight" content={content} trigger="click">
           
              <Row >
              
                <Col xs={2} sm={4} md={6} lg={8} xl={{ span: 1, offset: 22 }} > <div style={{width:'90px',height:'16px',fontFamily:'Roboto',fontSize:'14px'}}>{this.state.userName}</div> </Col>

                <Col xs={2} sm={4} md={6} lg={8} xl={{ span: 1, offset: 0 }} > <img src={require('../Images/user.png')} style={{width: '34px',height:'34px',marginLeft:'5px'}} /> </Col>

            </Row>
            </Popover>
            {/* {this.state.iconChange &&<Row><Col xs={2} sm={4} md={6} lg={{ span: 1, offset: 22 }} xl={{ span: 1, offset: 23 }} > <Affix offsetTop={200}  ><Button  onClick={this.showDrawer} style={this.state.Drawer ? {marginLeft: '0px'} : {marginLeft: '0px'}} type="primary" shape="circle" > <Icon  style={{margin: 'auto'}} type= 'setting' spin /></Button>
           </Affix> </Col></Row>} */}
              

          </Header>
          <Content className="content" style={{
             padding: 0, minHeight: 280,
          }}
          >
             {/* {this.state.iconChange &&<Row><Col xs={2} sm={4} md={6} lg={{ span: 1, offset: 24 }} xl={{ span: 1, offset: 20 }} > <Affix offsetTop={0}  ><Button  onClick={this.showDrawer} style={this.state.Drawer ? {marginLeft: '0px'} : {marginLeft: '0px'}} type="primary" shape="circle" > <Icon  style={{margin: 'auto'}} type= 'setting' spin /></Button>
           </Affix> </Col></Row>} */}
           <Drawer
             title="Settings"
             placement="right"
             width='300px'
             closable={true}
             onClose={this.onClose}
             visible={this.state.Drawer}
           >
            {/* <Card title={ <Button type="primary" onClick={this.resetTheme} > Reset Theme </Button>}>
              <Card.Grid style={gridStyle}>{colorPickers[0]}</Card.Grid>
              <Card.Grid style={gridStyle}>{colorPickers[1]}</Card.Grid>
              <Card.Grid style={gridStyle}>{colorPickers[2]}</Card.Grid>
              <Card.Grid style={gridStyle}>{colorPickers[3]}</Card.Grid>
              <Card.Grid style={gridStyle}>{colorPickers[4]}</Card.Grid>
              <Card.Grid style={gridStyle}>{colorPickers[5]}</Card.Grid>      
            </Card> */}
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.image}
                  title={<Link  to={`/${item.path}`} onClick ={this.toggleSider} > {item.title}</Link>}
                  description={item.description}
                />
              </List.Item>
             )}
              />
            {/* <div>Weak mode <Antd_Switch style={{marginLeft:'50px'}} onChange={this.onChange} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked={false} ></Antd_Switch></div> */}
             {/* <List
               rowKey="id"
               style={{ marginTop: 24 }}
               // grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
               loading={this.state.loading}
               dataSource={colorPickers}
               renderItem={(item,x) => (
                 <List.Item key={item.key}  >
                   <Card hoverable style={gridStyle}s cover={ colorPickers[x]}>
                     
                   </Card>
                 </List.Item>
               )}
             /> */}

           </Drawer>

            <React_Switch> 
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/Clients" component={ClientsList} />
              <Route exact path="/New_Clients" component={ClientsForm} />
              <Route exact path="/Clients/Edit/:id" component={ClientsForm} />
              <Route exact path="/Vendors" component={VendorsList} />
              <Route exact path="/New_Vendors" component={VendorsForm} />
              <Route exact path="/Vendors/Edit/:id" component={VendorsForm}/>
              <Route exact path="/Invoices" component={Invoice}/>
              <Route exact path="/Theme_Customizer" component={Theme_Customizer}/>
              <Route exact path="/Invoice_Template" component={Invoice_Template}/>
              <Route exact path="/Currency" component={Currency}/>
              <Route exact path="/Taxes" component={Taxes}/>
              <Route exact path="/Email" component={Email}/>
              <Route exact path="/NewInventory" component={New_Inventory}/>
              <Route exact path="/Inventory" component={Inventory}/>
              <Route exact path="/Organization" component={Organization}/>

            </React_Switch>
            {this.state.iconChange &&<Row><Col xs={2} sm={4} md={6} lg={{ span: 1, offset: 20 }} xl={{ span: 1, offset: 23 }} > <Affix offsetBottom={400}  ><Button  onClick={this.showDrawer} style={this.state.Drawer ? {marginLeft: '20px'} : {marginLeft: '20px'}} type="primary" shape="circle" > <Icon  style={{margin: 'auto'}} type= 'setting' spin /></Button>
           </Affix> </Col></Row>}
          </Content>
          <Footer style={{margin:'auto'}}>Copyright &copy; 2019 Accounting, Highgear</Footer>
        </Layout>
      </Layout>
        
        );
    }
}

export default withRouter (SiderLayout);