import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyApps = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/softApplication/get',
        { withCredentials: true }
      );
      setApps(data.findAllSoftAppData);
    };
    getMyApps();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1
        className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] font-extrabold w-fit mx-auto flex justify-center items-center text-tubeLight-effect"
        style={{
          background: 'hsl(222.2 84% 4.9%)',
        }}
      >
        Softwares
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {apps &&
          apps?.map(element => {
            return (
              <Card
                className="h-fit p-7 flex flex-col justify-center items-center gap-3"
                key={element?._id}
              >
                <img
                  src={element?.icons && element?.icons?.url}
                  alt="skill"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {element?.title}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyApps;
