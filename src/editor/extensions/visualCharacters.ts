import { Extension } from "@tiptap/core";
import { iframeDocument } from "../globalVariables";

export const VisualCharacters = Extension.create({
    name: 'visualCharacters',

    addCommands() {
        return {
            toggleVisualCharacters: () => {
                return () => {
                    const editorHTML = iframeDocument.querySelector('.tiptap-editor') as HTMLElement;
                    editorHTML.classList.toggle('tiptap-visual-characters');
                    // if (editorHTML.classList.contains('tiptap-visual-characters')) {

                    //     const brTag = editorHTML.querySelectorAll('p br');
                    //     brTag.forEach((br) => {
                    //         if (br) {
                    //             const newContent = iframeDocument.createElement('div');
                    //             newContent.style.display = 'inline-block';
                    //             newContent.classList.add('visualChars');
                    //             br?.parentNode?.insertBefore(newContent, br);
                    //         }
                    //     });
                    // } else {
                    //     const visualCharsElements = editorHTML.querySelectorAll('span.visualChars');
                    //     if (visualCharsElements) {
                    //         visualCharsElements.forEach((element) => {
                    //             if ((element as HTMLElement).innerText) {
                    //                 element.classList.remove('visualChars');
                    //             } else {
                    //                 element.remove();
                    //             }
                    //         });
                    //     }
                    // }
                    return true;
                }
            }
        }
    }
});