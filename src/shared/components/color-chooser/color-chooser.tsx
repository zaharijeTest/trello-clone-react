import { FunctionComponent, useState } from 'react';
import './color-chooser.css';

interface IColorChooserProps {
    colors: string[];
    onColorChanged: (color: string) => any;
}

export const ColorChooser: FunctionComponent<IColorChooserProps> = ({ colors, onColorChanged }) => {
    const [selectedColor, setSelectedColor] = useState<string>();
    return (
        <div className="color-chooser-wrapper">
            {colors.map((el, i) =>
                <div
                    key={i}
                    style={{ backgroundColor: el }}
                    className={`color-tile ${el === selectedColor ? 'selected-color' : ''}`}
                    onClick={() => {
                        setSelectedColor(el);
                        onColorChanged(el);
                    }}>

                </div>)}
        </div>
    )
}