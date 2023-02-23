import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import Script from 'next/script'
import useGoogleCharts from '@/customHooks/useGoogle'
import PieChart from '@/components/Charts/PieChart'
import StackedColumnChart from '@/components/Charts/StackedColumnChart'
import ColumnChart from '@/components/Charts/ColumnChart'

declare global {
  interface Window {
    google: any
  }
}

export default function Home() {
  const google: any = useGoogleCharts()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    (async () => {
      await fetch("/api/getData")
      setSocket(io())
    })()

    return () => {
      if (!socket) return;
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => console.log("connected"))
  }, [socket])



  return (
    <>
      <h1>Hello</h1>
      <p>Data:</p>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        listStyleType: "none",
      }}>
        {/* <PieChart index={0} google={google} socket={socket} interval={2500} />
        <PieChart index={1} google={google} socket={socket} interval={5000} />
        <PieChart index={2} google={google} socket={socket} interval={2500} />
        <PieChart index={3} google={google} socket={socket} interval={2500} />
        <PieChart index={4} google={google} socket={socket} interval={2500} />
        <PieChart index={5} google={google} socket={socket} interval={2500} />
        <PieChart index={6} google={google} socket={socket} interval={2500} />
        <PieChart index={7} google={google} socket={socket} interval={2500} />
        <PieChart index={8} google={google} socket={socket} interval={2500} /> */}
        <PieChart google={google} chartInfo={{
          id: 0,
          interval: 2500,
          query: "SELECT * FROM testdata",
        }} />
        
        <ColumnChart google={google} chartInfo={{
          id: 1,
          interval: 2500,
          query: "SELECT * FROM secondtestdata",
        }} />

        <StackedColumnChart google={google} chartInfo={{
          id: 100,
          interval: 2500,
          query: "SELECT * FROM teststackeddata",
          options: {
            isStacked: true,
          }
        }} />
      </div>
    </>
  )
}
