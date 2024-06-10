import PropTypes from "prop-types";
import { useState } from "react";

const roles = ["admin", "donor", "volunteer"];

const UserUpdateModal = ({ user }) => {
  // const [selected, setSelected] = useState(user.role);
  console.log(user);

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3>{user.name}</h3>
        <select
          defaultValue={user.role}
          // onChange={handleSelectChange}
          className="select capitalize select-bordered w-full max-w-xs"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <div className="mt-6 modal-action flex justify-center">
          <form method="dialog">
            <button className="btn btn-success">Update Role</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

UserUpdateModal.propTypes = {
  // user: PropTypes.object,
  // modalHandler: PropTypes.func,
  // setIsOpen: PropTypes.func,
  // isOpen: PropTypes.bool,
};

export default UserUpdateModal;
