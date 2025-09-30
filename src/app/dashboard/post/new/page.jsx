import { CONFIG } from 'src/global-config';

import { PostCreateView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new post | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PostCreateView />;
}
