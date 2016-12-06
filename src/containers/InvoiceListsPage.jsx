import React from 'react';

import InvoiceListsStore from '../stores/InvoiceListsStore';
import InvoiceListsActions from '../actions/InvoiceListsActions';

import InvoiceListsPage from '../components/InvoiceListsPage.jsx';

function getStateFromFlux() {
  return {
    invoiceLists: InvoiceListsStore.getInvoiceLists(),
  };
}

class InvoiceListsPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromFlux(),
    };
    this._onChange = ::this._onChange;
  }

  componentWillMount() {
    InvoiceListsActions.loadInvoiceLists();
  }

  componentDidMount() {
    InvoiceListsStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    InvoiceListsStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <InvoiceListsPage
        invoiceLists={this.state.invoiceLists}
        page={this.props.children}
        selectedListId={this.props.params.id || 'newInvoice'}
      />
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

}

export default InvoiceListsPageContainer;
