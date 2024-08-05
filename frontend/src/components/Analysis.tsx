import React, { useEffect, useState } from 'react'
import {Chart} from "chart.js"
import PieChart from './chart/PieChart'
import BarGraph from './chart/BarGraph'
import { useStore } from '../hooks/useStore';
import BarChart from './chart/BarGraph';

function Analysis() {
  
    const {rootStore:{employeeDetailsStore}}=useStore();
    const [data,setData]=useState<number[]>([]);
    const [labels,setLabels]=useState<string[]>([] )

    useEffect(() => {
        setData(employeeDetailsStore.employeeDetails.map(e => Number(e.salary)));
        setLabels(employeeDetailsStore.employeeDetails.map((e,ind) => `Employee Name: ${e.name} (${ind + 1})`));
    }, [employeeDetailsStore.employeeDetails]);
    

  return (
  <>
  <div className="">Analysis</div>
 <div className="flex justify-between items-center ">
 <div className="piechart size-1/3">
    <h1 className='text-center font-bold text-xl'>Pie Chart</h1>
    <PieChart labels={labels} data={data} />
  </div>
  <div className="bargraph size-2/3">
  <h1 className='text-center font-bold text-xl'>Bar Chart</h1>
    <BarChart  data={data} labels={labels} />
  </div>
 </div>
  </>
  )
}

export default Analysis