import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload as UploadIcon, FileText, CheckCircle2 } from 'lucide-react';
import { Category, Material } from '@/types';
import { toast } from 'sonner';

const disciplines: Category[] = ['Hadith', 'Fiqh', 'Seerah', 'Tawheed', 'Lughah', 'Sarf', 'Nahw', 'Anasheed', 'Balaghah'];

export default function Upload() {
  const navigate = useNavigate();
  const { setMaterials, currentUser } = useData();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newMaterial: Material = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as Category,
      fileName: file.name,
      fileUrl: preview || 'blob:demo-pdf-placeholder',
      createdAt: new Date().toISOString(),
    };

    setMaterials(prev => [newMaterial, ...prev]);
    toast.success('Material uploaded successfully to the Vault');
    setIsSubmitting(false);
    navigate('/vault');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary italic">Upload to the Vault</h1>
        <p className="text-muted-foreground">Share classic Arabic texts or manuscripts for preservation and translation.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-primary/10 shadow-lg">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-xl">Material Details</CardTitle>
            <CardDescription>Provide context about the text you are uploading.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Material Title</Label>
              <Input id="title" name="title" placeholder="e.g., Al-Ajurrumiyya - Chapter 1" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Discipline</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplines.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description & Context</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Explain what this text covers or why it's important..." 
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-4">
              <Label>File Upload (Arabic Text / Manuscript)</Label>
              <div className={`border-2 border-dashed rounded-xl p-8 transition-colors text-center ${file ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}`}>
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  {file ? (
                    <div className="flex flex-col items-center">
                      {preview ? <img src={preview} alt="Preview" className="h-32 w-auto mb-4 rounded-md shadow-sm" /> : <FileText className="h-12 w-12 text-primary mb-4" />}
                      <p className="font-medium text-primary flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> {file.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-muted rounded-full mb-4"><UploadIcon className="h-8 w-8 text-muted-foreground" /></div>
                      <p className="font-semibold text-lg">Click to select file</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </CardContent>
          <div className="p-6 bg-muted/30 border-t flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Complete Upload'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
