import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const About = () => {
  // Title
  const [title] = useState("About us");
  useDocumentTitle(title);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto lg:px-0 px-3 lg:mt-10 mt-6">
        <p className="mb-4 font-bold lg:text-2xl text-xl">About US</p>
        <p className="mb-4">
          Welcome to ShegerLace, your one-stop destination for stylish and
          comfortable footwear. Founded with a passion for shoes and a
          dedication to quality, ShegerLace offers a wide range of trendy
          designs to suit every occasion—from casual outings to formal events.
          Whether you’re looking for the latest styles or timeless classics,
          we’re here to lace you up with the best!
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">Our Story</p>
        <p className="mb-4">
          ShegerLace was born out of a love for shoes and a desire to bring
          top-quality, fashionable footwear to people everywhere. We started
          with a simple idea: to combine style, comfort, and affordability into
          every pair. Based in Ethiopia, we take pride in offering a curated
          selection that caters to the unique needs and preferences of our
          customers.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">Our Mission</p>
        <p className="mb-4">
          At ShegerLace, our mission is to provide more than just shoes; we
          strive to create a shopping experience where fashion meets function.
          We believe that shoes are more than an accessory—they’re a statement
          of who you are. That’s why we carefully design and select our products
          to ensure they meet the highest standards of comfort and
          craftsmanship, while keeping up with the latest trends.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">What We Offer</p>
        <p className="mb-4">
          From sleek sneakers to sophisticated formal shoes, we’ve got a pair
          for every step you take. Our collections are designed with both men
          and women in mind, offering a variety of sizes, colors, and styles to
          match any outfit. We also prioritize comfort, using high-quality
          materials that provide support and durability, so you can walk with
          confidence all day long.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">Why ShegerLace?</p>
        <div className="ms-4">
          <p className="mb-4 bi-star-fill">
            <span className="me-2"></span>
            Quality You Can Trust: We pay attention to every detail to ensure
            that our shoes are made to last.
          </p>
          <p className="mb-4 bi-star-fill">
            <span className="me-2"></span>
            Affordable Prices: Fashion shouldn’t break the bank. We offer
            competitive pricing without compromising on quality.
          </p>
          <p className="mb-4 bi-star-fill">
            <span className="me-2"></span>
            Customer-Centric Service: Our customers are at the heart of
            everything we do. Whether you’re shopping online or visiting us
            in-store, we’re here to provide you with a seamless experience from
            start to finish.
          </p>
        </div>

        <p className="mb-4 font-bold lg:text-2xl text-xl">
          Join the ShegerLace Family
        </p>
        <p className="mb-4">
          At ShegerLace, we believe in building a community of shoe lovers. We
          are constantly expanding our collection and looking for new ways to
          serve you better. Stay connected with us for exclusive updates, new
          arrivals, and special promotions.
        </p>
        <p className="mb-4">
          Thank you for choosing ShegerLace. We look forward to walking this
          journey with you—one stylish step at a time!
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default About;
