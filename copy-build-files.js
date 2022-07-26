var ncp = require('ncp').ncp;

ncp.limit = 16;

var srcPath = 'PKHOOD_UNITY/Build/Build'
var destPath = 'public/unity'

console.log('Copying unity build files...');
ncp(srcPath, destPath, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Copying unity build files complete.');
});