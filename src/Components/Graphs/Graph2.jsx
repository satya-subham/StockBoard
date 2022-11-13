import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "@ant-design/plots";

import "./Graph2.css";

const DemoLine = () => {
  const [data, setdata] = useState([]);

  const GetApi = async () => {
    const response = await axios.get(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SHOP.TRT&outputsize=full&apikey=W9IPCZT6X76UJZOY"
    );
    console.log(response);
    // console.log(response.data["Time Series (Daily)"]["1999-11-01"]["1. open"]);
    // console.log(response.data["Time Series (Daily)"]["1999-11-01"]);
    let i = 0;
    let a = [];
    let data = response.data["Time Series (Daily)"];
    while (i < Object.keys(data).length) {
      if (i % 200 == 0) {
        a.push({
          // high: data[Object.keys(data)[i]]["2. high"],
          value: data[Object.keys(data)[i]]["3. low"],
          type: "low",
          date: Object.keys(data)[i],
        });
        a.push({
          value: data[Object.keys(data)[i]]["2. high"],
          type: "high",
          date: Object.keys(data)[i],
        });
      }
      i++;
    }
    console.log(a);
    setdata(a);
  };
  useEffect(() => {
    GetApi();
  }, []);
  const config = {
    data,
    padding: "auto",
    xField: "date",
    yField: "value",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <div className="graph2">
      <Line {...config} />
    </div>
  );
};

export default DemoLine;

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SHOP.TRT&outputsize=full&apikey=W9IPCZT6X76UJZOY
