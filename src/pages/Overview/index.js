import React, {useEffect, useState} from 'react';
import Sidebar from '../../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {getMovements} from '../../services/API';



export default function Overview() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {

    async function prepareData() {
      const response = await getMovements();
      const data = response.data;
      let movs = [];
      data.forEach(element => {
        element.createdAt = new Date(element.createdAt).toLocaleDateString("pt-br");
        movs = [...movs, element];
        
      });
      setMovements(movs);
      console.log(movs);
    }

    prepareData();
  })


  return(
    <div className="overview">
      <Sidebar />
      <LineChart
        width={1600}
        height={700}
        data={movements}
        margin={{
          top: 5,
          right: 30,
          left: 400,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}