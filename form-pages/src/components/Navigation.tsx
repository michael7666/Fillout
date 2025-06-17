import React, { useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FaFileAlt,
  FaPlus,
  FaCheckCircle,
  FaEllipsisV,
  FaFlag,
  FaRegClipboard,
  FaTrashAlt
} from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";

interface Page {
  id: string;
  title: string;
  active: boolean;
}

interface NavigationProps {
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  addPage: (index: number) => void;
  setActivePage: (id: string) => void;
  showMenu: string | null;
  setShowMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const Navigation: React.FC<NavigationProps> = ({
  pages,
  setPages,
  addPage,
  setActivePage,
  showMenu,
  setShowMenu,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(pages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPages(items);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(null);
    }
  };

  React.useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const getIcon = (title: string) => {
    switch (title) {
      case "Info":
        return <GoInfo className="mr-3" />;
      case "Details":
        return <FaFileAlt className="mr-2" />;
      case "Other":
        return <FaFileAlt className="mr-2" />;
      case "Ending":
        return <FaCheckCircle className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="pages" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="navigation"
          >
            {pages.map((page, index) => (
              <Draggable key={page.id} draggableId={page.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="draggable-item"
                  >
                    <button
                      onClick={() => {
                        setActivePage(page.id);
                        if (showMenu === page.id) setShowMenu(null);
                      }}
                      className={`page-button ${page.active ? "active" : ""}`}
                      {...provided.dragHandleProps} // Drag handle on the button
                    >
                      {getIcon(page.title)}
                      {page.title}
                      {page.active && (
                        <FaEllipsisV
                          className="ml-2 cursor-pointer inline-block"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(showMenu === page.id ? null : page.id);
                          }}
                        />
                      )}
                    </button>
                    {showMenu === page.id && (
                      <div ref={menuRef} className="context-menu">
                        <div className="settings-header">Settings</div>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"><FaFlag color="blue"/> Set as first page</button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"><FiEdit3 /> Rename</button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"><FaRegClipboard /> Copy</button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"><HiOutlineDuplicate/> Duplicate</button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"><FaTrashAlt color="red"/> Delete</button>
                      </div>
                    )}
                    <button
                      onClick={() => addPage(index)}
                      className="add-button absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center opacity-0 hover:bg-gray-400 transition-all duration-200 group-hover:opacity-100"
                    >
                      <FaPlus className="text-gray-600" />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button
              onClick={() => addPage(pages.length - 1)}
              className="page-button"
            >
              + Add page
            </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Navigation;