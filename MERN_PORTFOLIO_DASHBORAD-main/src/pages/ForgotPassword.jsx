import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearallPasswordErrors, forgotPassword } from '@/features/slices/passForgotResetSlice';
import { Loader2Icon } from 'lucide-react';

const ForgotPassword = ({ className, ...props }) => {
  const [email, setEmail] = useState('');
  const { error, message, loading } = useSelector(
    state => state.passwordForgotReset
  );
   const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate()
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearallPasswordErrors());
    }
    if (message !== null) {
      toast.success(message);
    }
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [error, message, loading]);

  const handleResetPassword = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email));
  };
  return (
    <div className={cn('flex flex-col gap-6 mt-[25vh] px-5 py-5', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance capitalize">
                  reset your passwrod using email
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Link
                    to={'/login'}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Remember your password?
                  </Link>
                </div>
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
                  Forgot Password
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

export default ForgotPassword;
