import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import constants from "../constants"
import { useForm } from "react-hook-form"
import axios from "axios"

export interface filmProps {}

const film: React.FC<filmProps> = () => {
  const { register, handleSubmit } = useForm()

  const [stateobj, setStateobj] = useState<any>([])
  const [searching, setSearching] = useState<boolean>(false)

  const onSubmit = async data => {
    await axios
      .get(`${constants}` + `&s=` + `${data.name}`)
      .then(function (response) {
        console.log(response.data.Search)
        setStateobj(response.data.Search)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   if (dataInput !== "") {
  //   }
  // }, [dataInput])

  return (
    <motion.div
      animate={{ opacity: 1.0 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <form className="min-h-85" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center mt-12">
          <h1 className="text-black text-5xl">
            Find Your <span className="text-hijau">Film!</span>
          </h1>
        </div>
        <div className="container mx-auto flex items-center justify-center">
          <input
            className="w-full rounded-2xl border-hijau border-2 pl-4 max-w-xl mt-6 outline-none min-h-50px"
            type="text"
            placeholder="Input your film name here"
            required
            ref={register}
            name="name"
          />
        </div>
      </form>

      {stateobj.lenght !== 0 ? (
        <div>
          {stateobj.map(function (val) {
            return <h1>{val.Title}</h1>
          })}
        </div>
      ) : (
        <></>
      )}

      {/* {searching ? (
        <div>loading</div>
      ) : content !== "" ? (
        <div>{content}</div>
      ) : (
        <></>
      )} */}
    </motion.div>
  )
}

export default film
