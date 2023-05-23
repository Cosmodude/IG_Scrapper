var pattern = /^\/[^/]+\/$/;
const a = "/jxhyox_/";
const b = '/anddudeabides/tagged/'
console.log(pattern.test(a));
console.log(pattern.test(b));

const ab = [1, 2, 3, 4, 5, 6];
const bc = [6, 9, 7, 4]

const c = bc.filter(i => ab.indexOf(i)>=0);
console.log(c);