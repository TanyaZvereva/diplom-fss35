export function fetchSignIn(login, password = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: {login: "root", token: 3123123123} }), 500)
  );
}


export function fetchSignUp(login, password = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: {login: "root"} }), 500)
  );
}
