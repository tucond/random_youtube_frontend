import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({videoObj}) {

  
  let src = "https://www.youtube.com/embed/" + videoObj.videoId;
  
  return (
    <div className="youtube">
      <iframe src={src} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

Home.getInitialProps = async function(){
  //console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const res = await fetch
  (`${process.env.NEXT_PUBLIC_BACKEND_URL}/youtube_api/new`, {
    method: "GET",
  });

  const videoId = await res.json();

  return {
    videoObj: videoId
  };  
       
}   
