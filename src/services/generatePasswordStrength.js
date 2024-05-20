const generatePasswordStrength = (length) => {
  if (length <= 6) return { text: "Weak", className: "weak" };
  if (length <= 12) return { text: "Medium", className: "medium" };
  return { text: "Strong", className: "strong" };
};

export default generatePasswordStrength;
