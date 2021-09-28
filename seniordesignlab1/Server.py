# https://www.youtube.com/watch?v=SfQd1FdcTlI&t=1219s&ab_channel=ParametricCamp
import os
from http.server import HTTPServer, CGIHTTPRequestHandler
import asyncio
import websockets
from tinydb import TinyDB, Query

db = TinyDB('db.json')
PORT = 3000

print("Starting server, port number is " + str(PORT))


def insert(msg):
    db.insert({'message': msg})


async def echo(websocket, path):
    print("a client just connected")
    try:
        async for message in websocket:
            print("Received message from client: " + message)
            """If message is within websocket is lightUpScreen, then send it to Arduino; 
            otherwise, add it to the database"""
            if message == 'false' or message == 'true':
                print(message)
                websocket.send(message)
            else:
                insert(message)
            await websocket.send("Data Received")
    except websockets.exceptions.ConnectionClosed as e:
        print("A client just disconnected")

    localserver = "192.168.0.64"

server = websockets.serve(echo, "192.168.0.202", PORT)

asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
