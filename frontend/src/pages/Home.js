import React, { useEffect, useRef, useState } from "react";
import ImageService from "../services/ImageService";
import "./Home.css";

export default function Home() {
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await ImageService.getAllImagesPublic(); // must await
        const data = res.data || []; // protect against undefined
        setImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
        setImages([]);
      }
    };

    fetchImages();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const scrollWidth = sliderRef.current.clientWidth; // visible width
        sliderRef.current.scrollBy({
          left: scrollWidth / 3, // scroll by 1 image width
          behavior: "smooth",
        });

        // Loop back to start
        if (
          sliderRef.current.scrollLeft + scrollWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // scroll every 3 seconds

    return () => clearInterval(interval);
  }, [images]);


  return (
    <div className="homepage">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Trophies & Awards</h1>
          <p>Crafted for sports, academics, corporate excellence & celebrations.</p>
          <a href="/product-gallery" className="hero-btn">Explore Products</a>
        </div>
      </section>

      {/* PRODUCT SLIDER */}
      <section className="products-section">
        <h2 className="section-title">Our Products</h2>

        <div className="product-slider" ref={sliderRef}>
          {images.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>
              Loading products...
            </p>
          ) : (
            images.map((img) => (
              <div key={img.id} className="product-card">
                <img
                  src={ImageService.getImageUrl(img.id)}
                  alt={img.fileName || "Product Image"}
                />
              </div>
            ))
          )}
        </div>
      </section>


      {/* CONTACT FORM */}
      <section className="contact-section">
        <h2 className="section-title">Contact Us</h2>

        <div className="contact-card">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button className="send-btn">Send Inquiry</button>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="locations-section">
        <h2 className="section-title">Our Locations</h2>

        <div className="location-box">
          <h3>Mumbai</h3>
          <p>123 Trophy Street, Andheri West, Mumbai, Maharashtra</p>
        </div>

        <div className="location-box">
          <h3>Pune</h3>
          <p>45 Champions Road, Shivaji Nagar, Pune, Maharashtra</p>
        </div>
      </section>

    </div>
  );
}
