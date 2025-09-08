import { Alert, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  clearSoftwareApplicationErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplication,
  resetAllSoftwareApplication,
} from '@/features/slices/addSoftwareApplication';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useSelector(state => state.user);
  const { projects } = useSelector(state => state.project);
  const { addSkill } = useSelector(state => state.skill);
  const { addTimeline } = useSelector(state => state.timeline);
  const { softwareApplication, loading, error, message } = useSelector(
    state => state.application
  );
  const dispatch = useDispatch();
  const [appDeleteLoading, setAppDeleteLoading] = useState('');
  const handleDeleteApp = id => {
    setAppDeleteLoading(id);
    dispatch(deleteSoftwareApplication(id));
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
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {user.aboutMe}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link>
                  <Button className="cursor-pointer">Visit Portfolio</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Projects Completed</CardTitle>
                <CardTitle className="text-6xl">
                  {projects && projects.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={'/manage/projects'}>
                  <Button className="cursor-pointer">Manage Projects</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardTitle className="text-6xl">
                  {addSkill && addSkill.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={'/manage/skills'}>
                  <Button className="cursor-pointer">Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          {/* Project Card*/}
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead cassName="text-right hidden md:table-cell">
                      Stack
                    </TableHead>
                    <TableHead className="text-center hidden md:table-cell">
                      Deployed
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Update
                    </TableHead>
                    <TableHead className="text-center">Visit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map(item => {
                      return (
                        <TableRow
                          className="text-center bg-accent"
                          key={item._id}
                        >
                          <TableCell>
                            <div className="font-medium">{item.title}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-left">
                            {item.stack}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              {item.deployed}
                            </Badge>
                          </TableCell>
                          <TableCell className="md:table-cell text-center">
                            <Link to={`/update/project/${item._id}`}>
                              <Button className="cursor-pointer md:table-cell">
                                Update
                              </Button>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link to={`/view/project/${item._id}`}>
                              <Button className="cursor-pointer">Visit</Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <Alert variant="destructive" className="mt-10">
                      <AlertTitle>You don't have any projects yet !</AlertTitle>
                    </Alert>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Skill Card */}
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {addSkill && addSkill.length > 0 ? (
                addSkill.map(item => {
                  return (
                    <Card key={item._id}>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardFooter>
                        <Progress value={item.proficiency} />
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <Alert variant="destructive" className="mt-10">
                  <AlertTitle className="capitalize">
                    Your Currently Don't Have any skill Add some !
                  </AlertTitle>
                </Alert>
              )}
            </CardContent>
          </Card>
          {/* Application & Timeline Card */}
          <div className="grid min-[1050px]:grid-cols-2 gap-4">
            {/* Software application  */}
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Software Application</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="md:table-cell">Icon</TableHead>
                      <TableHead className="text-center md:table-cell">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {softwareApplication && softwareApplication.length > 0 ? (
                      softwareApplication.map(item => {
                        return (
                          <TableRow className="bg-accent">
                            <TableHead>{item.title}</TableHead>
                            <TableHead>
                              <img
                                src={item.icons && item.icons.url}
                                alt="not found"
                                className="h-8 w-8"
                              />
                            </TableHead>
                            <TableHead className="text-center">
                              {loading && appDeleteLoading == item._id ? (
                                <div>
                                  <Button
                                    disabled
                                    className="cursor-not-allowed"
                                  >
                                    <Loader2Icon className="animate-spin" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  onClick={() => handleDeleteApp(item._id)}
                                  className="cursor-pointer"
                                >
                                  Delete
                                </Button>
                              )}
                            </TableHead>
                          </TableRow>
                        );
                      })
                    ) : (
                      <Alert variant="destructive" className="mt-10">
                        <AlertTitle className="capitalize">
                          Empty! Add some Software Application
                        </AlertTitle>
                      </Alert>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {/* Timeline  */}
            <Card>
              <CardHeader className="px-7 flex items-center justify-between">
                <CardTitle>Timeline</CardTitle>
                <CardFooter>
                  <Link to={'/manage/timeline'}>
                    <Button className="cursor-pointer">Manage Timeline</Button>
                  </Link>
                </CardFooter>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Name</TableHead>
                      <TableHead className="md:table-cell mx-auto">
                        From
                      </TableHead>
                      <TableHead className="md:table-cell mx-auto">
                        To
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addTimeline && addTimeline.length > 0 ? (
                      addTimeline.map(item => {
                        return (
                          <TableRow className="bg-accent" key={item._id}>
                            <TableHead>{item.title}</TableHead>
                            <TableHead className="mx-auto">
                              {item.timeline.from}
                            </TableHead>
                            <TableHead className="mx-auto">
                              {item.timeline.to ? item.timeline.to : 'Present'}
                            </TableHead>
                          </TableRow>
                        );
                      })
                    ) : (
                      <Alert variant="destructive" className="mt-10">
                        <AlertTitle className="capitalize">
                          Your Currently Don't Have any skill Add some !
                        </AlertTitle>
                      </Alert>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
