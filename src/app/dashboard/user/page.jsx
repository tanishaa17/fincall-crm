import { CONFIG } from 'src/global-config';

import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `User profile | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <UserProfileView />;
}
