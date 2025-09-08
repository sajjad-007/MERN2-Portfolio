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
  clearAllTimelineErrors,
  deleteATimeline,
  gettAllTimeline,
  resetAllTimeline,
} from '@/features/slices/addTimelineSlice';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageTimeline = () => {
  const { addTimeline, message, loading, error } = useSelector(
    state => state.timeline
  );
  const [timeDeleteLoading, setTimeDeleteLoading] = useState('');
  const dispatch = useDispatch();
  const handleDeleteTimeline = id => {
    setTimeDeleteLoading(id);
    dispatch(deleteATimeline(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllTimeline());
      dispatch(gettAllTimeline());
    }
  }, [dispatch, loading, error, message]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
          <CardTitle className="capitalize"> manage your timeline</CardTitle>
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
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addTimeline && addTimeline.length > 0 ? (
                addTimeline.map(item => {
                  return (
                    <TableRow className="bg-accent" key={item._id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="mx-auto">
                        {item.timeline.from}
                      </TableCell>
                      <TableCell className="mx-auto">
                        {item.timeline.to ? item.timeline.to : 'Present'}
                      </TableCell>
                      <TableCell className="text-center">
                        {loading && timeDeleteLoading == item._id ? (
                          <div>
                            <Button disabled className="cursor-not-allowed">
                              <Loader2Icon className="animate-spin" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleDeleteTimeline(item._id)}
                            className="cursor-pointer"
                          >
                            Delete
                          </Button>
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

export default ManageTimeline;
