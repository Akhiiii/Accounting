import React, {Fragment} from 'react';
import {Link,Route, Switch,withRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Button , Affix , Drawer, message,Col,Card, Row,List} from 'antd';
import '../Styles/SliderLogo.css';
import Dashboard from '../Pages/Dashboard/Dashboard';
import ClientsForm from '../Pages/Clients/ClientsForm';
import ClientsList from '../Pages/Clients/ClientsList';
import VendorsForm from '../Pages/Vendors/VendorsForm';
import VendorsList from '../Pages/Vendors/VendorsList';
import CurrenciesForm from '../Pages/Setting/CurrenciesForm';
import TaxesForm from '../Pages/Setting/Taxes';
import Setting from '../Pages/Setting/setting';
import ColorPicker from './ColorPicker';

const {Content, Sider,Header } = Layout;
const {SubMenu} = Menu;
const { Meta } = Card;


class SliderLayout extends React.Component {
  constructor(props) {
    super(props);
    let initialValue = {
      '@primary-color': '#1987a7',
      '@secondary-color': '#0000ff',
      '@text-color': '#000000',
      '@text-color-secondary': '#eb2f96',
      '@heading-color': '#fa8c16',
      '@layout-header-background': '#b36e94',
      '@btn-primary-bg': '#397dcc'

    };
    let vars = {};

    try {
      vars = Object.assign({},initialValue, JSON.parse(localStorage.getItem('app-theme')));
    } finally {
       this.state = { vars, initialValue,collapsed : false,
        visible: true,
        keys:'Dashboard',
        TopView: false,
        SiderView: true,
        Drawer: false,
        collapse: true, 
        iconChange: true,
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
    const { vars } = this.state;
    vars[varName] = color;
    this.setState({ vars });
  };

  handleColorChange = (varname, color) => {
    const { vars } = this.state;
    if (varname) vars[varname] = color;
    console.log(vars);
    window.less
      .modifyVars(vars)
      .then(() => {
        // message.success(`Theme updated successfully`);
        this.setState({ vars });
        localStorage.setItem("app-theme", JSON.stringify(vars));
      })
      .catch(error => {
        console.log(error);
        message.error(`Failed to update theme`);
      });
  };

  getColorPicker = (varName) => (
    <Fragment key={varName}>
      <Col xs={20}>{varName}</Col>
      <Col xs={4}>
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
    localStorage.setItem('app-theme', '{}');
    this.setState({ vars: this.state.initialValue });
    window.less
      .modifyVars(this.state.initialValue)
      .catch(error => {
        message.error(`Failed to reset theme`);
      });
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed, visible:!this.state.visible});
  }

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


  toggle = () => {
    this.setState({
      TopView: !this.state.TopView,
      SiderView: !this.state.SiderView,
      
    });
  }
 
