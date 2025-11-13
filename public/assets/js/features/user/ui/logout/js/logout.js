import { emit } from "../../../../../shared/lib/eventBus.js";
import { login } from "../../../../auth/ui/login/js/login.js";
import { clearPathHistory } from "../../../../../shared/lib/router.js";

export function logout() {
    localStorage.clear();
    clearPathHistory();
    emit('user:logout', {});
    return login();

}