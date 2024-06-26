import JobSearch from '@/components/Job/Jobs'
import { JobAnim } from '@/components/Lottie/JobAnim'
import React from 'react'

const Page = () => {
  return (
    <div className='flex justify-center flex-col items-center min-h-[80vh]'>
      <JobAnim/>
      <JobSearch/>
    </div>
  )
}

export default Page
