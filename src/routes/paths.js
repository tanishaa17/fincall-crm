// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------


export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  auth: {
    login: `${ROOTS.AUTH}/login`,
    signup: `${ROOTS.AUTH}/signup`,
  },
  dashboard: {
    admin: `${ROOTS.DASHBOARD}/admin`,
    employee: `${ROOTS.DASHBOARD}/employee`,
  },
};
