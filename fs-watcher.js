const watch = require('node-watch');
const shell = require('shelljs');
watch('./src', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
//   shell.exec('build.sh')
});