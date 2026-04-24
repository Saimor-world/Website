const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

async function main() {
  const prisma = new PrismaClient();
  const email = 'nextchaptergermany@gmail.com';
  const rawPassword = 'testpassword123';
  
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(rawPassword, salt, 1000, 64, 'sha512').toString('hex');
  const storedPassword = `${salt}:${hash}`;

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    let user;
    if (existingUser) {
      user = await prisma.user.update({
        where: { email },
        data: {
          password: storedPassword,
          role: 'owner'
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name: 'Mora Owner',
          password: storedPassword,
          role: 'owner'
        }
      });
    }

    console.log(`User ${email} registered successfully with role ${user.role}`);
  } catch (error) {
    console.error('Error registering user:', error);
    console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_')));
  } finally {
    await prisma.$disconnect();
  }
}

main();
