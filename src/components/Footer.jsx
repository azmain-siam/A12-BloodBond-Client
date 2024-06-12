import logo from "/logo.png";

const Footer = () => {
  return (
    <footer>
      <footer className="footer p-10 py-16 bg-[#111827] text-[#D1D5DB]">
        <aside className="flex items-center">
          <img className="w-20" src={logo} alt="" />
          <div>
            <h3 className="text-2xl font-semibold">BloodBond</h3>
            <p className="text-lg font-light text-gray-400">
              Bonding Lives Through Blood
            </p>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Donate Blood</h6>
          <a className="link link-hover">How to Donate</a>
          <a className="link link-hover">Find a Donation Center</a>
          <a className="link link-hover">Eligibility Requirements</a>
        </nav>
        <nav>
          <h6 className="footer-title">Get Involved</h6>
          <a className="link link-hover">Volunteer Opportunities</a>
          <a className="link link-hover">Fundraising Events</a>
          <a className="link link-hover">Partnerships</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Cookie Policy</a>
        </nav>
      </footer>
      <hr className="border-gray-600"/>
      <div className="py-4 bg-[#111827] text-sm text-[#D1D5DB] text-center">
        <p>Copyright © 2024 - All right reserved by BloodBond</p>
      </div>
    </footer>
  );
};

export default Footer;
