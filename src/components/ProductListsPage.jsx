import React from 'react';

import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

import './ProductListsPage.less';

class ProductListsPage extends React.Component {
  render() {
    const { router } = this.context;
    return (
      <div className='product container'>
        <ListGroup className='product__lists'>
          <ListGroupItem
            bsClass="list-group-item list-group-item-success product__add"
            onClick={router.push.bind(null, `/newProduct`)}
            active={
              this.props.selectedListId == 'newProduct'
              ?
                true
              :
                false
            }
            >
            Add new Product<Glyphicon glyph="plus"/>
          </ListGroupItem>
          {
            this.props.productLists.map(product => <ListGroupItem
              key={product.id}
              onClick={router.push.bind(null, `/products/${product.id}`)}
              active={
                this.props.selectedListId == product.id
                ?
                  true
                :
                  false
              }
              >
              {product.name}
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

ProductListsPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ProductListsPage;
