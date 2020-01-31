const path = require('path');

const execDir = process.cwd();

const resolvePath = (relativePath = '') => path.resolve(execDir, relativePath);

const dirs = {};
dirs.root = resolvePath();
dirs.src = resolvePath('src');
dirs.tsconfig = resolvePath('./tsconfig.json');
dirs.tsDevConfig = resolvePath('./tsconfig.dev.json');
dirs.tsProdConfig = resolvePath('./tsconfig.prod.json');
dirs.core = resolvePath('src/core');
dirs.theme = resolvePath('src/theme');
dirs.app = resolvePath('src/app');
dirs.dotEnvDev = resolvePath('./configs/.env.development');
dirs.dotEnvProd = resolvePath('./configs/.env.production');
dirs.indexTemplate = resolvePath(`${dirs.src}/index.ejs`);
dirs.entry = resolvePath(`${dirs.src}/index.tsx`);
dirs.assets = resolvePath('assets');
dirs.dist = resolvePath('dist');
dirs.public = resolvePath('/');

module.exports = dirs;
module.exports.filesExtensions = ['.jsx', '.js', '.ts', '.tsx', '.json'];
