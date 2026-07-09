import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Clock, CheckCircle2, Languages, Play, User } from 'lucide-react';
import { RequestDialog } from '@/components/hub/RequestDialog';
import { ResponseDialog } from '@/components/hub/ResponseDialog';
import { TranslationRequest } from '@/types';

export default function TranslationHub() {
  const [searchParams] = useSearchParams();
  const { requests, currentUser, materials } = useData();
  const materialIdFromUrl = searchParams.get('materialId');
  const [isRequestOpen, setIsRequestOpen] = React.useState(!!materialIdFromUrl);

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const myRequests = requests.filter(r => r.learnerId === currentUser.id);
  const myTasks = requests.filter(r => r.tutorId === currentUser.id);

  const getMaterialTitle = (id: string) => materials.find(m => m.id === id)?.title || 'Unknown Material';

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary italic">Crowdsourced Translation Hub</h1>
          <p className="text-muted-foreground">Connecting learners with native-tongue heritage interpretations.</p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/10 p-2 rounded-lg border border-secondary/20">
          <Badge variant="outline" className="bg-primary text-white border-none">{currentUser.role}</Badge>
          <span className="text-sm font-medium">{currentUser.name}</span>
        </div>
      </div>

      <Tabs defaultValue={currentUser.role === 'Tutor' ? 'feed' : 'my-requests'} className="w-full">
        <TabsList className="mb-8 bg-muted/50 p-1">
          {currentUser.role === 'Learner' && (
            <TabsTrigger value="my-requests" className="flex gap-2"><Clock className="h-4 w-4" /> My Requests</TabsTrigger>
          )}
          {currentUser.role === 'Tutor' && (
            <>
              <TabsTrigger value="feed" className="flex gap-2"><Globe className="h-4 w-4" /> Global Feed</TabsTrigger>
              <TabsTrigger value="my-tasks" className="flex gap-2"><CheckCircle2 className="h-4 w-4" /> My Tasks</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="feed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingRequests.length === 0 ? (
              <Card className="col-span-full p-12 text-center bg-muted/30"><p className="text-muted-foreground">No pending translation requests at the moment.</p></Card>
            ) : (
              pendingRequests.map(req => (
                <RequestCard key={req.id} request={req} materialTitle={getMaterialTitle(req.materialId)} isTutor={true} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="my-requests">
          <div className="flex justify-end mb-6">
            <Button onClick={() => setIsRequestOpen(true)} className="flex items-center gap-2"><Languages className="h-4 w-4" /> New Request</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRequests.length === 0 ? (
              <Card className="col-span-full p-12 text-center bg-muted/30">
                <p className="text-muted-foreground">You haven't made any translation requests yet.</p>
                <Button variant="link" onClick={() => setIsRequestOpen(true)}>Create your first request</Button>
              </Card>
            ) : (
              myRequests.map(req => (
                <RequestCard key={req.id} request={req} materialTitle={getMaterialTitle(req.materialId)} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="my-tasks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTasks.length === 0 ? (
              <Card className="col-span-full p-12 text-center bg-muted/30"><p className="text-muted-foreground">You haven't accepted any translation tasks yet.</p></Card>
            ) : (
              myTasks.map(req => (
                <RequestCard key={req.id} request={req} materialTitle={getMaterialTitle(req.materialId)} isTutor={true} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <RequestDialog open={isRequestOpen} onOpenChange={setIsRequestOpen} initialMaterialId={materialIdFromUrl || undefined} />
    </div>
  );
}

function RequestCard({ request, materialTitle, isTutor = false }: { request: TranslationRequest, materialTitle: string, isTutor?: boolean }) {
  const [isResponseOpen, setIsResponseOpen] = React.useState(false);

  return (
    <Card className="flex flex-col overflow-hidden border-primary/5 hover:shadow-md transition-shadow">
      <div className={`h-1.5 w-full ${request.status === 'Completed' ? 'bg-green-500' : request.status === 'Accepted' ? 'bg-blue-500' : 'bg-amber-500'}`} />
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">{request.targetLanguage}</Badge>
          <Badge variant="outline" className="text-[10px] uppercase">{request.status}</Badge>
        </div>
        <CardTitle className="text-lg line-clamp-1">{materialTitle}</CardTitle>
        <CardDescription className="line-clamp-2">Topic: {request.targetTopic}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {request.status === 'Completed' && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-100 text-sm">
            <div className="flex items-center gap-2 text-green-700 font-semibold mb-1"><CheckCircle2 className="h-4 w-4" /> Explanation Ready</div>
            <p className="text-green-600 line-clamp-3 italic">"{request.responseText}"</p>
            {request.responseAudioUrl && <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-green-200 text-xs text-green-700 w-fit"><Play className="h-3 w-3 fill-green-700" /> Audio Interpretation</div>}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 bg-muted/20 border-t border-primary/5">
        {isTutor ? (
          <Button className="w-full" onClick={() => setIsResponseOpen(true)}>
            {request.status === 'Pending' ? 'Accept Task' : 'View Submission'}
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled={request.status !== 'Completed'}>
            {request.status === 'Completed' ? 'View Explanation' : 'Waiting...'}
          </Button>
        )}
      </CardFooter>
      <ResponseDialog open={isResponseOpen} onOpenChange={setIsResponseOpen} request={request} materialTitle={materialTitle} />
    </Card>
  );
}
