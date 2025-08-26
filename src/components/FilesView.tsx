import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  FileText, 
  Image, 
  Video, 
  Archive,
  Download,
  Share2,
  MoreHorizontal,
  Grid3X3,
  List,
  Upload,
  FolderPlus,
  Star,
  Clock,
  Users,
  Filter
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'archive' | 'folder';
  size: string;
  modified: string;
  modifiedBy: string;
  shared: boolean;
  starred: boolean;
  preview?: string;
}

export function FilesView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const files: FileItem[] = [
    {
      id: '1',
      name: 'Q4_Financial_Report.xlsx',
      type: 'document',
      size: '2.4 MB',
      modified: '2 hours ago',
      modifiedBy: 'Sarah Johnson',
      shared: true,
      starred: false
    },
    {
      id: '2',
      name: 'Product_Roadmap_2024.pptx',
      type: 'document',
      size: '5.7 MB',
      modified: '4 hours ago',
      modifiedBy: 'Product Team',
      shared: true,
      starred: true
    },
    {
      id: '3',
      name: 'Meeting_Notes_Dec15.docx',
      type: 'document',
      size: '156 KB',
      modified: '1 day ago',
      modifiedBy: 'You',
      shared: false,
      starred: false
    },
    {
      id: '4',
      name: 'Team_Photo_2024.jpg',
      type: 'image',
      size: '3.2 MB',
      modified: '2 days ago',
      modifiedBy: 'HR Team',
      shared: true,
      starred: false
    },
    {
      id: '5',
      name: 'Marketing Campaign Assets',
      type: 'folder',
      size: '42 files',
      modified: '3 days ago',
      modifiedBy: 'Marketing Team',
      shared: true,
      starred: true
    },
    {
      id: '6',
      name: 'Training_Video_Q4.mp4',
      type: 'video',
      size: '85.6 MB',
      modified: '1 week ago',
      modifiedBy: 'Training Team',
      shared: false,
      starred: false
    },
    {
      id: '7',
      name: 'Client_Presentation_Final.pptx',
      type: 'document',
      size: '12.8 MB',
      modified: '1 week ago',
      modifiedBy: 'You',
      shared: true,
      starred: false
    },
    {
      id: '8',
      name: 'Project_Archive_2023.zip',
      type: 'archive',
      size: '156 MB',
      modified: '2 weeks ago',
      modifiedBy: 'Project Team',
      shared: false,
      starred: false
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'image':
        return <Image className="h-8 w-8 text-green-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-red-500" />;
      case 'archive':
        return <Archive className="h-8 w-8 text-orange-500" />;
      case 'folder':
        return <div className="h-8 w-8 bg-yellow-500 rounded"></div>;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const toggleStar = (fileId: string) => {
    // In a real app, this would update the server
    console.log('Toggle star for file:', fileId);
  };

  const recentFiles = files.slice(0, 3);

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Files</h1>
          <p className="text-gray-600">Access your OneDrive files and recent documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Files</p>
              <p className="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Storage Used</p>
              <p className="text-2xl font-semibold text-gray-900">8.4 GB</p>
            </div>
            <div className="h-8 w-8 bg-green-500 rounded"></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shared Files</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
            <Share2 className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recent Updates</p>
              <p className="text-2xl font-semibold text-gray-900">23</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Recent Files Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recently Modified</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentFiles.map((file) => (
            <div key={file.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                    <p className="text-sm text-gray-500">{file.size}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStar(file.id)}
                  className="p-1"
                >
                  <Star className={`h-4 w-4 ${file.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Modified {file.modified}</span>
                {file.shared && (
                  <Badge variant="secondary" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    Shared
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Files Section */}
      <Card className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">All Files</h2>
            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedFiles.length} selected</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => toggleFileSelection(file.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-gray-300 ${
                  selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  {getFileIcon(file.type)}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(file.id);
                      }}
                      className="p-1"
                    >
                      <Star className={`h-4 w-4 ${file.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{file.size}</span>
                    {file.shared && (
                      <Badge variant="secondary" className="text-xs">
                        <Share2 className="h-3 w-3 mr-1" />
                        Shared
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    Modified {file.modified} by {file.modifiedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-gray-500 border-b">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-2">Modified By</div>
              <div className="col-span-1">Actions</div>
            </div>
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => toggleFileSelection(file.id)}
                className={`grid grid-cols-12 gap-4 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedFiles.includes(file.id) ? 'bg-blue-50 border border-blue-200' : ''
                }`}
              >
                <div className="col-span-5 flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{file.name}</p>
                    {file.shared && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        <Share2 className="h-3 w-3 mr-1" />
                        Shared
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="col-span-2 flex items-center text-sm text-gray-600">
                  {file.size}
                </div>
                <div className="col-span-2 flex items-center text-sm text-gray-600">
                  {file.modified}
                </div>
                <div className="col-span-2 flex items-center text-sm text-gray-600">
                  {file.modifiedBy}
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(file.id);
                    }}
                    className="p-1"
                  >
                    <Star className={`h-4 w-4 ${file.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}