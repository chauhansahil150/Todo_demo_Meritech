import React, { useState } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { BACKEND_URL, HttpStatusCodes } from '../../utils/config';
import { useStore } from '../../hooks/useStore';
import { FormattedMessage } from 'react-intl';

interface PopconfirmProps{
  _id:string
}

const PopconfirmComponent: React.FC<PopconfirmProps> = ({_id}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {rootStore:{employeeDetailsStore}}=useStore()

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    employeeDetailsStore.setLoading(true)
    setConfirmLoading(true);
      const resp=await fetch(`${BACKEND_URL}/api/employee?_id=${_id}`,{
        method:"delete"
      })
      setOpen(false);
      setConfirmLoading(false);
      if(resp.status==HttpStatusCodes.OK){
       employeeDetailsStore.deleteEmployee(_id)
        message.success("Successfully Deleted")
      }else{
        message.error("error")
      }
      // employeeDetailsStore.deleteEmployee(_id)

  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Confirm Delete"
      description="Are You sure ?"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
      okText={<FormattedMessage id='ok'/>}
      cancelText={<FormattedMessage id='cancel'/>}
      
    >
      <Button type="primary" onClick={showPopconfirm}>
        <FormattedMessage id='delete'/>
      </Button>
    </Popconfirm>
  );
};

export default PopconfirmComponent;