import { CONFIG } from 'src/global-config';

import { ProgressView } from 'src/sections/_examples/mui/progress-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Progress | MUI - ${CONFIG.appName}` };

export default function Page() {
  return <ProgressView />;
}
