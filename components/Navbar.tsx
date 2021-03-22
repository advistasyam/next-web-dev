import Link from "next/link"
import Image from "next/image"

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    // <nav>
    //   <div className="logo">
    //     <Image src="/tailwind.svg" width={80} height={30}/>
    //     <h1 style={{marginLeft: "10px"}}>Acil Pages</h1>
    //   </div>
    //   <Link href="/"><a>Home</a></Link>
    //   <Link href="/Film"><a>Film</a></Link>
    //   <Link href="/Likes"><a>Likes</a></Link>
    // </nav>
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
            <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 dark:text-white hover:text-hijau">
              Home
            </a>
          </Link>
          <Link href="/Film">
            <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 dark:text-white hover:text-hijau">
              Film
            </a>
          </Link>
          <Link href="/Likes">
            <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 dark:text-white hover:text-hijau">
              Likes
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
