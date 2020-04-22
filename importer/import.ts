// eslint-disable-next-line
const fs = require('fs');

export const importFiles = (
  sourceFolder: string,
  destinationFolder: string,
): void => {
  console.log('# Lauching importer...');
  console.log('sourceFolder:', sourceFolder);

  const filesNames: string[] = fs
    .readdirSync(sourceFolder)
    .filter((file: string) => file.endsWith('.csv'));

  console.log('files:', filesNames.length);

  filesNames.forEach(filename => {
    fs.readFileSync(`${sourceFolder}/${filename}`, 'utf8');
  });

  fs.writeFileSync(`${destinationFolder}/boards.json`, '');
};
