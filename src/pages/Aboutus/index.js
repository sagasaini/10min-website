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
        {
          title: 'Best Prices & Offers',
          img: 'icon-1.svg',
          content: 'Get the best value for your money with our unbeatable prices and exciting offers. Shop smart and save more with our daily discounts and deals tailored just for you.'
        },
        {
          title: 'Wide Assortment',
          img: 'icon-2.svg',
          content: 'Explore a diverse selection of products across multiple categories. From essentials to luxury items, find everything you need in one place, carefully curated for your convenience.'
        },
        {
          title: 'Free Delivery',
          img: 'icon-3.svg',
          content: 'Enjoy hassle-free shopping with our free delivery service. Get your favorite products delivered to your doorstep without any extra cost, making your shopping experience even better.'
        },
        {
          title: 'Easy Returns',
          img: 'icon-4.svg',
          content: 'Shop with confidence, knowing that our easy return policy has you covered. If you\'re not completely satisfied, returning or exchanging your purchase is quick and straightforward.'
        },
        {
          title: '100% Satisfaction',
          img: 'icon-5.svg',
          content: 'Your satisfaction is our top priority. We are committed to delivering quality products and services that meet your expectations every time you shop with us.'
        },
        {
          title: 'Great Daily Deal',
          img: 'icon-6.svg',
          content: 'Don\'t miss out on our fantastic daily deals! Discover amazing discounts and offers on a wide range of products, available for a limited time only.'
        }
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
                                    <h2 className="mb-30">Welcome to 10min.in - Your Ultimate Shopping Destination!</h2>
                                    <p className="mb-25">
                                    

At 10min.in, we are committed to bringing you convenience and variety, all in one place. Whether you need daily essentials, the latest electronics, stylish home decor, or fashionable clothing, our extensive product range caters to every need. We strive to provide top-quality items at affordable prices, ensuring you get the best deals every time you shop with us.
                                    </p>
                                    <p className="mb-50">
                                    We believe that quality shouldn't come at a high price. Our competitive pricing ensures you get the best deals on all your favorite products. Plus, keep an eye out for our regular sales and special promotions for even more savings.
                                    </p>
                                    <p className="mb-50">
                                    Discover a new way to shop at 10min.in. Browse our categories, explore new products, and enjoy a seamless shopping experience like never before. Your ultimate shopping destination awaits!
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
          <p>{service.content}</p>
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
                                    <p className="mb-30">At 10min.in, we're redefining convenience in grocery shopping. Our advanced logistics and user-friendly platform ensure that your groceries arrive at your doorstep within minutes. With a 98% on-time delivery rate and a focus on customer satisfaction, we are your reliable partner in ensuring your kitchen is always stocked.

                                    </p>
                                    {/* <p>
                                        Pitatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.
                                    </p> */}
                                </div>
                            </div>

                            <div className="row">
  {[
    { title: 'Who We Are', content: '10min.in is a team of dedicated professionals passionate about making your life easier. We combine technology with a deep understanding of the local market to bring you the best in grocery delivery. From fresh produce to daily essentials, we are committed to providing you with a wide range of products, all delivered in under 10 minutes.' },
    { title: 'Our History', content: '10min.in began with a simple idea: to make grocery shopping faster and easier. What started as a small delivery service has grown into a trusted platform serving thousands of homes. Our commitment to quality and speed has remained constant, evolving alongside the needs of our customers.' },
    { title: 'Our Mission', content: 'Our mission at 10min.in is to transform the way you shop for groceries by offering an ultra-fast, reliable, and seamless shopping experience. We aim to be the most dependable service, delivering not just products, but also trust and convenience.' }
  ].map((section, index) => (
    <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5" key={index}>
      <h3 className="mb-30">{section.title}</h3>
      <p>{section.content}</p>
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
