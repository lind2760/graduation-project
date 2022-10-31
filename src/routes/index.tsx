import { useRoutes } from "react-router-dom";

import routes from "./config";

function CRouter() {
  return useRoutes(routes);
}
export default CRouter;
