import React from 'react';
// import './CartModal.css';

const CartModal = () => {
    return (
        <div className="cart-modal-rn cart-modal--with-searchbar">
            <div className="CartWrapper__CartContainer">
                <div className="CartWrapper__CartPage">
                    <div className="CartWrapper__TitleContainer">
                        <div className="CartWrapper__Title">My Cart</div>
                        <div className="CartWrapper__Icon">p</div>
                    </div>
                </div>
                <div className="Cart__StyledDiv">
                    <div className="widgets__Container">
                        <div className="widgets__WidgetContainer">
                            <div className="ShipmentSlot__Container">
                                <div className="ShipmentSlot__HeaderStripContainer">
                                    <div className="HeaderStrip__Container">
                                        <div className="HeaderStrip__ImageContainer">
                                            <div className="sc-gsnTZi">
                                                <div className="sc-hKMtZM"></div>
                                                <img alt="image" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/assets/eta-icons/15-mins-filled.png" loading="lazy" className="sc-jSMfEi" />
                                            </div>
                                        </div>
                                        <div className="HeaderStrip__TextWrapper">
                                            <div className="HeaderStrip__Heading">Free delivery in 9 minutes</div>
                                            <div className="HeaderStrip__HighlightContainer">
                                                <div className="HeaderStrip__Highlight">Shipment of 1 item</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widgets__WidgetContainer">
                            {/* <div className="CartProduct__Container">
                                <div className="DefaultProductCard__Container">
                                    <div className="DefaultProductCard__LeftContainer">
                                        <div className="sc-gsnTZi DefaultProductCard__CustomImage">
                                            <div className="sc-hKMtZM"></div>
                                            <img alt="Brown Rolling Paper + Roach with Crushing Tray - Stash Pro" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=135/app/images/products/sliding_image/496994a.jpg?ts=1698309251" loading="lazy" className="sc-jSMfEi" />
                                        </div>
                                    </div>
                                    <div className="DefaultProductCard__RightContainer">
                                        <div className="DefaultProductCard__ProductTitle">Brown Rolling Paper + Roach with Crushing Tray - Stash Pro</div>
                                        <div className="DefaultProductCard__VariantAndAddToCartWrapperContainer">
                                            <div className="DefaultProductCard__ProductVariantContainer">1 pack</div>
                                        </div>
                                        <div className="DefaultProductCard__PriceSpeakerContainer">
                                            <div className="DefaultProductCard__PriceContainer">
                                                <div className="DefaultProductCard__Price">₹222</div>
                                            </div>
                                            <div className="DefaultProductCard__AddToCardContainer">
                                                <div className="AddToCart__UpdatedButtonContainer">
                                                    <div className="AddToCart__StyledDiv"><div className="AddToCart__AddMinusIcon">U</div></div>1<div className="AddToCart__StyledDiv2"><div disabled="" className="AddToCart__AddMinusIcon">5</div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="widgets__WidgetContainer"></div>
                        <div className="widgets__WidgetContainer">
                            <div className="BillCard__BillCardWrapper">
                                <div className="BillCard__BillCardList">
                                    <div className="BillCard__BillItemWrap">
                                        <div className="BillCard__BillItemContainer">
                                            <div className="BillCard__BillItemLeft">
                                                <div className="BillCard__BillItemLeftHeader">
                                                    <div className="BillCard__BillItemLeftHeaderText">
                                                        <div className="BillCard__BillItemLeftHeaderTextContent">Bill details</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="BillCard__BillItemWrap">
                                        <div className="BillCard__BillItemContainer">
                                            <div className="BillCard__BillItemLeft">
                                                <div className="BillCard__BillItemLeftHeader">
                                                    <div className="BillCard__BillItemLeftHeaderIcon"><span className="icon-food-menu-fill tw-inline-block" role="img" data-pf="reset"></span></div>
                                                    <div className="BillCard__BillItemLeftHeaderText">
                                                        <div className="BillCard__BillItemLeftHeaderTextContent">Items total</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="BillCard__BillItemRight">
                                                <div className="BillCard__BillItemRightHeader">
                                                    <div className="tw-text-300 tw-font-medium" data-pf="reset" style={{color: 'var(--colors-grey-900)'}}><span data-pf="reset"> <span>₹222</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="BillCard__BillItemWrap">
                                        <div className="BillCard__BillItemContainer">
                                            <div className="BillCard__BillItemLeft">
                                                <div className="BillCard__BillItemLeftHeader">
                                                    <div className="BillCard__BillItemLeftHeaderIcon"><span className="icon-delivery tw-inline-block" role="img" data-pf="reset"></span></div>
                                                    <div className="BillCard__BillItemLeftHeaderText">
                                                        <div className="BillCard__BillItemLeftHeaderTextContent">Delivery charge</div>
                                                    </div>
                                                    <span className="icon-info-line tw-inline-flex BillCard__ModalIcon" role="img" data-pf="reset"></span>
                                                </div>
                                            </div>
                                            <div className="BillCard__BillItemRight">
                                                <div className="BillCard__BillItemRightHeader">
                                                    <div className="tw-text-300 tw-font-medium" data-pf="reset" style={{color: 'var(--colors-grey-900)'}}><span data-pf="reset"> <span className="tw-text-grey-700 tw-line-through">₹15</span><span className="tw-text-blue-500"> FREE</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="BillCard__BillItemWrap">
                                        <div className="BillCard__BillItemContainer">
                                            <div className="BillCard__BillItemLeft">
                                                <div className="BillCard__BillItemLeftHeader">
                                                    <div className="BillCard__BillItemLeftHeaderIcon"><span className="icon-order-bag-fill tw-inline-block" role="img" data-pf="reset"></span></div>
                                                    <div className="BillCard__BillItemLeftHeaderText">
                                                        <div className="BillCard__BillItemLeftHeaderTextContent">Handling charge</div>
                                                    </div>
                                                    <span className="icon-info-line tw-inline-flex BillCard__ModalIcon" role="img" data-pf="reset"></span>
                                                </div>
                                            </div>
                                            <div className="BillCard__BillItemRight">
                                                <div className="BillCard__BillItemRightHeader">
                                                    <div className="tw-text-300 tw-font-medium" data-pf="reset" style={{color: 'var(--colors-grey-900)'}}><span data-pf="reset"> <span>₹2</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="BillCard__BillItemWrap">
                                        <div className="BillCard__BillItemContainer">
                                            <div className="BillCard__BillItemLeft">
                                                <div className="BillCard__BillItemLeftHeader">
                                                    <div className="BillCard__BillItemLeftHeaderText">
                                                        <div className="BillCard__BillItemLeftHeaderTextContent">Grand total</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="BillCard__BillItemRight">
                                                <div className="BillCard__BillItemRightHeader">
                                                    <div className="tw-text-400 tw-font-semibold" style={{color: 'var(--colors-black-900)'}}>₹224</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widgets__WidgetContainer">
                            <div className="FeedingIndia__FeedingIndiaWrapper">
                                <div className="FeedingIndiaComponent__Container">
                                    <div className="FeedingIndiaComponent__Wrapper">
                                        <div className="FeedingIndiaComponent__IconContainer">
                                            <img height="30" width="30" alt="" src="https://cdn.grofers.com/assets/media/fe/gf-donation/feeding-india.svg" />
                                        </div>
                                        <div className="FeedingIndiaComponent__ContentContainer">
                                            <div className="FeedingIndiaComponent__Title">Help fight hunger</div>
                                            <div className="FeedingIndiaComponent__Description">For every contribution of ₹1, Zomato Feeding India will serve 1 meal to someone in need</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="AddToCart__UpdatedButtonContainer">
                                    <div className="AddToCart__StyledDiv">
                                        <div className="AddToCart__AddMinusIcon">U</div>
                                    </div>1<div className="AddToCart__StyledDiv2">
                                        <div disabled="" className="AddToCart__AddMinusIcon">5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widgets__WidgetContainer"></div>
                        <div className="CartCTA__Container">
                            <div className="CartCTA__ButtonContainer">
                                <div className="BaseButton__Container">
                                    <div className="CartCTA__Button">Proceed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default CartModal;
