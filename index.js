const fs = require('fs');
const fileName = 'vteam_data.txt';

async function writeToFile() {
  try {
    await fs.promises.appendFile(fileName, 'Hello Squad!\n');
    console.log('Wrote to file successfully.');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

async function readFile() {
  try {
    const data = await fs.promises.readFile(fileName, 'utf8');
    console.log('File contents:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

async function main() {
  try {
    // Check if directory is writable
    await fs.promises.access(process.cwd(), fs.constants.W_OK);
    await writeToFile();
    await readFile();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();