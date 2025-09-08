import { Label } from '@/components/ui/label';
import {
  clearAllProjectError,
  getAllProject,
  resetAllProjects,
} from '@/features/slices/projectsSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewProject = () => {
  const { loading, message, error } = useSelector(state => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgPreview, setImagePreview] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [stack, setStack] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [deployed, setDeployed] = useState('');

  useEffect(() => {
    const getSingleProject = async () => {
      await axios
        .get(
          `https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/project/get/${id}`,
          {
            withCredentials: true,
          }
        )
        .then(res => {
          setTitle(res.data.findProject.title);
          setDescription(res.data.findProject.description);
          setImagePreview(
            res.data.findProject.projectImage &&
              res.data.findProject.projectImage.url
          );
          setStack(res.data.findProject.stack);
          setDeployed(res.data.findProject.deployed);
          setTechnologies(res.data.findProject.technologies);
          setGitRepoLink(res.data.findProject.gitRepoLink);
          setProjectLink(res.data.findProject.projectLink);
        })
        .catch(error => {
          toast.error(error.response.data.message);
        });
    };
    getSingleProject();
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllProjects());
      dispatch(getAllProject());
    }
  }, [id, dispatch, loading, error, message]);

  const descriptionSlice = description.split(', ');
  const technologiesSlice = technologies.split(', ');
  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <div className="w-[100%] px-5 md:w-[650px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold leading-7 text-gray-900 text-xl text-center uppercase">
                {title}
              </h2>
              <Link to={'/'}>
                <Button className="capitalize cursor-pointer">
                  return to dashboard
                </Button>
              </Link>
            </div>
            <div className=" mt-4 flex flex-col gap-5">
              {/* title */}
              <div className="col-span-full">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {imgPreview ? (
                      <img
                        src={
                          imgPreview
                            ? imgPreview
                            : '/DASHBOARD/public/react.png'
                        }
                        alt="preview image"
                        className="w-full h-auto text-gray-300"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="mx-auto h-50 w-[300px] text-gray-300"
                      >
                        <path
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2 capitalize">Description:</p>
                <ul className="mt-2 list-disc ml-4">
                  {descriptionSlice.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* technologies */}
              <div className="w-full sm:col-span-4 ">
                <p className="text-2xl mb-2 capitalize">
                  technologies used in this project:
                </p>

                <ul className="mt-2 list-disc ml-4">
                  {technologiesSlice.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* stack */}
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Stack:</p>
                <p>{stack}</p>
              </div>
              {/* Deployed */}
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Deployed:</p>
                <p>{deployed}</p>
              </div>
              {/* Github link*/}
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Github Repository Link:</p>
                <Link className="text-sky-700" target="_blank" to={gitRepoLink}>
                  {gitRepoLink}
                </Link>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Project Link:</p>
                <Link className="text-sky-700" target="_blank" to={projectLink}>
                  {projectLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
