import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Copy } from 'lucide-react';
import type { LayoutComponent } from '../../types/store';
import { useStore } from '../../store/useStore';
import { ComponentRegistry } from '../../lib/registry';
import { cn } from '../../lib/utils';

interface Props {
    component: LayoutComponent;
}

export const SortableComponent: React.FC<Props> = ({ component }) => {
    const { editor, selectComponent, removeComponent, duplicateComponent } = useStore();
    const isSelected = editor.selectedComponentId === component.id;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: component.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const Component = ComponentRegistry[component.type];

    if (!Component) {
        console.error(`Component type "${component.type}" not found in registry.`);
        return <div className="p-4 border border-red-500 text-red-500">Error: Unknown component type "{component.type}"</div>;
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                selectComponent(component.id);
            }}
            className={cn(
                "relative group transition-all ring-inset",
                isSelected ? "ring-2 ring-primary z-20" : "hover:ring-1 hover:ring-primary/40",
                isDragging ? "opacity-40 grayscale-0 ring-2 ring-primary ring-dashed rounded-xl overflow-hidden" : "opacity-100"
            )}
        >
            {/* Ghost overlay when dragging */}
            {isDragging && (
                <div className="absolute inset-0 bg-primary/5 border-2 border-primary border-dashed z-50 pointer-events-none rounded-lg flex items-center justify-center">
                    <div className="text-primary text-sm font-medium">Drop here</div>
                </div>
            )}

            {/* Control Overlay */}
            <div className={cn(
                "absolute -left-10 top-0 h-full flex flex-col gap-2 p-1 transition-opacity",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
                <button
                    {...attributes}
                    {...listeners}
                    className="p-1.5 bg-card border rounded shadow-sm hover:text-primary cursor-grab active:cursor-grabbing transition-colors"
                    title="Drag to reorder"
                >
                    <GripVertical size={14} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeComponent(component.id);
                    }}
                    className="p-1.5 bg-card border rounded shadow-sm hover:text-destructive text-muted-foreground transition-colors"
                    title="Delete component"
                >
                    <Trash2 size={14} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        duplicateComponent(component.id);
                    }}
                    className="p-1.5 bg-card border rounded shadow-sm hover:text-primary text-muted-foreground transition-colors"
                    title="Duplicate"
                >
                    <Copy size={14} />
                </button>
            </div>

            <div className="relative">
                <Component
                    {...component.props}
                    variant={component.variant || 'v1'}
                    styles={component.styles}
                    id={component.id}
                />
            </div>
        </div>
    );
};