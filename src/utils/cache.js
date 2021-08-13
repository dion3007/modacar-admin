export const customerDataSet = (c) => {
  localStorage.setItem('customer', JSON.stringify(c));
};

export const customerDataGet = () => {
  const getData = localStorage.getItem('customer');
  return JSON.parse(getData);
};

export const userDataSet = (u) => {
  localStorage.setItem('user', JSON.stringify(u));
};

export const userDataGet = () => {
  const getData = localStorage.getItem('user');
  return JSON.parse(getData);
};
