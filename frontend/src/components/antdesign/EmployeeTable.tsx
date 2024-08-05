import React from 'react';
import { Space, Table, Tag } from 'antd';
import {IEmployeeDetails} from "../../store/EmployeeDetails"
const { Column } = Table;
import EmployeeModal from './EmployeeModal';
import PopconfirmComponent from './Popconfirm';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { MdDelete } from "react-icons/md";
import {FormattedMessage} from "react-intl"

interface EmployeeTableProps {
  data:IEmployeeDetails[]
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({data}) => {

  return(
    <Table  dataSource={data} rowKey={(record:IEmployeeDetails)=>record?._id}>
      <Column title={<FormattedMessage id='name'/>} dataIndex="name" key="name" />
      <Column title={<FormattedMessage id='city'/>} dataIndex="city" key="city" />
      <Column title={<FormattedMessage id='salary'/>} dataIndex="salary" key="salary" />
      <Column
        title={<FormattedMessage id='action'/>}
        key="action"
        render={(_: any,record:IEmployeeDetails) => (
          <Space size="middle">
            <EmployeeModal employee={record}/>
            <PopconfirmComponent _id={record._id}/>

          </Space>
        )}
      />
    </Table>
  )
}


export default EmployeeTable;