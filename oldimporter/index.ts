import { importFromFiles } from './import';

importFromFiles(
  `${process.env.BUDGIT_IMPORT_PATH}`,
  `${process.env.BUDGIT_CONFIG_FILE}`,
  './public/api',
);
