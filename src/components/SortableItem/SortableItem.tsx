import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });


    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  // Applique les styles pour déplacer les éléments
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef}
        className="sortable_item"
        style={style}
        // {...attributes}
        // {...listeners}
    >
        <div
            className="sortable_item__handle"
            {...attributes}
            {...listeners}
        ></div>

      {children}
    </div>
  );
};
