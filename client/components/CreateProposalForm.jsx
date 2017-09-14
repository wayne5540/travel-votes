import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';

const CreateProposalForm = (props) => {
  let input;

  return (
    <Form onSubmit={(event) => { props.createProposalHandler(event, input.value) }}>
      <FormGroup>
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
      </FormGroup>
    </Form>
  )
}

export default CreateProposalForm
