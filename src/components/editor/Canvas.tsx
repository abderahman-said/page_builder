import React from 'react';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableComponent } from './SortableComponent';

export const Canvas: React.FC = () => {
    const { layout, editor, selectComponent } = useStore();
    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    // Check if Dark Mode SaaS template is active (more reliable detection)
    const isPixelsTemplate = layout.components.some(comp =>
        comp.type === 'header' && comp.variant === 'pixels'
    ) || layout.components.some(comp =>
        comp.variant === 'pixels'
    );

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "shadow-2xl mx-auto transition-all min-h-[calc(100vh-120px)] rounded-sm border ring-1 ring-border/50",
                isPixelsTemplate
                    ? "bg-slate-950 border-slate-800"
                    : "bg-background",
                editor.previewMode === 'desktop' ? "w-full" :
                    editor.previewMode === 'tablet' ? "w-[768px]" : "w-[375px]"
            )}
            style={{ fontFamily: `'${layout.theme.fontFamily}', sans-serif` }}
            onClick={() => selectComponent(null)}
        >
            <div className="flex flex-col min-h-[200px]">
                {layout.components.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-24 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-8 shadow-2xl shadow-primary/10 animate-bounce">
                            <Plus size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight text-foreground mb-3">Your masterpiece starts here</h3>
                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-10">
                            Drag and drop blocks from the left panel to begin crafting your high-converting landing page.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                ⌘ + Z to Undo
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Click to Edit
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={isPixelsTemplate ? 'dark' : ''}>
                        <SortableContext
                            items={layout.components.map((c: any) => c.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {layout.components.map((component: any) => (
                                <SortableComponent key={component.id} component={component} />
                            ))}
                        </SortableContext>
                    </div>
                )}
            </div>
        </div>
    );
};
