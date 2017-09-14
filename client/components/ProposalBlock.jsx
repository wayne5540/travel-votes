import React from 'react';
import ProposalItem from './ProposalItem';
import CreateProposalForm from './CreateProposalForm';

import {
  Col,
  Row
} from 'react-bootstrap';

const ProposalBlock = (props) => {
  const proposalItems = props.proposals.map((proposal) => (
    <ProposalItem {...proposal} key={proposal.id} />
  ))

  return (
    <Row>
      <Col md={12} className="text-center">
        <h2>Proposals</h2>
        <CreateProposalForm createProposalHandler={props.createProposalHandler} destinationInput={props.destinationInput} />
      </Col>
      {proposalItems}
    </Row>
  )
}

export default ProposalBlock