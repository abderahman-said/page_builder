import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Toolbar } from './Toolbar';
import { SidebarLeft } from './SidebarLeft';
import { Canvas } from './Canvas';
import { SidebarRight } from './SidebarRight';
import { AssetsManager } from './AssetsManager';
import { useStore } from '../../store/useStore';
import { Layout } from 'lucide-react';

export const EditorLayout: React.FC = () => {
    const { layout, addComponent, reorderComponents, undo, redo, saveVersion } = useStore();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeType, setActiveType] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey)) {
                if (e.key === 'z' || e.key === 'Z') {
                    if (e.shiftKey) {
                        redo();
                    } else {
                        undo();
                    }
                    e.preventDefault();
                } else if (e.key === 'y' || e.key === 'Y') {
                    redo();
                    e.preventDefault();
                } else if (e.key === 's' || e.key === 'S') {
                    e.preventDefault();
                    const name = prompt('Enter version name:', `Checkpoint ${new Date().toLocaleTimeString()}`);
                    if (name) saveVersion(name);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, saveVersion]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: any) => {
        const { active } = event;
        setActiveId(active.id);
        if (active.data.current?.isPaletteItem) {
            setActiveType(active.data.current.type);
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveType(null);

        if (!over) return;

        // Handle palette drop
        if (active.data.current?.isPaletteItem) {
            const type = active.data.current.type;
            const overId = over.id;

            // If dropping over a sortable item, find its index
            const index = layout.components.findIndex((c: any) => c.id === overId);
            addComponent(type, index >= 0 ? index : undefined);
            return;
        }

        // Handle reordering
        if (active.id !== over.id) {
            const oldIndex = layout.components.findIndex((c: any) => c.id === active.id);
            const newIndex = layout.components.findIndex((c: any) => c.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                reorderComponents(oldIndex, newIndex);
            }
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                :root {
                    --primary: ${layout.theme.primaryColor} !important;
                    --color-primary: ${layout.theme.primaryColor} !important;
                    --primary-foreground: ${['#f59e0b'].includes(layout.theme.primaryColor) ? '#000000' : '#ffffff'} !important;
                    --color-primary-foreground: ${['#f59e0b'].includes(layout.theme.primaryColor) ? '#000000' : '#ffffff'} !important;
                    --font-family: '${layout.theme.fontFamily}', sans-serif !important;
                }
            ` }} />
            <div
                className="flex h-screen w-full flex-col bg-background overflow-hidden text-foreground selection:bg-foreground/5 transition-colors duration-500"
            >
                <Toolbar />
                <div className="flex flex-1 overflow-hidden">
                    <SidebarLeft />
                    <main className="flex-1 bg-muted/40 overflow-y-auto relative custom-scrollbar">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
                        <div className="relative z-10 p-8 md:p-12 min-h-full flex flex-col items-center">
                            <div className="w-full max-w-7xl">
                                <Canvas />
                            </div>
                        </div>
                    </main>
                    <SidebarRight />
                </div>
            </div>
            <AssetsManager />
            <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                    styles: {
                        active: {
                            opacity: '0.5',
                        },
                    },
                }),
            }}>
                {activeId && activeType ? (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background shadow-2xl cursor-grabbing scale-105 transition-transform ring-1 ring-black/5">
                        <div className="p-2 rounded-lg bg-foreground text-background">
                            <Layout size={18} />
                        </div>
                        <span className="text-xs font-bold text-foreground uppercase tracking-widest">{activeType}</span>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
