import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import App from './App.jsx';

import CustomerListsPage from './containers/CustomerListsPage.jsx';
import CustomerPage from './containers/CustomerPage.jsx';
import CreateCustomerPage from './containers/CreateCustomerPage.jsx';

import ProductListsPage from './containers/ProductListsPage.jsx';
import ProductPage from './containers/ProductPage.jsx';
import CreateProductPage from './containers/CreateProductPage.jsx';

import InvoiceListsPage from './containers/InvoiceListsPage.jsx';
import InvoicePage from './containers/InvoicePage.jsx';
import CreateInvoicePage from './containers/CreateInvoicePage.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='/invoices' />
      <Route path='/customers' component={CustomerListsPage}>
        <Route path='/customers/:id' component={CustomerPage} />
        <Route path='/newCustomer' component={CreateCustomerPage} />
      </Route>
      <Route path='/products' component={ProductListsPage}>
        <Route path='/products/:id' component={ProductPage} />
        <Route path='/newProduct' component={CreateProductPage} />
      </Route>
      <Route path='/invoices' component={InvoiceListsPage}>
        <Route path='/invoices/:id' component={InvoicePage} />
        <Route path='/newInvoice' component={CreateInvoicePage} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('mount-point')
);
