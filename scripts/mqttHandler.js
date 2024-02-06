const mqtt = require('mqtt');
const mysql = require('mysql');
const options = require('../options.json')

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
    this.mqttClient.subscribe('volume', { qos: 0 });
    this.mqttClient.subscribe('temp', { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log("Topic: " + topic + "\nMessage: " + message.toString());
      try {
        let messageJson = JSON.parse(message.toString());

        switch (topic) {
          case "temp":
            dbSendTemp(messageJson.clientId, messageJson.message)
            break;
          case "volume":
            dbSendVolume(messageJson.clientId, messageJson.message)
            break;
          default:
            break;
        }

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

function dbSendTemp(deviceMac, temp) {
  let con = mysql.createConnection(options.database)
  con.connect((err => {
    if (err) {
      console.log(err);
      con.end();
    } else {
      let query = mysql.format("select id_recipiente as id from recipiente where mac_address = ?", [deviceMac]);
      con.query(query, (err, result) => {
        if (err) {
          console.log(err);
          con.end();
        } else {
          let id = result[0].id;
          query = mysql.format("insert into temp(valor, id_recipiente) values(?,?)", [temp, id]);
          con.query(query, (err, result) => {
            if (err) {
              console.log(err);
              con.end();
            } else { con.end(); }
          })
        }
      })
    }
  }))
}

function dbSendVolume(deviceMac, temp) {
  let con = mysql.createConnection(options.database)
  con.connect((err => {
    if (err) {
      console.log(err);
      con.end();
    } else {
      let query = mysql.format("select id_recipiente as id from recipiente where mac_address = ?", [deviceMac]);
      con.query(query, (err, result) => {
        if (err) {
          console.log(err);
          con.end();
        } else {
          let id = result[0].id;
          query = mysql.format("insert into volume(valor, id_recipiente) values(?,?)", [temp, id]);
          con.query(query, (err, result) => {
            if (err) {
              console.log(err);
              con.end();
            } else { con.end(); }
          })
        }
      })
    }
  }))
}

module.exports = MqttHandler;