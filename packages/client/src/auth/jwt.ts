export const getAuthToken = () => localStorage.getItem('ACCESS_TOKEN');

export const updateAuthToken = (token?: string) => {
  if (!token) {
    localStorage.removeItem('ACCESS_TOKEN');
  } else {
    localStorage.setItem('ACCESS_TOKEN', token);
  }
};
