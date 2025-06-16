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
            clearcolorBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onChange('');
                closeColorPicker();
            });

            // Create palette container
            const paletteContainer = document.createElement('div');
            paletteContainer.id = 'color-palette';
            paletteContainer.style.display = 'block';
            paletteContainer.style.position = 'absolute';
            paletteContainer.style.background = '#fff';
            paletteContainer.style.border = '1px solid #ccc';
            paletteContainer.style.padding = '8px';
            paletteContainer.style.zIndex = '1000';
            paletteContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            colorContainer.appendChild(paletteContainer);

            // Add swatches
            const swatches = ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff']
            swatches.forEach((hex) => {
                const swatch = document.createElement('div');
                swatch.style.background = hex;
                swatch.style.width = '24px';
                swatch.style.height = '24px';
                swatch.style.display = 'inline-block';
                swatch.style.margin = '4px';
                swatch.style.cursor = 'pointer';
                swatch.style.border = '1px solid #000';
                swatch.title = hex;
                swatch.onclick = (e) => {
                    e.stopPropagation();
                    onChange(hex);
                    closeColorPicker();
                }
                paletteContainer.appendChild(swatch);
            });

            // Advanced button
            const advancedBtn = document.createElement('button');
            advancedBtn.textContent = 'Advanced';
            advancedBtn.style.display = 'block';
            advancedBtn.style.marginTop = '8px';
            advancedBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!iroPickerInitialized) {
                    createColorPicker(container, (hex) => {
                        onChange(hex);
                        closeColorPicker();
                    });
                    iroPickerInitialized = true;
                }
                paletteContainer.style.display = 'none';
            });
            paletteContainer.appendChild(advancedBtn);

            const container = document.createElement('div');
            let iroPickerInitialized = false;

            // Show palette on click
            const rect = button.getBoundingClientRect();
            colorContainer.style.top = `${rect.bottom + window.scrollY}px`;
            colorContainer.style.left = `${rect.left + window.scrollX}px`;
            colorContainer.style.display = 'block';
            colorContainer.style.position = 'absolute';
            colorContainer.style.width = '300px';
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
