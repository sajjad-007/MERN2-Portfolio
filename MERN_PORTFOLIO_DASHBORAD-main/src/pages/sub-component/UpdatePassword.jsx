import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  clearallErrors,
  getLoginUser,
  resetProfile,
  updatePassword,
} from '@/features/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
  const { user, isUpdate, message, error, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmPassword));
  };
  useEffect(() => {
    if (error) {
      // toast.error(error);
      dispatch(clearallErrors());
    }
    if (isUpdate) {
      dispatch(getLoginUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, loading, isUpdate, message]);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Password</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Password
              </p>
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <div className="grid gap-4">
                <div className="grid gap-2 mt-2 w-full">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                {loading ? (
                  <Button disabled className="mx-auto w-full">
                    Updating...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="mx-auto w-full cursor-pointer"
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
