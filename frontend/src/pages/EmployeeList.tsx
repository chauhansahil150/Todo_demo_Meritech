import React, { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';
import { BACKEND_URL } from '../utils/config';
import axios from 'axios';
import EmployeeTable from '../components/antdesign/EmployeeTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Spin, Alert } from 'antd';

export const EmployeeList = observer(() => {
  const {
    rootStore: { employeeDetailsStore }
  } = useStore();

  const [hoveredEmployeeId, setHoveredEmployeeId] = useState<string | null>(null);

  useEffect(() => { 
    const fetchEmployeesDetails = async () => {
      employeeDetailsStore.setLoading(true); // Set loading to true before fetching data
      const resp = await axios.get(`${BACKEND_URL}/api/employee/all`);
      employeeDetailsStore.addEmployees(resp?.data);
    };

    fetchEmployeesDetails();
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.source.droppableId === 'employeeList' && result.destination.droppableId === 'employeeTable') {
      // Handle moving from the left list to the right table
      const sourceEmployee = employeeDetailsStore.employeeDetails[sourceIndex];
      employeeDetailsStore.addEmployeeToSelected(sourceEmployee);
      const newEmployeeDetails = Array.from(employeeDetailsStore.employeeDetails);
      // newEmployeeDetails.splice(sourceIndex, 1);
      // employeeDetailsStore.setEmployees(newEmployeeDetails);
    } else if (result.source.droppableId === 'employeeTable' && result.destination.droppableId === 'employeeList') {
      // Handle moving from the right table to the left list
      const sourceEmployee = employeeDetailsStore.selectedUsers[sourceIndex];
      employeeDetailsStore.removeUserFromSelected(sourceEmployee._id);
      const newSelectedUsers = Array.from(employeeDetailsStore.selectedUsers);
      newSelectedUsers.splice(sourceIndex, 1);
      employeeDetailsStore.setSelectedUsers(newSelectedUsers);
      employeeDetailsStore.addEmployee(sourceEmployee);
    } else if (result.source.droppableId === 'employeeList' && result.destination.droppableId === 'employeeList') {
      // Handle reordering within the employee list
      const newEmployeeDetails = Array.from(employeeDetailsStore.employeeDetails);
      const [movedEmployee] = newEmployeeDetails.splice(sourceIndex, 1);
      newEmployeeDetails.splice(destinationIndex, 0, movedEmployee);
      employeeDetailsStore.setEmployees(newEmployeeDetails);
    }
    //  else if (result.source.droppableId === 'employeeTable' && result.destination.droppableId === 'employeeTable') {
    //   // Handle reordering within the selected users table
    //   const newSelectedUsers = Array.from(employeeDetailsStore.selectedUsers);
    //   const [movedEmployee] = newSelectedUsers.splice(sourceIndex, 1);
    //   newSelectedUsers.splice(destinationIndex, 0, movedEmployee);
    //   employeeDetailsStore.setSelectedUsers(newSelectedUsers);
    // }
  };

  const handleMouseEnter = (employeeId: string) => {
    setHoveredEmployeeId(employeeId);
  };

  const handleMouseLeave = () => {
    setHoveredEmployeeId(null);
  };

  if (employeeDetailsStore.loading) {
    return (
      <Spin tip="Loading...">
        <Alert
          message="Loading"
          description="Fetching employee details. Please wait..."
          type="info"
        />
      </Spin>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="div grid grid-cols-12">
        <div className="left h-[100vh] col-span-2 bg-gray-400">
          <Droppable droppableId="employeeList">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className=""
              >
                {employeeDetailsStore.employeeDetails.map((employee, index) => (
                  <Draggable key={employee._id} draggableId={employee._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 text-xl hover:cursor-pointer mb-1 bg-gray-200 ${
                          hoveredEmployeeId === employee._id ? 'bg-yellow-200 transition duration-300 ease-in-out' : ''
                        } ${employeeDetailsStore.selectedUsers.find(user => user._id === employee._id) ? 'text-gray-400' : ''}`}
                        onMouseEnter={() => handleMouseEnter(employee._id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {employee.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="right col-span-10">
          <Droppable droppableId="employeeTable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <EmployeeTable data={employeeDetailsStore.selectedUsers} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
});
