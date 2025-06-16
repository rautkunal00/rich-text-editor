export type ToolbarItem = {
    type: 'button' | 'select' | 'palette';
    id: string;
    label: string;
    icon?: string;
    options?: string[];
};
export declare function createToolbar(editor: any): HTMLElement;
