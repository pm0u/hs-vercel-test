import Head from 'next/head'
import { Button } from '@joinhandshake/ui-components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Handshake</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto pt-10">
        <Button variant="primary">test button!</Button>
      </main>
    </>
  )
}
