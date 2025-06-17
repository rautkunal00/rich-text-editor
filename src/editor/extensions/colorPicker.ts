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
    let tempColor = '';

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

            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.style.cssText = `
                display: flex;
                gap: 8px;
                padding: 0 12px 12px;
                margin-top: 8px;
            `;

            // Advanced button
            const advancedBtn = document.createElement('button');
            advancedBtn.textContent = 'Advanced';
            advancedBtn.style.cssText = `
                flex: 1;
                padding: 6px 12px;
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
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

                    // Create color picker
                    const picker = createColorPicker(container, (hex) => {
                        tempColor = hex;
                        hexInput.value = hex;
                    });

                    // Create hex input container
                    const hexInputContainer = document.createElement('div');
                    hexInputContainer.style.cssText = `
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-top: 16px;
                        padding: 0 4px;
                    `;

                    // Create hex label
                    const hexLabel = document.createElement('span');
                    hexLabel.textContent = 'HEX:';
                    hexLabel.style.cssText = `
                        font-size: 12px;
                        color: #4b5563;
                        font-weight: 500;
                    `;

                    // Create hex input
                    const hexInput = document.createElement('input');
                    hexInput.type = 'text';
                    hexInput.value = tempColor;
                    hexInput.style.cssText = `
                        flex: 1;
                        padding: 6px 8px;
                        border: 1px solid #d1d5db;
                        border-radius: 4px;
                        font-size: 12px;
                        font-family: monospace;
                        outline: none;
                        transition: all 0.2s;
                        width: 100%;
                    `;
                    hexInput.onfocus = () => {
                        hexInput.style.borderColor = '#2563eb';
                        hexInput.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
                    };
                    hexInput.onblur = () => {
                        hexInput.style.borderColor = '#d1d5db';
                        hexInput.style.boxShadow = 'none';
                    };
                    hexInput.oninput = (e) => {
                        const input = e.target as HTMLInputElement;
                        let value = input.value;
                        
                        // Remove any non-hex characters
                        value = value.replace(/[^0-9A-Fa-f]/g, '');
                        
                        // Ensure it starts with #
                        if (!value.startsWith('#')) {
                            value = '#' + value;
                        }
                        
                        // Limit to 7 characters (#RRGGBB)
                        if (value.length > 7) {
                            value = value.slice(0, 7);
                        }
                        
                        input.value = value;
                        
                        // Update color if valid hex
                        if (value.length === 7) {
                            tempColor = value;
                            picker.color.set(value);
                        }
                    };

                    hexInputContainer.appendChild(hexLabel);
                    hexInputContainer.appendChild(hexInput);
                    container.appendChild(hexInputContainer);

                    // Create confirm button container
                    const confirmContainer = document.createElement('div');
                    confirmContainer.style.cssText = `
                        display: flex;
                        gap: 8px;
                        margin-top: 16px;
                    `;

                    // Create confirm button
                    const confirmBtn = document.createElement('button');
                    confirmBtn.textContent = 'Apply';
                    confirmBtn.style.cssText = `
                        flex: 1;
                        padding: 8px 24px;
                        background: #2563eb;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        font-size: 13px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s;
                        box-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
                    `;
                    confirmBtn.onmouseover = () => {
                        confirmBtn.style.background = '#1d4ed8';
                        confirmBtn.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.2)';
                    }
                    confirmBtn.onmouseout = () => {
                        confirmBtn.style.background = '#2563eb';
                        confirmBtn.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.1)';
                    }
                    confirmBtn.onclick = (e) => {
                        e.stopPropagation();
                        onChange(tempColor);
                        updateButtonColor(tempColor);
                        closeColorPicker();
                    };

                    // Create reset button for advanced view
                    const advancedResetBtn = document.createElement('button');
                    advancedResetBtn.textContent = 'Reset';
                    advancedResetBtn.style.cssText = `
                        flex: 1;
                        padding: 8px 24px;
                        background: #f3f4f6;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        font-size: 13px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s;
                    `;
                    advancedResetBtn.onmouseover = () => {
                        advancedResetBtn.style.background = '#e5e7eb';
                    }
                    advancedResetBtn.onmouseout = () => {
                        advancedResetBtn.style.background = '#f3f4f6';
                    }
                    advancedResetBtn.onclick = (e) => {
                        e.stopPropagation();
                        onChange('');
                        updateButtonColor('');
                        closeColorPicker();
                    };

                    confirmContainer.appendChild(confirmBtn);
                    confirmContainer.appendChild(advancedResetBtn);
                    container.appendChild(confirmContainer);

                    iroPickerInitialized = true;
                    paletteContainer.innerHTML = '';
                    paletteContainer.appendChild(container);
                    
                    // Hide the Advanced button and button container
                    buttonContainer.style.display = 'none';
                }
            });
            advancedBtn.onmouseover = () => {
                advancedBtn.style.background = '#e5e7eb';
            }
            advancedBtn.onmouseout = () => {
                advancedBtn.style.background = '#f3f4f6';
            }

            // Reset button
            const clearcolorBtn = document.createElement('button');
            clearcolorBtn.id = 'clear-color-btn';
            clearcolorBtn.textContent = 'Reset';
            clearcolorBtn.style.cssText = `
                flex: 1;
                padding: 6px 12px;
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            `;
            clearcolorBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onChange('');
                updateButtonColor('');
                closeColorPicker();
            });
            clearcolorBtn.onmouseover = () => {
                clearcolorBtn.style.background = '#e5e7eb';
            }
            clearcolorBtn.onmouseout = () => {
                clearcolorBtn.style.background = '#f3f4f6';
            }

            buttonContainer.appendChild(advancedBtn);
            buttonContainer.appendChild(clearcolorBtn);
            colorContainer.appendChild(buttonContainer);

            const container = document.createElement('div');
            let iroPickerInitialized = false;

            // Position the color picker
            const buttonRect = button.getBoundingClientRect();
            const toolbarRect = toolbar.getBoundingClientRect();
            const pickerWidth = 250;
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
            toolbar.appendChild(colorContainer);
        }
    });

    // Cleanup function to remove event listeners
    return () => {
        document.removeEventListener('click', handleDocumentClick);
        toolbar.removeEventListener('click', handleToolbarClick);
    };
}
