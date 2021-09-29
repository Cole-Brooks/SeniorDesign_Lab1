# https://www.youtube.com/watch?v=SfQd1FdcTlI&t=1219s&ab_channel=ParametricCamp
import os
from http.server import HTTPServer, CGIHTTPRequestHandler
import asyncio
from sendText.sendText import sendSMS
import websockets
from sendText import sendText

PORT = 3001
lastTemp = None
shouldToggle = False
alertNumber = "3138387383"
print("Starting server, port number is " + str(PORT))


async def handleHttp(websocket, path, message):
    global lastTemp, shouldToggle, alertNumber
    print("Recieved message from user: " + message)
    print(alertNumber)
    if (message == "HTTP:TOGGLE"):
        shouldToggle = True
    elif message[0:11] == "HTTP:NUMBER":
        alertNumber = message[11:]

    if lastTemp == None:
        await websocket.send("NONE")
    else:
        print("Received Message from HTTP server")
        temp = lastTemp
        lastTemp = None
        await websocket.send(str(temp))


async def handleWS(websocket, path, message):
    global lastTemp, shouldToggle
    lastTemp = message
    print("Recieved message from client: " + message)
    if float(lastTemp) > 30 or float(lastTemp) < 0:
        sendSMS(alertNumber, float(lastTemp) > 30)
    if shouldToggle:
        await websocket.send("HTTP:TOGGLE")
        shouldToggle = False
    # else:
    #     await websocket.send("Data Received")


async def routeConnection(websocket, path):
    print("a client just connected")
    try:
        async for message in websocket:
            if message[0:5] == "HTTP:":
                await handleHttp(websocket, path, message)
            else:
                await handleWS(websocket, path, message)

    except websockets.exceptions.ConnectionClosed as e:
        print("A client just disconnected")

server = websockets.serve(routeConnection, "192.168.0.125", PORT)

asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
