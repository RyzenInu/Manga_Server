const mqtt = require('mqtt');

class MqttHandler {
  constructor(host, clientName, username, password) {
    this.mqttClient = clientName;
    this.host = host;
    this.username = username; // mqtt credentials if these are needed to connect
    this.password = password;
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('#', { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      try {
        console.log(JSON.parse(message.toString()));
      } catch (e) {
        console.log(e);
      }
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopica
  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }

  getMessage(topic, message) {
    this.mqttClient.on('message', (topic, message));
  }
}

module.exports = MqttHandler;