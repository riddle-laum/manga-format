const fs = require('fs');

fs.readdirSync('build-cjs').forEach((name)=>{
  if(/.+\.m(t|j)s$/.test(name))
    fs.renameSync(`build-cjs/${ name }`, `build-cjs/${ name.replace(/\.mts$/, '.cts').replace(/\.mjs$/, '.cjs') }`);
});
