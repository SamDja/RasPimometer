#!/usr/bin/python
from flask import Flask, json
from threading import Thread
# import pigpio
# import DHT22
import time

READINGS_INTERVAL = 10
# pi = pigpio.pi()
#
# s = DHT22.sensor(pi, 21, LED=16, power=8)
#
# time.sleep(.2)
#
# sensor_thread = Thread(target = read_sensor())

app = Flask(__name__)

def read_sensor(sensor):
	while True:
		sensor.trigger()
		time.sleep(5)

@app.route("/")
@app.route("/<path:path>")
def index(path = None):
	return app.send_static_file('index.html')

@app.route("/api/sensor", methods=["GET"])
def sensor_response():
	# return "Temperature : " + str(s.temperature())+ " | Humidity : " + str(s.humidity())
	return json.jsonify(name="Bedroom", temperature=10, humidity=65)



if __name__=="__main__":
	app.debug = True
	app.run()
