/* eslint-disable react/no-unescaped-entities */
import {
  FaCalendarAlt,
  FaHistory,
  FaInfoCircle,
  FaLock,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

const Feature = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            See how BloodBond works for you
          </h2>
          <p className="text-gray-500 sm:text-xl">
            Explore the ways we support your blood donation journey. From easy
            scheduling to real-time updates, we ensure a seamless experience for
            both donors and recipients.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-red-100 lg:h-12 lg:w-12">
              <FaCalendarAlt className="text-red-500" size={19} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Effortless Scheduling</h3>
            <p className="text-gray-500">
              Schedule your blood donation appointments with ease using our
              intuitive platform. Select convenient times and locations that fit
              your busy schedule.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-red-100 lg:h-12 lg:w-12">
              <FaHistory className="text-red-500" size={19} />
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Donation History Tracking
            </h3>
            <p className="text-gray-500">
              Keep a detailed record of your blood donations. Monitor your past
              donations, see the impact you've made, and celebrate your
              milestones.
            </p>
          </div>

          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-red-100 lg:h-12 lg:w-12">
              <FaUsers className="text-red-500" size={21} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Community Engagement</h3>
            <p className="text-gray-500">
              Connect with other donors and recipients in our community. Share
              your experiences, offer support, and participate in events to
              foster a supportive network.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-red-100 lg:h-12 lg:w-12">
              <FaInfoCircle className="text-red-500" size={20} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Access to Resources</h3>
            <p className="text-gray-500">
              Gain access to valuable resources and information about blood
              donation. From eligibility guidelines to health tips, we provide
              everything you need for a safe and successful donation experience.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-red-100 lg:h-12 lg:w-12">
              <FaTasks className="text-red-500" size={19} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Easy Donation Management</h3>
            <p className="text-gray-500">
              Manage your blood donations effortlessly. Our platform allows you
              to keep track of your appointments, update your information, and
              manage your donation history with ease.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-red-100 lg:h-12 lg:w-12">
              <FaLock className="text-red-500" size={18} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Secure Data Handling</h3>
            <p className="text-gray-500">
              Your personal information and donation history are protected with
              our robust security measures. We prioritize your privacy and
              ensure your data is handled with the utmost care and
              confidentiality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
