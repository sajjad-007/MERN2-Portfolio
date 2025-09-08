import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../App.css';
import {
  clearallErrors,
  getLoginUser,
  resetProfile,
  updateProfile,
} from '@/features/slices/userSlice';
import { toast } from 'react-toastify';
import { Loader2Icon } from 'lucide-react';

const UpdateProfile = () => {
  const { user, message, loading, error, isUpdate } = useSelector(
    state => state.user
  );

  //required filed start
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [portfolioUrl, setPortfolioUrl] = useState(user && user.portfolioUrl);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  //required filed end

  //Image Preview states
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );
  //Image Preview states

  //Non-Required filed start
  const [githubUrl, setGithubUrl] = useState(
    user && (user.githubUrl === 'undefined' ? '' : user.githubUrl)
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    user && (user.linkedinUrl === 'undefined' ? '' : user.linkedinUrl)
  );
  const [instagramUrl, setInstagramUrl] = useState(
    user && (user.instagramUrl === 'undefined' ? '' : user.instagramUrl)
  );
  const [facebookUrl, setFacebookUrl] = useState(
    user && (user.facebookUrl === 'undefined' ? '' : user.facebookUrl)
  );
  //Non-Required filed end
  const dispatch = useDispatch();
  //handle input file and set image preview
  //handle avatar preview using fileReader() method
  const hadnleAvatarPreview = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };
  const hadnleResumePreview = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };
  const handleUpdateMyProfile = () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('aboutMe', aboutMe);
    formData.append('portfolioUrl', portfolioUrl);
    formData.append('resume', resume);
    formData.append('avatar', avatar);
    formData.append('githubUrl', githubUrl);
    formData.append('facebookUrl', facebookUrl);
    formData.append('linkedinUrl', linkedinUrl);
    formData.append('instagramUrl', instagramUrl);
    dispatch(updateProfile(formData));
  };
  // Handle profile update responses
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearallErrors());
    }
    if (isUpdate && message) {
      toast.success(message);
      dispatch(getLoginUser());
      // Clear the update state after showing success
      setTimeout(() => {
        dispatch(resetProfile());
      }, 100);
    }
  }, [dispatch, error, isUpdate, message]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Clear any lingering messages or errors when component unmounts
      if (isUpdate || message || error) {
        dispatch(resetProfile());
        dispatch(clearallErrors());
      }
    };
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Profile
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex lg:justify-between lg:items-center flex-col lg:flex-row gap-5 my-5">
                <div className="grid gap-2 w-full sm:w-60">
                  <Label> Profile Image </Label>
                  <img
                    src={avatarPreview ? avatarPreview : ''}
                    alt="avatar"
                    className="w-full h-full sm:w-60 sm:h-60 rounded-2xl"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      className="input-file-btn w-full"
                      onChange={hadnleAvatarPreview}
                    />
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-60">
                  <Label>Resume</Label>
                  <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                  >
                    <img
                      src={resumePreview ? resumePreview : ''}
                      alt="avatar"
                      className="w-full  h-auto sm:w-60 sm:h-60 rounded-2xl"
                    />
                  </Link>
                  <div className="relative">
                    <input
                      type="file"
                      className="input-file-btn w-full"
                      onChange={hadnleResumePreview}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2 mt-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={fullName}
                  className="w-full"
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  className="w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  className="w-full"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  value={aboutMe}
                  className="w-full"
                  onChange={e => setAboutMe(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input
                  type="text"
                  className="w-full"
                  value={portfolioUrl}
                  placeholder="https://your-PORTFOLIO.com"
                  onChange={e => setPortfolioUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="https://your-github.com"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="https://your-linkedin.com"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="https://your-instagram.com"
                  value={instagramUrl}
                  onChange={e => setInstagramUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="https://your-facebook.com"
                  value={facebookUrl}
                  onChange={e => setFacebookUrl(e.target.value)}
                />
              </div>
            </div>
            {!loading ? (
              <div className="btn mt-10 w-full ">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  onClick={handleUpdateMyProfile}
                >
                  Update Profile
                </Button>
              </div>
            ) : (
              <div className="mx-auto w-full">
                <Button size="sm" disabled className="w-full">
                  <Loader2Icon className="animate-spin" />
                  Profile Updating..
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
