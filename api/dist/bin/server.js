"use strict";

require("reflect-metadata");

var _database = _interopRequireDefault(require("../database"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  static async start(port) {
    try {
      const connection = await (0, _database.default)();
      if (connection.isConnected) console.log('Database connected!');else throw new Error("Failed to connect to the database!");

      _app.default.listen(port, () => console.log(`Server running at ${port}`));
    } catch (error) {
      console.log(error);
    }
  }

}

Server.start(Number(process.env.PORT) || 3333);