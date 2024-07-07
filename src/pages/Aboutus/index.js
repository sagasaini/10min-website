import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './AboutPage.css';
import about1 from '../../assets/imgs/page/about-1.png';
import about2 from '../../assets/imgs/page/about-2.png';
import about3 from '../../assets/imgs/page/about-3.png';
import about4 from '../../assets/imgs/page/about-4.png';
import about5 from '../../assets/imgs/page/about-5.png';


// import icon1 from '../../assets/imgs/theme/icons/icon-1.png';
// import icon2 from '../../assets/imgs/theme/icons/icon-2.png';
// import icon3 from '../../assets/imgs/theme/icons/icon-3.png';
// import icon4 from '../../assets/imgs/theme/icons/icon-4.png';

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../assets/imgs/theme/icons', false, /\.(png|jpe?g|svg)$/));


function importAlls(r) {
    let image = {};
    r.keys().forEach((item, index) => { image[item.replace('./', '')] = r(item); });
    return image;
}

const themeIcons = importAlls(require.context('../../assets/imgs/theme/icons', false, /\.(png|jpe?g|svg)$/));
const pageImages = importAlls(require.context('../../assets/imgs/page', false, /\.(png|jpe?g|svg)$/));

const image = { ...themeIcons, ...pageImages };

const About = () => {
    const services = [
        { title: 'Best Prices & Offers', img: 'icon-1.svg' },
        { title: 'Wide Assortment', img: 'icon-2.svg' },
        { title: 'Free Delivery', img: 'icon-3.svg' },
        { title: 'Easy Returns', img: 'icon-4.svg' },
        { title: '100% Satisfaction', img: 'icon-5.svg' },
        { title: 'Great Daily Deal', img: 'icon-6.svg' }
    ];


    const teamMembers = [
        { name: 'H. Merinda', role: 'CEO & Co-Founder', img: 'about-6.png' },
        { name: 'Dilan Specter', role: 'Head Engineer', img: 'about-8.png' }
    ];

    const socialIcons = ['facebook', 'twitter', 'instagram', 'youtube'];



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="page-content pt-50">
            <div className="about-us-container">
                <div className="row">
                    <div className="col-xl-10 col-lg-12 m-auto">
                        <section className="row align-items-center mb-50">
                            <div className="col-lg-6">
                                <img style={{width:'100%' ,padding: '15px',
    borderRadius: '30px'}} src={about1} alt="About Nest" className="border-radius-15 mb-md-3 mb-lg-0 mb-sm-4"/>
                            </div>
                            <div className="col-lg-6">
                                <div className="pl-25">
                                    <h2 className="mb-30">Welcome to Nest</h2>
                                    <p className="mb-25">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.
                                    </p>
                                    <p className="mb-50">
                                        Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta et Ut placerat legendos interpre. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante Etiam sit amet orci eget. Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut ornare lectus. Auctor elit sed vulputate mi sit amet. Commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.
                                    </p>
                                    <div className="carousel-container">
            <Slider {...settings}>
                <div>
                    <img src={about3} alt="Image 1" className="carousel-image" />
                </div>
                <div>
                    <img src={about2} alt="Image 2" className="carousel-image" />
                </div>
                <div>
                    <img src={about3} alt="Image 3" className="carousel-image" />
                </div>
                <div>
                    <img src={about4} alt="Image 4" className="carousel-image" />
                </div>
                <div>
                    <img src={about2} alt="Image 5" className="carousel-image" />
                </div>
            </Slider>
        </div>
                                </div>
                            </div>
                        </section>

                        <section className="text-center mb-50">
            <h2 className="title style-3 mb-40">What We Provide?</h2>
            <div className="row">
                {services.map((service, index) => (
                    <div className="col-lg-4 col-md-6 mb-24" key={index}>
                        <div className="featured-card">
                            <img src={images[service.img]} alt={service.title} />
                            <h4>{service.title}</h4>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                            <a href="#">Read more</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>

                        <section className="row align-items-center mb-50">
                            <div className="row mb-50 align-items-center">
                                <div className="col-lg-7 pr-30">
                                    <img style={{width:'100%'}} src={about5} alt="About 5" className="mb-md-3 mb-lg-0 mb-sm-4"/>
                                </div>
                                <div className="col-lg-5">
                                    <h4 className="mb-20 text-muted">Our performance</h4>
                                    <h1 className="heading-1 mb-40">Your Partner for e-commerce grocery solution</h1>
                                    <p className="mb-30">
                                        Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
                                    </p>
                                    <p>
                                        Pitatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                {['Who we are', 'Our history', 'Our mission'].map((title, index) => (
                                    <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5" key={index}>
                                        <h3 className="mb-30">{title}</h3>
                                        <p>
                                            Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in. ellus eros donec ac odio orci ultrices in.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <section  className="containers mb-50 d-none d-md-block">
                <div className="rows about-count">
                    {[
                        { count: '12', text: 'Glorious years' },
                        { count: '36', text: 'Happy clients' },
                        { count: '57', text: 'Projects complete' },
                        { count: '24', text: 'Team advisor' },
                        { count: '26', text: 'Products Sale' }
                    ].map((item, index) => (
                        <div className="col-lg-1-5  text-center mb-lg-0 " key={index}>
                            <h1 className="heading-1"><span className="count">{item.count}</span>+</h1>
                            <h4>{item.text}</h4>
                        </div>
                    ))}
                </div>
            </section>

            <div className="team-container">
                <div className="row">
                    <div className="col-xl-10 col-lg-12 m-auto">
                        <section style={{padding:'20px'}} className="mb-50">
            <h2 className="title style-3 mb-40 text-center">Our Team</h2>
            <div className="row">
                <div className="col-lg-4 mb-lg-0 mb-md-5 mb-sm-5">
                    <h6 className="mb-5 text-brand">Our Team</h6>
                    <h1 className="mb-30">Meet Our Expert Team</h1>
                    <p className="mb-30">
                        Proin ullamcorper pretium orci. Donec necscele risque leo. Nam massa dolor imperdiet neccon sequata congue idsem. Maecenas malesuada faucibus finibus.
                    </p>
                    <p className="mb-30">
                        Proin ullamcorper pretium orci. Donec necscele risque leo. Nam massa dolor imperdiet neccon sequata congue idsem. Maecenas malesuada faucibus finibus.
                    </p>
                    <a href="#" className="btn">View All Members</a>
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        {teamMembers.map((member, index) => (
                            <div className="col-lg-6 col-md-6" key={index}>
                                <div className="team-card">
                                    <img style={{width:'100%'}} src={image[member.img]} alt={member.name} />
                                    <div className="content text-center">
                                        <h4 className="mb-5">{member.name}</h4>
                                        <span>{member.role}</span>
                                        <div className="social-network mt-20">
                                            {socialIcons.map((social, i) => (
                                                <a href="#" key={i}>
                                                    <img src={image[`icon-${social}-brand.svg`]} alt={social} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
