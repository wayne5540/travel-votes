import React from 'react';
import {
  Button,
  Col,
  Panel
} from 'react-bootstrap';

const ProposalItem = (props) => {
  const bsStyle = props.isPending ? 'warning' : 'info'
  const voteBtn = <Button onClick={() => { props.onVoteHandler(props.id) }} bsStyle="primary" block>Vote</Button>
  const disabledVoteBtn = <Button disabled block>Vote</Button>

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
        { props.isPending ? disabledVoteBtn : voteBtn }
      </Panel>
    </Col>
  )
}

export default ProposalItem