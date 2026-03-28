const { execSync } = require('child_process');
const os = require('os');
const home = os.homedir();
const dest = home + '/whatsapp-simulator-source.zip';
execSync(
  `powershell -Command "Compress-Archive -Path src,public,index.html,package.json,vite.config.js,Logo.png -DestinationPath '${dest}' -Force"`,
  { cwd: 'C:/Users/lenovo/anti- 2st - sum', stdio: 'inherit' }
);
console.log('ZIP created at:', dest);
