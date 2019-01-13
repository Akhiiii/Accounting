import React,{ Component } from 'react';
import {Form,Button,Row,Col,Input,DatePicker,Table,Card} from 'antd';
const FormItem =  Form.Item;
const dataSource = [{
    SNo: '1',
    Item:'Item 1',
    Description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    Qty:'1',
    Rate:'10',
    Tax:'0',
    Amount:'1000'

  },];
  
  const columns = [{
    title: 'S.No.',
    dataIndex: 'SNo',
    key: 'S.No',
  }, {
    title: 'Item',
    dataIndex: 'Item',
    key: 'Item',
  }, {
    title: 'Description',
    dataIndex: 'Description',
    key: 'Description',
  },
  {
    title: 'Qty',
    dataIndex: 'Qty',
    key: 'Qty',
  },
  {
    title: 'Rate',
    dataIndex: 'Rate',
    key: 'Rate',
  },
  {
    title: 'Tax',
    dataIndex: 'Tax',
    key: 'Tax',
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    key: 'Amount',
  }];

class Altmetric extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        const { getFieldDecorator} = this.props.form;
       
        return(
            <Form>
                <div style={{display:'flex'}}>
                    <div>
                        <img src={require('../Images/altmetric.png')} style={{width: '148px', marginLeft:'28px',marginTop:'26px'}} />
                        <div style={{marginLeft:'38px',marginTop:'8px',width:'143px',height:'61px'}}>#404, 4th Floor,Somajiguda Circle,Hyderabad,TIN No. 1234567890987
                        </div>
                    </div>
                    <div style={{marginTop:'26px',marginLeft:'213px'}}>
                        <FormItem  style={{marginLeft:"15px",display:'flex'}} label="Invoice#   " >
                            {getFieldDecorator('Invoice#', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                rules: [  
                                { required: false, message: 'Please Enter Invoice No.' },
                                    ] 
                                })(
                                    <Input style={{marginLeft:'5px',width:'150px'}} placeholder="Enter Invoice#" type="text" name="Invoice#" />
                                )}
                        </FormItem>
                        <FormItem  style={{marginLeft:"15px",display:'flex'}} label="P.O#" >
                            {getFieldDecorator('P.O#', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                rules: [  
                                { required: false, message: 'Please Enter P.O#' },
                                    ] 
                                })(
                                    <Input  style={{marginLeft:'30px',width:'150px'}} placeholder="Enter P.O#" type="text" name="P.O#" />
                                )}
                        </FormItem>
                        <FormItem  style={{marginLeft:"15px",display:'flex'}} label="Currency" >
                            {getFieldDecorator('Invoice#', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                rules: [  
                                { required: false, message: 'Please Enter Currency' },
                                    ] 
                                })(
                                    <Input style={{marginLeft:'0px',width:'150px'}} placeholder="Currency" type="text" name="Currency" />
                                )}
                        </FormItem>
                    </div>
                    <div style={{marginTop:'26px',marginLeft:'18px'}}>
                        <FormItem  style={{marginLeft:"15px",display:'flex'}} label="Invoice Date" >
                            {getFieldDecorator('InvoiceDate', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                rules: [  
                                { required: false, message: 'Please Enter Invoice Date' },
                                    ] 
                                })(
                                    <DatePicker style={{marginLeft:'0px',width:'150px'}}   />
                                )}
                        </FormItem>
                        <FormItem  style={{marginLeft:"15px",display:'flex'}} label="Due Date" >
                            {getFieldDecorator('DueDate', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                rules: [  
                                { required: false, message: 'Please Enter Due Date"' },
                                    ] 
                                })(
                                    <DatePicker style={{marginLeft:'17px',width:'150px'}}  />                                )}
                        </FormItem>
                       
                    </div>
                </div>
                <div style={{marginTop:'22px',width:'78px',height:'29px',fontSize:'24px',marginLeft:'434px',fontFamily:'Roboto',fontWeight:'bold'}}>Invoice</div>
                <div style={{marginTop:'28px'}}> 
                    <FormItem  style={{marginLeft:"38px",display:'flex'}} label="Bill To " >
                                {getFieldDecorator('Bill', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                    rules: [  
                                    { required: false, message: 'Please Enter Bill To :' },
                                        ] 
                                    })(
                                        <Input style={{width:'330px'}} placeholder="Bill To " type="text" name="Currency" />
                                    )}
                    </FormItem>
                </div>
                <div>
                    <Table dataSource={dataSource} columns={columns} />
                    <div>
                    <div style={{ width: 300,marginLeft:'600px',color:'#8A8A8A',borderTop:' 1px dotted #DBDBDB' }}>
                        <p style={{borderBottom:' 1px dotted #DBDBDB',marginLeft:'15px' }}>Sub Total</p>
                        <p style={{borderBottom:' 1px dotted #DBDBDB',marginLeft:'15px' }}>Tax</p>
                        <p style={{borderBottom:' 1px dotted #DBDBDB',marginLeft:'15px' }}>Discount</p>
                        <p style={{fontSize:'18px',marginLeft:'25px'}}><b>Total</b></p>
                    </div>
                    </div>
                </div>
                <div style={{borderBottom:'1px solid #E2E2E2',borderTop:'1px solid #E2E2E2',height:'32px'}}>
                    <div style={{marginLeft:'41px',marginTop:'5px',fontSize:'11px'}}> Rupees In Words :  </div>
                </div>
                <div style={{borderBottom:'1px solid #E2E2E2',borderTop:'1px solid #E2E2E2',height:'139px'}}>
                    <div style={{marginLeft:'41px',marginTop:'5px',fontSize:'13px',fontFamily:'Roboto'}}><b> Payment Options </b>  </div>
                    <div style={{display:'flex'}}>
                        <div style={{width:'226px',height:'65px',marginLeft:'41px',color:'#464646',marginTop:'12px'}}>Account No : 1234567890,Account Type : Current,IFSC Code : SBI123456,Bank : SBI,Branch : Somajiguda</div>
                        <div style={{marginLeft:'109px'}}>
                            <div style={{color:'#000000',fontSize:'11px',display:'flex'}}><b>Paypal</b> <p style={{marginLeft:'22px',color:'#464646'}}>: paypal@companyname.com</p> </div>
                            <div style={{color:'#000000',fontSize:'11px',display:'flex'}}><b>Payment  </b> <p style={{marginLeft:'12px',color:'#464646'}}>: VISA, Master Card, American Express</p> </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:'10px'}}> 
                    <FormItem  style={{marginLeft:"38px"}} label="Terms & Conditions" >
                                {getFieldDecorator('terms', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                    rules: [  
                                    { required: false, message: 'Please Enter Terms :' },
                                        ] 
                                    })(
                                        <Input.TextArea style={{width:'850px'}} rows={3}  type="text"  />
                                    )}
                    </FormItem>
                </div>
                <div style={{marginTop:'10px'}}> 
                    <FormItem  style={{marginLeft:"38px"}} label="Notes" >
                                {getFieldDecorator('Notes', {  //initialValue: ClientsData.ShippingAddressStreet_1,
                                    rules: [  
                                    { required: false, message: 'Please Enter Notes :' },
                                        ] 
                                    })(
                                        <Input.TextArea style={{width:'850px'}} rows={3}  type="text"  />
                                    )}
                    </FormItem>
                </div>
                <div style={{marginLeft:'780px'}}>Authorized Signature</div>
            </Form>
        );
    }
}

export default Form.create() (Altmetric);