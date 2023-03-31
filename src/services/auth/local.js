export const signUp = async (email, password) => {
  const usersStr = await localStorage.getItem('users');
  const users = JSON.parse(usersStr) || [];
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const userId = Date.now();

  await localStorage.setItem(
    'users',
    JSON.stringify(users.concat({ id: userId, email, password })) // Need hash?
  );

  return { email, password, id: userId };
}

export const login = async (email, password) => {
  const usersStr = await localStorage.getItem('users');
  const users = JSON.parse(usersStr) || [];
  const existingUser = users.find((user) => (
    user.email === email && user.password === password)
  );

  if (!existingUser) {
    throw new Error('Email or password miss match');
  }

  await localStorage.setItem(
    'currentUser',
    JSON.stringify(existingUser)
  );

  return existingUser;
}

export const getCurrentUser = async () => {
  return await localStorage.getItem('currentUser');
}

const localAuthService = {
  login,
  signUp,
  getCurrentUser
}

export default localAuthService;
