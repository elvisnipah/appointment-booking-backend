const app = require("./app");
const logger = require("./utils/logger");
const config = require("./utils/config");

const port = config.PORT;
app.listen(port, () => {
  logger.info("listening on port", port);
});
