import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
var bg=require('../Images/desktop.jpg')

class StartPage extends React.Component{


    render(){

        return(
            
            <div style={{width:"100%",height:"100vh",backgroundImage: "url("+bg+")", backgroundSize: "cover", backgroundRepeat: "no-repeat",textAlign: "-webkit-right"}}> 
                <div style={{display:'flex'}} >
                    <div style={{marginTop: '36px',marginLeft:'750px'}}>
                        <Button shape="omitted" style={{marginLeft:'0px',marginTop:'4px',borderRadius:'28px'}} >Products</Button>
                        <Button shape="omitted" style={{marginLeft:'15px',marginTop:'4px',borderRadius:'28px'}} >Pricing</Button>
                        <Button shape="omitted" style={{marginLeft:'15px',marginTop:'4px',borderRadius:'28px'}} >Solutions</Button>
                        <Button shape="omitted" style={{marginLeft:'15px',marginTop:'4px',borderRadius:'28px'}} >Services</Button>
                        <Button shape="omitted" style={{marginLeft:'15px',marginTop:'4px',borderRadius:'28px'}} >About Us</Button>
                
                    </div>
                    <div>
                    <Link to={`/Login`}><Button  shape="omitted" type="primary" style={{marginTop:'36px',marginLeft:'50px',background:'#8854D0',borderRadius:'28px'}} >Login</Button></Link>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={require('../Images/logo.png')} style={{width: '60px',marginRight:'945px',marginTop:'80px'}} /> 
                        <h1 className="accounting" style={{marginTop:'10px',marginRight:'900px',color: '#153552'}}><b>Accounting</b></h1>
                    </div>
                    <Link to={`/SignUp`}> <Button shape="omitted" type="primary" style={{marginTop:'260px',marginRight:'930px',background:'#8854D0',borderRadius:'28px'}} >Get Started</Button></Link>

                </div>

                
            </div>
        );
    }

}

export default StartPage;