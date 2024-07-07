import React from 'react';
import PropTypes from 'prop-types';

const VendorCard = ({ vendor }) => {
  return (
    <div className="col-lg-6 col-md-6 col-12 col-sm-6">
      <div className="vendor-wrap style-2 mb-40">
        {vendor.badge && (
          <div className="product-badges product-badges-position product-badges-mrg">
            <span className={vendor.badge.toLowerCase()}>{vendor.badge}</span>
          </div>
        )}
        <div className="vendor-img-action-wrap">
          <div className="vendor-img">
            <a href={`/vendor-details-${vendor.id}`}>
              <img className="default-img" src={vendor.image} alt="" />
            </a>
          </div>
          <div className="mt-10">
            <span className="font-small total-product">{vendor.products} products</span>
          </div>
        </div>
        <div className="vendor-content-wrap">
          <div className="mb-30">
            <div className="product-category">
              <span className="text-muted">Since {vendor.since}</span>
            </div>
            <h4 className="mb-5"><a href={`/vendor-details-${vendor.id}`}>{vendor.name}</a></h4>
            <div className="product-rate-cover">
              <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: '90%' }}></div>
              </div>
              <span className="font-small ml-5 text-muted"> ({vendor.rating})</span>
            </div>
            <div className="vendor-info d-flex justify-content-between align-items-end mt-30">
              <ul className="contact-info text-muted">
                <li><img src="assets/imgs/theme/icons/icon-location.svg" alt="" /><strong>Address: </strong> <span>{vendor.address}</span></li>
                <li><img src="assets/imgs/theme/icons/icon-contact.svg" alt="" /><strong>Call Us:</strong><span>{vendor.phone}</span></li>
              </ul>
              <a className="btn btn-xs" href={`/vendor-details-${vendor.id}`}>Visit Store <i className="fi-rs-arrow-small-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VendorCard.propTypes = {
  vendor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    since: PropTypes.number.isRequired,
    products: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    badge: PropTypes.string
  }).isRequired
};

export default VendorCard;
