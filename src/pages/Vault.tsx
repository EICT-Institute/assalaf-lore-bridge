import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, BookOpen, Plus } from 'lucide-react';
import { Category } from '@/types';

const disciplines: Category[] = ['Hadith', 'Fiqh', 'Seerah', 'Tawheed', 'Lughah', 'Sarf', 'Nahw', 'Anasheed', 'Balaghah'];

export default function Vault() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { materials } = useData();
  const [search, setSearch] = React.useState('');
  
  const selectedCategory = searchParams.get('category') as Category | null;

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                         m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? m.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary italic">The Curricular Vault</h1>
          <p className="text-muted-foreground">Discover and share Arabic study materials</p>
        </div>
        <Button asChild>
          <Link to="/upload" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Upload Material
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search materials..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Disciplines
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              <Button 
                variant={!selectedCategory ? 'secondary' : 'ghost'} 
                className="justify-start"
                onClick={() => setSearchParams({})}
              >
                All Categories
              </Button>
              {disciplines.map(cat => (
                <Button 
                  key={cat}
                  variant={selectedCategory === cat ? 'secondary' : 'ghost'} 
                  className="justify-start text-sm"
                  onClick={() => setSearchParams({ category: cat })}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          {filteredMaterials.length === 0 ? (
            <Card className="p-12 text-center bg-muted/30">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No materials found</h3>
              <p className="text-muted-foreground mb-6">
                {selectedCategory 
                  ? `No materials have been uploaded for ${selectedCategory} yet.` 
                  : "Start by uploading some Arabic study guides."}
              </p>
              <Button asChild>
                <Link to="/upload">Upload Now</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMaterials.map(m => (
                <Card key={m.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        {m.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-1">{m.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {m.description}
                    </p>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                      {m.fileUrl.startsWith('data:image') ? (
                        <img src={m.fileUrl} alt={m.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <BookOpen className="h-8 w-8 text-primary/40 mb-2" />
                          <span className="text-xs font-mono">{m.fileName}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/hub?materialId=${m.id}`}>Request Translation</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
