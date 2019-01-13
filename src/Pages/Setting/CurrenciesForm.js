import React from 'react';
import { Form} from 'antd'

            
class  Currencies extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
  
      };
    }      
  
render() {
  const { getFieldDecorator, getFieldValue} = this.props.form;
  
    return (
      <Form style = {{width:'100%',border: '1px rgba(0, 0, 0, 0.25)'}}>
        Currencies form
      </Form>
    );
  }
}

export default Form.create()(Currencies);