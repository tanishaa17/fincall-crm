import { CONFIG } from 'src/global-config';

import { PermissionDeniedView } from 'src/sections/permission/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Permission | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PermissionDeniedView />;
}
