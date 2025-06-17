import iro from '@jaames/iro';

// Global state to track active color picker
let activeColorPicker: HTMLElement | null = null;

function createColorPicker(container: HTMLElement, onChange: (hex: string) => void) {
    const picker = iro.ColorPicker(container!, {
        color: '#f00',
        width: 200,
        layout: [
            {
                component: iro.ui.Wheel,
            }
        ]
    });

    picker.on('color:change', (color: { hexString: string }) => {
        onChange(color.hexString);
    });

    return picker;
}

export function createColorPickerWithPalette(button: HTMLElement, onChange: (hex: string) => void, toolbar: HTMLElement) {
    let isColorpaletteOpen = false;
    let colorContainer: HTMLElement | null = null;
    let currentColor = '';

    // Function to update button color
    const updateButtonColor = (color: string) => {
        currentColor = color;
        if (color) {
            button.style.backgroundColor = color;
            button.style.color = getContrastColor(color);
        } else {
            button.style.backgroundColor = '';
            button.style.color = '';
        }
    };

    // Function to get contrasting text color
    const getContrastColor = (hexColor: string) => {
        // Remove the hash if it exists
        const hex = hexColor.replace('#', '');
        
        // Convert to RGB
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return black or white based on luminance
        return luminance > 0.5 ? '#000000' : '#ffffff';
    };

    // Function to close the color picker
    const closeColorPicker = () => {
        if (isColorpaletteOpen && colorContainer) {
            isColorpaletteOpen = false;
            colorContainer.remove();
            colorContainer = null;
            activeColorPicker = null;
        }
    };

    // Function to close any active color picker
    const closeActiveColorPicker = () => {
        if (activeColorPicker && activeColorPicker !== colorContainer) {
            activeColorPicker.remove();
            activeColorPicker = null;
        }
    };

    // Add click handler to close color picker when clicking outside
    const handleDocumentClick = (event: MouseEvent) => {
        if (isColorpaletteOpen && colorContainer) {
            const target = event.target as HTMLElement;
            // Check if the click is outside the color picker and not on the color picker button
            if (!colorContainer.contains(target) && target !== button && !button.contains(target)) {
                closeColorPicker();
            }
        }
    };

    // Add click handler to toolbar buttons
    const handleToolbarClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const clickedButton = target.closest('button');
        
        if (clickedButton) {
            const buttonId = clickedButton.id;
            // Close if clicking any button except the current color picker button
            if (buttonId && (buttonId === 'text-color-btn' || buttonId === 'highlight-color-btn' || 
                (clickedButton !== button && !button.contains(clickedButton)))) {
                closeColorPicker();
            }
        }
    };

    // Add event listeners
    document.addEventListener('click', handleDocumentClick);
    toolbar.addEventListener('click', handleToolbarClick);

    button.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation(); // Prevent the document click handler from immediately closing
        if (isColorpaletteOpen) {
            closeColorPicker();
        } else {
            // Close any other active color picker first
            closeActiveColorPicker();
            
            isColorpaletteOpen = true;
            colorContainer = document.createElement('div');
            colorContainer.id = 'color-picker-container';
            activeColorPicker = colorContainer;

            const clearcolorBtn = document.createElement('button');
            clearcolorBtn.id = 'clear-color-btn';
            clearcolorBtn.textContent = 'reset';
            clearcolorBtn.style.cssText = `
                position: absolute;
                bottom: 8px;
                right: 8px;
                padding: 4px 8px;
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
            `;
            clearcolorBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onChange('');
                updateButtonColor('');
                closeColorPicker();
            });

            // Create palette container
            const paletteContainer = document.createElement('div');
            paletteContainer.id = 'color-palette';
            paletteContainer.style.cssText = `
                display: block;
                position: relative;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 12px;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                margin-bottom: 32px;
            `;
            colorContainer.appendChild(paletteContainer);

            // Add swatches
            const swatches = ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff']
            swatches.forEach((hex) => {
                const swatch = document.createElement('div');
                swatch.style.cssText = `
                    background: ${hex};
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    margin: 4px;
                    cursor: pointer;
                    border: 1px solid #000;
                    border-radius: 4px;
                    transition: transform 0.2s;
                `;
                swatch.title = hex;
                swatch.onclick = (e) => {
                    e.stopPropagation();
                    onChange(hex);
                    updateButtonColor(hex);
                    closeColorPicker();
                }
                swatch.onmouseover = () => {
                    swatch.style.transform = 'scale(1.1)';
                }
                swatch.onmouseout = () => {
                    swatch.style.transform = 'scale(1)';
                }
                paletteContainer.appendChild(swatch);
            });

            // Advanced button
            const advancedBtn = document.createElement('button');
            advancedBtn.textContent = 'Advanced';
            advancedBtn.style.cssText = `
                display: block;
                margin-top: 12px;
                padding: 6px 12px;
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                width: 100%;
                transition: all 0.2s;
            `;
            advancedBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!iroPickerInitialized) {
                    const container = document.createElement('div');
                    container.style.cssText = `
                        padding: 12px;
                        background: #fff;
                        border-radius: 8px;
                    `;
                    createColorPicker(container, (hex) => {
                        onChange(hex);
                        updateButtonColor(hex);
                        closeColorPicker();
                    });
                    iroPickerInitialized = true;
                    paletteContainer.innerHTML = '';
                    paletteContainer.appendChild(container);
                }
            });
            advancedBtn.onmouseover = () => {
                advancedBtn.style.background = '#e5e7eb';
            }
            advancedBtn.onmouseout = () => {
                advancedBtn.style.background = '#f3f4f6';
            }
            paletteContainer.appendChild(advancedBtn);

            const container = document.createElement('div');
            let iroPickerInitialized = false;

            // Position the color picker
            const buttonRect = button.getBoundingClientRect();
            const toolbarRect = toolbar.getBoundingClientRect();
            const pickerWidth = 300;
            const pickerHeight = 200;

            // Calculate initial position
            let top = buttonRect.bottom + window.scrollY;
            let left = buttonRect.left + window.scrollX;

            // Adjust position to stay within viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Check right edge
            if (left + pickerWidth > viewportWidth) {
                left = viewportWidth - pickerWidth - 20;
            }

            // Check left edge
            if (left < toolbarRect.left) {
                left = toolbarRect.left;
            }

            // Check bottom edge
            if (top + pickerHeight > viewportHeight + scrollY) {
                // Try to position above the button
                top = buttonRect.top + scrollY - pickerHeight;
                
                // If still doesn't fit, position at the top of the viewport
                if (top < scrollY) {
                    top = scrollY + 20;
                }
            }

            // Apply the calculated position
            colorContainer.style.cssText = `
                position: fixed;
                top: ${top}px;
                left: ${left}px;
                width: ${pickerWidth}px;
                display: block;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 1000;
            `;
            colorContainer.appendChild(container);
            colorContainer.appendChild(clearcolorBtn);
            toolbar.appendChild(colorContainer);
        }
    });

    // Cleanup function to remove event listeners
    return () => {
        document.removeEventListener('click', handleDocumentClick);
        toolbar.removeEventListener('click', handleToolbarClick);
    };
}
