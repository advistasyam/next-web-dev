import { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import axios from "axios"
import Head from "next/head"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react"
import RadioCard from "../components/RadioCard"

export interface filmProps {}

const film: React.FC<filmProps> = () => {
  const [searchBy, setSearchBy] = useState<string>("All")
  const [lastRequest, setLastRequest] = useState<string>("")
  const [pages, setPages] = useState<number>(1)
  const [maxPages, setMaxPages] = useState<number>(1)
  const [stateobj, setStateobj] = useState<any>({ Search: [] })
  const [indexModal, setIndexModal] = useState<number>(0)
  const [likedFilm, setLikedFilm] = useState<boolean>(false)
  const [bookmarkFilm, setBookmarkFilm] = useState<boolean>(false)

  const options = ["All", "Movie", "Series"]
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "searchType",
    defaultValue: "All",
    onChange: setSearchBy,
  })
  const group = getRootProps()

  const { register, handleSubmit } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addToLiked = param => {
    if (localStorage.getItem("id_liked") !== null) {
      let id_liked = JSON.parse(localStorage.getItem("id_liked"))
      let object_liked = JSON.parse(localStorage.getItem("object_liked"))
      id_liked.push(param.imdbID)
      object_liked.push(param)

      localStorage.setItem("id_liked", JSON.stringify(id_liked))
      localStorage.setItem("object_liked", JSON.stringify(object_liked))

      toast.success(`Added ` + `${param.Title}` + ` to liked items`)

      setLikedFilm(true)
    }
  }

  const addToBookmark = param => {
    if (localStorage.getItem("id_bookmark") !== null) {
      let id_bookmark = JSON.parse(localStorage.getItem("id_bookmark"))
      let object_bookmark = JSON.parse(localStorage.getItem("object_bookmark"))
      id_bookmark.push(param.imdbID)
      object_bookmark.push(param)

      localStorage.setItem("id_bookmark", JSON.stringify(id_bookmark))
      localStorage.setItem("object_bookmark", JSON.stringify(object_bookmark))

      toast.success(`Added ` + `${param.Title}` + ` to bookmark items`)

      setBookmarkFilm(true)
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
      let id_bookmark = JSON.parse(localStorage.getItem("id_bookmark"))
      let object_bookmark = JSON.parse(localStorage.getItem("object_bookmark"))

      const index = id_bookmark.indexOf(param.imdbID)

      if (index > -1) {
        id_bookmark.splice(index, 1)
        object_bookmark.splice(index, 1)
      }

      localStorage.setItem("id_bookmark", JSON.stringify(id_bookmark))
      localStorage.setItem("object_bookmark", JSON.stringify(object_bookmark))

      toast.success(`Deleted ` + `${param.Title}` + ` from bookmark items`)

      setBookmarkFilm(false)
    }
  }

  const backwardPage = () => {
    if (pages !== 1) {
      let newNumber: number = pages - 1
      fetchPagination(newNumber)
    }
  }

  const backwardPageFirst = () => {
    if (pages !== 1) {
      let newNumber: number = 1
      fetchPagination(newNumber)
    }
  }

  const forwardPage = () => {
    if (pages !== maxPages) {
      let newNumber: number = pages + 1
      fetchPagination(newNumber)
    }
  }

  const forwardPageLast = () => {
    if (pages !== maxPages) {
      let newNumber: number = maxPages
      fetchPagination(newNumber)
    }
  }

  const fetchPagination = async (param: number) => {
    toast.loading(`Loading Page ` + `${param}`)
    await axios
      .get(lastRequest + `&page=${param}`)
      .then(function (response) {
        toast.dismiss()
        toast.success("Data Fetched!")
        setPages(param)
        setStateobj(response.data)
      })
      .catch(function (err) {
        toast.dismiss()
        toast.error("Connection Problem")
        console.log(err)
      })
  }

  const onSubmit = async data => {
    let typeSearch =
      searchBy === "Movie"
        ? "&type=movie"
        : searchBy === "Series"
        ? "&type=series"
        : ""
    toast.loading(`Searching ` + `${data.name}`)
    await axios
      .get(`/api/getfilm/` + `${data.name}` + `${typeSearch}`)
      .then(function (response) {
        toast.dismiss()
        toast.success("We Found Your Items!")
        setPages(1)
        setLastRequest(`/api/getfilm/` + `${data.name}` + `${typeSearch}`)
        setMaxPages(Math.ceil(parseInt(response.data.totalResults, 10) / 10))
        setStateobj(response.data)
      })
      .catch(function (err) {
        toast.dismiss()
        toast.error("Film not found or check your connection")
        console.log(err)
      })
  }

  const openModal = (param: number) => {
    //liked section
    let idLikedToObserver = stateobj.Search[param]?.imdbID
    let idLikedArray = JSON.parse(localStorage.getItem("id_liked"))
    let isInLikedArray = idLikedArray.includes(idLikedToObserver)

    //bookmark section
    let idBookmarkToObserver = stateobj.Search[param]?.imdbID
    let idBookmarkArray = JSON.parse(localStorage.getItem("id_bookmark"))
    let isInBookmarkArray = idBookmarkArray.includes(idBookmarkToObserver)

    isInLikedArray ? setLikedFilm(true) : setLikedFilm(false)
    isInBookmarkArray ? setBookmarkFilm(true) : setBookmarkFilm(false)

    setIndexModal(param)
    onOpen()
  }

  return (
    <>
      <Head>
        <title>Explore Hobbies</title>
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
        <form className="min-h-85" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mt-12">
            <h1 className="text-black text-3xl sm:text-5xl">
              Find Your <span className="text-hijau">Items!</span>
            </h1>
          </div>
          <div className="container mx-auto flex items-center justify-center px-6 sm:px-0">
            <input
              className="w-full rounded-2xl border-hijau border-2 pl-4 max-w-xl mt-6 outline-none min-h-50px"
              type="text"
              placeholder="Explore your curious here"
              required
              ref={register}
              name="name"
            />
          </div>
          <div className="mt-6 flex items-center justify-center">
            <HStack {...group}>
              {options.map(value => {
                const radio = getRadioProps({ value })
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                )
              })}
            </HStack>
          </div>
          {stateobj?.Search?.length !== 0 ? (
            <motion.div
              animate={{ opacity: 1.0 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              key={stateobj}
            >
              <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center sm:justify-between mt-16 font-bold px-0 lg:px-14 xl:px-16 2xl:px-20 space-y-6 lg:space-y-0">
                <h1 className="text-center">
                  Found{" "}
                  <span className="text-hijau">
                    {stateobj.totalResults} items
                  </span>{" "}
                  from search
                </h1>
                <div className="flex flex-row space-x-2">
                  {pages === 1 ? (
                    <>
                      <div className="rounded-lg bg-hijaudisabled flex items-center justify-center px-3 text-white focus:outline-none cursor-default">
                        &lt;&lt;
                      </div>
                      <div className="rounded-lg bg-hijaudisabled flex items-center justify-center px-3 text-white focus:outline-none cursor-default">
                        &lt;
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="rounded-lg bg-hijau flex items-center justify-center px-3 text-white focus:outline-none cursor-pointer"
                        onClick={() => backwardPageFirst()}
                      >
                        &lt;&lt;
                      </div>
                      <div
                        className="rounded-lg bg-hijau flex items-center justify-center px-3 text-white focus:outline-none cursor-pointer"
                        onClick={() => backwardPage()}
                      >
                        &lt;
                      </div>
                    </>
                  )}
                  <h1>
                    Page {pages} / {maxPages}
                  </h1>
                  {pages === maxPages ? (
                    <>
                      <div className="rounded-lg bg-hijaudisabled flex items-center justify-center px-3 text-white focus:outline-none cursor-default">
                        &gt;
                      </div>
                      <div className="rounded-lg bg-hijaudisabled flex items-center justify-center px-3 text-white focus:outline-none cursor-default">
                        &gt;&gt;
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="rounded-lg bg-hijau flex items-center justify-center px-3 text-white focus:outline-none cursor-pointer"
                        onClick={() => forwardPage()}
                      >
                        &gt;
                      </div>
                      <div
                        className="rounded-lg bg-hijau flex items-center justify-center px-3 text-white focus:outline-none cursor-pointer"
                        onClick={() => forwardPageLast()}
                      >
                        &gt;&gt;
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-12 mt-6 container mx-auto">
                {stateobj.Search.map(function (val, index) {
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
            </motion.div>
          ) : (
            <></>
          )}
        </form>
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
              {stateobj.Search[indexModal]?.Title}
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
              <img src={stateobj.Search[indexModal]?.Poster} alt="" />
            </div>
            <h1 className="mt-6 font-semibold">
              Year :{" "}
              <span className="text-hijau">
                {stateobj.Search[indexModal]?.Year}
              </span>
            </h1>
            <h1 className="mt-2 font-semibold">
              Type :{" "}
              <span className="text-hijau">
                {stateobj.Search[indexModal]?.Type}
              </span>
            </h1>
            <h1 className="mt-2 font-semibold">
              IMDB ID :{" "}
              <span className="text-hijau">
                {stateobj.Search[indexModal]?.imdbID}
              </span>
            </h1>
          </ModalBody>
          <ModalFooter>
            <div className="flex flex-row space-x-2">
              {likedFilm === false ? (
                <div
                  className="cursor-pointer px-3 py-2 text-white font-semibold"
                  onClick={() => {
                    addToLiked(stateobj.Search[indexModal])
                  }}
                >
                  <img src="/likedFalse.svg" alt="#" />
                </div>
              ) : (
                <div
                  className="cursor-pointer px-3 py-2 text-white font-semibold"
                  onClick={() => {
                    deleteFromLiked(stateobj.Search[indexModal])
                  }}
                >
                  <img src="/likedTrue.svg" alt="#" />
                </div>
              )}
              {bookmarkFilm === false ? (
                <div
                  className="cursor-pointer px-3 py-2 text-white font-semibold"
                  onClick={() => {
                    addToBookmark(stateobj.Search[indexModal])
                  }}
                >
                  <img src="/bookmarkFalse.svg" alt="#" />
                </div>
              ) : (
                <div
                  className="cursor-pointer px-3 py-2 text-white font-semibold"
                  onClick={() => {
                    deleteFromBookmark(stateobj.Search[indexModal])
                  }}
                >
                  <img src="/bookmarkTrue.svg" alt="#" />
                </div>
              )}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default film
