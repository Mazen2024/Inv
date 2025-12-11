import SideBar from '@/Components/SideBar'
import { getCurrentUser } from '@/lib/Auth';
import { TrendingUp } from 'lucide-react';
import ProductsChart from '@/Components/ProductsChart';
import { prisma } from '@/lib/prisma';

const page = async () => {

  // get Current User info
  const user = await getCurrentUser();

  const userId = user.id;

  // Calculate Total Products With The Same Signed user ID
  const totalProducts = await prisma.products.count({ where: { userId } });

  // Calculate Low Stock & Qantity <= 5
  const lowStock = await prisma.products.count({
    where: {
      userId,
      lowStockAt: { not: null },
      quantity: { lte: 5 }
    }
  })

  /// Get All Products Based On Signed User ID , Showing 3 Fields [Price, Quantity, Created Date]
  const allProducts = await prisma.products.findMany({
    where: { userId },
    select: { name: true, price: true, quantity: true, createdAt: true }
  })

  /// Calculate & Filter Arrays For In, Low & Out Of Stock => Percentage Also

  const inStock = await allProducts.filter(item => Number(item.quantity) > 5)

  const lowOfStock = await allProducts.filter(item => Number(item.quantity) <= 5 && Number(item.quantity) > 0)

  const outOfStock = await allProducts.filter(item => Number(item.quantity) === 0)

  const inStockPercentage = totalProducts > 0 ? Math.round((inStock.length / totalProducts) * 100) : 0

  const lowOfStockPercentage = totalProducts > 0 ? Math.round((lowOfStock.length / totalProducts) * 100) : 0

  const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStock.length / totalProducts) * 100) : 0

  /// Calculate Total Values => Price * Quantity 
  const totalValues = allProducts.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)

  const now = new Date();
  const weeklyProductsData = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7)
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    weekEnd.setHours(23, 59, 59, 999);

    // X Axis
    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, '0')}/${String(weekStart.getDate() + 1).padStart(2, '0')}`

    // console.log(weekLabel);

    // Filter With CreateDate In Range Of Every Week

    let weekProducts = allProducts.filter(item => {
      const productWeekDate = new Date(item.createdAt)
      return productWeekDate >= weekStart && productWeekDate <= weekEnd
    })

    // Fill Array With Filtered Data Lenght & Week Label
    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length
    })
  }

  // Fetch recent Products 
  const recentProducts = await prisma.products.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  return (
    <div className='min-h-screen bg-gray-50'>
      <SideBar cPath={'/dashboard'} />
      <main className='ml-64 p-8'>

        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
              <p className='mt-3 text-sm text-gray-500 capitalize'>
                welcome back! here is an overview of your inventory
              </p>
            </div>
          </div>
        </div>


        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>

          {/* Key Metrics */}
          <div className='rounded-lg bg-white border border-gray-200 p-6'>
            <h2 className='font-semibold text-center text-2xl text-gray-900 mb-10'>Key Metrics</h2>

            <div className='grid grid-cols-3 gap-6'>

              <div className='text-center'>
                <div className='text-3xl font-bold text-gray-900'>{totalProducts}</div>
                <div className='capitalize text-sm text-gray-600 my-2'>total Products</div>
                <div className='flex items-center justify-center mt-3 gap-2'>
                  <span className='text-xs text-green-600'>+ {totalProducts}</span>
                  <TrendingUp className='w-3 h-3 text-green-600 ml-1' />
                </div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-gray-900'>{Number(totalValues).toFixed(0)}</div>
                <div className='capitalize text-sm text-gray-600 my-2'>total values</div>
                <div className='flex items-center justify-center mt-3 gap-2'>
                  <span className='text-xs text-green-600'>+ {Number(totalValues).toFixed(0)}</span>
                  <TrendingUp className='w-3 h-3 text-green-600 ml-1' />
                </div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-gray-900'>{lowStock}</div>
                <div className='capitalize text-sm text-gray-600 my-2'>low Stock</div>
                <div className='flex items-center justify-center mt-3 gap-2'>
                  <span className='text-xs text-green-600'>+ {lowStock}</span>
                  <TrendingUp className='w-3 h-3 text-green-600 ml-1' />
                </div>
              </div>

            </div>

          </div>

          {/* Inventory Over Time */}

          <div className='rounded-lg bg-white border border-gray-200 p-6 font-semibold'>
            <h2 className='text-lg font-semibold mx-auto text-center mb-6'>New Products Per Week</h2>
            <div className='h-48'>
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>

        </div>

        {/* Stock Level  */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          <div className='bg-white rounded-lg p-6 border border-gray-200'>
            <h2 className='capitalize text-center text-lg font-semibold'>stock levels</h2>
            <p className='mt-6 font-semibold text-orange-500'>Green = High Stock || Yellow = Low Stock || Red = Out Of Stock</p>
            <div className='space-y-3 p-4 mt-3'>
              {
                recentProducts.map((item, index) => {
                  const stockLevel = item.quantity === 0 ? 0 : item.quantity <= (item.lowStockAt || 5) ? 1 : 2

                  const bgColors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500']
                  const textColors = ['text-red-500', 'text-yellow-500', 'text-green-500']

                  return <div key={index} className='flex items-center justify-between bg-gray-50 space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}></div>
                      <span className='text-lg text-gray-900'>{item.name}</span>
                    </div>
                    <div className={`text-xs font-bold ${textColors[stockLevel]}`}>
                      {item.quantity} Units
                    </div>
                  </div>
                })
              }
            </div>
          </div>

          {/* Efficiency Section */}

          <div className='bg-white rounded-lg p-6 border border-gray-200'>
            <h2 className='text-center capitalize text-lg font-semibold text-gray-900'>Efficiency</h2>
            <div className='h-10'></div>
            <div className='flex items-center justify-center'>
              <div className='relative w-48 h-48'>
                <div className='absolute inset-0 rounded-full border-8 border-gray-200'></div>
                <div className='absolute inset-0 rounded-full border-8 border-purple-600'
                  style={{
                    clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)"
                  }}
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-gray-900 mb-2'>{inStockPercentage}%</div>
                    <div className='text-sm text-gray-600'>In Stock</div>
                  </div>
                </div>


              </div>
            </div>

            {/* 3 circles  */}

            <div className='h-5'></div>

            <div className='mt-8 grid grid-cols-3'>
              <div className='flex items-center justify-center gap-3 text-sm'>
                <div className='w-3 h-3 rounded-full bg-green-400'></div>
                <span className='capitalize text-sm text-gray-600'>in stock ({inStockPercentage}%)</span>
              </div>
              <div className='flex items-center justify-center gap-3 text-sm'>
                <div className='w-3 h-3 rounded-full bg-yellow-400'></div>
                <span className='capitalize text-sm text-gray-600'>low stock ({lowOfStockPercentage}%)</span>
              </div>
              <div className='flex items-center justify-center gap-3 text-sm'>
                <div className='w-3 h-3 rounded-full bg-red-400'></div>
                <span className='capitalize text-sm text-gray-600'>out of stock ({outOfStockPercentage}%)</span>
              </div>
            </div>

          </div>

        </div>

      </main >
    </div >
  )
}

export default page
