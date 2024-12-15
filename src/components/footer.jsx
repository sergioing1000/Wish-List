

import "./footer.css";

import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import X from "../assets/icons/x.svg";
import linkedIn from "../assets/icons/linkedIn.svg";



function footer() {

  return (
    <div className="footer_container">
      <ul>
        <li>
          <h3>Company</h3>
          <div className="Footer_List">
            <p>About Us</p>
            <p>Our Services</p>
            <p>Privacy Policy</p>
            <p>Privacy Policy</p>
          </div>
        </li>
        <li>
          <h3>Get Help</h3>
          <div className="Footer_List">
            <p>FAQ</p>
            <p>Shipping</p>
            <p>Returns</p>
            <p>Order Status</p>
            <p>Order Status</p>
            <p>Payments Options</p>
          </div>
        </li>
        <li>
          <h3>Online shop</h3>
          <div className="Footer_List">
            <p>Watch</p>
            <p>Bag</p>
            <p>Shoes</p>
            <p>Dress</p>
          </div>
        </li>
        <li>
          <h3>Follow Us</h3>
          <div>
            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <img src={linkedIn} alt="linkedIn" />
            <img src={X} alt="X" />
          </div>
        </li>
      </ul>
    </div>
  );
}
export default footer;
