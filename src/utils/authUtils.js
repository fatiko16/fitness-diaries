export function invalidReasonSignUp(
  email,
  password,
  passwordConfirmation,
  username
) {
  if (email === "") {
    return "Email cannot be empty";
  } else if (password === "") {
    return "Password cannot be empty";
  } else if (password !== passwordConfirmation) {
    return "Password and password confirmation do not match.";
  } else if (username === "") {
    return "Username cannot be empty";
  }

  return "";
}

export function invalidReasonLogIn(email, password) {
  if (email === "") {
    return "Email cannot be empty";
  } else if (password === "") {
    return "Password cannot be empty";
  }

  return "";
}
