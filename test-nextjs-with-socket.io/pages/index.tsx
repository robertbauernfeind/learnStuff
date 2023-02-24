import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
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
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        listStyleType: "none",
      }}>
        <PieChart google={google} chartInfo={{
          id: 0,
          interval: 2500,
          query: "SELECT * FROM testdata",
          options: {},
          design: {
            style: {
              width: 400,
              height: 300,
            },
              header: "Pie Chart",
              title: "Some title",
          }
        }} />

        <ColumnChart google={google} chartInfo={{
          id: 1,
          interval: 2500,
          query: "SELECT * FROM secondtestdata",
          options: {},
          design: {
            style: {
              width: 400,
              height: 300,
            },
            header: "Column Chart",
            title: "Some title",
          }
        }} />

        <StackedColumnChart google={google} chartInfo={{
          id: 100,
          interval: 2500,
          query: "SELECT * FROM teststackeddata",
          options: {
            isStacked: true,
          },
          design: {
            style: {
              width: 400,
              height: 300,
            },
            header: "Stacked Column Chart",
            title: "Some title",
          }
        }} />
      </div>
    </>
  )
}
