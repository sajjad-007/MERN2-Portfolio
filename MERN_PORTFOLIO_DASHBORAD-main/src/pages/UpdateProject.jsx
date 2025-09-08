import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  addNewProject,
  clearAllProjectError,
  getAllProject,
  resetAllProjects,
  updateProject,
} from '@/features/slices/projectsSlice';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProject = () => {
  const { loading, error, message } = useSelector(state => state.project);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [imgPreview, setImagePreview] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [stack, setStack] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [deployed, setDeployed] = useState('');
  const { id } = useParams();
  //Image Preview
  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setProjectImage(file);
    };
  };
  //to get projects value
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
          // console.log(res)
          setTitle(res.data.findProject.title);
          setDescription(res.data.findProject.description);
          setImagePreview(
            res.data.findProject.projectImage &&
              res.data.findProject.projectImage.url
          );
          setProjectImage(
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
  }, [id, error, message]);

  const handleUpdateProject = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('projectImage', projectImage);
    formData.append('gitRepoLink', gitRepoLink);
    formData.append('projectLink', projectLink);
    formData.append('stack', stack);
    formData.append('technologies', technologies);
    formData.append('deployed', deployed);
    dispatch(updateProject(id, formData));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          className="w-[100%] px-5 md:w-[650px]"
          onSubmit={handleUpdateProject}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold leading-7 text-gray-900 text-xl text-center uppercase">
                  Update Your Project
                </h2>
                <Link to={'/'}>
                  <Button className="capitalize cursor-pointer">
                    return to dashboard
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-col gap-5 ">
                <div className="w-full sm:col-span-4">
                  <img
                    src={imgPreview ? imgPreview : '/react.png'}
                    alt="avatar"
                    className="w-full h-[350px] rounded-2xl"
                  />
                  <div className="relative mt-2">
                    <input
                      type="file"
                      className="input-file-btn w-full"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                {/* title */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-lg"
                        placeholder="  Project Name"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                    Description
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <Textarea
                        type="text"
                        placeholder="Feature 1.  Feature 2.  Feature 3. "
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* technologies */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                    technologies used in this project
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <Textarea
                        type="text"
                        placeholder="REACTJS, TAILWINDCSS, NODEJS, "
                        value={technologies}
                        onChange={e => setTechnologies(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* stack */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                    stack
                  </label>
                  <div className="mt-2 ">
                    <div className="w-full">
                      <Select
                        value={stack}
                        onValueChange={selectedValue => setStack(selectedValue)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selcet Your Project Stack" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full Stack">Full Stack</SelectItem>
                          <SelectItem value="Mern">MERN</SelectItem>
                          <SelectItem value="Mean">MEAN</SelectItem>
                          <SelectItem value="Next.JS">NEXT.JS</SelectItem>
                          <SelectItem value="React.JS">REACT.JS</SelectItem>
                          <SelectItem value="Node.JS">NODE.JS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/* Deployed */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Deployed
                  </label>
                  <div className="mt-2">
                    <div className="  ">
                      <Select
                        value={deployed}
                        onValueChange={selectedValue =>
                          setDeployed(selectedValue)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Is this project deployed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/* Github link*/}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Github Repository Link
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-lg"
                        placeholder="Enter Repository Link"
                        value={gitRepoLink}
                        onChange={e => setGitRepoLink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Project link*/}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Project Link
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 px-2 rounded-lg"
                        placeholder="Enter Repository Link"
                        value={projectLink}
                        onChange={e => setProjectLink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-end gap-x-6">
            {!loading ? (
              <Button type="submit" className="w-full cursor-pointer">
                Project Update
              </Button>
            ) : (
              <Button size="sm" disabled className="w-full">
                <Loader2Icon className="animate-spin" />
                Project Updating...
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProject;
