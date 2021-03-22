import Link from "next/link"

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white dark:bg-gelap border-b dark:border-white sm:items-baseline w-full sticky top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="mb-0">
          <Link href="/">
            <a className="flex flex-row items-center space-x-2">
              <img src="/tailwind.svg" style={{ width: "40px" }} />
              <h1 className="text-xl text-black dark:text-white">Acil Pages</h1>
            </a>
          </Link>
        </div>
        <div className="flex flex-row space-x-12">
          <Link href="/">
            <a className="flex space-x-2 items-center text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 dark:text-white hover:text-hijau">
              <img src="/home.svg" alt="#" className="pb-1"/>       
              <h1>Home</h1>
            </a>
          </Link>
          <Link href="/Film">
            <a className="flex space-x-2 items-center text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 dark:text-white hover:text-hijau">
              <img src="/film.svg" alt="#" className="pb-1"/> 
              <h1>Film</h1>
            </a>
          </Link>
          <Link href="/Likes">
            <a className="flex space-x-2 items-center text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 dark:text-white hover:text-hijau">
              <img src="/like.svg" alt="#" className="pb-1"/> 
              <h1>Likes</h1>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
