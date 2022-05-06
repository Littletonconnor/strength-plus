import prisma from './prisma.mjs';
import chalk from 'chalk';

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(chalk.cyanBright.bold('-- Prisma method successfully ran --'));
  console.log(allUsers);
}

main();
