import { login } from "./features/auth/ui/login.js";
import { header } from "./shared/header.js";

const app = document.getElementById("app");
app.appendChild(header());
app.replaceChildren(login());
