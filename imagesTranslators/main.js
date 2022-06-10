const { Image } = require('./image.js');
const fs = require('fs');

const main = () => {
  // const image = new Image('./ravana.jpeg');
  const image = new Image('./Mountain.jpeg');
  const data = image.blur();
  fs.writeFileSync('./blurredMountain.jpeg', data);
};

main();