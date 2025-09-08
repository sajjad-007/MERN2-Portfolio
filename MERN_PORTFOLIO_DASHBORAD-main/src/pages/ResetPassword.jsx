import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearallPasswordErrors,
  resetPassword,
} from '@/features/slices/passForgotResetSlice';
import { Loader2Icon } from 'lucide-react';
import { getLoginUser } from '@/features/slices/userSlice';

const ResetPassword = ({ className, ...props }) => {
  const { token } = useParams();
  console.log(token);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { error, loading, message } = useSelector(
    state => state.passwordForgotReset
  );
  const { isAuthenticated } = useSelector(sate => sate.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearallPasswordErrors());
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getLoginUser());
    }
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [dispatch, error, message, loading]);
  const handleResetPassword = e => {
    e.preventDefault();
    dispatch(resetPassword(password, confirmPassword, token));
  };
  return (
    <div
      className={cn('flex flex-col gap-6 mt-[25vh] px-5 py-5', className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance capitalize">
                  reset your password
                </p>
              </div>
              <div className="grid gap-3">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter New Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="Enter Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <Button size="sm" disabled>
                  <Loader2Icon className="animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full capitalize"
                  onClick={handleResetPassword}
                >
                  password reset
                </Button>
              )}
            </div>
          </form>
          {/* LOGIN IMAGE PART */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
