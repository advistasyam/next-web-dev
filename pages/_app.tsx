import { AnimatePresence } from "framer-motion"
import Layout from "../components/Layout"
import "../styles/globals.css"

function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <AnimatePresence>
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </Layout>
  )
}

export default MyApp
