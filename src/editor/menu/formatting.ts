import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

// Function to update button state
const updateButtonState = (button: HTMLElement, isActive: boolean) => {
    if (isActive) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
};

export const setupFormatting = (editor: Editor) => {
    const boldButton = iframeDocument.getElementById('bold-btn');
    const italicButton = iframeDocument.getElementById('italic-btn');
    const underlineButton = iframeDocument.getElementById('underline-btn');
    const strikethroughButton = iframeDocument.getElementById('strikethrough-btn');

    // Update button states based on editor state
    editor.on('update', () => {
        if (boldButton) {
            updateButtonState(boldButton, editor.isActive('bold'));
        }
        if (italicButton) {
            updateButtonState(italicButton, editor.isActive('italic'));
        }
        if (underlineButton) {
            updateButtonState(underlineButton, editor.isActive('underline'));
        }
        if (strikethroughButton) {
            updateButtonState(strikethroughButton, editor.isActive('strike'));
        }
    });

    // Add click handlers
    boldButton?.addEventListener('click', () => {
        editor.chain().focus().toggleBold().run();
        updateButtonState(boldButton, editor.isActive('bold'));
    });

    italicButton?.addEventListener('click', () => {
        editor.chain().focus().toggleItalic().run();
        updateButtonState(italicButton, editor.isActive('italic'));
    });

    underlineButton?.addEventListener('click', () => {
        editor.chain().focus().toggleUnderline().run();
        updateButtonState(underlineButton, editor.isActive('underline'));
    });

    strikethroughButton?.addEventListener('click', () => {
        editor.chain().focus().toggleStrike().run();
        updateButtonState(strikethroughButton, editor.isActive('strike'));
    });
}