import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "../components/Layout"
import "../styles/globals.css"

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    if (localStorage.getItem("id_liked") === null) {
      localStorage.setItem("id_liked", "[]")
    }
  
    if (localStorage.getItem("object_liked") === null) {
      localStorage.setItem("object_liked", "[]")
    }
  
    if (localStorage.getItem("id_bookmark") === null) {
      localStorage.setItem("id_bookmark", "[]")
    }
  
    if (localStorage.getItem("object_bookmark") === null) {
      localStorage.setItem("object_bookmark", "[]")
    }
  }, [])

  return (
    <ChakraProvider>
      <Layout>
        <AnimatePresence>
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  )
}

MyApp.getInitialProps = () => {
  return {}
}

export default MyApp
