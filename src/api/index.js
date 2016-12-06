const CUSTOMERS = '/api/customers';
const PRODUCTS = '/api/products';
const INVOICES = '/api/invoices';

export default {

  // CUSTOMERS API

  loadCustomerLists() {
    return this.getRequest(CUSTOMERS);
  },

  loadCustomer(idCustomer) {
    return this.getRequest(`${CUSTOMERS}/${idCustomer}`);
  },

  updateCustomer(idCustomer, props) {
    return this.putRequest(`${CUSTOMERS}/${idCustomer}`, props);
  },

  createCustomer(props) {
    return this.postRequest(CUSTOMERS, props);
  },

  deleteCustomer(idCustomer) {
    return this.deleteRequest(`${CUSTOMERS}/${idCustomer}`);
  },

  // PRODUCTS API

  loadProductLists() {
    return this.getRequest(PRODUCTS);
  },

  loadProduct(idProduct) {
    return this.getRequest(`${PRODUCTS}/${idProduct}`);
  },

  updateProduct(idProduct, props) {
    return this.putRequest(`${PRODUCTS}/${idProduct}`, props);
  },

  createProduct(props) {
    return this.postRequest(PRODUCTS, props);
  },

  deleteProduct(idProduct) {
    return this.deleteRequest(`${PRODUCTS}/${idProduct}`);
  },

  // INVOICES API

  loadInvoiceLists() {
    return this.getRequest(INVOICES);
  },

  loadInvoice(idInvoice) {
    return Promise.all([
      this.getRequest(`${INVOICES}/${idInvoice}`),
      this.loadCustomerLists(),
      this.loadProductLists(),
      this.loadInvoiceItem(idInvoice),
    ]);
  },

  createInvoice(props) {
    return this.postRequest(INVOICES, props);
  },

  updateInvoice(idInvoice, props) {
    return this.putRequest(`${INVOICES}/${idInvoice}`, props);
  },

  deleteInvoice(idInvoice) {
    return this.deleteRequest(`${INVOICES}/${idInvoice}`);
  },

  // PRODUCTS API ITEM

  loadInvoiceItem(idInvoice) {
    return this.getRequest(`${INVOICES}/${idInvoice}/items`);
  },

  addInvoceItem(idInvoice, props) {
    return this.postRequest(`${INVOICES}/${idInvoice}/items`, props);
  },

  updateInvoceItem(idInvoice, idInvoiceItem, props) {
    return this.putRequest(`${INVOICES}/${idInvoice}/items/${idInvoiceItem}`, props);
  },

  deleteInvoiceItem(idInvoice, idInvoiceItem) {
    return this.deleteRequest(`${INVOICES}/${idInvoice}/items/${idInvoiceItem}`);
  },

  putRequest(url, props) {
    return fetch(url, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    });
  },

  postRequest(url, props) {
    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }).then(resp => resp.json());
  },

  deleteRequest(url) {
    return fetch(url, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json());
  },

  getRequest(url) {
    return fetch(url).then(resp => resp.json());
  },
};
