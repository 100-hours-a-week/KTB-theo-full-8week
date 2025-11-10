import { activeFeatureCss } from "../../../shared/lib/dom.js";
import { postCard } from "./postCard.js";


// CSS Path
const POST_CARD_LIST_CSS_PATH = '/post/ui/postCardList.css';

activeFeatureCss(POST_CARD_LIST_CSS_PATH);

export function postCardList() {
    const root = document.createElement('div');
    root.className = 'post-card-list-container'
    root.appendChild(postCard());
    root.appendChild(postCard());
    root.appendChild(postCard());


    return root;
}