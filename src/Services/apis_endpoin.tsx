// api_endpoints.ts

export const baseUrl = 'https://alumni-backend-l27c.onrender.com';

export const userEndpoints = {
  signup: '/api/user/signup',
  login: '/api/user/login',
  getAllUsers: '/api/user/getalluser',
  updateUser: '/api/user/updateuser',
  promoteAdmin: '/api/user/promoteAdmin',
  demoteAdmin: '/api/user/demoteAdmin',
  resetPassword: '/api/user/reset',
  userProfile: '/api/user/profile'
  
};

export const eventEndpoints = {
  getAllEvents: '/api/event',
  getEvent: (id: any) => `/api/event/${id}`,
  createEvent: '/api/event',
  updateEvent: (id: any) => `/api/event/${id}`,
  deleteEvent: (id: any) => `/api/event/${id}`,
};

export const savingEndpoints = {
  getAllSavings: '/api/saving',
  getSaving: (id: any) => `/api/saving/${id}`,
  createSaving: '/api/saving',
  updateSaving: (id: any) => `/api/saving/${id}`,
  deleteSaving: (id: any) => `/api/saving/${id}`,
};

export const loanEndpoints = {
  getAllLoans: '/api/loan',
  getLoan: (id: any) => `/api/loan/${id}`,
  createLoan: '/api/loan',
  updateLoan: (id: any) => `/api/loan/${id}`,
  deleteLoan: (id: any) => `/api/loan/${id}`,
};

export const newsEndpoints = {
  getAllNews: '/api/news',
  getNews: (id: any) => `/api/news/${id}`,
  createNews: '/api/news',
  updateNews: (id: any) => `/api/news/${id}`,
  deleteNews: (id: any) => `/api/news/${id}`,
};
