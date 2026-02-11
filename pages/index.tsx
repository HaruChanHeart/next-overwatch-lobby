import Head from 'next/head'
import useSWR from 'swr'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LobbyCard from '@/components/Card/LobbyCard'
import ErrorScreen from '@/components/ErrorScreen'
import LoadingScreen from '@/components/Loading'
import ILobbyCard from '@/interfaces/LobbyCard'
import { Checkbox } from '@heroui/checkbox'
import { Pagination } from '@heroui/pagination'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'en', ['common', 'guide', 'lobby']))
    }
  }
}

export default function Home() {
  const [filter, setFilter] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  // get translation file
  const { t } = useTranslation('common');

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/lobby', fetcher);

  // Handle the error state
  if (error) return <ErrorScreen />

  // Handle the loading state
  if (!data) return <LoadingScreen />

  const pageSize = 20;
  const totalPage = Math.ceil(data.length / pageSize);
  const sorted = data.sort((a: ILobbyCard, b: ILobbyCard) => {
    return (a.available === b.available)? 0 : a.available ? -1 : 1;
  });
  const lobbyList = filter === true ? sorted : sorted.slice(pageNum * pageSize - pageSize, pageNum * pageSize);
  return (
    <>
      <Head>
        <title>Overwatch Unofficial Menu/Lobby DB</title>
      </Head>
      <main className={`container mx-auto max-w-7xl pt-16 px-6 grow`}>
        <Header />
        <div className='flex flex-row justify-start items-center my-5'>
          <Checkbox onValueChange={setFilter}>{t('update_visible')}</Checkbox>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {
            lobbyList
              .filter((item: ILobbyCard) => {
                if (filter === true) { if (item.update === true) return item; }
                else return item
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
        <div className='flex flex-row justify-center items-center my-5'>
          {filter ? null : <Pagination total={totalPage} initialPage={1} page={pageNum} onChange={(page: number) => setPageNum(page)} />}
        </div>
        <Footer />
      </main>
    </>
  )
}
