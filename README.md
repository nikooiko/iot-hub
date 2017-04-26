# IOTHub

## Demo (OLD)
For now the hub is hosted at [iot-hub.tk](http://iot-hub.tk)

Admin credentials:  
Username: `admin`  
Password: `1234`  

Demo user credentials:  
Username: `demo`  
Password: `1234`  

## Description 
Presentation: [presentation](https://docs.google.com/presentation/d/1Xi2VNbumGQ3iPnQSmlPcEmbbN7ib7VYmEkX46dJeXdA/edit#slide=id.g19cd573a60_0_1204)

This app is an iot hub micro service, where owners (or consumers) can connect with their devices, monitor their status, control them and consume their send data.

Its main purpose is to serve other applications as a stream of incoming sensor's data coming from many devices.

It can be used as a multiplexer and processor of these data where many apps of the same owner can connect and receive concurrently real-time data.

## How to connect:
There are two instances that can connect to this hub, the devices and the owners of these devices.
An owner must do the following:

1. Register a new Account.
2. Deploy a number of sensors.
3. The owner or the owner's app and his sensors must connect to the hub.
4. The owner can now consume his sensor's data.

### Devices
example [iot-device](https://github.com/nikooiko/iot-device)

### Owners
examples:

1. The front-end of this app acts like an owner. 
