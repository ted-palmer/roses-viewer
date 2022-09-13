import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import contractInterface from '../contract-abi.json';
import { useIsMounted } from '../hooks/useIsMounted';

const contractConfig = {
  addressOrName: '0x3E743377417Cd7cA70dcc9BF08FaC55664ed3181',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {
  const isMounted = useIsMounted();

  const [id, setId] = useState(1);
  const [fetchData, setFetchData] = useState("");

  const contractRead = useContractRead({
    ...contractConfig,
    functionName: 'tokenURI',
    args: id,
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
    onSuccess(data) {
      fetch(data.toString())
        .then(response => response.json())
        .then(res => {
          setFetchData(res.animation_url)
          console.log(res.name)
        })
    }
  });

  return (
    <div className=''>
      <Head>
        <title>Roses Viewer</title>
        <meta property="og:image" content="/rose.png" />
        <meta name="twitter:image" content="/rose.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Roses Viewer" />
        <meta name="twitter:description" content="View each rose now, even before mint." />
        <meta property="og:title" content="Roses Viewer" />
        <meta name="description" content="View each rose now, even before mint." />
        <meta property="og:description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='relative mx-auto flex flex-col items-center bg-[#000] h-screen'>
        <input value={id} onChange={e => setId(parseInt(e.target.value))} type="number" placeholder="Token Id" min="1" max="1024" maxLength={4} className='text-3xl rounded-lg absolute top-4 border pl-2 py-1 w-40' />
        {isMounted && fetchData &&
          <>
            <iframe src={fetchData} className='w-full h-screen'></iframe>
          </>
        }   

        <p className='absolute bottom-8 text-white px-2 bg-[#000]'>Made by <a href="https://tedpalmer.xyz" target="_blank" className='hover:text-blue-600' rel="noreferrer">Ted Palmer</a></p>
      </main>
    </div>
  );
};

export default Home;
