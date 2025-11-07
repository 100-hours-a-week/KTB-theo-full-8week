import { login } from "./features/auth/ui/login.js";
import { header } from "./shared/header.js";

const s = document.getElementById("header");
const app = document.getElementById("app");
s.appendChild(header());
app.appendChild(login());
