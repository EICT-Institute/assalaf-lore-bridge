import React from 'react';
import { useData } from '@/context/DataContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TranslationRequest } from '@/types';
import { toast } from 'sonner';

interface RequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMaterialId?: string;
}

export function RequestDialog({ open, onOpenChange, initialMaterialId }: RequestDialogProps) {
  const { materials, setRequests, currentUser } = useData();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newRequest: TranslationRequest = {
      id: crypto.randomUUID(),
      materialId: formData.get('materialId') as string,
      learnerId: currentUser.id,
      targetTopic: formData.get('targetTopic') as string,
      targetLanguage: formData.get('targetLanguage') as 'Hausa' | 'Yoruba' | 'Igbo',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setRequests(prev => [newRequest, ...prev]);
    toast.success('Translation request submitted!');
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl italic text-primary">Request Translation</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-2">
              <Label>Select Material</Label>
              <Select name="materialId" defaultValue={initialMaterialId} required>
                <SelectTrigger><SelectValue placeholder="Choose material" /></SelectTrigger>
                <SelectContent>{materials.map(m => (<SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Language</Label>
              <Select name="targetLanguage" required defaultValue="Hausa">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Hausa">Hausa</SelectItem><SelectItem value="Yoruba">Yoruba</SelectItem><SelectItem value="Igbo">Igbo</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Topic to Translate</Label>
              <Input name="targetTopic" placeholder="e.g. Page 4, Paragraph 2" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Request'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
