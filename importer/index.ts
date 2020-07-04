import { importFromFiles } from './import';

importFromFiles(`${process.env.BUDGIT_SOURCE_PATH}`, './public/data/');
