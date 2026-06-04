import DOMPurify from 'dompurify';

export const sanitizeHTML = (value: string): string => {
    const purified = DOMPurify.sanitize(value, {
        ALLOWED_TAGS: [
            'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'div', 'span',
            'ul', 'ol', 'li', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'table', 'thead', 'tbody', 'tr', 'td', 'th', 'hr', 'embed', 'iframe',
            'code', 'pre', 'colgroup', 'col', 'blockquote', 'caption', 'sup', 'sub', 'button'
        ],
        ALLOWED_ATTR: [
            'class', 'id', 'style', 'title', 'lang', 'dir', 'data-*',
            'href', 'target', 'rel', 'type', 'download', 'tabindex',
            'src', 'alt', 'width', 'height', 'loading', 'srcset', 'sizes',
            'name', 'value', 'placeholder', 'readonly', 'required', 'maxlength',
            'minlength', 'pattern', 'autocomplete', 'checked', 'disabled', 'multiple',
            'role', 'aria-*', 'allowfullscreen', 'frameborder', 'border', 'bgcolor', 'start',
            'colspan', 'rowspan', 'valign', 'axis', 'align', 'nowrap'
        ],
        //  Explicitly allow iframe and its attributes
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'sandbox'],

        ALLOW_ARIA_ATTR: true,
        USE_PROFILES: { html: true },

        FORBID_TAGS: ['script', 'object', 'link', 'base'],
        FORBID_ATTR: [
            'onerror', 'onload', 'onmouseover', 'onmouseenter', 'onmouseleave',
            'onfocus', 'onblur', 'onchange', 'onclick', 'onsubmit',
            'onreset', 'onkeydown', 'onkeyup', 'onkeypress',
            'oncontextmenu', 'ondblclick', 'onmousemove', 'onmouseout'
        ],
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    });

    return removeWAFTraps(purified);
};


// To remove escaped tags
const removeWAFTraps = (html: string): string => {
    return html
        .replace(/<img\b(?=\s|\/|>)(?![^>]*src=)[^>]*>/gi, '') // remove img with no src
        .replace(/<p[^>]*>\s*<br[^>]*data-mce-bogus="1"[^>]*>\s*<\/p>/gi, '') // remove bogus br paragraphs
        .replace(/<(p|div)[^>]*>\s*<\/\1>/gi, '') // empty p/div
        .replace(/<(p|div)[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, '') // p/div with just br or &nbsp;
        .trim();
}
