import { CONFIG } from 'src/global-config';

import { KanbanView } from 'src/sections/kanban/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Kanban | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <KanbanView />;
}
