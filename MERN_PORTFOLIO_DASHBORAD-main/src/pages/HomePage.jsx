import { Button } from '@/components/ui/button';
import { logoutUser, clearallErrors } from '@/features/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Dashboard from './sub-component/Dashboard';
import AddSkill from './sub-component/AddSkill';
import AddTimeline from './sub-component/AddTimeline';
import Messages from './sub-component/Messages';
import AddProject from './sub-component/AddProject';
import Account from './sub-component/Account';
import AddSoftApplication from './sub-component/AddSoftApplication';

const HomePage = () => {
  const [active, setActive] = useState('Dashboard');
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, message, user } = useSelector(
    state => state.user
  );
  const navigateTo = useNavigate();
  const handlelogout = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearallErrors());
    }
    if (!isAuthenticated) {
      navigateTo('/login');
    }
  }, [dispatch, message, error, isAuthenticated]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border bg-background z-50 sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 ">
          <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-sidebar-foreground md:h-8 md:w-8 md:text-base md:mt-2">
            <Package2 className="h-5 w-5 transition-all  group-hover:scale-110" />
            <span className="sr-only">hello world</span>
          </Link>
          {/* Dashboard */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg  ${
                    active === 'Dashboard'
                      ? 'text-card bg-chart-2 '
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors  md:h-8 md:w-8`}
                  onClick={() => setActive('Dashboard')}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Dashboard
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* project */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg  ${
                    active === 'Add Poject'
                      ? 'text-card bg-chart-2'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors  md:h-8 md:w-8`}
                  onClick={() => setActive('Add Poject')}
                >
                  <FolderGit className="h-5 w-5 " />
                  <span className="sr-only">Add Poject</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Add Poject
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Add Skill */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg  ${
                    active === 'Add Skill'
                      ? 'text-card bg-chart-2'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors  md:h-8 md:w-8`}
                  onClick={() => setActive('Add Skill')}
                >
                  <PencilRuler className="h-5 w-5 " />
                  <span className="sr-only">Add Skill</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Add Skill
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Add Timeline */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg  ${
                    active === 'Add Timeline'
                      ? 'text-card bg-chart-2'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors md:h-8 md:w-8`}
                  onClick={() => setActive('Add Timeline')}
                >
                  <History className="h-5 w-5" />
                  <span className="sr-only">Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Add Timeline
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Add Uses */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg  ${
                    active === 'Add Uses'
                      ? 'text-card bg-chart-2'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors md:h-8 md:w-8`}
                  onClick={() => setActive('Add Uses')}
                >
                  <LayoutGrid className="h-5 w-5" />
                  <span className="sr-only">Add Uses</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Add Uses
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Message */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg  ${
                    active === 'Message'
                      ? 'text-card bg-chart-2'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors md:h-8 md:w-8`}
                  onClick={() => setActive('Message')}
                >
                  <MessageSquareMore className="h-5 w-5 " />
                  <span className="sr-only">Message</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Message
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Account */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg  ${
                    active === 'Account'
                      ? 'text-card bg-chart-2'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors md:h-8 md:w-8`}
                  onClick={() => setActive('Account')}
                >
                  <User className="h-5 w-5 " />
                  <span className="sr-only">Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handlelogout}
                >
                  <LogOut className="h-5 w-5 text-destructive" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-destructive text-accent px-2 py-2 rounded-lg text-sm font-medium"
              >
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link className="group ml-1.5 mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <Package2 />
                <span className="sr-only">acme inc</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === 'Dashboard'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActive('Dashboard')}
              >
                <Home className="h-5 w-5" />
                <span className="not-sr-only">Dashboard</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === 'Add Skill'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActive('Add Skill')}
              >
                <PencilRuler className="h-5 w-5" />
                <span>Add Skill</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === 'Add Timeline'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActive('Add Timeline')}
              >
                <History className="h-5 w-5" />
                <span>Add Timeline</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === 'Message'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActive('Message')}
              >
                <MessageSquareMore className="h-5 w-5" />
                <span>Message</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === 'Add Uses'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActive('Add Uses')}
              >
                <LayoutGrid className="h-5 w-5" />
                <span>Add Uses</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === 'Account'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActive('Account')}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
              <Link
                className={'flex items-center gap-4 px-2.5  mt-10 '}
                onClick={handlelogout}
              >
                <LogOut className="h-5 w-5 text-destructive" />
                <span className="text-destructive">Logout</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
          <img
            src={user && user.avatar && user.avatar.url}
            alt="avatar"
            className="w-20 h-20 rounded-full max-[900px]:hidden"
          />
          <h1 className="text-4xl max-[900px]:text-2xl capitalize">
            Welcome back, {user.fullName}
          </h1>
        </div>
      </header>
      <div className="grid gap-6">
        {(() => {
          switch (active) {
            case 'Dashboard':
              return <Dashboard />;
              break;
            case 'Add Skill':
              return <AddSkill />;
              break;
            case 'Add Timeline':
              return <AddTimeline />;
              break;
            case 'Message':
              return <Messages />;
              break;
            case 'Add Poject':
              return <AddProject />;
              break;
            case 'Account':
              return <Account />;
              break;
            case 'Add Uses':
              return <AddSoftApplication />;
              break;
            default:
              return <Dashboard />;
              break;
          }
        })()}
      </div>
    </div>
  );
};

export default HomePage;
