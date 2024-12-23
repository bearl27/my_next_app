'use client'

import React, { useState } from 'react';
import { Mail, MailOpen } from 'lucide-react';

interface MailIconProps {
    count?: number;
    size?: number;
}

export const MailIcon = (p: MailIconProps) => {
    const [hovered, setHovered] = useState(false);
    const count = p.count || 0;
    const iconSize = p.size || 24;
    const badgeSize = Math.max(iconSize * 0.45, 16);
    const fontSize = Math.max(iconSize * 0.25, 10);
    const offset = Math.max(iconSize * 0.15, 6);
    return (
        <div>
            <div
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {hovered ? (
                    <MailOpen
                        size={iconSize}
                    />
                ) : (
                    <Mail
                        size={iconSize}
                    />
                )}
                {count > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: -offset,
                            right: -offset,
                            backgroundColor: '#E74C3C',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '4px',
                            fontSize: `${fontSize}px`,
                            minWidth: `${badgeSize}px`,
                            height: `${badgeSize}px`,
                            lineHeight: `${badgeSize - 8}px`,
                            textAlign: 'center'
                        }}
                    >
                        {count >= 100 ? '99+' : count}
                    </div>
                )}
            </div>
        </div>
    );
};