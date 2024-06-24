import { GlobalAnimation } from '@/components/Lottie/GlobalAnimation'
import GlobalPost from '@/components/Post/GlobaPost'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col  items-center min-h-[80vh]'>
      <GlobalAnimation/>
      <GlobalPost/>
    </div>
  )
}

export default Page
