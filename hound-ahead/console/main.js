'use strict'

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const engine = require(path.resolve(__dirname, '../src/search'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const e = engine.indexEngine({
    token: /[ `'"$!=><{}?,.:;/|\[\]\(\)\\]/,
});

const addEntries = () => {
  const args = process.argv.slice(2);

  if (!args || !args.length) {
    addExampleEntries();
    return;
  }

  let dictLoc = args[0];
  if (!dictLoc) {
    addExampleEntries();
    return;
  }

  if (!fs.existsSync(dictLoc)) {
    dictLoc = path.resolve(__dirname, dictLoc);
    
    if (!fs.existsSync(dictLoc)) {
      console.error(`The dictionary file at: ${dictLoc} does not exist ... using example entries instead ...`);
      addExampleEntries();
      return;
    }
  }

  let count = 0;
  fs.readFileSync(dictLoc)
    .toString()
    .split(/(?:\r\n|\r|\n)/g)
    .forEach(line => {
      if (!line) {
        return;
      }

      e.add(line);
      count++
    });

  console.log(`[success] ${count} entries have been added\n`);

  console.log(e._debug());
};

const addExampleEntries = () => {
  e.add('what about the apple?');
  e.add('how that be an application, in the constitution');
  e.add('the before and after blocks only apply to the tests within that describe block.');
};

const prompt = () => {
  rl.question('Phrase to search (type "exit()" or Ctrl-c to leave): \n', (answer) => {
    if (answer === 'exit()') {
      rl.close();
      return;
    }

    console.log('\n========\noutput: \n', e.find(answer), '\n========\n');

    prompt();
  });
};

addEntries();
prompt();
