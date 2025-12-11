import SideBar from "@/Components/SideBar"
import { getCurrentUser } from "@/lib/Auth";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/Actions/products";


const page = async (
    {
        searchParams,
    }: {
        searchParams: Promise<{ query: String }>
    }) => {

    // Storing QueryString

    const params = await searchParams;

    const queryString = (params.query ?? "").trim()

    // get Current User info
    const user = await getCurrentUser();
    const userId = user.id;

    /// Get All Products Based On Signed User ID , Showing 3 Fields [Price, Quantity, Created Date]
    const allProducts = await prisma.products.findMany({
        where: {
            userId,
            name: { contains: queryString, mode: 'insensitive' },
        },
        orderBy: { createdAt: 'desc' }
    })

    const allProductsCount = allProducts.length;

    return (
        <div>
            <SideBar cPath={'/inventory'} />
            <main className='ml-64 p-8'>

                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold text-gray-900'>Inventory Contains <span className="text-purple-700">({allProductsCount})</span> Products</h1>
                            <p className='mt-3 text-sm text-gray-500 capitalize'>
                                manage your products and track inventory levels.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">

                    {/* Serach Item  */}

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <form method="get" action={'/inventory'} className="flex gap-2">
                            <input name='query' type="text" placeholder="Serach Products ..." className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent" />
                            <button className="cursor-pointer px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Search</button>
                        </form>
                    </div>


                    {/* Products Table  */}

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    {/* <th className="font-bold uppercase text-center px-6 py-3 text-xs text-gray-500">
                                    Product ID
                                </th> */}
                                    <th className="font-bold uppercase text-center px-6 py-3 text-xs text-gray-500">
                                        Name
                                    </th>
                                    <th className="font-bold uppercase text-center px-6 py-3 text-xs text-gray-500">
                                        SKU
                                    </th>
                                    <th className="font-bold uppercase text-center px-6 py-3 text-xs text-gray-500">
                                        Price
                                    </th>
                                    <th className="font-bold uppercase text-center px-6 py-3 text-xs text-gray-500">
                                        Quantity
                                    </th>
                                    <th className="font-bold uppercase text-center px-6 py-3 text-xs text-gray-500">
                                        Low Stock At
                                    </th>
                                    <th className="font-bold uppercase text-center px-6 py-3 text-xs text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-gray-100 font-semibold divide-y divide-gray-200 text-center">
                                {
                                    allProducts.map((pro, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            {/* <td className="px-6 py-4 text-sm text-gray-500">
                                            {pro.id}
                                        </td> */}
                                            <td className="px-6 py-7 text-sm text-black">
                                                {pro.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {pro.sku || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                ${Number(pro.price).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {pro.quantity}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {pro.lowStockAt || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                <form action={
                                                    async (formdata: FormData) => {
                                                        "use server"
                                                        await deleteProduct(formdata)
                                                    }
                                                }>
                                                    <input type="hidden" name="delid" value={pro.id} />
                                                    <button className="button-33">
                                                        Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </main >
        </div >
    )
}
export default page
