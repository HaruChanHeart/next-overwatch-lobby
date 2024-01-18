import Head from 'next/head'
import { Montserrat } from 'next/font/google'
import { useState } from 'react'
import useSWR from 'swr'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LobbyCard from '@/components/Card/LobbyCard'
import ErrorScreen from '@/components/ErrorScreen'
import LoadingScreen from '@/components/Loading'
import ILobbyCard from '@/interfaces/LobbyCard'
import { Checkbox } from '@nextui-org/react'

// use google font
const montserrat = Montserrat({ subsets: ['latin'] })

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const [ filter, setFilter ] = useState(false);

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/lobby', fetcher);

  // Handle the error state
  if (error) return <ErrorScreen />

  // Handle the loading state
  if (!data) return <LoadingScreen />

  const lobbyList = data;

  return (
    <>
      <Head>
        <title>Overwatch 2 Unofficial Menu/Lobby DB</title>
      </Head>
      <main className={`${montserrat.className} container mx-auto max-w-7xl pt-16 px-6 flex-grow`}>
        <Header />
          <div className='flex flex-row justify-start items-center my-5'>
            <Checkbox onValueChange={setFilter}>Visible Latest Update Only</Checkbox>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {
              lobbyList
                .filter((item: ILobbyCard) => {
                  if (filter === true) {
                    if (item.update === true) return item
                  }
                  else {
                    return item
                  }
                })
                .map((item: ILobbyCard) => (
                  <LobbyCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    code={item.code}
                    available={item.available}
                    update={item.update}
                  />
                ))
            }
          </div>
        <Footer />
      </main>
    </>
  )
}
