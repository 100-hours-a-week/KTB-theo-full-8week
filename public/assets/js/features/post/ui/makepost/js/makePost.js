import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";

activeFeatureCss(cssPath.MAKE_POST_CSS_PATH);

export function makePost() {
    const root = document.createElement('div');
    root.className = 'make-post-container'
    root.innerHTML =
        `
        <div class="make-post-wrapper">
            <h2>게시글 작성</h2>
            <form id="make-post-form">
                <div class="make-post-field">
                    <label class="make-post-label">제목*</label>
                    <input id="make-post-form-title" name="title" class="make-post-input" required
                        placeholder="제목을 입력해주세요.(최대 26글자)">
                </div>
                <div class="make-post-field">
                    <label class="make-post-label">내용*</label>
                    <textarea id="make-post-form-article" type="" name="article" class="make-post-input" required
                        placeholder="내용을 입력해주세요"></textarea>
                    <p id="make-post-form-helper-text">*helper text</p>
                </div>
                <div class="make-post-field">
                    <label class="make-post-label">이미지</label>
                    <div class="make-post-form-file-row">
                        <input id="make-post-form-article-image" type="file" accept="image/*" name="article-image"
                            class="make-post-input"></input>
                        <label class="make-post-file-btn" for="make-post-form-article-image">
                            파일 선택
                        </label>
                        <span class="make-post-file-text">파일을 선택해주세요</span>
                    </div>
                </div>
                <button id="make-post-btn" type="submit" disabled>완료</button>
            </form>
        </div>
        `
    return root;
}