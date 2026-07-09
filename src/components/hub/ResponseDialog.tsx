import React from 'react';
import { useData } from '@/context/DataContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TranslationRequest } from '@/types';
import { Mic, Square, Play, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ResponseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: TranslationRequest;
  materialTitle: string;
}

export function ResponseDialog({ open, onOpenChange, request, materialTitle }: ResponseDialogProps) {
  const { setRequests, currentUser } = useData();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(request.responseAudioUrl || null);
  const [responseText, setResponseText] = React.useState(request.responseText || '');

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => { setIsRecording(false); setAudioUrl('blob:mock-audio'); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRequests(prev => prev.map(r => r.id === request.id ? { ...r, status: 'Completed', tutorId: currentUser.id, responseText, responseAudioUrl: audioUrl || undefined } : r));
    toast.success('Interpretation submitted!');
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleAccept = () => {
    setRequests(prev => prev.map(r => r.id === request.id ? { ...r, status: 'Accepted', tutorId: currentUser.id } : r));
    toast.success('Accepted task!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader><DialogTitle className="text-2xl italic text-primary">Provide Interpretation</DialogTitle></DialogHeader>
        <div className="py-4 space-y-6">
          <p className="text-sm italic p-2 bg-muted rounded">Topic: {request.targetTopic}</p>
          <div className="space-y-2">
            <Label>Text Explanation</Label>
            <Textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} placeholder="Provide explanation..." />
          </div>
          <div className="space-y-3">
            <Label>Audio Interpretation</Label>
            {audioUrl ? <div className="flex items-center gap-2 p-2 bg-primary/5 rounded"><Play className="h-4 w-4" /> Recorded</div> : 
              <Button variant="outline" className="w-full" onClick={isRecording ? stopRecording : startRecording}>{isRecording ? <Square /> : <Mic />} {isRecording ? 'Stop' : 'Start Recording'}</Button>
            }
          </div>
        </div>
        <DialogFooter>
          {request.status === 'Pending' ? <Button onClick={handleAccept}>Accept</Button> : <Button onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
