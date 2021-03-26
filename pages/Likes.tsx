import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import Head from "next/head"
import React, { useState } from "react"

export interface LikesProps {}

const Likes: React.FC<LikesProps> = () => {
  const [totalDataLiked, setTotalDataLiked] = useState(JSON.parse(localStorage.getItem("id_liked")).length)

  return (
    { totalDataLiked === 0 ? (
      <></>
    ) : (
      <></>
    )}
    <>
      <Head>
        <title>Liked Items</title>
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
        <div className="flex flex-col items-center justify-center min-h-85 space-y-12">
          <img src="/treeswing.svg" alt="" className="w-64 sm:w-96" />
          <h1 className="text-2xl sm:text-4xl text-center px-6 sm:px-0">
            Your <span className="text-hijau">Liked Items</span> is empty, start
            searching!
          </h1>
          <div className="flex items-center justify-center lg:justify-start">
            <Link href="/Film">
              <a className="bg-hijau text-white px-16 py-3 rounded-xl transform hover:scale-110 hover:shadow-lg transition duration-300 ease-in-out focus:scale-90 font-semibold">
                Explore Now !
              </a>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Likes
