import { login } from "./features/auth/ui/login.js";

console.log("main.js");
const app = document.getElementById("app");
app.replaceChildren(login());
