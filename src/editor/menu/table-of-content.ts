import { Editor } from "@tiptap/core";
import { iframeDocument } from "../globalVariables";
import { TextSelection } from "prosemirror-state";

export const toc = (editor: Editor) => {
  const tocBtn = iframeDocument.getElementById("toc-btn");

  if (!tocBtn) return;
  

  tocBtn.addEventListener("click", () => {
    const cursorPos = editor.state.selection.from;
    
    const anchors = (editor.storage as any).tableOfContents.anchors as any[];

    const content = document.createElement("blockquote");

    const header = document.createElement("h2");
    header.innerText = "Table of Content";
    content.appendChild(header);

    const ul = document.createElement("ul");

    anchors.forEach((anchor) => {
      const li = document.createElement("li");

      const a = document.createElement("a");

      a.textContent = anchor.textContent;
      a.href = `#${anchor.id}`;
      a.target = "_self";

      a.classList.add("toc-anchor");

      li.appendChild(a);
      ul.appendChild(li);
    });

    content.appendChild(ul);

    editor.commands.focus();
    editor.view.dispatch(
      editor.state.tr.setSelection(TextSelection.create(editor.state.doc, cursorPos))
    );
    editor.commands.insertContent(content.outerHTML);
  });

  iframeDocument.addEventListener("click", 
    (e) => {
    const target = e.target as HTMLElement;

    const link = target.closest(
      'a[href^="#"]'
    ) as HTMLAnchorElement | null;

    if (!link) return;

    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;

    const el = iframeDocument.getElementById(id);
    if (!el) return;


    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
);
};