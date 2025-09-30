import { CONFIG } from 'src/global-config';

import { StepperView } from 'src/sections/_examples/mui/stepper-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Stepper | MUI - ${CONFIG.appName}` };

export default function Page() {
  return <StepperView />;
}
