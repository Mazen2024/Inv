
// Method Tp Populate Products Table With random Data 

import { prisma } from "@/lib/prisma";

async function PopulateData() {

  // Random User ID
  // const demoUserId = 'f54a8141-ddb6-41db-bfbf-600e541dcb7c'
  const demoUserId = '7a51fb24-ae9a-48e5-8e21-9b712239732c'

  // Create Sample Data
  await prisma.products.createMany({
    data: Array.from({ length: 200 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 101}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5))
    })),
  });
}


PopulateData()
  .finally(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })