import Helmet from "react-helmet";
import Banner from "../components/Banner";
import Feature from "../components/Feature";
import ContactUs from "../components/ContactUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | BloodBond</title>
      </Helmet>
      <Banner />
      <Feature />
      <ContactUs />
    </div>
  );
};
export default Home;
