import React from "react";
import ContactForm from "../Contact/ContactForm";
import NewHeader from "../Header/NewHeader";
import FooterSection from "../Footer/FooterSection";
// import ContactForm from "../Contact/ContactForm";

const ContactPage = () => {
  return (
    <div>
      {/* <ContactForm /> */}
      <NewHeader />
      <ContactForm />
      <FooterSection />
    </div>
  );
};

export default ContactPage;
