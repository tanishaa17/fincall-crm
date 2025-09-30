import { CONFIG } from 'src/global-config';

import { Auth0SignInView } from 'src/auth/view/auth0';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Auth0 - ${CONFIG.appName}` };

export default function Page() {
  return <Auth0SignInView />;
}
