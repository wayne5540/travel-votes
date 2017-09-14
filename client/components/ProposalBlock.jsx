import React from 'react';
import ProposalItem from './ProposalItem';

import {
  Col,
  Row
} from 'react-bootstrap';

const ProposalBlock = (props) => {
  const proposalItems = props.proposals.map((proposal) => (
    <ProposalItem {...proposal} onVoteHandler={ props.onVoteHandler} key={proposal.id} />
  ))

  return (
    <Row>
      {proposalItems}
    </Row>
  )
}

export default ProposalBlock