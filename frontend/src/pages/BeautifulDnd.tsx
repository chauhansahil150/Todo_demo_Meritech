import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

// Dummy data
const initialUsers = [
  { id: 'user1', name: 'John Doe', salary: 5000, city: 'New York' },
  { id: 'user2', name: 'Jane Smith', salary: 6000, city: 'San Francisco' },
  { id: 'user3', name: 'Mike Johnson', salary: 5500, city: 'Chicago' },
];

const BeautifulDnd: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const draggedUser = users[result.source.index];

    // Remove from left side
    const newUsers = [...users];
    newUsers.splice(result.source.index, 1);
    setUsers(newUsers);

    // Add to right side
    setSelectedUsers([...selectedUsers, draggedUser]);
  };

  const getRandomColor = () => {
    const colors = ['#f44336', '#9c27b0', '#2196f3', '#4caf50', '#ff9800', '#607d8b']; // List of colors
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='grid-cols-12  w-full'>
        {/* Left side */}
        <Droppable droppableId="droppable-left">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}
            className='col-span-3 bg-yellow-500 h-3'
            >
              {users.map((user, index) => (
                <Draggable key={user.id} draggableId={user.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '8px',
                        margin: '0 0 8px 0',
                        backgroundColor: 'lightgrey',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        color: '#fff',
                        background: getRandomColor(),
                        ...provided.draggableProps.style,
                      }}
                    >
                      {user.name.charAt(0)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Right side */}
        <div className='col-span bg-gray-600'>
          <Droppable droppableId="droppable-right">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <table >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Salary</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUsers.map((user, index) => (
                      <tr key={user.id} className='bg-green-500'>
                        <td>{user.name}</td>
                        <td>{user.salary}</td>
                        <td>{user.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BeautifulDnd;
