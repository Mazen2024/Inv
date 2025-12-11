import SideBar from '@/Components/SideBar'
import { AccountSettings } from '@stackframe/stack'

const page = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <SideBar cPath={'/settings'} />
      <main className='ml-64 p-8'>

        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>Settings</h1>
              <p className='mt-3 text-sm text-gray-500 capitalize'>
                manage your account settings and preferences.
              </p>
            </div>
          </div>
        </div>


        <div className='max-w-6xl'>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <AccountSettings fullPage />
          </div>
        </div>


      </main>
    </div>
  )
}

export default page
