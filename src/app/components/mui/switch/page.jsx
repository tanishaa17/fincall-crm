import { CONFIG } from 'src/global-config';

import { SwitchView } from 'src/sections/_examples/mui/switch-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Switch | MUI - ${CONFIG.appName}` };

export default function Page() {
  return <SwitchView />;
}
