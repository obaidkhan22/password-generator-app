import React, { useState } from "react";
import generateRandomPassword from "../services/generatePassword";
import generatePasswordStrength from "../services/generatePasswordStrength";

const PasswordGenerator = () => {
  const [checkboxes, setCheckboxes] = useState([
    { title: "Include Uppercase Letters.", checked: false },
    { title: "Include Lowercase Letters.", checked: false },
    { title: "Include Numbers.", checked: false },
    { title: "Include Symbols.", checked: false },
  ]);
  const [copy, setCopy] = useState(false);
  const [length, setLength] = useState(4);
  const { password, error, generatePassword } = generateRandomPassword();
  const { text, className } = generatePasswordStrength(length);
  const handleCheckboxClick = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };
  return (
    <>
      <h1>Generate Random Passwords Easily</h1>
      <div className="password-generator">
        {/* generated password section */}
        {password && (
          <div className="password">
            <h2>{password}</h2>
            <button className="copy-btn" onClick={handleCopy}>
              {copy ? "copied" : "copy"}
            </button>
          </div>
        )}

        {/* character length section */}

        <div>
          <div className="char-length">
            <label htmlFor="length">Character Length</label>
            <span>{length}</span>
          </div>
          <input
            type="range"
            id="length"
            value={length}
            min={4}
            max={20}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        {/* checkboxes' section */}
        <div className="checkboxes">
          {checkboxes.map((checkbox, index) => (
            <div className="checkbox" key={index}>
              <input
                onChange={() => handleCheckboxClick(index)}
                type="checkbox"
                id={checkbox.title}
                checked={checkbox.checked}
              />
              <label htmlFor={checkbox.title}>{checkbox.title}</label>
            </div>
          ))}
        </div>
        <div className="password-strength">
          <p>Strength</p>
          <p className={className}>{text}</p>
        </div>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        <button
          className="generate-btn"
          onClick={() => generatePassword(checkboxes, length)}
        >
          generate password
        </button>
      </div>
    </>
  );
};

export default PasswordGenerator;
