import { Button } from '@/components/ui/button';
import {
  addSoftwareApplication,
  clearSoftwareApplicationErrors,
  getAllSoftwareApplication,
  resetAllSoftwareApplication,
} from '@/features/slices/addSoftwareApplication';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddSoftApplication = () => {
  const { loading, message, error } = useSelector(state => state.application);
  const [title, setTitle] = useState('');
  const [icons, setIcons] = useState('');
  const [imgPreview, setImgPreview] = useState('');

  const dispatch = useDispatch();
  //handle input file and set icons preview
  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPreview(reader.result);
      setIcons(file);
    };
  };
  const handleAddSoftwareApplication = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('icons', icons);
    dispatch(addSoftwareApplication(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSoftwareApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllSoftwareApplication());
      dispatch(getAllSoftwareApplication());
    }
  }, [dispatch, loading, error, message]);
  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          className="w-[100%] px-5 md:w-[1000px]"
          onSubmit={handleAddSoftwareApplication}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                ADD A NEW SOFTWARE APPLICATION
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-lg"
                        placeholder="  Enter Application Name"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* upload icons */}
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Upload Icons
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {imgPreview ? (
                        <img
                          src={
                            imgPreview
                              ? imgPreview
                              : '/DASHBOARD/public/react.png'
                          }
                          alt="preview icons"
                          className="mx-auto h-30 w-full text-gray-300"
                        />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="mx-auto h-24 w-full text-gray-300"
                        >
                          <path
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      )}

                      <div className="mt-4 flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            name="file-upload"
                            className="sr-only"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-end gap-x-6">
            {!loading ? (
              <Button type="submit" className="w-full cursor-pointer py-6">
                ADD SOFTWARE APPLICATION
              </Button>
            ) : (
              <Button size="sm" disabled className="w-full py-6">
                <Loader2Icon className="animate-spin" />
                Application Creating...
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSoftApplication;
