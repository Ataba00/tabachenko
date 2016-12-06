import React from 'react';

import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

import './InvoiceItemPage.less';

class InvoiceItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extendedInvoiceItem: this.props.extendedInvoiceItem,
    };
    this.updateQuantity = ::this.updateQuantity;
    this.handleDelete = ::this.handleDelete;
    this.changeQuantity = ::this.changeQuantity;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.extendedInvoiceItem.length !== nextProps.extendedInvoiceItem.length) {
      this.setState({ extendedInvoiceItem: nextProps.extendedInvoiceItem });
    }
  }

  handleDelete(index, e) {
    let extendedInvoiceItem = this.state.extendedInvoiceItem;
    extendedInvoiceItem.splice(index, 1);
    this.setState({
      extendedInvoiceItem,
    });
    let total = extendedInvoiceItem.reduce((sum, current) => sum + (current.product_price * current.quantity), 0);
    let { id } = e.target;
    this.props.onDeleteInvoiceItem(id.slice(6), { total: total.toFixed(2) });

  }

  updateQuantity(e) {
    let { id, value: quantity } = e.target;
    let total = this.state.extendedInvoiceItem.reduce((sum, current) => sum + (current.product_price * current.quantity), 0);
    this.props.onUpdateQuantity(id.slice(7), { quantity }, { total: total.toFixed(2) });
  }

  changeQuantity(index, e) {
    let extendedInvoiceItem = this.state.extendedInvoiceItem;
    extendedInvoiceItem[index].quantity = e.target.value;
    this.setState({
      extendedInvoiceItem,
    });
    let total = extendedInvoiceItem.reduce((sum, current) => sum + (current.product_price * current.quantity), 0);
    this.props.onCount(total.toFixed(2));
  }

  render() {
    return (
      <div className='invoice__items'>
        <ListGroup>
          <ListGroupItem className='header selected__product'>
            Selected Products
          </ListGroupItem>
          {
            this.state.extendedInvoiceItem.map((product, index) =>
              <ListGroupItem
                key={product.id}
                className='selected__product'
                >
                <div className='name__product'>{product.product_name}</div>
                <div className='price__product'
                  >
                  {
                    (product.product_price * product.quantity)}$
                </div>
                <div>
                  <input
                    id={`product${product.id}`}
                    className='quantity__product'
                    defaultValue={product.quantity}
                    type='number'
                    min='0'
                    onBlur={this.updateQuantity}
                    onChange={this.changeQuantity.bind(null, index)}
                  />
                <Glyphicon
                  id={`remove${product.id}`}
                  onClick={this.handleDelete.bind(null, index)}
                  className='remove__product danger'
                  glyph="remove"
                />
                </div>
              </ListGroupItem>
            )
          }
        </ListGroup>
      </div>
    );
  }
}

export default InvoiceItemPage;
