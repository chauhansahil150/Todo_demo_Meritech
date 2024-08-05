import React, { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

// Tailwind CSS classes
const columnClasses = 'w-1/2 p-4'; // Adjust width and padding as needed
const droppableContainerClasses = 'flex space-x-4'; // Adjust spacing as needed
const draggableItemClasses = 'bg-gray-100 p-2 mb-2 rounded-md'; // Example background and padding

interface singleUser {
  id: string;
  name: string;
  salary: number;
  city: string;
}

const initialUsers: singleUser[] = [
  { id: 'user1', name: 'John Doe', salary: 5000, city: 'New York' },
  { id: 'user2', name: 'Jane Smith', salary: 6000, city: 'San Francisco' },
  { id: 'user3', name: 'Mike Johnson', salary: 5500, city: 'Chicago' },
];

const BeautifulDnd2: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<singleUser[]>([]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const draggedUser = result.source.droppableId === 'droppable-left'
      ? users[result.source.index]
      : selectedUsers[result.source.index];

    // Update state based on drag and drop result
    if (result.source.droppableId === result.destination.droppableId) {
      // If dropped within the same droppable area
      const items = result.source.droppableId === 'droppable-left' ? users : selectedUsers;
      const newItems = [...items];
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      if (result.source.droppableId === 'droppable-left') {
        setUsers(newItems as singleUser[]);
      } else {
        setSelectedUsers(newItems as singleUser[]);
      }
    } else {
      // If dropped between different droppable areas (left to right or right to left)
      const sourceItems = result.source.droppableId === 'droppable-left' ? users : selectedUsers;
      const destItems = result.source.droppableId === 'droppable-left' ? selectedUsers : users;

      const newSourceItems = [...sourceItems];
      const newDestItems = [...destItems];

      const [removed] = newSourceItems.splice(result.source.index, 1); // Remove from source
      newDestItems.splice(result.destination.index, 0, removed); // Insert into destination

      // Update both state variables
      setUsers(result.source.droppableId === 'droppable-left' ? newSourceItems : newDestItems);
      setSelectedUsers(result.source.droppableId === 'droppable-left' ? newDestItems : newSourceItems);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={droppableContainerClasses}>
        {/* Left Side */}
        <div className={columnClasses}>
          <h3 className="text-lg font-bold mb-4">Left Side</h3>
          <Droppable droppableId="droppable-left">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200 p-4 rounded-md"
              >
                {users.map((item: singleUser, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={draggableItemClasses}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Right Side */}
        <div className={columnClasses}>
          <h3 className="text-lg font-bold mb-4">Right Side</h3>
          <Droppable droppableId="droppable-right">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200 p-4 rounded-md"
              >
                {selectedUsers.map((item: singleUser, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={draggableItemClasses}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BeautifulDnd2;
