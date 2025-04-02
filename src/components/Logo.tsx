'use client';

import React, {useEffect, useState} from 'react';
import {useTheme} from 'next-themes'; // Assuming you're using next-themes for theme switching
import Image from 'next/image';

type KaryaLogoProps = {
    width?: number;
    height?: number;
    className?: string;
};
export const KaryaLogo: React.FC<KaryaLogoProps> = ({
                                                        width = 200,
                                                        height = 200,
                                                        className,
                                                    }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);

    const {resolvedTheme} = useTheme();
    const isDark = resolvedTheme === 'dark';

    // Choose logo based on theme
    const logoSrc = isDark ? 'images/karya-dark.svg' : 'images/karya-light.svg';

    // Calculate the crop dimensions
    // The component will load the full image but display it with 100px crop on all sides
    const cropAmount = 25;

    return (
        isClient ?
            <div className={`relative overflow-hidden ${className || ''}`} style={{width, height}}>
                <div
                    style={{
                        position: 'absolute',
                        width: width + 2 * cropAmount,
                        height: height + 2 * cropAmount,
                        top: -cropAmount,
                        left: -cropAmount,
                    }}
                >
                    <Image
                        src={logoSrc}
                        alt="Karya Logo"
                        fill
                        style={{objectFit: 'contain'}}
                        priority
                    />
                </div>
            </div> : <span>Karya</span>
    );
};