import React from 'react';

import InvoiceStore from '../stores/InvoiceStore';
import InvoiceActions from '../actions/InvoiceActions';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CreateInvoicePageContainer extends React.Component {

  componentWillMount() {
    InvoiceActions.createInvoice();
  }

  render() {
    return (
      <MuiThemeProvider>
        <CircularProgress size={80} thickness={5} />
      </MuiThemeProvider>
    );
  }
}

export default CreateInvoicePageContainer;
