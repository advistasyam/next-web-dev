import Head from "next/head"
import React from "react"
import styles from "../styles/Home.module.css"
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white dark:bg-gelap">
      <div className="container mx-auto flex flex-row items-center justify-center" style={{height: "85vh"}}>
      <div className="w-1/2 flex items-center justify-center">
        <Image src="/fullwhite.svg" width={500} height={500}/>
      </div>
      <div className="w-1/2 items-center justify-center px-6">
        <div className="mb-6">
            <div className="flex flex-row items-center space-x-2">
              <img src="/tailwind.svg" style={{width: "60px"}} />
              <h1 className="text-xl text-black dark:text-white">Acil Pages</h1>
            </div>
        </div>
        <h1 className="font-base text-7xl text-black dark:text-white">A webapps to find your favourite films</h1>
        <h1 className="font-base text-3xl mt-6 text-black dark:text-white">Over <span style={{color: "#69C1A6"}}>100K+</span> Movies To Explore</h1>
        <div className="mt-12">
          <Link href="/Film">
            <a className="text-white px-16 py-3 rounded-xl hover:shadow-lg" style={{background: "#69C1A6"}}>
              Explore Now !
            </a>
          </Link>
        </div>
        
      </div>
    </div>
      {/* <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div> */}
    </div>
  )
}
