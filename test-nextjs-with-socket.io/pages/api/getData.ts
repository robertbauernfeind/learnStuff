import { Server } from "socket.io";
import mysql from "mysql2/promise";

export default async function handler(req: any, res: any) {
    if (res.socket.server.io) {
        console.log("socket.io is already running");
    } else {
        console.log("Socket is initializing");


        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            // console.log("New client connected");

            socket.on("getData", payload => {
                const interval = payload.interval;
                const index = payload.index;

                setInterval(async () => {
                    const min = 0, max = 100;
                    const data = [[
                        ["Location", "Temperature"],
                        ["New York", Math.floor(Math.random() * (max - min) + min)],
                        ["Berlin", Math.floor(Math.random() * (max - min) + min)],
                        ["London", Math.floor(Math.random() * (max - min) + min)],
                        ["Paris", Math.floor(Math.random() * (max - min) + min)],
                    ], [
                        ["Location", "Temperature"],
                        ["Vöcklabuck", Math.floor(Math.random() * (max - min) + min)],
                        ["Timelkam", Math.floor(Math.random() * (max - min) + min)],
                        ["Gampern", Math.floor(Math.random() * (max - min) + min)],
                        ["Weiterschwang", Math.floor(Math.random() * (max - min) + min)],
                    ]]

                    let res: any
                    try {
                    res = await loadData();
                    } catch (err: any) {
                        console.log(err.message)
                    }
                    
                    socket.emit("data", res);
                }, interval)
            })
        })
    }
    res.end();
}

async function loadData() {
    const con = await mysql.createConnection({
        host: "dashy.at",
        user: "Robert",
        password: "6x6J4jAdQDs%xfnt6dP2",
        database: "googlecharts",
        connectTimeout: 10000
    });

    try {
        const [rows, fields] = await con.query("SELECT * FROM testdata");
        const parsedRows = Object.values(JSON.parse(JSON.stringify(rows)));

        const data: any[] = [], fieldNames: string[] = [];

    // prepare data for google charts
    // Iterate field names and add field name if it is not ID
    for (const field of fields) {
        if (field.name !== "ID") {
            fieldNames.push(field.name)
        }
    }
    data.push(fieldNames);

    // Iterate rows and add row data if it is not ID
    for (const row of parsedRows) {
        const parsedRow = JSON.parse(JSON.stringify(row))
        const rowData: any[] = []

        for (const key in parsedRow) {
            if (key !== "ID") rowData.push(parsedRow[key])
        }

        if (rowData.length !== 0) data.push(rowData);
    }

    return data;
    } catch (err: any) {
        console.log(err.message)
    } finally {
        if(con) con.end()
    }
}