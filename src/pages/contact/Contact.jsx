import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_7xyhwen",
        form.current,
        "user_hKs2aRfLoozcqA28UpUyz"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2 className="text-4xl mb-3 font-bold ml-5">Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn border border-slate-400 shadow-2xl hover:bg-slate-400 hover:text-white">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3 className="text-3xl mb-3">Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt size={15}/>
                  <p>+91 9676 765 875</p>
                </span>
                <span>
                  <FaEnvelope size={15}/>
                  <p>Support@smartbuy.com</p>
                </span>
                <span>
                  <GoLocation size={17}/>
                  <p>SmartBuy, India</p>
                </span>
                <span>
                  <FaTwitter size={15} />
                  <p>@SmartBuy</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
