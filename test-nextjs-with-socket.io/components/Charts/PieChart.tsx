import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import Script from 'next/script'
import useGoogleCharts from '@/customHooks/useGoogle'


let socket: Socket

export default function PieChart({index, google, interval}: {index: number, google: any, interval: number}) {
    const [data, setData] = useState<string>()
    const divid = "chart_div" + index    

    useEffect(() => {
        (async () => {
            await fetch("/api/getData")
            socket = io()
            socket.on("connect", () => console.log("connected"));

            socket.emit("getData", { interval: interval, index: index })
            socket.on("data", (res) => setData(res))
        })()
    }, [])

    useEffect(() => {
        if (!google || !data) return
        google.charts.setOnLoadCallback(drawChart);
    }, [data])

    function drawChart() {
        // Create the data table.
        var chartData = new google.visualization.arrayToDataTable(data);

        // Set chart options
        var options = {
            'title': 'Temperature in cities',
            'width': 400,
            'height': 300,
            is3D: true,
            legend: 'none'
        };
        
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById(divid));
        chart.clearChart()
        chart.draw(chartData, options);
    }

    return (
        <div id={divid} style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            listStyleType: "none",
            border: "1px solid black",
            margin: 10
          }}/>
    )
}