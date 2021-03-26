import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import Head from "next/head"
import React, { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"

export interface BookmarkProps {}

const Bookmark: React.FC<BookmarkProps> = () => {
  const [randomNumber, setRandomNumber] = useState<number>(0)
  const [indexModal, setIndexModal] = useState<number>(0)
  const [likedFilm, setLikedFilm] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  let id_bookmark: Array<any> = JSON.parse(localStorage.getItem("id_bookmark"))
  let object_bookmark: Array<any> = JSON.parse(
    localStorage.getItem("object_bookmark")
  )

  const openModal = (param: number) => {
    //liked section
    let idLikedToObserver = object_bookmark[param]?.imdbID
    let idLikedArray = JSON.parse(localStorage.getItem("id_liked"))
    let isInLikedArray = idLikedArray.includes(idLikedToObserver)

    isInLikedArray ? setLikedFilm(true) : setLikedFilm(false)

    setIndexModal(param)
    onOpen()
  }

  const addToLiked = param => {
    if (localStorage.getItem("id_Liked") !== null) {
      let id_Liked = JSON.parse(localStorage.getItem("id_Liked"))
      let object_Liked = JSON.parse(localStorage.getItem("object_Liked"))
      id_Liked.push(param.imdbID)
      object_Liked.push(param)

      localStorage.setItem("id_Liked", JSON.stringify(id_Liked))
      localStorage.setItem("object_Liked", JSON.stringify(object_Liked))

      toast.success(`Added ` + `${param.Title}` + ` to Liked items`)

      setLikedFilm(true)
    }
  }

  const deleteFromLiked = param => {
    if (localStorage.getItem("id_liked") !== null) {
      let id_liked = JSON.parse(localStorage.getItem("id_liked"))
      let object_liked = JSON.parse(localStorage.getItem("object_liked"))

      const index = id_liked.indexOf(param.imdbID)

      if (index > -1) {
        id_liked.splice(index, 1)
        object_liked.splice(index, 1)
      }

      localStorage.setItem("id_liked", JSON.stringify(id_liked))
      localStorage.setItem("object_liked", JSON.stringify(object_liked))

      toast.success(`Deleted ` + `${param.Title}` + ` from liked items`)

      setLikedFilm(false)
    }
  }

  const deleteFromBookmark = param => {
    if (localStorage.getItem("id_bookmark") !== null) {
      const index = id_bookmark.indexOf(param.imdbID)

      if (index > -1) {
        id_bookmark.splice(index, 1)
        object_bookmark.splice(index, 1)
      }

      localStorage.setItem("id_bookmark", JSON.stringify(id_bookmark))
      localStorage.setItem("object_bookmark", JSON.stringify(object_bookmark))

      toast.success(`Deleted ` + `${param.Title}` + ` from bookmark items`)

      setRandomNumber(Math.random())
      onClose()
    }
  }

  return (
    <>
      <Head>
        <title>Bookmark Items</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        animate={{ opacity: 1.0 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div>
          <Toaster />
        </div>
        {id_bookmark !== null &&
        id_bookmark !== undefined &&
        id_bookmark.length !== 0 ? (
          <>
            <div className="flex items-center justify-center mt-12">
              <h1 className="text-3xl sm:text-5xl text-black">
                Your <span className="text-hijau">Bookmark</span> Items
              </h1>
            </div>
            <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-12 mt-12 container mx-auto mb-48">
              {object_bookmark.map(function (val, index) {
                return (
                  <div
                    className="flex-initial w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/5 relative cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      {val.Poster === "N/A" ? (
                        <img
                          src="/nothing.png"
                          alt="no picture"
                          className="w-full h-32 h-64 md:h-96 object-cover"
                        />
                      ) : (
                        <img
                          src={val.Poster}
                          alt="/nothing.png"
                          className="w-full h-32 h-64 md:h-96 object-cover"
                        />
                      )}
                      <div className="m-4">
                        <h1 className="font-bold text-hijau truncate">
                          {val.Title}
                        </h1>
                        <h1 className="block text-gray-500 text-sm">
                          {val.Year}
                        </h1>
                      </div>
                      <div className="bg-hijau text-white text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2">
                        <span>{val.Type}</span>
                      </div>
                      <div className="absolute bottom-0 right-0 overflow-hidden rounded-br-lg">
                        <img src="/cardbawah.svg" alt="" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-85 space-y-12">
            <img src="/walkingoutside.svg" alt="" className="w-64 sm:w-96" />
            <h1 className="text-2xl sm:text-4xl text-center px-6 sm:px-0">
              Your <span className="text-hijau">bookmark Items</span> is empty,
              start searching!
            </h1>
            <div className="flex items-center justify-center lg:justify-start">
              <Link href="/Film">
                <a className="bg-hijau text-white px-16 py-3 rounded-xl transform hover:scale-110 hover:shadow-lg transition duration-300 ease-in-out focus:scale-90 font-semibold">
                  Explore Now !
                </a>
              </Link>
            </div>
          </div>
        )}
      </motion.div>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            borderBottomWidth="5px"
            borderTopLeftRadius="5"
            borderTopRightRadius="5"
            background="linear-gradient(257.36deg, #09BE9E 7.08%, rgba(106, 239, 231, 0.594497) 88.38%, rgba(33, 216, 160, 0) 176.3%), #6EBFA6"
            color="white"
          >
            <h1 className="pr-6 text-lg font-medium">
              {object_bookmark[indexModal]?.Title}
            </h1>
          </ModalHeader>
          <ModalCloseButton
            color="white"
            _focus={{
              outline: "none",
            }}
          />
          <ModalBody>
            <div className="container mx-auto flex items-center justify-center">
              <img src={object_bookmark[indexModal]?.Poster} alt="" />
            </div>
            <h1 className="mt-6 font-semibold">
              Year :{" "}
              <span className="text-hijau">
                {object_bookmark[indexModal]?.Year}
              </span>
            </h1>
            <h1 className="mt-2 font-semibold">
              Type :{" "}
              <span className="text-hijau">
                {object_bookmark[indexModal]?.Type}
              </span>
            </h1>
            <h1 className="mt-2 font-semibold">
              IMDB ID :{" "}
              <span className="text-hijau">
                {object_bookmark[indexModal]?.imdbID}
              </span>
            </h1>
          </ModalBody>
          <ModalFooter>
            <div className="flex flex-row space-x-2">
              {likedFilm === false ? (
                <div
                  className="cursor-pointer px-3 py-2 text-white font-semibold"
                  onClick={() => {
                    addToLiked(object_bookmark[indexModal])
                  }}
                >
                  <img src="/likedFalse.svg" alt="#" />
                </div>
              ) : (
                <div
                  className="cursor-pointer px-3 py-2 text-white font-semibold"
                  onClick={() => {
                    deleteFromLiked(object_bookmark[indexModal])
                  }}
                >
                  <img src="/likedTrue.svg" alt="#" />
                </div>
              )}
              <div
                className="cursor-pointer px-3 py-2 text-white font-semibold"
                onClick={() => {
                  deleteFromBookmark(object_bookmark[indexModal])
                }}
              >
                <img src="/bookmarkTrue.svg" alt="#" />
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Bookmark
