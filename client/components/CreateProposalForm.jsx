import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

const CreateProposalForm = (props) => {
  let input;

  return (
    <Form onSubmit={(event) => { props.createProposalHandler(event, input.value) }}>
      <FormGroup validationState="warning">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Where do you want to go?"
            inputRef={node => input = node}
          />
          <InputGroup.Button>
            <Button type="submit">
              Propose
            </Button>
          </InputGroup.Button>
        </InputGroup>
        <HelpBlock>Destination can't ne blank</HelpBlock>
      </FormGroup>
    </Form>
  )
}

export default CreateProposalForm
