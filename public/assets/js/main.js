import { login } from "./features/auth/ui/login/js/login.js";
import { commonHeader } from "./shared/ui/common-header/js/common-header.js";

const header = document.getElementById("header");
const app = document.getElementById("app");

header.appendChild(commonHeader());
app.appendChild(login());
