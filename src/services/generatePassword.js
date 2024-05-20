import { useState } from "react";

const generateRandomPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let charSet = "";
  let generatedPassword = "";

  const generatePassword = (checkboxes, length) => {
    const selectedCheckboxes = checkboxes.filter(
      (checkbox) => checkbox.checked
    );
    if (selectedCheckboxes.length === 0) {
      setError("Please select at least one option.");
      setPassword("");
      return;
    }
    selectedCheckboxes.forEach((checkbox) => {
      switch (checkbox.title) {
        case "Include Uppercase Letters.":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters.":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers.":
          charSet += "0123456789";
          break;
        case "Include Symbols.":
          charSet += "!@#$%^&*()";
          break;
      }
    });
    for (let i = 0; i < length; i++) {
      const randomIndexes = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndexes];
    }
    setPassword(generatedPassword);
    setError("");
  };

  return { password, error, generatePassword };
};

export default generateRandomPassword;
