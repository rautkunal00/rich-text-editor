import iro from '@jaames/iro';

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
    button.addEventListener('click', (event: MouseEvent) => {
        if (isColorpaletteOpen) {
            isColorpaletteOpen = false;
            const colorContainer = toolbar.querySelector('#color-picker-container');
            colorContainer?.remove();
        } else {
            isColorpaletteOpen = true;
            const colorContainer = document.createElement('div');
            colorContainer.id = 'color-picker-container';
            const clearcolorBtn = document.createElement('button');
            clearcolorBtn.id = 'clear-color-btn';
            clearcolorBtn.textContent = 'reset';

            // Create palette container
            const paletteContainer = document.createElement('div');
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
                swatch.onclick = () => {
                    onChange(hex);
                    paletteContainer.style.display = 'none';
                }
                paletteContainer.appendChild(swatch);
            });

            // Advanced button
            const advancedBtn = document.createElement('button');
            advancedBtn.textContent = 'Advanced';
            advancedBtn.style.display = 'block';
            advancedBtn.style.marginTop = '8px';
            paletteContainer.appendChild(advancedBtn);
            paletteContainer.appendChild(clearcolorBtn);

            const container = document.createElement('div');
            let iroPickerInitialized = false;
            advancedBtn.addEventListener('click', () => {
                if (!iroPickerInitialized) {
                    createColorPicker(container, (hex) => {
                        onChange(hex);
                    });
                    iroPickerInitialized = true;
                }
            });


            // Show palette on click
            const rect = button.getBoundingClientRect();
            colorContainer.style.top = `${rect.bottom + window.scrollY}px`;
            colorContainer.style.left = `${rect.left + window.scrollX}px`;
            colorContainer.style.display = 'block';
            colorContainer.style.position = 'absolute';
            colorContainer.style.width = '300px';
            colorContainer.appendChild(container);
            toolbar.appendChild(colorContainer);
        }
    });
}
