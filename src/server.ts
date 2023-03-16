import App from "./app";
import validateEnv from "@utils/validateEnv";
import IndexRoute from "@routes/index.route";
import AuthRoute from "./routes/auth.route";
import TodoRoute from "./routes/todo.route";

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new TodoRoute()]);

app.listen();
