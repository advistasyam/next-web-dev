import Head from "next/head"
import React, { useEffect } from "react"
import TypeIt from "typeit"
import Link from "next/link"
import { motion } from "framer-motion"
import styled from "@emotion/styled"

export default function Home() {
  const ImageDiv = styled.div`
    #img {
      width: 500px;
    }

    @media only screen and (max-width: 600px) {
      #img {
        width: 300px;
      }
    }
  `

  useEffect(() => {
    new TypeIt("#elementType", {
      speed: 150,
      loop: true,
    })
      .type("Movies", { delay: 1000 })
      .delete()
      .type("Series", { delay: 1000 })
      .delete()
      .type("Games", { delay: 1000 })
      .go()
  }, [])

  return (
    <>
      <Head>
        <title>Acil Pages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        animate={{ opacity: 1.0 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="bg-white dark:bg-gelap">
          <div
            className="container mx-auto flex flex-col lg:flex-row items-center justify-center space-y-20 lg:space-y-0"
            style={{ height: "85vh" }}
          >
            <ImageDiv className="w-full lg:w-1/2 flex items-center justify-center">
              <img src="/fullwhite.svg" id="img" />
            </ImageDiv>
            <div className="w-full lg:w-1/2 items-center justify-center px-6">
              <div className="mb-6">
                <motion.div
                  animate={{ opacity: 1.0 }}
                  initial={{ opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex flex-row items-center justify-center lg:justify-start space-x-2">
                    <img src="/tailwind.svg" style={{ width: "60px" }} />
                    <h1 className="text-xl text-black dark:text-white">
                      Acil Pages
                    </h1>
                  </div>
                </motion.div>
              </div>
              <motion.div
                animate={{ opacity: 1.0 }}
                initial={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5, delay: 1 }}
              >
                <h1 className="font-base text-4xl lg:text-6xl xl:text-7xl text-black dark:text-white text-center lg:text-left">
                  A webapps to find your favourite <span id="elementType"></span>
                </h1>
              </motion.div>
              <motion.div
                animate={{ opacity: 1.0 }}
                initial={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5, delay: 1.5 }}
              >
                <h1 className="font-base text-2xl lg:text-3xl mt-3 lg:mt-6 text-black dark:text-white text-center lg:text-left">
                  Over <span style={{ color: "#69C1A6" }}>100K+</span> Things To
                  Explore
                </h1>
              </motion.div>
              <div className="mt-8 lg:mt-12 flex items-center justify-center lg:justify-start">
                <Link href="/Film">
                  <a className="bg-hijau text-white px-16 py-3 rounded-xl transform hover:scale-110 hover:shadow-lg transition duration-300 ease-in-out focus:scale-90 font-semibold">
                    Explore Now !
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
