import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  /*
  await prisma.user.create({
    data: {
      name: 'csy',
      email: 'csy@csy.com',
    },
  })
  */
  await prisma.user.update({
    where: { id: 1 },
    data: { name: 'sky-csy' },
  })

  const users = await prisma.user.findMany()
  console.dir(users, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
