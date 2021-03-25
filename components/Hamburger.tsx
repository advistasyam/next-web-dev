import Link from "next/link"
import styled from "@emotion/styled"
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

export interface HamburgerProps {}

const Hamburger: React.FC<HamburgerProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const HamburgerButton = styled.button`
    :focus {
      outline: none;
    }
  `

  const ButtonEffect = styled.div`
    #buttonEffect:hover {
      transition: all ease 0.2s;
      background-position: 100% 50%;
      box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
    }
    #buttonEffect:active {
      transition: all ease 0.1s;
      transform: scale(0.9, 0.9);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
    }
    #buttonEffect:focus {
      outline: none;
    }
  `

  return (
    <>
      <nav className="z-10 font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white dark:bg-gelap border-b dark:border-white sm:items-baseline w-full sticky top-0 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="mb-0">
            <Link href="/">
              <a className="flex flex-row items-center space-x-2">
                <img src="/tailwind.svg" style={{ width: "40px" }} />
                <h1 className="text-xl text-black dark:text-white">
                  Acil Pages
                </h1>
              </a>
            </Link>
          </div>
          <HamburgerButton className="" onClick={onOpen}>
            <img src="/hamburger.svg" />
          </HamburgerButton>
        </div>
      </nav>
      <Drawer onClose={onClose} isOpen={isOpen} placement="right">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton
              color="white"
              _focus={{
                outline: "none",
              }}
            />
            <DrawerHeader
              borderBottomWidth="5px"
              background="linear-gradient(257.36deg, #09BE9E 7.08%, rgba(106, 239, 231, 0.594497) 88.38%, rgba(33, 216, 160, 0) 176.3%), #6EBFA6"
              color="white"
            >
              Navigation Menu
            </DrawerHeader>
            <DrawerBody>
              <ButtonEffect className="flex flex-col gap-6 text-black text-lg mt-6">
                <Link href="/">
                  <a
                    className="flex space-x-2 items-center justify-center text-hijau font-semibold shadow-md py-3 rounded-lg border-2 border-gray-50 border-opacity-100 m-0 text-center"
                    id="buttonEffect"
                    onClick={onClose}
                  >
                    <img src="/home.svg" alt="#" className="pb-1" />
                    <h1>Home</h1>
                  </a>
                </Link>
                <Link href="/Film">
                  <a
                    className="flex space-x-2 items-center justify-center text-hijau font-semibold shadow-md py-3 rounded-lg border-2 border-gray-50 border-opacity-100 m-0 text-center"
                    id="buttonEffect"
                    onClick={onClose}
                  >
                    <img src="/film.svg" alt="#" className="pb-1" />
                    <h1>Explore</h1>
                  </a>
                </Link>
                <Link href="/Likes">
                  <a
                    className="flex space-x-2 items-center justify-center text-hijau font-semibold shadow-md py-3 rounded-lg border-2 border-gray-50 border-opacity-100 m-0 text-center"
                    id="buttonEffect"
                    onClick={onClose}
                  >
                    <img src="/like.svg" alt="#" className="pb-1" />
                    <h1>Likes</h1>
                  </a>
                </Link>
                <Link href="/Bookmark">
                  <a
                    className="flex space-x-2 items-center justify-center text-hijau font-semibold shadow-md py-3 rounded-lg border-2 border-gray-50 border-opacity-100 m-0 text-center"
                    id="buttonEffect"
                    onClick={onClose}
                  >
                    <img src="/bookmark.svg" alt="#" className="pb-1" />
                    <h1>Bookmark</h1>
                  </a>
                </Link>
              </ButtonEffect>
            </DrawerBody>
            <DrawerFooter background="#F2F2F2">
              Advis Tasyah Mulia © 2021
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default Hamburger
