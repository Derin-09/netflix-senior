"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import LoadingPage from '../../LoadingPage/LoadingPage'

const Selected = dynamic(() => import('./Selected'), {
  loading: () => <LoadingPage />,
  ssr: false
})

const RenderThisPage = ( ) => {
  const params = useParams()

  return (
    <Selected  movieID={String(params.movie)} />
  )
}

export default RenderThisPage