  render() {
    const { location } = this.props;
    const colorPickers = Object.keys(this.state.vars).map(varName => this.getColorPicker(varName));
    console.log(colorPickers[0]);
    console.log(location);
    return (
      <Layout style={{ minHeight: '100vh'}}>
      {this.state.SiderView && <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width = '256'
          style={{background:'#00162A'}}
        >
          <div  >
            <div >
              <img src={require('../Images/Accounting.png')} style={{width: '60px',marginLeft:'0px',marginTop:'10px'}} /> {this.state.visible && <h1 className="accounting" style={{marginTop:'12px'}}><b>Accounting</b></h1>}

            </div>
          </div>
          <Menu theme="dark"  style={{background:'#00162A',marginTop:'40px'}}  defaultSelectedKeys={['/']}   selectedKeys={[location.pathname]} mode="inline">
            <Menu.Item key="/Dashboard" >
              <Link style={{color:"white"}} to={`/Dashboard`} title="Dashboard"> <img src={require('../Images/Dashboard.png')} style={{width: '30px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Dashboard</span></Link>    
            </Menu.Item>
            <SubMenu key="/Clients"  title={<span><img src={require('../Images/customer.png')} style={{width: '30px', marginLeft:'0px'}} /><span style = {{marginLeft:'20px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px'}}> Clients</span></span>}>
              <Menu.Item key="/Clients/New" >
                <Link style={{color:"white"}} to={`/Clients/New`} title="New Client"> <img src={require('../Images/user.ico')} style={{width: '30px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Client</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Clients/List" >
                <Link style={{color:"white"}} to={`/Clients/List`} title="Clients List"> <img src={require('../Images/List.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Clients List</span></Link>    
              </Menu.Item>
            </SubMenu>
            {/* <SubMenu key="/Vendors"  title={<span><img src={require('../Images/vendors.png')} style={{width: '30px', marginLeft:'0px'}} /><span style = {{marginLeft:'20px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Vendors</span></span>}>
              <Menu.Item key="/Vendors/New" >
                <Link style={{color:"white"}} to={`/Vendors/New`} title="New Vendor"> <img src={require('../Images/user.ico')} style={{width: '30px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Vendor</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Vendors/List" >
                <Link style={{color:"white"}} to={`/Vendors/List`} title="Vendors List"> <img src={require('../Images/List.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Vendors List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Invoices"  title={<span><img src={require('../Images/invoice.png')} style={{width: '30px', marginLeft:'0px'}} /><span style = {{marginLeft:'20px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Invoices</span></span>}>
              <Menu.Item key="/Invoices/New" >
                <Link style={{color:"white"}} to={`/Invoices/New`} title="New Invoice"> <img src={require('../Images/user.ico')} style={{width: '30px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Invoice</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Invoices/List" >
                <Link style={{color:"white"}} to={`/Invoices/List`} title="Invoices List"> <img src={require('../Images/List.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Invoices List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Banking"  title={<span><img src={require('../Images/Banking.png')} style={{width: '30px', marginLeft:'0px'}} /><span style = {{marginLeft:'20px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Banking</span></span>}>
              <Menu.Item key="/Banking/New" >
                <Link style={{color:"white"}} to={`/Banking/New`} title="New Banking"> <img src={require('../Images/user.ico')} style={{width: '30px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Banking</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Banking/List" >
                <Link style={{color:"white"}} to={`/Banking/List`} title="Banking List"> <img src={require('../Images/List.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Banking List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Expenses"  title={<span><img src={require('../Images/Expenses.png')} style={{width: '30px', marginLeft:'0px'}} /><span style = {{marginLeft:'20px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Expenses</span></span>}>
              <Menu.Item key="/Expenses/New" >
                <Link style={{color:"white"}} to={`/Expenses/New`} title="New Expenses"> <img src={require('../Images/user.ico')} style={{width: '30px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Expenses</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Expenses/List" >
                <Link style={{color:"white"}} to={`/Expenses/List`} title="Expenses List"> <img src={require('../Images/List.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Expenses List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Reports"  title={<span><img src={require('../Images/Reports.png')} style={{width: '30px', marginLeft:'0px'}} /><span style = {{marginLeft:'20px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Reports</span></span>}>
              <Menu.Item key="/Reports/New" >
                <Link style={{color:"white"}} to={`/Reports/New`} title="New Reports"> <img src={require('../Images/user.ico')} style={{width: '30px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Reports</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Reports/List" >
                <Link style={{color:"white"}} to={`/Reports/List`} title="Reports List"> <img src={require('../Images/List.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Reports List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Settings"  title={<span><img src={require('../Images/settings.png')} style={{width: '30px', marginLeft:'0px'}} /><span style = {{marginLeft:'20px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Settings</span></span>}>
              <Menu.Item key="/Currencies/New" >
                <Link style={{color:"white"}} to={`/Currencies/New`} title="Currencies"> <img src={require('../Images/rupee.png')} style={{width: '25px'}} /><span style = {{marginLeft:'20px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Currencies</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Taxes/New" >
                <Link style={{color:"white"}} to={`/Taxes/New`} title="Taxes"> <img src={require('../Images/tax.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Taxes</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Template/New" >
                <Link style={{color:"white"}} to={`/Template/New`} title="Template"> <img src={require('../Images/design.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Template</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Email/New" >
                <Link style={{color:"white"}} to={`/Email/New`} title="Email"> <img src={require('../Images/email.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Email</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Reminders/New" >
                <Link style={{color:"white"}} to={`/Reminders/New`} title="Reminders"> <img src={require('../Images/bell.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Reminders</span></Link>    
              </Menu.Item>
              <Menu.Item key="/setting/New" >
                <Link style={{color:"white"}} to={`/setting/New`} title="Reminders"> <img src={require('../Images/settings.png')} style={{width: '25px'}} /><span style = {{marginLeft:'25px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Settings</span></Link>    
              </Menu.Item>
            </SubMenu> */}
            <Menu.Item >
              <img onClick={this.toggle} src={require('../Images/up.png')} style={{width: '25px'}} /><span style={{marginLeft:'19px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}} > <Button style={{background:'#00162A',color:'#fff'}} onClick={this.toggle}>Top Navigation</Button></span>
            </Menu.Item>
          </Menu>
        </Sider>}
        <Layout className="layout">

        {this.state.TopView && <Header>
          <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px'}}
            >
            <Menu.Item >  
              <div className="Logo" >
                  <div><img src={require('../Images/Accounting.png')} style={{width: '60px',marginLeft:'0px',marginTop:'0px'}} /> 
                    <h1 className="Accounting" style={{marginTop:'3px',marginLeft:'-50px'}}><b>Accounting</b></h1>
                  </div>
              </div>
            </Menu.Item>
            <Menu.Item key="/" >
              <Link style={{color:"white"}} to={`/`} title="Dashboard"> <span style = {{marginLeft:'0px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Dashboard</span></Link>    
            </Menu.Item>  
            <SubMenu key="/Clients"  title={<span><span style = {{marginLeft:'10px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Clients</span></span>}>
              <Menu.Item key="/Clients/New" >
                <Link style={{color:"white"}} to={`/Clients/New`} title="New Client"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Client</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Clients/List" >
                <Link style={{color:"white"}} to={`/Clients/List`} title="Clients List"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Clients List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Vendors"  title={<span><span style = {{marginLeft:'10px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Vendors</span></span>}>
              <Menu.Item key="/Vendors/New" >
                <Link style={{color:"white"}} to={`/Vendors/New`} title="New Vendor"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Vendor</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Vendors/List" >
                <Link style={{color:"white"}} to={`/Vendors/List`} title="Vendors List"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Vendors List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Invoices"  title={<span><span style = {{marginLeft:'10px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Invoices</span></span>}>
              <Menu.Item key="/Invoices/New" >
                <Link style={{color:"white"}} to={`/Invoices/New`} title="New Invoice"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Invoice</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Invoices/List" >
                <Link style={{color:"white"}} to={`/Invoices/List`} title="Invoices List"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Invoices List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Banking"  title={<span><span style = {{marginLeft:'20px',color:"white"}}> Banking</span></span>}>
              <Menu.Item key="/Banking/New" >
                <Link style={{color:"white"}} to={`/Banking/New`} title="New Banking"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Banking</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Banking/List" >
                <Link style={{color:"white"}} to={`/Banking/List`} title="Banking List"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Banking List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Expenses"  title={<span><span style = {{marginLeft:'20px',color:"white"}}> Expenses</span></span>}>
              <Menu.Item key="/Expenses/New" >
                <Link style={{color:"white"}} to={`/Expenses/New`} title="New Expenses"><span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Expenses</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Expenses/List" >
                <Link style={{color:"white"}} to={`/Expenses/List`} title="Expenses List"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Expenses List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Reports"  title={<span><span style = {{marginLeft:'20px',color:"white"}}> Reports</span></span>}>
              <Menu.Item key="/Reports/New" >
                <Link style={{color:"white"}} to={`/Reports/New`} title="New Reports"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>New Reports</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Reports/List" >
                <Link style={{color:"white"}} to={`/Reports/List`} title="Reports List"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Reports List</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="/Settings"  title={<span><span style = {{marginLeft:'10px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}> Settings</span></span>}>
              <Menu.Item key="/Currencies/New" >
                <Link style={{color:"white"}} to={`/Currencies/New`} title="Currencies"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Currencies</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Taxes/New" >
                <Link style={{color:"white"}} to={`/Taxes/New`} title="Taxes"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Taxes</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Template/New" >
                <Link style={{color:"white"}} to={`/Template/New`} title="Template"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Template</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Email/New" >
                <Link style={{color:"white"}} to={`/Email/New`} title="Email"> <span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Email</span></Link>    
              </Menu.Item>
              <Menu.Item key="/Reminders/New" >
                <Link style={{color:"white"}} to={`/Reminders/New`} title="Reminders"><span style = {{marginLeft:'10px',fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}}>Reminders</span></Link>    
              </Menu.Item>
            </SubMenu>
            <SubMenu key="side"  title={<span><img src={require('../Images/undo.png')} style={{width: '30px', marginLeft:'0px'}} /></span>}>
              <Menu.Item  >
                <span style={{marginLeft:'0px',color:"white",fontFamily:'Montserrat',fontStyle:'normal',fontSize:'16px',color:'#fff'}} > <Button style={{background:'#00162A',color:'#fff'}} onClick={this.toggle}>Side Navigation</Button></span>
              </Menu.Item>
            </SubMenu>
           
          </Menu>
         
        </Header>}
          <Content style={{ background:'#FFFFFF' }}>
            {this.state.iconChange && <Affix offsetTop={150}  ><Button  onClick={this.showDrawer} style={this.state.Drawer ? {marginLeft: '680px'} : {marginLeft: '1050px'}} type="primary" shape="circle" > <Icon  style={{margin: 'auto'}} type= 'setting' spin /></Button>
            </Affix>}
            <Drawer
              title="Accounting Live Menu Customizer"
              placement="right"
              width='400px'
              closable={true}
              onClose={this.onClose}
              visible={this.state.Drawer}
            >
                <List
                      rowKey="id"
                      style={{ marginTop: 24 }}
                      // grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                      loading={this.state.loading}
                      dataSource={colorPickers}
                      renderItem={(item,x) => (
                      <List.Item key={item.key}  >
                         <Card
    hoverable
    style={{ width:240 }}
    cover={ colorPickers[x]}
  >
    <Meta
      // title={item.key}
      // description={ colorPickers[x]}
    />
  </Card>
                  </List.Item>
                )}
              />
               {/* <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta
      title="Heading Color"
      description={ colorPickers}
    />
  </Card>, */}
              {/* <Card title="Set Theme Color" style={{ width: 300 }}>
                <Row>
                  {colorPickers}
                    <Col xs={24} style={{ marginTop: '10px' }}>
                      <Button
                        type="primary"
                        onClick={this.resetTheme}
                      >
                      Reset Theme
                      </Button>
                    </Col>
                </Row>
              </Card> */}
              
            </Drawer>
       
            <Switch> 
              <Route exact path="/Dashboard" component={Dashboard} />
            
              {/* <Route exact path="/Clients/New"  render={()=><ClientsForm change={this.change}/>} /> */}
              <Route exact path="/Clients/New"  component={ClientsForm}/>
              <Route exact path="/Clients/List" component={ClientsList} />
              <Route exact path="/Clients/Edit/:id" component={ClientsForm} />
              <Route exact path="/Vendors/New"  component={VendorsForm}/>
              <Route exact path="/Vendors/List" component={VendorsList} />
              <Route exact path="/Vendors/Edit/:id" component={VendorsForm} />
              <Route exact path="/Currencies/New" component={CurrenciesForm} />
              <Route exact path="/Taxes/New" component={TaxesForm} />
              <Route exact path="/setting/New" component={Setting} />
            </Switch>
          </Content> 
        
        </Layout>
      </Layout>
    );
  }
}

export default withRouter (SliderLayout);
          