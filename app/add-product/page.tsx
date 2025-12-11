import SideBar from "@/Components/SideBar"
import { createProduct } from "@/lib/Actions/products"
import Link from "next/link"

const page = async () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <SideBar cPath={'/add-product'} />
      <main className='ml-64 p-8'>

        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>Add Product</h1>
              <p className='mt-3 text-sm text-gray-500 capitalize'>
                Add your product to your inventory.
              </p>
            </div>
          </div>
        </div>

        {/* Adding form */}
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form
              action={createProduct}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input type="text" required id="name" name="name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-transparent" placeholder="Enter Product Name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input type="number" required id="price" name="price" step={'0.01'} min={0} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-transparent" placeholder="0" />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input type="number" required id="quantity" name="quantity" min={0} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-transparent" placeholder="0" />
                </div>
              </div>
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                  SKU (Optional)
                </label>
                <input type="text" id="sku" name="sku" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-transparent" placeholder="SKU" />
              </div>
              <div>
                <label htmlFor="lowstockat" className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock At (Optional)
                </label>
                <input type="number" id="lowstockat" min={0} name="lowstockat" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-transparent" placeholder="Low Stock Threshold" />
              </div>

              <div className="flex gap-5">
                <button type="submit" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Product</button>
                <Link href={'/inventory'} className="px-6 py-3 bg-gray-200 text-gray rounded-lg hover:bg-gray-300">Cancel</Link>
              </div>

            </form>
          </div>

        </div >
      </main >

    </div >
  )
}

export default page
