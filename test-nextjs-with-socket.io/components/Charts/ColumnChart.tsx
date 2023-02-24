import { useEffect, useState } from 'react'
import { Socket } from "socket.io-client"
import options from "./initialOptions.json"
import { initSocket } from '@/lib/sockets'
import CardLayout from '../CardLayout'

type ChartProps = {
    google: any
    chartInfo: any
}
export default function ColumnChart({ google, chartInfo }: ChartProps) {
    const [data, setData] = useState<any[]>([])
    const [socket, setSocket] = useState<Socket | undefined>()
    const divid = "chart_div" + chartInfo.id

    const { id, query, interval, design } = chartInfo
    const {header, title, style} = design
  
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
        if (id === undefined || query === undefined || interval === undefined) return

        socket.on("connect", () => console.log("connected"))

        socket.emit("getData", {
            id: chartInfo.id,
            query: chartInfo.query,
            interval: chartInfo.interval,
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
        if (id === undefined || query === undefined || interval === undefined) return

        google.charts.setOnLoadCallback(drawChart);
    }, [data])

    function drawChart() {
        // Create the data table.
        var chartData = new google.visualization.arrayToDataTable(data);

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById(divid));

        const chartOptions = {
            ...options,
            ...chartInfo.options,
        }

        if(style) {
            if(style.width) chartOptions.width = style.width
            if(style.height) chartOptions.height = style.height - 85
        }

        chart.draw(chartData, chartOptions);
    }

    return (
        <CardLayout
            header={header}
            title={title}
            style={style}
        >
            {(id === undefined || query === undefined || interval === undefined) ? <div>Please make sure to provide id, query and interval</div>
            :
            <div id={divid} style={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
            }} />
        }
        </CardLayout>
    )
}