import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const categories = [
  'Life', 'Love', 'Romantic', 'Motivational', 'Nature', 
  'Philosophical', 'Spiritual', 'Friendship', 'Hope'
];

const UploadModal = ({ isOpen, onClose, onSuccess }: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Life');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setLoading(true);
    try {
      // Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('poetry-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('poetry-images')
        .getPublicUrl(fileName);

      // Create poetry post record
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const { error: insertError } = await supabase
        .from('poetry_posts')
        .insert({
          user_id: user.id,
          title: title || null,
          caption: caption || null,
          image_url: data.publicUrl,
          category,
          tags: tagsArray.length > 0 ? tagsArray : null
        });

      if (insertError) throw insertError;

      toast({
        title: "Poetry uploaded!",
        description: "Your poetry has been shared with the community."
      });

      // Reset form
      setFile(null);
      setTitle('');
      setCaption('');
      setCategory('Life');
      setTags('');
      setPreview(null);
      
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Share Your Poetry</DialogTitle>
          <DialogDescription>
            Upload an image of your poetry to share with the community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Poetry Image</Label>
            {!file ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Click to upload image</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={preview!} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeFile}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your poetry a title..."
            />
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption (Optional)</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share the story behind your poetry..."
              className="min-h-[80px]"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="love, hope, inspiration (separate with commas)"
            />
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? 'Uploading...' : 'Share Poetry'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;