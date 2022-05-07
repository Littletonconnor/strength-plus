import bcrypt from 'bcrypt';
import fixtures from './fixtures.mjs';
import prisma from './prisma.mjs';
import chalk from 'chalk';

async function seed(user) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        password: hashPassword,
      },
    });
    console.log(chalk.green.bold('-- Prisma seed successfully --'));
  } catch (error) {
    console.log(chalk.red.bold('Prisma seed fail. Error: ', error));
  }
}

async function main() {
  await seed(fixtures.user);
  const allUsers = await prisma.user.findMany();
  console.log(chalk.blue('Here are all users in DB:', allUsers));
}

main();
