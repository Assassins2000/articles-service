'use strict';

const fs = require('fs');

const file1 = path.join('file1.txt');
const file2 = path.join('file2.txt');
const file3 = path.join('file3.txt');

const writeStream = fs.createWriteStream(file3);

const readStream1 = fs.createReadStream(file1, {end: false});
readStream1.pipe(writeStream);

readStream1.on('end', () => {
    const readStream2 = fs.createReadStream(file2);
    readStream2.pipe(writeStream);
});

writeStream.on('finish', () => console.log('Операция завершена'));

///////////////////////////////

const list = ['Magpie','Parrot','Gull','Crow'];

const result = list.filter(bird => /(.)\1/.test(bird)); 

//////////////////////////////////////////

const tree = [1,[2,4],[3,5,6]];

[1,[2,4],[3,5,6]]
.reduce(function fl({l=0, v=[]}, b, i) {
  function put(k){null == v[k] ? v[k] = [b] : v[k].push(b)}
  !i ? put(l) : Array.isArray(b) ? b.reduce(fl, {l:l+1, v}) : put(l+1);
  return {l, v};
}, {}).v.forEach(e => (console.log(e+''),e))