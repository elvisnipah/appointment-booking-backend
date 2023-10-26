const app = require("./app");
const logger = require("./utils/logger");

const port = 3001;
app.listen(port, () => {
  logger.info("listening on port", port);
});
