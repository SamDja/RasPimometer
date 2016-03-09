from flask import Flask, make_response, request
import pigpio
import DHT22
import time

READINGS_INTERVAL = 10
pi = pigpio.pi()

s = DHT22.sensor(pi, 21, LED=16, power=8)

time.sleep(.2)

s.trigger()
last_read = time.time()

app = Flask(__name__)

@app.route("/")
def index():
	raspi = request.cookies.get('raspi')
	if raspi == None:
		resp = make_response("Hello man!")
		resp.set_cookie("raspi", "value")
		return resp
	return "Hello again mate!"

@app.route("/sensor")
def sensor_response():
	global last_read
	if time.time() > (last_read + READINGS_INTERVAL):
		print "Triggered new read"
		s.trigger()
		last_read = time.time()
		
	return "Temperature : " + str(s.temperature())+ " | Humidity : " + str(s.humidity()) 



if __name__=="__main__":
	app.debug = True
	app.run(host="192.168.1.254")
