import shell from 'shelljs';

const buildFolder = './dist/';
const folders = new Set(['./src/assets']);

folders.forEach((folder) => {
  shell.cp('-R', folder, buildFolder);
});
