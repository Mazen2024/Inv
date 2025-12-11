import { SignIn } from "@stackframe/stack"
import Link from "next/link"

const page = () => {
  return (
    <section className="min-h-screen flex justify-center items-center bg-linear-to-br from-purple-50 to-purple-400">
      <div className="max-w-md w-full space-y-8">
        <SignIn />
        <Link
          className="bg-black text-white max-w-96 text-center w-full block mt-5 rounded-lg py-2 hover:bg-gray-800 transition-all ease-in-out duration-300" href='/'>
          Go To Home
        </Link>
      </div>
    </section>
  )
}

export default page
