import { AnimatePresence } from "framer-motion"
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "../components/Layout"
import "../styles/globals.css"

function MyApp({ Component, pageProps, router }) {
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

export default MyApp
