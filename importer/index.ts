import Importer from './importer';
import ConsumerLogger from './consumer/logger';
import ConnectorCsvBpce from './connector/csv/bpce';
import ConsumerAccountSaver from './consumer/accountSaver';

const init = async () => {
  const importPath = `${process.env.BUDGIT_IMPORT_PATH}`;
  const destinationPath = './public/api/';
  console.log('### LAUNCHING IMPORTER');
  console.log('');
  console.log(`- BUDGIT_IMPORT_PATH: ${importPath}`);
  console.log(`- DESTINATION: ${destinationPath}`);

  const bpceConnector = new ConnectorCsvBpce(importPath);
  const logger = new ConsumerLogger();
  const accountSaver = new ConsumerAccountSaver(destinationPath);

  const importer = new Importer([bpceConnector], [logger, accountSaver]);

  await importer.execute();

  console.log('### ENDING IMPORTER');
};

init();
