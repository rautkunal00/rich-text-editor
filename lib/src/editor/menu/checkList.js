export const setupChecklist = (editor) => {
    const btn = document.getElementById('checklist-btn');
    if (!btn)
        return;
    btn.addEventListener('click', () => {
        editor.chain().focus().toggleTaskList().run();
    });
};
