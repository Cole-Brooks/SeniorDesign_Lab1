# https://www.youtube.com/watch?v=SfQd1FdcTlI&t=1219s&ab_channel=ParametricCamp
import os
from http.server import HTTPServer, CGIHTTPRequestHandler
import asyncio
import websockets

PORT = 3001
lastTemp = None

print("Starting server, port number is " + str(PORT))

async def handleHttp(websocket, path, message):
	global lastTemp
	print("Received Message from HTTP server")
	await websocket.send(str(lastTemp))

async def handleWS(websocket, path, message):
	global lastTemp
	lastTemp = message
	print("Recieved message from client: " + message)
	await websocket.send("Data Recieved")

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

server = websockets.serve(routeConnection, "192.168.0.64", PORT)

asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()