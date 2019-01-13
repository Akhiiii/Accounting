import React,{ Component } from 'react';
import {Form,Button,Row,Col} from 'antd';
import Altmetric from '../../Components/Altmetric_template';
class Invoice extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        const { getFieldDecorator} = this.props.form;
        return(
            <Form style={{width:'100% ',}} onSubmit={this.handleSubmit} id="form" >
                <Row style={{display:'flex',borderBottom:'1px dotted rgba(0, 0, 0, 0.25)'}}>    
                    <Col  xs={{ span: 5, offset: 0 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 5, offset: 0 }}>
                        <h3 className = "text" style={{marginTop:'24px',marginLeft:'13px'}} > Create New Invoice </h3> 
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 16 }}>
                        <Button  shape="omitted" type="primary" style={{background:'#2D98DA',borderRadius:'28px',marginTop:'24px',marginBottom:'10px'}} onClick = {this.handleSubmit}>Save</Button>
                    </Col>
                    <Col  xs={{ span: 5, offset: 20 }} sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 1, offset: 0 }}>
                        <Button  shape="omitted"  style={{color : '#505050',borderRadius:'28px',marginLeft:'30px',marginTop:'24px',marginBottom:'10px'}} onClick={this.clear} >Cancel</Button>
                    </Col>
                </Row>
                <div style={{display:'flex',background: '#FFFFFF'}}>
                    <div style={{marginLeft:'15px',width:'987px',marginTop:'18px',height: '1166px',border:'1px solid #DBDBDB',boxSizing:'border-box'}}>
                        <Altmetric />
                    </div>
                    <div style={{width:'238px',marginLeft:'14px',marginTop:'18px',boxSizing:'border-box',height: '1166px'}}>
                        <div style={{height:'40px',border:'1px solid #DBDBDB',boxSizing:'border-box'}}> <div style={{marginTop:'9px',marginLeft:'77px',fontFamily:'Roboto',fontStyle:'normal',fontWeight:'500',lineHeight:'normal',fontSize:'14px'}}>Last Invoices </div> </div>
                        <div style={{marginTop:'5px' ,height:'1122px',border:'1px solid #DBDBDB',boxSizing:'border-box'}}>
                            <div style={{marginTop:'9px',marginLeft:'61px',fontFamily:'Roboto',fontStyle:'normal',fontWeight:'500',lineHeight:'normal',fontSize:'14px'}}> Template Settings </div>

                        </div>

                    </div>
                </div>
            </Form>
        );
    }
}

export default Form.create() (Invoice);