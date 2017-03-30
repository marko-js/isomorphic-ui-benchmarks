require('../init');

const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const benchmarks = require('../benchmarks');
const mkdirp = require('mkdirp');
const http = require('http');
const buildDir = path.join(__dirname, '../build');

var baseUrl;
var routes = [
    '/'
];

benchmarks.forEach((benchmark) => {
    var benchmarkName = benchmark.name;

    benchmark.benches.forEach((bench) => {
        var libName = bench.name;
        routes.push(`/${benchmarkName}/${libName}`);
        routes.push(`/benchmark/${benchmarkName}`);
    });
});


function buildRoute(routePath) {
    return new Promise((resolve, reject) => {
        var outputFile = path.join(buildDir, routePath, 'index.html');
        mkdirp.sync(path.dirname(outputFile));

        var url = `${baseUrl}${routePath}`;

        console.log(`Building page "${outputFile}"...`);
        console.log(`URL:`, url);

        http.get(url, (res) => {
            const statusCode = res.statusCode;

            console.log('Status code:', statusCode);

            if (statusCode !== 200) {
                return reject(new Error(`Request Failed. Status Code: ${statusCode}`));
            }

            res.pipe(fs.createWriteStream(outputFile))
                .on('error', reject)
                .on('finish', resolve);
        });
    });
}

var buildPromise = require('../server')
    .then((port) => {
        baseUrl = 'http://localhost:' + port;
    })
    .then(() => {
        var buildRoutesPromise = Promise.resolve();
        routes.forEach((routePath) => {
            buildRoutesPromise = buildRoutesPromise.then(() => {
                return buildRoute(routePath);
            });
        });

        return buildRoutesPromise;
    })
    .then(() => {
        exec(`cp -R ${__dirname + '/../static'} ${buildDir + '/'}`);
    })
    .then(() => {
        console.log('Build complete!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Build failed!', err);
        process.exit(1);
    });


//
// require('./project').build().then((buildResult) => {
//   // create publish directory
//   exec(`mkdir ${publishDir}`);
//
//   // clone the repo that is the publish target
//   exec(`cd ${publishDir} && git init && git remote add origin ${gitUrl} && git fetch`);
//
//   // switch to the target branch
//   try {
//     exec(`cd ${publishDir} && git checkout -t origin/${gitBranch}`);
//   } catch(e) {
//     exec(`cd ${publishDir} && git checkout -b ${gitBranch}`);
//   }
//
//   // steal the .git directory
//   exec(`mv ${publishDir+'/.git'} ${buildDir}`);
//   exec(`rm -rf ${publishDir}`);
//
//   // commit and push up the changes
//   try {
//     exec(`cd ${buildDir} && git add . --all && git commit -m "updated static site"`);
//     exec(`cd ${buildDir} && git push origin ${gitBranch}`);
//     console.log('Static site successfully built and pushed to remote repository.');
//   } catch(e) {
//     if(e.cmd && e.cmd.indexOf('git commit')) {
//       console.log('Static site successfully built. No changes to push.');
//     }
//   }
// });