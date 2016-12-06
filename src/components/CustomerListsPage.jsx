import React from 'react';

import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

import './CustomerListsPage.less';

class CustomerListsPage extends React.Component {
  render() {
    const { router } = this.context;
    return (
      <div className='customer container'>
        <ListGroup className='customer__lists'>
          <ListGroupItem
            bsClass="list-group-item list-group-item-success invoice__add"
            onClick={router.push.bind(null, `/newCustomer`)}
            active={
              this.props.selectedListId == 'newCustomer'
              ?
                true
              :
                false
            }
            >
            Add new Customer<Glyphicon glyph="plus"/>
          </ListGroupItem>
          {
            this.props.customerLists.map(customer => <ListGroupItem
              key={customer.id}
              onClick={router.push.bind(null, `/customers/${customer.id}`)}
              active={
                this.props.selectedListId == customer.id
                ?
                  true
                :
                  false
              }
              >
              {customer.name}
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

CustomerListsPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default CustomerListsPage;
