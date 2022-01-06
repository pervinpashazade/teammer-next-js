import Link from 'next/link';
import React from 'react';
import { Button } from 'rsuite';

function ActionLink(props) {

    const {
        href,
        children,
        size,
        color,
        apperience,
        padding,
        margin,
        classNames,
    } = props;

    return (
        <Link href={href}>
            <a>
                <Button
                    size={size}
                    color={color}
                    apperience={apperience}
                    style={{ 
                        padding: padding,
                        margin: margin
                    }}
                    className={`custom-action-link ${classNames}`}
                >
                    {children}
                </Button>
            </a>
        </Link>
    )
}

export default ActionLink
