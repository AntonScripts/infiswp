function hoch() {
  const readline = require('readline');
  const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Welche Zahl wählst du?  ", (zahl) => {
    console.log(`Deine Zahl hoch deiner Zahl lautet:\n${zahl**zahl}`)
    rl.close();
  });
  
}

hoch();