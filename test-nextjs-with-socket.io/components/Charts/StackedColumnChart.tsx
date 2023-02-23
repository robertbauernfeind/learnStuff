import { initSocket } from '@/lib/sockets'
import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import options from "./initialOptions.json"

type ChartProps = {
    google: any,
    chartInfo: any
}
export default function StackedColumnChart({ google, chartInfo }: ChartProps) {
    const [data, setData] = useState<any[]>([])
    const [socket, setSocket] = useState<Socket | undefined>()
    const divid = "chart_div" + chartInfo.id

    useEffect(() => {
        (async () => {
            setSocket(await initSocket())
        })()

        return () => {
            if (!socket) return;
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.on("connect", () => console.log("connected"))

        socket.emit("getData", {
            id: chartInfo.id,
            query: chartInfo.query,
            interval: chartInfo.interval,
            isStacked: true
        })
        socket.on("data", (res) => setData(res))
        console.log("Loading data");

        return () => {
            socket.off("data")
        }
    }, [socket])


    // might not work properly
    // executing every ms (may change to interval?)
    useEffect(() => {
        if (!google || !data) return
        google.charts.setOnLoadCallback(drawChart);
    }, [data])

    function drawChart() {
        // Create the data table.
        var chartData = new google.visualization.arrayToDataTable(data);

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById(divid));

        const chartOptions = {
            ...options,
            ...chartInfo.options
        }

        chart.draw(chartData, chartOptions);
    }

    return (
        <div id={divid} style={{ border: "1px solid black", margin: 10 }} />
    )
}