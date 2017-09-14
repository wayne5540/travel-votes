import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

export default class CreateProposalForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      validationState: null,
      inputValue: "",
      helpText: ""
    }
  }

  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value,
      validationState: (event.target.value ? "success" : "error"),
      helpText: (event.target.value ? "" : "Can't be blank")
    })
  }

  isValidInputValue() {
    return this.state.inputValue ? true : false
  }

  render() {
    return (
      <Form onSubmit={(event) => { props.createProposalHandler(event, this.state.inputValue) }}>
        <FormGroup validationState={this.state.validationState}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Where do you want to go?"
              value={this.state.inputValue}
              onChange={this.handleInputChange.bind(this)}
            />
            <InputGroup.Button>
              <Button type="submit" disabled={!this.isValidInputValue()} >
                Propose
              </Button>
            </InputGroup.Button>
          </InputGroup>
          <HelpBlock>{this.state.helpText}</HelpBlock>
        </FormGroup>
      </Form>
    )
  }
}
