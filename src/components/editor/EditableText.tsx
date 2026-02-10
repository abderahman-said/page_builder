import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

interface EditableTextProps {
    id: string;
    propKey: string;
    value: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'button' | 'div' | 'a';
    multiline?: boolean;
    isExport?: boolean;
    [key: string]: any;
}

export const EditableText: React.FC<EditableTextProps> = ({
    id,
    propKey,
    value,
    className,
    as: Tag = 'p',
    multiline = false,
    isExport = false,
    ...props
}) => {
    const { updateComponent, setFocusedProp } = useStore();
    const [localValue, setLocalValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const contentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = useCallback(() => {
        setIsEditing(false);
        const newValue = contentRef.current?.innerText || '';
        if (newValue !== value) {
            updateComponent(id, {
                props: { [propKey]: newValue }
            } as any);
        }
    }, [value, id, propKey, updateComponent]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            contentRef.current?.blur();
        }
        if (e.key === 'Escape') {
            setLocalValue(value);
            if (contentRef.current) contentRef.current.innerText = value;
            contentRef.current?.blur();
        }
    }, [multiline, value]);

    if (isExport) {
        return (
            <Tag className={className} {...props}>
                {localValue}
            </Tag>
        );
    }

    return (
        <Tag
            ref={contentRef as any}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => !isExport && setFocusedProp(propKey)}
            onMouseLeave={() => !isExport && setFocusedProp(null)}
            onClick={(e) => e.stopPropagation()}
            {...props}
            className={cn(
                "outline-none transition-all cursor-text min-w-[20px]",
                isEditing ? "ring-2 ring-primary/30 bg-primary/5 rounded-sm px-1 -mx-1" : "hover:bg-primary/5 hover:rounded-sm",
                className
            )}
            role="textbox"
            aria-label={props['aria-label'] || `Editable text: ${propKey}`}
            aria-multiline={multiline}
        >
            {localValue}
        </Tag>
    );
};
