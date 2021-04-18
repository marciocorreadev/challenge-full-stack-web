"use strict";

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  static async start(port) {
    try {
      _app.default.listen(port, () => console.log(`Server running at ${port}`));
    } catch (error) {
      console.log(error);
    }
  }

}

Server.start(Number(process.env.PORT) || 3333);