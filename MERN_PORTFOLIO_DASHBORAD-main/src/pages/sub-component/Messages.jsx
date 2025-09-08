import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllMessages,
  deleteMessage,
  getAllMessage,
  resetAllMessage,
} from '@/features/slices/messageSlice';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Loader, Loader2, Trash2 } from 'lucide-react';
const Messages = () => {
  const [messageId, setMessageId] = useState('');
  const { message, loading, error, messages } = useSelector(
    state => state.message
  );
  const dispatch = useDispatch();
  const handleMessageDelete = id => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };
  useEffect(() => {
    dispatch(getAllMessage()); // ✅ fetch messages when component mounts
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllMessage());
      dispatch(getAllMessage());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 pr-2">
      <Card>
        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center ">
          <CardTitle>Messages ({messages.length})</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          {messages && messages.length > 0
            ? messages.map(item => {
                return (
                  <Card
                    key={item._id}
                    className="grid gap-2 px-2 relative mt-2 "
                  >
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Sender Name:</span>
                      {item.senderName}
                    </CardDescription>
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Subject:</span>
                      {item.subject}
                    </CardDescription>
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Message:</span>
                      {item.message}
                    </CardDescription>
                    <CardFooter className="justify-end absolute right-0 top-5">
                      {loading && messageId === item._id ? (
                        <Button disabled className="cursor-not-allowed ">
                          <Loader2 />
                        </Button>
                      ) : (
                        <Button
                          className="cursor-pointer  hover:bg-destructive transition-all text-4xl"
                          onClick={() => handleMessageDelete(item._id)}
                        >
                          <Trash2 size={20}/>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })
            : 'not found'}
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
