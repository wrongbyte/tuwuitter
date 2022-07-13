import ModalLayout from '../ModalLayout';
import { useState } from 'react';
import SetPasswordModal from './SetPasswordModal';

//TODO: check days and months to see if 31 days is valid for the given month
export default function BasicInfoModal() {
  const [userHasBasicInfo, setUserBasicInfo] = useState(false);

  const days = Array.from(Array(32).keys()).slice(1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(Array(currentYear).keys()).slice(1930).reverse();

  return userHasBasicInfo ? (
    <SetPasswordModal />
  ) : (
    <ModalLayout>
      <p className="step-modal">Step 1 of 2 </p>
      <p className="create-account">Create your account</p>
      <form>
        <input
          type="search"
          className="login-input-register"
          placeholder="Name"
        />
      </form>
      <form>
        <input
          type="search"
          className="login-input-register"
          placeholder="Phone"
        />
      </form>
      <p className="use-email">Use email instead</p>
      <p className="date-birth font-bold">Date of birth</p>
      <p className="date-birth-additionals">
        This will not be shown publicly. Confirm your own age, even if this
        account is for a business, a pet, or something else.
      </p>
      <div className="birth-dropdowns-div">
        <form>
          <select className="birth-dropdown">
            <option value="nullMonth"> </option>
            {months.map((month, index) => {
              return (
                <option key={`month${index}`} value={month}>
                  {month}
                </option>
              );
            })}
          </select>
        </form>
        <form>
          <select className="birth-dropdown">
            <option value="nullDay"> </option>
            {days.map((day, index) => {
              return (
                <option key={`day${index}`} value={day}>
                  {day}
                </option>
              );
            })}
          </select>
        </form>

        <form>
          <select className="birth-dropdown">
            <option value="nullMonth"> </option>
            {years.map((year, index) => {
              return (
                <option key={`year${index}`} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      {/* THIS IS A TEST */}
      <button
        className="next-button-step1 font-bold"
        onClick={() => setUserBasicInfo(true)}
      >
        Next
      </button>
    </ModalLayout>
  );
}
