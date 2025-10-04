import { CONFIG } from 'src/global-config';

import JwtLoginView from 'src/auth/view/jwt/jwt-login-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <JwtLoginView />;
}
