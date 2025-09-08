import axios from 'axios';
import React, { useEffect, useState } from 'react';

const About = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(
        'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/getuser/portfolio',
        { withCredentials: true }
      );
      setUser(data.findUser);
    };
    getUserData();
  }, []);
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: 'hsl(222.2 84% 4.9%)',
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={user?.avatar ? user?.avatar?.url : ''}
              alt={user && user.fullName}
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              Hi, I am Sajjad Hossain. I have recently finished my Diploma in
              Electrical Engineering, and these days I am busy building
              different MERN stack projects. I love gaming and reading books,
              and I am also into movies, series, cooking, and of course, video
              games.
            </p>
            <p>
              I am really curious about blockchain and crypto-currency, and I
              try to learn something new in tech every day. I like challenging
              myself, staying consistent, and getting things done on time—its
              something I take seriously but also enjoy.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          I am dedicated to delivering work on time and I persevere through
          challenges, no matter how long they last.
        </p>
      </div>
    </div>
  );
};

export default About;
