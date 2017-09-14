import React from 'react';
import {
  Button,
  Col,
  Panel
} from 'react-bootstrap';

const ProposalItem = (props) => {
  const bsStyle = props.isPending ? 'warning' : 'info'

  return (
    <Col md={4}>
      <Panel header={props.destination} footer={props.creator} bsStyle={bsStyle}>
        <dl className="dl-horizontal">
          <dt>Total Voted:</dt>
          <dd>{props.voteCount}</dd>

          <dt>Yes:</dt>
          <dd>{props.yesCount}</dd>

          <dt>No:</dt>
          <dd>{props.noCount}</dd>
        </dl>
        <Button onClick={() => { props.onVoteHandler(props.id) }} block>Vote</Button>
      </Panel>
    </Col>
  )
}

export default ProposalItem