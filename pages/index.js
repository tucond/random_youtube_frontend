import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TwitterShareButton, LineShareButton, TwitterIcon, LineIcon } from "react-share";


export default function Home({videoObj}) {

  let srcUrl = "https://www.youtube.com/embed/" + videoObj.videoId + "?" + "autoplay=1" + "&" + "mute=1";
  let shareUrl = "https://youtu.be/" + videoObj.videoId
  return (

    <>
      <header>
        <h1 className={styles.title}>Random YouTube Player</h1>
      </header>

      <div className={styles.youtube}> 
        <iframe src={srcUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>

      <div className={styles.buttonStyle}>
          <button onClick={()=>location.reload()}>REGENERATE</button>
      </div>

      <div className={styles.share}>
        {/* Share this page */}
        <br/>
        <TwitterShareButton url={shareUrl} title={videoObj.title}>
          <TwitterIcon size={45} round={true} />
        </TwitterShareButton>

        <LineShareButton url={shareUrl} quote={videoObj.title}> 
          <LineIcon size={45} round />
        </LineShareButton>
      </div>
    </>
  )
}

Home.getInitialProps = async function(){
  //console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const res = await fetch
  (`${process.env.NEXT_PUBLIC_BACKEND_URL}/youtube_api/new`, {
    method: "GET",
  });

  const videoData = await res.json();

  return {
    videoObj: videoData
  };  
       
}   
