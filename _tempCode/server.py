import socket
import time
from datetime import datetime

HOST = '127.0.0.1' 
PORT = 8000       

from flask import Flask
app = Flask(__name__)
 
@app.route('/')
def home():
    return 'Hello World!'
 
if __name__ == '__main__':

    app.run(HOST, PORT)

