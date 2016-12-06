import React from 'react';

import CustomerListsStore from '../stores/CustomerListsStore';
import CustomerListsActions from '../actions/CustomerListsActions';

import CustomerListsPage from '../components/CustomerListsPage.jsx';

function getStateFromFlux() {
  return {
    customerLists: CustomerListsStore.getCustomerLists(),
  };
}

class CustomerListsPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromFlux(),
    };
    this._onChange = ::this._onChange;
  }

  componentWillMount() {
    CustomerListsActions.loadCustomerLists();
  }

  componentDidMount() {
    CustomerListsStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CustomerListsStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <CustomerListsPage
        customerLists={this.state.customerLists}
        page={this.props.children}
        selectedListId={this.props.params.id || 'newCustomer'}
      />
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

}

export default CustomerListsPageContainer;
