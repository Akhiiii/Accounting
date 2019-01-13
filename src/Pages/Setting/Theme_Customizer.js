import React, { Component, Fragment } from "react";
import 'antd/dist/antd.css'; 
import {
  Col,Form,
  message,
  Button,Card
} from "antd";
import ColorPicker from "../../Components/ColorPicker";
const gridStyle = {
    width: '20%',
    textAlign: 'center',
    marginLeft:'60px',
    // marginTop:'10px'
  };
  const gridStyle1 = {
    width: '20%',
    textAlign: 'center',
    marginLeft:'60px',
    marginTop:'10px'
  };
class Theme_Customizer extends Component {
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
      vars = Object.assign({}, initialValue, JSON.parse(localStorage.getItem('app-theme')));
    } finally {
      this.state = { vars, initialValue };
      window.less
        .modifyVars(vars)
        .then(() => { })
        .catch(error => {
          message.error(`Failed to update theme`);
        });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
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
          position="bottom"
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

  render() {
    const colorPickers = Object.keys(this.state.vars).map(varName => this.getColorPicker(varName));
    return (
      <div className="App">
         <Card title="Customize Theme color">
              <Card.Grid style={gridStyle}>{colorPickers[0]}</Card.Grid>
              <Card.Grid style={gridStyle}>{colorPickers[1]}</Card.Grid>
              <Card.Grid style={gridStyle}>{colorPickers[2]}</Card.Grid>
              <Card.Grid style={gridStyle1}>{colorPickers[3]}</Card.Grid>
              <Card.Grid style={gridStyle1}>{colorPickers[4]}</Card.Grid>
              <Card.Grid style={gridStyle1}>{colorPickers[5]}</Card.Grid> 
              { <Button  type="primary" onClick={this.resetTheme}style={{marginTop:'40px',marginLeft:'80px'}}> Reset Theme </Button>}     
            </Card>
      </div>
    );
  }
}

export default Form.create()(Theme_Customizer);

