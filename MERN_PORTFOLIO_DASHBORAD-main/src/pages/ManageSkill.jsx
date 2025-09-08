import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  resetAllAddSkill,
  clearAllSkillSError,
  getAllSkill,
  updateSkill,
  deleteSkill,
} from '@/features/slices/addSkills';
import { Loader2Icon, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageSkill = () => {
  const { addSkill, message, loading, error } = useSelector(
    state => state.skill
  );
  const dispatch = useDispatch();
  const [proficiencyInput, setProficiencyInput] = useState();
  const [delteLoadingId, setDeleteLoadingId] = useState();
  const handleProficiencyInput = proficiencyInputValue => {
    setProficiencyInput(proficiencyInputValue);
  };

  const handleUpdateProficiency = id => {
    dispatch(updateSkill(id, proficiencyInput));
  };
  const handleDeleteSkill = id => {
    setDeleteLoadingId(id);
    dispatch(deleteSkill(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSError());
    }
    if (message) {
      console.log(message);
      toast.success(message);
      dispatch(resetAllAddSkill());
      dispatch(getAllSkill());
    }
  }, [dispatch, error, loading, message]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
          <CardTitle className="capitalize">manage your skill</CardTitle>
          <CardTitle>
            <Link to={'/'}>
              <Button className="capitalize cursor-pointer">
                return to dashboard
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          {addSkill.map(item => {
            return (
              <Card key={item._id}>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <CardTitle>
                    {loading && delteLoadingId == item._id ? (
                      <Button disabled className="cursor-not-allowed">
                        <Loader2Icon className="animate-spin" />
                      </Button>
                    ) : (
                      <Button
                        className="cursor-pointer hover:bg-destructive transition-all text-4xl"
                        onClick={() => handleDeleteSkill(item._id)}
                      >
                        <Trash2 size={20} />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Label>Proficiency</Label>
                  <Input
                    type="number"
                    className="ml-2"
                    defaultValue={item.proficiency}
                    onChange={e => handleProficiencyInput(e.target.value)}
                    onBlur={() => handleUpdateProficiency(item._id)}
                  />
                </CardFooter>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSkill;
