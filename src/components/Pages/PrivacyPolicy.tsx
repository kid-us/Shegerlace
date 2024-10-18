import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const PrivacyPolicy = () => {
  // Title
  const [title] = useState("Privacy Policy");
  useDocumentTitle(title);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto lg:px-0 px-3 lg:mt-10 mt-6">
        <p className="mb-4 font-bold lg:text-2xl text-xl">Privacy Policy</p>
        <p className="mb-4">
          At ShegerLace, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and protect your personal
          information when you interact with our website, mobile app, and
          services. By using our services, you agree to the collection and use
          of information in accordance with this policy.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">
          Information We Collect
        </p>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          shipping address, phone number, and payment details when you make a
          purchase, sign up for our newsletter, or contact our customer service.
          We also gather non-personal information like your browser type,
          device, and browsing patterns to improve your experience.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">
          How We Use Your Information
        </p>
        <p className="mb-4">
          Your personal information is used to process orders, provide customer
          support, and send updates about new products, promotions, or changes
          to our policies. We may also use it to personalize your shopping
          experience and to analyze website traffic for continuous improvement.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">
          Protecting Your Data
        </p>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of
          your personal information. All sensitive data, including payment
          information, is encrypted using industry-standard practices to protect
          against unauthorized access.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">
          Third-Party Services
        </p>
        <p className="mb-4">
          We may share your information with trusted third-party service
          providers for payment processing, order fulfillment, and marketing
          efforts, but only to the extent necessary to perform these services.
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties without your consent, except as required by law.
        </p>

        <p className="mb-4 font-bold lg:text-2xl text-xl">Your Rights</p>
        <p className="mb-4">
          You have the right to access, update, or delete your personal
          information at any time. If you wish to make changes or have any
          concerns about how your information is being used, please contact us
          at support@shegerlace.com.
        </p>
        <p className="mb-4">
          By continuing to use our services, you consent to our Privacy Policy.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
