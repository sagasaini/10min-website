// ContactPage.js

import React from 'react';
import './ContactPage.css';
import { useForm } from 'react-hook-form';
import contact from  '../../assets/imgs/page/contact-2.png'
  

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission
    };
    return (
        <div className="contact-page pt-50">
            <div className="contact-container">
                <div className="row">
                    <div className="col-xl-10 col-lg-12 m-auto">
                        <section className="row align-items-end mb-50">
                            <div className="col-lg-4 mb-lg-0 mb-md-5 mb-sm-5">
                                <h4 className="mb-20 text-primary">How can we help you?</h4>
                                <h1 className="mb-30">Let us know how we can help you</h1>
                                <p className="mb-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-6 mb-4">
                                        <h5 className="mb-20">01. Visit Feedback</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <h5 className="mb-20">02. Employer Services</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                    <div className="col-lg-6 mb-lg-0 mb-4">
                                        <h5 className="mb-20 text-primary">03. Billing Inquiries</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                    <div className="col-lg-6">
                                        <h5 className="mb-20">04. General Inquiries</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <section className=" contact-container mb-50 d-none d-md-block">
                <div className="contact-page__map border-radius-15 overflow-hidden">
                    <div id="map-panes" className="leaflet-map leaflet-container" tabIndex="0" style={{ position: 'relative', outline: 'none' }}>
                        {/* Add your map tiles and other leaflet components here */}
                    </div>
                </div>
            </section>
            <div className="contact-container">
                <div className="row">
                    <div className="col-xl-10 col-lg-12 m-auto">
                        <section className="mb-50">
                            <div className="row mb-60">
                                <div className="col-md-4 mb-4 mb-md-0">
                                    <h4 className="mb-15 text-primary">Office</h4>
                                    <address>
                                        205 North Michigan Avenue, Suite 810<br />
                                        Chicago, 60601, USA<br />
                                        <abbr title="Phone">Phone:</abbr> (123) 456-7890<br />
                                        <abbr title="Email">Email:</abbr> contact@Evara.com<br />
                                    </address>
                                    <button className="btn btn-sm font-weight-bold text-white mt-20 border-radius-5 btn-shadow-primary hover-up">
                                        <i className="fi-rs-marker mr-5"></i>View map
                                    </button>
                                </div>
                                <div className="col-md-4 mb-4 mb-md-0">
                                    <h4 className="mb-15 text-primary">Studio</h4>
                                    <address>
                                        205 North Michigan Avenue, Suite 810<br />
                                        Chicago, 60601, USA<br />
                                        <abbr title="Phone">Phone:</abbr> (123) 456-7890<br />
                                        <abbr title="Email">Email:</abbr> contact@Evara.com<br />
                                    </address>
                                    <button className="btn btn-sm font-weight-bold text-white mt-20 border-radius-5 btn-shadow-primary hover-up">
                                        <i className="fi-rs-marker mr-5"></i>View map
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="mb-15 text-primary">Shop</h4>
                                    <address>
                                        205 North Michigan Avenue, Suite 810<br />
                                        Chicago, 60601, USA<br />
                                        <abbr title="Phone">Phone:</abbr> (123) 456-7890<br />
                                        <abbr title="Email">Email:</abbr> contact@Evara.com<br />
                                    </address>
                                    <button className="btn btn-sm font-weight-bold text-white mt-20 border-radius-5 btn-shadow-primary hover-up">
                                        <i className="fi-rs-marker mr-5"></i>View map
                                    </button>
                                </div>
                            </div>
                            <div 
                             style={{display:'flex'}} className="contact-row">
                                <div className="col-xl-8">
                                <div className="contact-form">
            <h5 className="text-primary mb-10">Contact form</h5>
            <h2 className="mb-10">Drop Us a Line</h2>
            <p className="text-muted mb-30 font-sm">Your email address will not be published. Required fields are marked *</p>
            <form className="contact-form-style mt-30" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                            <input
                                name="name"
                                placeholder="First Name"
                                type="text"
                                {...register('name', { required: 'First name is required' })}
                            />
                            {errors.name && <p className="error-message">{errors.name.message}</p>}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                            <input
                                name="email"
                                placeholder="Your Email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Entered value does not match email format',
                                    },
                                })}
                            />
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                            <input
                                name="telephone"
                                placeholder="Your Phone"
                                type="tel"
                                {...register('telephone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Only numbers are allowed',
                                    },
                                })}
                            />
                            {errors.telephone && <p className="error-message">{errors.telephone.message}</p>}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                            <input
                                name="subject"
                                placeholder="Subject"
                                type="text"
                                {...register('subject', { required: 'Subject is required' })}
                            />
                            {errors.subject && <p className="error-message">{errors.subject.message}</p>}
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="textarea-style mb-30">
                            <textarea
                                name="message"
                                placeholder="Message"
                                {...register('message', { required: 'Message is required' })}
                            ></textarea>
                            {errors.message && <p className="error-message">{errors.message.message}</p>}
                        </div>
                        <button className="submit submit-auto-width" type="submit">Send message</button>
                    </div>
                </div>
            </form>
        </div>
                                </div>
                                <div className="col-lg-4 pl-50 d-lg-block d-none">
                                    <img className="contact-page__image border-radius-15 mt-50" src={contact} alt="Contact Us" />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
