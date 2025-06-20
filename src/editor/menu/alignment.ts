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

export const setupAlignment = (editor: Editor) => {
    const leftButton = iframeDocument.getElementById('align-left-btn');
    const centerButton = iframeDocument.getElementById('align-center-btn');
    const rightButton = iframeDocument.getElementById('align-right-btn');
    const justifyButton = iframeDocument.getElementById('align-justify-btn');

    // Update button states based on editor state
    editor.on('update', () => {
        if (leftButton) {
            updateButtonState(leftButton, editor.isActive({ textAlign: 'left' }));
        }
        if (centerButton) {
            updateButtonState(centerButton, editor.isActive({ textAlign: 'center' }));
        }
        if (rightButton) {
            updateButtonState(rightButton, editor.isActive({ textAlign: 'right' }));
        }
        if (justifyButton) {
            updateButtonState(justifyButton, editor.isActive({ textAlign: 'justify' }));
        }
    });

    // Add click handlers
    leftButton?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('left').run();
        updateButtonState(leftButton, true);
        updateButtonState(centerButton!, false);
        updateButtonState(rightButton!, false);
        updateButtonState(justifyButton!, false);
    });

    centerButton?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('center').run();
        updateButtonState(leftButton!, false);
        updateButtonState(centerButton, true);
        updateButtonState(rightButton!, false);
        updateButtonState(justifyButton!, false);
    });

    rightButton?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('right').run();
        updateButtonState(leftButton!, false);
        updateButtonState(centerButton!, false);
        updateButtonState(rightButton, true);
        updateButtonState(justifyButton!, false);
    });

    justifyButton?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('justify').run();
        updateButtonState(leftButton!, false);
        updateButtonState(centerButton!, false);
        updateButtonState(rightButton!, false);
        updateButtonState(justifyButton, true);
    });
}