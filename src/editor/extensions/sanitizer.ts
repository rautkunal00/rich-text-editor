import DOMPurify from 'dompurify';

export function sanitizeHTML(value: string): string {
    const purified = DOMPurify.sanitize(value, {
        ALLOWED_ATTR: [
            'class', 'id', 'style', 'title', 'lang', 'dir', 'data-*',
            'href', 'target', 'rel', 'type', 'download', 'tabindex',
            'src', 'alt', 'width', 'height', 'loading', 'srcset', 'sizes',
            'name', 'value', 'placeholder', 'readonly', 'required', 'maxlength',
            'minlength', 'pattern', 'autocomplete', 'checked', 'disabled', 'multiple',
            'role', 'aria-*', 'allowfullscreen', 'frameborder', 'border', 'bgcolor', 'start',
            'colspan', 'rowspan', 'valign', 'axis', 'align', 'lang', 'nowrap'
        ],
        ALLOWED_TAGS: [
            'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'div', 'span',
            'ul', 'ol', 'li', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'table', 'thead', 'tbody', 'tr', 'td', 'th', 'hr',
            'code', 'pre', 'colgroup', 'col', 'blockquote', 'caption', 'sup', 'sub', 'button'
        ],
        ALLOW_ARIA_ATTR: true,
        USE_PROFILES: { html: true },
        FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link', 'base'],
        FORBID_ATTR: ['onerror', 'onload', 'onmouseover', 'onmouseenter', 'onmouseleave',
            'onfocus', 'onblur', 'onchange', 'onclick', 'onsubmit',
            'onreset', 'onkeydown', 'onkeyup', 'onkeypress',
            'oncontextmenu', 'ondblclick', 'onmousemove', 'onmouseout'],
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp|tel|file|blob):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    });
    return removeWAFTraps(purified);
}

// To remove escaped tags
function removeWAFTraps(html: string): string {
    return html
        .replace(/<img\b(?=\s|\/|>)(?![^>]*src=)[^>]*>/gi, '') // remove img with no src
        .replace(/<p[^>]*>\s*<br[^>]*data-mce-bogus="1"[^>]*>\s*<\/p>/gi, '') // remove bogus br paragraphs
        .replace(/<(p|div)[^>]*>\s*<\/\1>/gi, '') // empty p/div
        .replace(/<(p|div)[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, '') // p/div with just br or &nbsp;
        .trim();
}
