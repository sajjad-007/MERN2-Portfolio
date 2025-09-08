import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  clearAllProjectError,
  deleteProject,
  getAllProject,
  resetAllProjects,
} from '@/features/slices/projectsSlice';
import {
  Loader2Icon,
  SquarePen,
  Telescope,
  Trash2,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProjects = () => {
  const { projects, message, loading, error } = useSelector(
    state => state.project
  );
  const [projectDeleteLoading, setProjectDeleteLoading] = useState('');
  const dispatch = useDispatch();
  const handleDeleteProject = id => {
    setProjectDeleteLoading(id);
    dispatch(deleteProject(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllProjects());
      dispatch(getAllProject());
    }
  }, [dispatch, loading, error, message]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
          <CardTitle className="capitalize"> manage your projects</CardTitle>
          <Link to="/">
            <Button className="cursor-pointer capitalize">
              return To Dashboard
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Stack</TableHead>
                <TableHead className="hidden md:table-cell">Deployed</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-center md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects && projects.length > 0 ? (
                projects.map(item => {
                  return (
                    <TableRow className="bg-accent" key={item._id}>
                      <TableCell>
                        <div className="font-medium">
                          <img
                            src={item.projectImage && item.projectImage.url}
                            alt={item.title}
                            className="w-16 h-16"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell className="hidden md:table-cell mx-auto">
                        {item.stack}
                      </TableCell>
                      <TableCell className="hidden md:table-cell mx-auto">
                        {item.deployed}
                      </TableCell>
                      <TableCell className="hidden md:table-cell mx-auto">
                        {item.description}
                      </TableCell>

                      <TableCell className="text-center flex gap-4 justify-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                to={`/view/project/${item._id}`}
                                className="flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg text-muted-foreground hover:text-foreground transition-colors md:h-8 md:w-8"
                              >
                                <Button className="cursor-pointer  hover:bg-chart-2 transition-all text-4xl">
                                  <Telescope size={20} />
                                </Button>
                                <span className="sr-only">View Project</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
                            >
                              View Project
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                to={`/update/project/${item._id}`}
                                className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg text-muted-foreground hover:text-foreground transition-colors md:h-8 md:w-8`}
                              >
                                <Button className="cursor-pointer hover:bg-chart-2 transition-all text-4xl">
                                  <SquarePen size={20} />
                                </Button>
                                <span className="sr-only">update project</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
                            >
                              Update Project
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {/* Delete project */}
                        {loading && projectDeleteLoading == item._id ? (
                          <div>
                            <Button disabled className="cursor-not-allowed">
                              <Loader2Icon className="animate-spin" />
                            </Button>
                          </div>
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  className={`flex h-9 w-9 pl-1.5 items-center justify-between rounded-lg text-muted-foreground hover:text-foreground transition-colors md:h-8 md:w-8`}
                                >
                                  <Button
                                    className="cursor-pointer  hover:bg-destructive transition-all text-4xl"
                                    onClick={() =>
                                      handleDeleteProject(item._id)
                                    }
                                  >
                                    <Trash2 size={20} />
                                  </Button>
                                  <span className="sr-only">delete</span>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-foreground text-accent px-2 py-2 rounded-lg text-sm font-medium"
                              >
                                Delete Project
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <Alert variant="destructive" className="mt-10">
                  <AlertTitle className="capitalize">
                    Your Timeline is empty!
                  </AlertTitle>
                </Alert>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageProjects;
