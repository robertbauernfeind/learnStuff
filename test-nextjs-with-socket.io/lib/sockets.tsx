import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

export async function initSocket() {
    await fetch("/api/getData")
    const socket: Socket = io()
    return socket
}