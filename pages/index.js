import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TwitterShareButton, LineShareButton, TwitterIcon, LineIcon } from "react-share";
import axios from "axios";
import {useState} from "react"
// import { TextField } from '@material-ui/core';

export default function Home({videoObj}) {

  let firstUrl = `https://www.youtube.com/embed/${videoObj.videoId}?autoplay=1&mute=1` //TODO:url作成するUtilityを作る

  const [searchedVideoUrl, setSearchedVideoUrl] = useState(firstUrl);
  const [searchText, setSearchText] = useState('');

  const  onClickGenerate = async() => {

    let searchUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/youtube_api/${searchText}`//TODO:パラメータで渡す
    await axios.get(searchUrl)
  
   .then((res) => {
     setSearchedVideoUrl(`https://www.youtube.com/embed/${res.data.videoId}?autoplay=1&mute=1`)
    
   })
   .catch(() =>{
     alert(`Sorry, I couldn't find a video with the word: ${searchText}`)
   })
  }


  let shareUrl = "https://youtu.be/" + videoObj.videoId
  return (

    <>
      <header>
        <h1 className={styles.title}>Random YouTube Player</h1>
      </header>

      <div className={styles.youtube}> 
        <iframe src={searchedVideoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>

      <div className={styles.inputStyle}>
        <input placeholder={"With word"} onChange={(e) => setSearchText(e.target.value)} />
      </div>

      <div className={styles.buttonStyle}>
          <button onClick={onClickGenerate}>GENERATE</button>
      </div>

      <div className={styles.share}>
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
