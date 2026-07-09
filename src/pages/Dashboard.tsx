import React from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { BookOpen, Languages, Clock, CheckCircle2, Award, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, materials, requests } = useData();
  const myMaterials = materials.filter(m => m.userId === currentUser.id);
  const myRequests = requests.filter(r => r.learnerId === currentUser.id);
  const myTasks = requests.filter(r => r.tutorId === currentUser.id);

  const stats = currentUser.role === 'Learner' ? [
    { label: 'Uploaded', value: myMaterials.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Requests', value: myRequests.length, icon: Languages, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ] : [
    { label: 'Tasks', value: myTasks.length, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Score', value: '4.9/5', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-primary italic">Salam, {currentUser.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}><CardContent className="pt-6 flex items-center gap-4"><div className={`p-3 rounded-xl ${stat.bg}`}><stat.icon className={`h-6 w-6 ${stat.color}`} /></div><div><p className="text-sm font-medium">{stat.label}</p><h3 className="text-2xl font-bold">{stat.value}</h3></div></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="italic">Knowledge Progress</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><div className="flex justify-between text-xs font-medium"><span>Nahw</span><span>75%</span></div><Progress value={75} className="h-2" /></div>
          <div className="space-y-2"><div className="flex justify-between text-xs font-medium"><span>Fiqh</span><span>40%</span></div><Progress value={40} className="h-2" /></div>
        </CardContent>
      </Card>
    </div>
  );
}
