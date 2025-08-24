import React from "react";
import Slider from "react-slick";
import "./Home.css";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
  };

  const productImages = [
    { src: "/images/trophy1.jpg", title: "🏅 Sports Trophy" },
    { src: "/images/trophy2.jpg", title: "🎖️ Academic Medal" },
    { src: "/images/trophy3.jpg", title: "🏆 Custom Award" },
    { src: "/images/trophy4.jpg", title: "🥇 Glass Trophy" }
  ];

  // ✅ Function to send email
  function sendEmail(e) {
    e.preventDefault();

    window.Email.send({
      Host: "smtp.gmail.com",
      Username: "tushar937297@gmail.com",
      Password: "vvrv zmgo uboo gspf",  // ⚠️ Gmail App Password (not your real password)
      To: "tushar937297@gmail.com",
      From: e.target.email.value,
      Subject: "New Contact Form Inquiry",
      Body: `
        Name: ${e.target.name.value} <br/>
        Email: ${e.target.email.value} <br/>
        Message: ${e.target.message.value}
      `
    }).then((message) => alert("Message Sent Successfully ✅"))
      .catch((err) => alert("Failed to send ❌ " + err));
  }

  return (
    <div className="home-page">
      
      {/* ✅ Welcome Section */}
      <section className="welcome-section" id="welcome">
        <h1>Welcome to TrophyZone 🏆</h1>
        <p>We specialize in high-quality trophies and awards for all occasions.</p>
        <a href="#products" className="explore-btn">Explore Products</a>
      </section>

      {/* ✅ Products Section */}
      <section id="products" className="products-section">
        <h2>Our Products</h2>
        <Slider {...settings}>
          {productImages.map((item, index) => (
            <div key={index} className="product-slide">
              <img src={item.src} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* ✅ Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="4" placeholder="Your Message" required></textarea>
          <button type="submit">Send Inquiry</button>
        </form>
      </section>
      
    </div>
  );
}

export default Home;
