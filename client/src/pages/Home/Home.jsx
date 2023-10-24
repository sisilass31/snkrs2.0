import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Post from '../../components/Post'
import ShowPost from '../../components/showPost'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Post/>
      <ShowPost/>
      <Footer/>
    </>
  )
}

export default Home
