import { iframeDocument, iframeWindow } from '../globalVariables';
import { loadScript } from '../dynamicFunctions';

// Extend Window interface to include iro
declare global {
    interface Window {
        iro?: any;
    }
}

// Global state to track active color picker
let activeColorPicker: HTMLElement | null = null;
let iroLoaded = false;

async function ensureIroLoaded(): Promise<any> {
    if (iroLoaded && iframeWindow.iro) {
        return iframeWindow.iro;
    }

    try {
        // Load iro from CDN in the iframe context
        await loadScript('https://cdn.jsdelivr.net/npm/@jaames/iro@5', iframeDocument);
        
        // Wait a bit for the script to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (iframeWindow.iro) {
            iroLoaded = true;
            return iframeWindow.iro;
        } else {
            throw new Error('iro library failed to load properly');
        }
    } catch (error) {
        console.error('Failed to load iro library:', error);
        throw new Error('Failed to load color picker library');
    }
}

async function createColorPicker(container: HTMLElement, onChange: (hex: string) => void): Promise<any> {
    try {
        const iro = await ensureIroLoaded();
        
        if (typeof iro === 'undefined' || !iro.ColorPicker) {
            console.error('iro library not found:', {
                iro: typeof iro,
                hasColorPicker: iro && typeof iro.ColorPicker
            });
            throw new Error('iro library is not properly loaded');
        }
        
        const picker = iro.ColorPicker(container!, {
            color: '#f00',
            width: 150,
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
    } catch (error) {
        console.error('Error creating color picker:', error);
        console.error('Container element:', container);
        throw error;
    }
}

export function createColorPickerWithPalette(button: HTMLElement, onChange: (hex: string) => void, toolbar: HTMLElement) {
    let isColorpaletteOpen = false;
    let colorContainer: HTMLElement | null = null;
    let currentColor = '';
    let tempColor = '';
    let iroPickerInitialized = false;

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
            // Reset the iro picker initialization flag so Advanced button works again
            iroPickerInitialized = false;
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
    iframeDocument.addEventListener('click', handleDocumentClick);
    toolbar.addEventListener('click', handleToolbarClick);

    button.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation(); // Prevent the document click handler from immediately closing
        if (isColorpaletteOpen) {
            closeColorPicker();
        } else {
            // Close any other active color picker first
            closeActiveColorPicker();

            isColorpaletteOpen = true;
            colorContainer = iframeDocument.createElement('div');
            colorContainer.id = 'color-picker-container';
            activeColorPicker = colorContainer;

            // Create palette container
            const paletteContainer = iframeDocument.createElement('div');
            paletteContainer.id = 'color-palette';
            paletteContainer.style.cssText = `
                display: block;
                position: relative;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 8px;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            `;
            colorContainer.appendChild(paletteContainer);

            // Add swatches
            const swatches = ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff']
            swatches.forEach((hex) => {
                const swatch = iframeDocument.createElement('div');
                swatch.style.cssText = `
                    background: ${hex};
                    width: 24px;
                    height: 18px;
                    display: inline-block;
                    margin: 2px;
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
            const buttonContainer = iframeDocument.createElement('div');
            buttonContainer.style.cssText = `
                display: flex;
                gap: 6px;
                padding: 0 8px 8px;
                margin-top: 6px;
            `;

            // Advanced button
            const advancedBtn = iframeDocument.createElement('button');
            advancedBtn.textContent = 'Advanced';
            advancedBtn.style.cssText = `
                flex: 1;
                padding: 6px 12px;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                color: #334155;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            advancedBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (!iroPickerInitialized) {
                    try {
                        // iro is available, proceed with creation
                        const container = iframeDocument.createElement('div');
                        container.style.cssText = `
                            padding: 10px;
                            background: #fff;
                            border-radius: 8px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        `;

                        // Create color picker - now properly awaited
                        const picker = await createColorPicker(container, (hex) => {
                            tempColor = hex;
                            hexInput.value = hex;
                        });

                        // Create hex input container
                        const hexInputContainer = iframeDocument.createElement('div');
                        hexInputContainer.style.cssText = `
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            margin-top: 12px;
                            padding: 0 2px;
                        `;

                        // Create hex label
                        const hexLabel = iframeDocument.createElement('span');
                        hexLabel.textContent = 'HEX:';
                        hexLabel.style.cssText = `
                            font-size: 11px;
                            color: #4b5563;
                            font-weight: 500;
                        `;

                        // Create hex input
                        const hexInput = iframeDocument.createElement('input');
                        hexInput.type = 'text';
                        hexInput.value = tempColor;
                        hexInput.style.cssText = `
                            flex: 1;
                            padding: 4px 6px;
                            border: 1px solid #d1d5db;
                            border-radius: 4px;
                            font-size: 11px;
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
                        const confirmContainer = iframeDocument.createElement('div');
                        confirmContainer.style.cssText = `
                            display: flex;
                            gap: 6px;
                            margin-top: 12px;
                        `;

                        // Create confirm button
                        const confirmBtn = iframeDocument.createElement('button');
                        confirmBtn.textContent = 'Apply';
                        confirmBtn.style.cssText = `
                            flex: 1;
                            padding: 8px 16px;
                            background: #ffffff;
                            border: 1px solid #e2e8f0;
                            border-radius: 6px;
                            font-size: 12px;
                            font-weight: 500;
                            color: #334155;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-width: 80px;
                        `;
                        confirmBtn.onmouseover = () => {
                            confirmBtn.style.background = '#f8fafc';
                            confirmBtn.style.borderColor = '#cbd5e1';
                            confirmBtn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                        }
                        confirmBtn.onmouseout = () => {
                            confirmBtn.style.background = '#ffffff';
                            confirmBtn.style.borderColor = '#e2e8f0';
                            confirmBtn.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                        }
                        confirmBtn.onclick = (e) => {
                            e.stopPropagation();
                            onChange(tempColor);
                            updateButtonColor(tempColor);
                            closeColorPicker();
                        };

                        // Create reset button for advanced view
                        const advancedResetBtn = iframeDocument.createElement('button');
                        advancedResetBtn.textContent = 'Reset';
                        advancedResetBtn.style.cssText = `
                            flex: 1;
                            padding: 8px 16px;
                            background: #ffffff;
                            border: 1px solid #e2e8f0;
                            border-radius: 6px;
                            font-size: 12px;
                            font-weight: 500;
                            color: #334155;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-width: 80px;
                        `;
                        advancedResetBtn.onmouseover = () => {
                            advancedResetBtn.style.background = '#f8fafc';
                            advancedResetBtn.style.borderColor = '#cbd5e1';
                            advancedResetBtn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                        }
                        advancedResetBtn.onmouseout = () => {
                            advancedResetBtn.style.background = '#ffffff';
                            advancedResetBtn.style.borderColor = '#e2e8f0';
                            advancedResetBtn.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
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
                        
                    } catch (error) {
                        console.error('Error creating advanced color picker:', error);
                        alert('Error creating advanced color picker. Please try again.');
                    }
                }
            });
            advancedBtn.onmouseover = () => {
                advancedBtn.style.background = '#f8fafc';
                advancedBtn.style.borderColor = '#cbd5e1';
                advancedBtn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }
            advancedBtn.onmouseout = () => {
                advancedBtn.style.background = '#ffffff';
                advancedBtn.style.borderColor = '#e2e8f0';
                advancedBtn.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }

            // Reset button
            const clearcolorBtn = iframeDocument.createElement('button');
            clearcolorBtn.id = 'clear-color-btn';
            clearcolorBtn.textContent = 'Reset';
            clearcolorBtn.style.cssText = `
                flex: 1;
                padding: 6px 12px;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                color: #334155;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            clearcolorBtn.onmouseover = () => {
                clearcolorBtn.style.background = '#f8fafc';
                clearcolorBtn.style.borderColor = '#cbd5e1';
                clearcolorBtn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }
            clearcolorBtn.onmouseout = () => {
                clearcolorBtn.style.background = '#ffffff';
                clearcolorBtn.style.borderColor = '#e2e8f0';
                clearcolorBtn.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }
            clearcolorBtn.onclick = (e) => {
                e.stopPropagation();
                onChange('');
                updateButtonColor('');
                closeColorPicker();
            };

            buttonContainer.appendChild(advancedBtn);
            buttonContainer.appendChild(clearcolorBtn);
            colorContainer.appendChild(buttonContainer);

            const container = iframeDocument.createElement('div');

            // Position the color picker
            const buttonRect = button.getBoundingClientRect();
            const toolbarRect = toolbar.getBoundingClientRect();
            const pickerWidth = 220;
            const pickerHeight = 180;

            // Calculate initial position
            let top = buttonRect.bottom + iframeWindow.scrollY;
            let left = buttonRect.left + iframeWindow.scrollX;

            // Adjust position to stay within viewport
            const viewportWidth = iframeWindow.innerWidth;
            const viewportHeight = iframeWindow.innerHeight;
            const scrollY = iframeWindow.scrollY;

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
        iframeDocument.removeEventListener('click', handleDocumentClick);
        toolbar.removeEventListener('click', handleToolbarClick);
    };
}
