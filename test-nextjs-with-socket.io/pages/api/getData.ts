import { Server } from "socket.io";
import mysql from "mysql2/promise";

export default async function handler(req: any, res: any) {
    // console.log(res.socket.server.io.sockets.clients().length)
    if (res.socket.server.io) {
        console.log("socket.io is already running");
    } else {
        console.log("Socket is initializing");

        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            const intervals: any = []

            socket.on("getData", async payload => {
                const { query, interval, isStacked, id } = payload;

                socket.join(id)
                socket.broadcast.to(id).emit("data", await loadData(query, isStacked));
                intervals.push(setInterval(async () => {
                    socket.broadcast.to(id).emit("data", await loadData(query, isStacked));
                }, interval))
            })

            socket.on("disconnect", () => {
                for (const interval of intervals) clearInterval(interval)
                console.log("disconnected");
                socket._cleanup();
            })
        })
    }
    res.end();
}

async function loadData(query: string, isStacked: boolean) {
    let con: any
    try {
        con = await mysql.createConnection({
            host: "dashy.at",
            user: "Robert",
            password: "6x6J4jAdQDs%xfnt6dP2",
            database: "googlecharts",
            connectTimeout: 5000
        })

        if (con) {
            const [rows, fields] = await con.query(query);

            if (isStacked) return parseStackedData(rows, fields);
            else return parseData(rows, fields);
        }
    } catch (err: any) {
        console.log(err.message)
    } finally {
        if (con) con.end()
    }
}

function parseData(rows: any, fields: any) {
    const parsedRows = Object.values(JSON.parse(JSON.stringify(rows)));

    const data: any[] = [], fieldNames: string[] = []
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
}

function parseStackedData(rows: any, fields: any) {
    const parsedRows = Object.values(JSON.parse(JSON.stringify(rows)));

    const data: any[] = [], fieldNames: string[] = []

    for (const field of fields) {
        if (field.name !== "ID") fieldNames.push(field.name)
    }

    for (const field of fieldNames) {
        const fieldData: any[] = []
        for (const row of parsedRows) {
            const parsedRow = JSON.parse(JSON.stringify(row))
            fieldData.push(parsedRow[field])
        }
        data.push([field, ...fieldData])
    }
    return data;
}