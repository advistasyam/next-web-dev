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
  const options = ["All", "Movie", "Series"]
  const [searchBy, setSearchBy] = useState("All")
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "searchType",
    defaultValue: "All",
    onChange: setSearchBy,
  })

  const group = getRootProps()

  const { register, handleSubmit } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [stateobj, setStateobj] = useState<any>({ Search: [] })
  const [indexModal, setIndexModal] = useState<number>(0)

  const onSubmit = async data => {
    let typeSearch = searchBy === "Movie" ? "&type=movie" : searchBy === "Series" ? "&type=series" : ""
    toast.loading(`Searching ` + `${data.name}`)
    await axios
      .get(`/api/getfilm/` + `${data.name}` + `${typeSearch}`)
      .then(function (response) {
        toast.dismiss()
        toast.success("We Found Your Items!")
        console.log(response.data)
        setStateobj(response.data)
      })
      .catch(function (err) {
        toast.dismiss()
        toast.error("Film not found or check your connection")
        console.log(err)
      })
  }

  const openModal = (param: number) => {
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
              placeholder="Input your film name here"
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
              <div className="container mx-auto flex items-center justify-center mt-16 font-bold">
                <h1 className="text-center">
                  Found{" "}
                  <span className="text-hijau">
                    {stateobj.totalResults} items
                  </span>{" "}
                  from search
                </h1>
              </div>
              <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-12 mt-6 container mx-auto">
                {stateobj.Search.map(function (val, index) {
                  return (
                    <div
                      className="flex-initial w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/5 relative cursor-pointer"
                      onClick={() => openModal(index)}
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={val.Poster}
                          alt="#"
                          className="w-full h-32 h-64 md:h-96 object-cover"
                        />
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
          <ModalHeader>
            <h1 className="pr-6">{stateobj.Search[indexModal]?.Title}</h1>
          </ModalHeader>
          <ModalCloseButton
            _focus={{
              outline: "none",
            }}
          />
          <ModalBody>
            <div className="container mx-auto flex items-center justify-center">
              <img src={stateobj.Search[indexModal]?.Poster} alt="" />
            </div>
            <h1 className="mt-6 font-semibold">
              Tahun :{" "}
              <span className="text-hijau">
                {stateobj.Search[indexModal]?.Year}
              </span>
            </h1>
            <h1 className="mt-2 font-semibold">
              Tipe :{" "}
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default film
