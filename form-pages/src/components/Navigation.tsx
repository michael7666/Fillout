import React, { useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FaFileAlt,
  FaPlus,
  FaCheckCircle,
  FaEllipsisV,
  FaFlag,
  FaRegClipboard,
  FaTrashAlt,
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
        return <GoInfo className="mr-2" />;
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
            style={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {pages.map((page, index) => (
              <Draggable key={page.id} draggableId={page.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`draggable-item ${
                      snapshot.isDragging ? "dragging" : ""
                    }`}
                    style={{
                      ...provided.draggableProps.style,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className={`page-button ${page.active ? "active" : ""}`}
                      style={{
                        cursor: snapshot.isDragging ? "grabbing" : "grab",
                        userSelect: "none",
                      }}
                      onClick={(e) => {
                        // Prevent click event during drag
                        if (snapshot.isDragging) {
                          e.stopPropagation();
                          e.preventDefault();
                        }
                      }}
                    >
                      <button
                        onClick={() => {
                          // Only trigger if not dragging
                          if (!snapshot.isDragging) {
                            setActivePage(page.id);
                            if (showMenu === page.id) setShowMenu(null);
                          }
                        }}
                        className="page-content"
                      >
                        {getIcon(page.title)}
                        {page.title}
                        {page.active && (
                          <FaEllipsisV
                            className="ml-2 cursor-pointer inline-block"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMenu(
                                showMenu === page.id ? null : page.id
                              );
                            }}
                          />
                        )}
                      </button>
                    </div>
                    {showMenu === page.id && (
                      <div ref={menuRef} className="context-menu">
                        <div className="settings-header">Settings</div>
                        <button >
                          <FaFlag color="blue" /> Set as first page
                        </button>
                        <button >
                          <FiEdit3 /> Rename
                        </button>
                        <button >
                          <FaRegClipboard /> Copy
                        </button>
                        <button >
                          <HiOutlineDuplicate /> Duplicate
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                          <FaTrashAlt color="red" /> Delete
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => addPage(index)}
                      className="add-button"
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
