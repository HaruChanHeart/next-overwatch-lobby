import Head from 'next/head'
import { Montserrat } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LobbyCard from '@/components/Card/LobbyCard'
import useSWR from 'swr'
import ILobbyCard from '@/interfaces/LobbyCard'
import ErrorScreen from '@/components/ErrorScreen'
import LoadingScreen from '@/components/Loading'

// use google font
const montserrat = Montserrat({ subsets: ['latin'] })

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {lobbyList.map((item: ILobbyCard) => (
              <LobbyCard
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                description={item.description}
                code={item.code}
                available={item.available}
              />
            ))}
          </div>
        <Footer />
      </main>
    </>
  )
}
