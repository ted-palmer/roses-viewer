import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useContractRead } from 'wagmi';
import { setEnvironmentData } from 'worker_threads';
import contractInterface from '../contract-abi.json';
import { useIsMounted } from '../hooks/useIsMounted';

const contractConfig = {
  addressOrName: '0x3E743377417Cd7cA70dcc9BF08FaC55664ed3181',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {
  const isMounted = useIsMounted();

  const [id, setId] = useState(1);
  const [roseData, setRoseData] = useState();

  console.log(id)

  const { data, isError, isLoading  } = useContractRead({
    ...contractConfig,
    functionName: 'tokenURI',
    args: id,
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
    onSuccess(data) {
      console.log("success! ", data)
      setRoseData(data)
    }
  });


  return (
    <div className=''>
      <Head>
        <title>Roses Viewer</title>
        <meta
          name="description"
          content="View roses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='relative mx-auto flex flex-col items-center'>
        <input value={id} onChange={e => setId(parseInt(e.target.value))} type="number" placeholder="Token Id" max="1024" className='absolute top-4 border p-1'/>
        <iframe src="" frameBorder="0" allowFullScreen className='w-full h-screen'></iframe>

        {isMounted && roseData && 
        <p className='max-w-full'>
          Data: {roseData}
          {ethers.utils.base64.decode(roseData)}
        </p>
        }   
      </main>


      {/* <footer className='flex flex-col items-center'>
        <a href="https://tedpalmer.xyz" target="_blank" rel="noopener noreferrer">
          Made by Ted Palmer
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
