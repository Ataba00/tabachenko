import React from 'react';

import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

import './InvoiceListsPage.less';

class InvoiceListsPage extends React.Component {
  render() {
    const { router } = this.context;
    return (
      <div className='invoice container'>
        <ListGroup className='invoice__lists'>
          <ListGroupItem
            bsClass="list-group-item list-group-item-success invoice__add"
            onClick={router.push.bind(null, `/newInvoice`)}
            active={
              this.props.selectedListId == 'newInvoice'
              ?
                true
              :
                false
            }
            >
            Add new Invoice<Glyphicon glyph="plus"/>
          </ListGroupItem>
          {
            this.props.invoiceLists.map(invoice => <ListGroupItem
              key={invoice.id}
              onClick={router.push.bind(null, `/invoices/${invoice.id}`)}
              active={
                this.props.selectedListId == invoice.id
                ?
                  true
                :
                  false
              }
              >
              {invoice.id}
            </ListGroupItem>
          )
        }
      </ListGroup>
      <div>
        {this.props.page}
      </div>
      </div>
    );
  }
}

InvoiceListsPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default InvoiceListsPage;
