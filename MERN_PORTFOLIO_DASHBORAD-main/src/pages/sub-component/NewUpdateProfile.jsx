import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const NewUpdateProfile = () => {
  const { user } = useSelector(state => state.user);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const avatarInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // Handle avatar file selection and preview
  const handleAvatarChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue('avatar', file);

      // Create preview using FileReader
      const reader = new FileReader();
      reader.onload = e => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle resume file selection and preview
  const handleResumeChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue('resume', file);

      // Create preview using FileReader
      const reader = new FileReader();
      reader.onload = e => {
        setResumePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    // Here you would typically send the data to your API
    setSubmitting(false);
  };

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

            <Formik
              initialValues={{
                fullName: user?.fullName || '',
                email: user?.email || '',
                phoneNumber: user?.phoneNumber || '',
                aboutMe: user?.aboutMe || '',
                portfolioUrl: user?.portfolioUrl || '',
                githubUrl: user?.githubUrl || '',
                linkedinUrl: user?.linkedinUrl || '',
                instagramUrl: user?.instagramUrl || '',
                facebookUrl: user?.facebookUrl || '',
                avatar: null,
                resume: null,
              }}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="grid gap-4">
                  {/* File Upload Section */}
                  <div className="flex lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                    {/* Avatar Section */}
                    <div className="grid gap-2 w-full sm:w-72">
                      <Label>Profile Image</Label>
                      <div className="relative">
                        <img
                          src={avatarPreview || user?.avatar?.url}
                          alt="avatar preview"
                          className="w-full h-full sm:w-72 sm:h-72 rounded-2xl object-cover border"
                        />
                        <Button
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                          className="absolute bottom-2 right-2 p-2 h-auto"
                          size="sm"
                        >
                          Change
                        </Button>
                      </div>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        onChange={e => handleAvatarChange(e, setFieldValue)}
                        className="hidden"
                      />
                    </div>

                    {/* Resume Section */}
                    <div className="grid gap-2 w-full sm:w-72">
                      <Label>Resume</Label>
                      <div className="relative">
                        {resumePreview ? (
                          <iframe
                            src={resumePreview}
                            className="w-full h-72 rounded-2xl border"
                            title="Resume Preview"
                          />
                        ) : user?.resume?.url ? (
                          <Link
                            to={user.resume.url}
                            target="_blank"
                            className="block"
                          >
                            <div className="w-full h-72 rounded-2xl border flex items-center justify-center bg-gray-50">
                              <p className="text-sm text-gray-600">
                                Click to view current resume
                              </p>
                            </div>
                          </Link>
                        ) : (
                          <div className="w-full h-72 rounded-2xl border flex items-center justify-center bg-gray-50">
                            <p className="text-sm text-gray-600">
                              No resume uploaded
                            </p>
                          </div>
                        )}
                        <Button
                          type="button"
                          onClick={() => resumeInputRef.current?.click()}
                          className="absolute bottom-2 right-2 p-2 h-auto"
                          size="sm"
                        >
                          Change
                        </Button>
                      </div>
                      <input
                        ref={resumeInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={e => handleResumeChange(e, setFieldValue)}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid gap-2 mt-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Field name="fullName">
                      {({ field }) => <Input {...field} type="text" />}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Field name="email">
                      {({ field }) => <Input {...field} type="email" />}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone</Label>
                    <Field name="phoneNumber">
                      {({ field }) => <Input {...field} type="text" />}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="aboutMe">About Me</Label>
                    <Field name="aboutMe">
                      {({ field }) => <Textarea {...field} rows={4} />}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                    <Field name="portfolioUrl">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://your-portfolio.com"
                        />
                      )}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="githubUrl">Github URL</Label>
                    <Field name="githubUrl">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://github.com/username"
                        />
                      )}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Field name="linkedinUrl">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://linkedin.com/in/username"
                        />
                      )}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="instagramUrl">Instagram URL</Label>
                    <Field name="instagramUrl">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://instagram.com/username"
                        />
                      )}
                    </Field>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="facebookUrl">Facebook URL</Label>
                    <Field name="facebookUrl">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://facebook.com/username"
                        />
                      )}
                    </Field>
                  </div>

                  {/* Submit Button */}
                  <div className="grid gap-2 mt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Updating Profile...' : 'Update Profile'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUpdateProfile;
