import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearallErrors, login } from '@/features/slices/userSlice';
import { toast } from 'react-toastify';
import { Loader2Icon } from 'lucide-react';

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, isAuthenticated, error } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginBtn = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearallErrors());
    }
    if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, loading, isAuthenticated, error]);
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to Admin Panel
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
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to={'/password/forgot'}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                  className="w-full"
                  onClick={handleLoginBtn}
                >
                  Login
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
}
