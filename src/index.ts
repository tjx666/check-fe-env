import path from 'path';
import fs from 'fs/promises';
import { bgRed, blue, bold, dim, green, yellow } from 'picocolors';
import terminalLink from 'terminal-link';

import { pathExists } from './utils';

function link(title: string, url: `http${string}`) {
    return blue(terminalLink(title, url));
}

function exit(message: string | string[], code = 1) {
    const messages = Array.isArray(message) ? message : [message];
    for (const line of messages) {
        console.log(`${bgRed(bold(' ERROR '))} ${line}`);
    }
    process.exit(code);
}

async function checkNodeVersion() {
    const nvmrcPath = path.resolve(process.cwd(), '.nvmrc');
    if (!(await pathExists(nvmrcPath))) {
        exit(
            `please add .nvmrc file to specify the nodejs version, try: ${dim(
                'node --version > ./.nvmrc',
            )}`,
        );
    }

    const currentNodeVersion = process.version;
    const requiredNodeVersion = (await fs.readFile(nvmrcPath, 'utf8')).trim();
    const versionRegexp = /v\d{1,2}\.\d{1,2}\.\d{1,2}/;
    if (!versionRegexp.test(requiredNodeVersion)) {
        exit(
            `the format of version in .nvmrc is incorrect: ${requiredNodeVersion}, must match ${versionRegexp.source}`,
        );
    }

    if (currentNodeVersion !== requiredNodeVersion) {
        const coloredRequiredVersion = green(requiredNodeVersion);
        exit([
            `current node ${green(
                currentNodeVersion,
            )} isn't the same as required ${coloredRequiredVersion} in .nvmrc`,
            `recommend use ${link('fnm', 'https://github.com/Schniz/fnm')} or ${link(
                'nvm',
                'https://github.com/nvm-sh/nvm',
            )} to manage node version`,
        ]);
    }
}

async function checkPm() {
    const corepack = link('corepack', 'https://nodejs.org/api/corepack.html');

    const pm = process.env.npm_config_user_agent!.split(' ')[0];
    const separatorPosition = pm.lastIndexOf('/');
    const currentPmName = pm.slice(0, Math.max(0, separatorPosition));
    const currentPmVersion = pm.slice(separatorPosition + 1);

    const pkg = JSON.parse(await fs.readFile(path.resolve(process.cwd(), 'package.json'), 'utf8'));
    if (pkg.packageManager === undefined) {
        exit([
            `please specify "${yellow('packageManager')}" field in package.json`,
            `${corepack} will use that to switch correspond package manager and version`,
        ]);
    }

    const [requiredPm, requiredPmVersion] = pkg.packageManager.split('@');
    const isPmMatch = currentPmName === requiredPm && currentPmVersion === requiredPmVersion;
    if (!isPmMatch) {
        exit([
            `current package manager ${green(
                `${currentPmName}@${currentPmVersion}`,
            )} is not the same as required ${green(`${requiredPm}@${requiredPmVersion}`)}`,
            `please enable the ${corepack} by run command: ${dim('corepack enable')}`,
        ]);
    }
}

async function main() {
    await checkNodeVersion();
    await checkPm();
}

main();
