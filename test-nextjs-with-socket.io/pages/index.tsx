import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import Script from 'next/script'
import useGoogleCharts from '@/customHooks/useGoogle'
import PieChart from '@/components/Charts/PieChart'

declare global {
  interface Window {
    google: any
  }
}

export default function Home() {
  const google: any = useGoogleCharts()

  const divStyle = {
    display: "flex",
    width: "48%"
  }

  return (
    <>
      <h1>Hello</h1>
      <p>Data:</p>
      <div style={divStyle}>
      <PieChart index={0} google={google} interval={2500}/>
      <PieChart index={1} google={google} interval={5000}/>
      <PieChart index={2} google={google} interval={2500}/>
      <PieChart index={3} google={google} interval={2500}/>
      <PieChart index={4} google={google} interval={2500}/>
      <PieChart index={5} google={google} interval={2500}/>
      <PieChart index={6} google={google} interval={2500}/>
      <PieChart index={7} google={google} interval={2500}/>
      <PieChart index={8} google={google} interval={2500}/>
      </div>
    </>
  )
}
