import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  user: icon('ic-user'),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'General',
    items: [
      {
        title: 'Create User',
        path: paths.dashboard.createUser,
        icon: ICONS.user,
      },
    ],
  },
];
