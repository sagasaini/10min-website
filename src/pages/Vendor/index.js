import React from 'react';
import VendorCard from './VendorCard';
import './VendorList.css';

const vendors = [
  {
    id: 1,
    name: "Nature Food",
    since: 2012,
    products: 380,
    rating: 4.0,
    address: "5171 W Campbell Ave, Kent, Utah 53127, United States",
    phone: "(+91) - 540-025-124553",
    image: "https://nest-frontend-v6.netlify.app/assets/imgs/vendor/vendor-7.png",
    badge: "Mall"
  },
  {
    id: 2,
    name: "Mrs. Smith's Pie",
    since: 2012,
    products: 233,
    rating: 4.0,
    address: "5171 W Campbell Ave, Kent, Utah 53127, United States",
    phone: "(+91) - 540-025-124553",
    image: "https://nest-frontend-v6.netlify.app/assets/imgs/vendor/vendor-7.png",
    badge: "Preferred"
  },
  // Add more vendors as needed
];

const VendorList = () => {
  return (
    <div className="page-content pt-50">
      <div className=" vendor-container">
        <div className="archive-header text-center">
          <h1 className="display-2 mb-50">Vendors List</h1>
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="sidebar-widget widget_search mb-50">
                <div className="search-form">
                  <form action="#">
                    <input type="text" placeholder="Search vendors (by name or ID)..." />
                    <button type="submit"><i className="fi-rs-search"></i></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-50">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="shop-product-filter">
              <div className="total-product">
                <p>We have <strong className="text-brand">780</strong> vendors now</p>
              </div>
              <div className="sort-by-product-area">
                <div className="sort-by-cover mr-10">
                  <div className="sort-by-product-wrap">
                    <div className="sort-by">
                      <span><i className="fi-rs-apps"></i>Show:</span>
                    </div>
                    <div className="sort-by-dropdown-wrap">
                      <span> 50 <i className="fi-rs-angle-small-down"></i></span>
                    </div>
                  </div>
                  <div className="sort-by-dropdown">
                    <ul>
                      <li><a className="active" href="#">50</a></li>
                      <li><a href="#">100</a></li>
                      <li><a href="#">150</a></li>
                      <li><a href="#">200</a></li>
                      <li><a href="#">All</a></li>
                    </ul>
                  </div>
                </div>
                <div className="sort-by-cover">
                  <div className="sort-by-product-wrap">
                    <div className="sort-by">
                      <span><i className="fi-rs-apps-sort"></i>Sort by:</span>
                    </div>
                    <div className="sort-by-dropdown-wrap">
                      <span> Featured <i className="fi-rs-angle-small-down"></i></span>
                    </div>
                  </div>
                  <div className="sort-by-dropdown">
                    <ul>
                      <li><a className="active" href="#">Mall</a></li>
                      <li><a href="#">Featured</a></li>
                      <li><a href="#">Preferred</a></li>
                      <li><a href="#">Total items</a></li>
                      <li><a href="#">Avg. Rating</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row vendor-grid">
          {vendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
        <div className="pagination-area mt-20 mb-20">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-start">
              <li className="page-item">
                <a className="page-link" href="#"><i className="fi-rs-arrow-small-left"></i></a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item active"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link dot" href="#">...</a></li>
              <li className="page-item"><a className="page-link" href="#">6</a></li>
              <li className="page-item">
                <a className="page-link" href="#"><i className="fi-rs-arrow-small-right"></i></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default VendorList;
