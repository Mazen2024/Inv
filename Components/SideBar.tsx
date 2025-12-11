import { UserButton } from "@stackframe/stack"
import { BarChart3, Package, Plus, Settings } from "lucide-react"
import Link from "next/link"


const SideBar = ({ cPath = '/dashboard' }: { cPath: String }) => {

  const navItems =
    [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: BarChart3
      },
      {
        title: 'Inventory',
        href: '/inventory',
        icon: Package
      },
      {
        title: 'Add Product',
        href: '/add-product',
        icon: Plus
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
      },
    ]

  return (
    <div className="left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10 fixed">
      <div>
        <div className="mb-8">
          {/* Logo & Span */}
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-10 h-10" />
            <span className="font-semibold text-lg">Inventory App</span>
          </div>
        </div>
      </div>


      <nav className="space-y-1">
        <div className="font-semibold text-sm uppercase text-gray-400">Inventory</div>
        {
          navItems.map(item => {

            let isActive = cPath === item.href;
            return <Link
              href={item.href} key={item.title}
              className=
              {`mt-8 flex items-center gap-4 p-3 rounded-lg ${isActive ? 'bg-purple-100 text-gray-800' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              <item.icon />
              <p>{item.title}</p>
            </Link>
          })
        }
      </nav>

        {/* Bottom Bar */}

      <div className="absolute bottom-0 left-0 right-0 border-t p-6 border-gray-700">
        <div className="flex items-center justify-between">
          <UserButton showUserInfo />
        </div>
      </div>
    </div >
  )
}

export default SideBar
