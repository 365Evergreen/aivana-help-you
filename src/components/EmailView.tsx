import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Mail, 
  Search, 
  Archive, 
  Trash2, 
  Reply, 
  ReplyAll, 
  Forward,
  Star,
  Paperclip,
  AlertCircle,
  Clock,
  Filter
} from 'lucide-react';

interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  read: boolean;
  priority: 'high' | 'normal' | 'low';
  hasAttachment: boolean;
  starred: boolean;
}

export function EmailView() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const emails: Email[] = [
    {
      id: '1',
      from: 'Sarah Johnson',
      fromEmail: 'sarah.johnson@company.com',
      subject: 'Q4 Budget Review - Action Required',
      preview: 'Hi John, I need your input on the Q4 budget allocations. Please review the attached spreadsheet...',
      content: `Hi John,

I hope this email finds you well. I need your input on the Q4 budget allocations for our department.

Please review the attached spreadsheet and provide your feedback on:
1. Marketing budget allocation
2. Technology infrastructure costs
3. Personnel budget for Q1 2024

The deadline for submissions is this Friday. Please let me know if you have any questions.

Best regards,
Sarah Johnson
Finance Manager`,
      time: '9:30 AM',
      read: false,
      priority: 'high',
      hasAttachment: true,
      starred: false
    },
    {
      id: '2',
      from: 'Marketing Team',
      fromEmail: 'marketing@company.com',
      subject: 'Campaign Performance Update - December',
      preview: 'Our latest campaign has shown excellent results with a 23% increase in engagement...',
      content: `Team,

Our latest campaign has shown excellent results! Here are the key metrics:

📈 Engagement: +23% from last month
📧 Email open rate: 34.5%
🎯 Conversion rate: 8.2%
💰 ROI: 245%

Congratulations to everyone involved. Let's discuss next steps in tomorrow's meeting.

Marketing Team`,
      time: '8:45 AM',
      read: true,
      priority: 'normal',
      hasAttachment: false,
      starred: true
    },
    {
      id: '3',
      from: 'IT Support',
      fromEmail: 'support@company.com',
      subject: 'Scheduled System Maintenance - This Weekend',
      preview: 'We will be performing scheduled maintenance on our servers this weekend...',
      content: `Dear Team,

We will be performing scheduled maintenance on our servers this weekend from Saturday 10 PM to Sunday 6 AM.

During this time, you may experience:
- Brief interruptions to email service
- Temporary unavailability of shared files
- Slower response times for web applications

We apologize for any inconvenience and appreciate your patience.

IT Support Team`,
      time: '8:20 AM',
      read: true,
      priority: 'low',
      hasAttachment: false,
      starred: false
    },
    {
      id: '4',
      from: 'Product Team',
      fromEmail: 'product@company.com',
      subject: 'New Feature Release - User Testing Required',
      preview: 'We\'re excited to announce our new dashboard feature is ready for testing...',
      content: `Hi everyone,

We're excited to announce our new dashboard feature is ready for user testing!

Key features include:
✨ Real-time analytics
📊 Customizable widgets
🎨 Dark/light mode toggle
📱 Mobile responsive design

Please test the beta version and provide feedback by end of week.

Product Team`,
      time: 'Yesterday',
      read: false,
      priority: 'normal',
      hasAttachment: true,
      starred: false
    }
  ];

  const selectedEmailData = emails.find(email => email.id === selectedEmail);

  const toggleStar = (emailId: string) => {
    // In a real app, this would update the server
    console.log('Toggle star for email:', emailId);
  };

  const markAsRead = (emailId: string) => {
    // In a real app, this would update the server
    console.log('Mark as read:', emailId);
  };

  return (
    <div className="h-full flex">
      {/* Email List */}
      <div className="w-96 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => {
                setSelectedEmail(email.id);
                if (!email.read) markAsRead(email.id);
              }}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedEmail === email.id ? 'bg-blue-50 border-blue-200' : ''
              } ${!email.read ? 'bg-blue-25' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${!email.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                  <span className={`font-medium text-gray-900 truncate ${!email.read ? '' : 'font-normal'}`}>
                    {email.from}
                  </span>
                  {email.priority === 'high' && (
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(email.id);
                    }}
                    className="p-1 h-auto"
                  >
                    <Star className={`h-4 w-4 ${email.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </Button>
                  <span className="text-xs text-gray-500">{email.time}</span>
                </div>
              </div>
              
              <h3 className={`text-sm mb-1 truncate ${!email.read ? 'font-semibold' : ''}`}>
                {email.subject}
              </h3>
              
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {email.preview}
              </p>
              
              <div className="flex items-center gap-2">
                {email.hasAttachment && (
                  <Badge variant="secondary" className="text-xs">
                    <Paperclip className="h-3 w-3 mr-1" />
                    Attachment
                  </Badge>
                )}
                {email.priority === 'high' && (
                  <Badge variant="destructive" className="text-xs">High Priority</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmailData ? (
          <>
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedEmailData.subject}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {selectedEmailData.from.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{selectedEmailData.from}</div>
                        <div className="text-gray-500">{selectedEmailData.fromEmail}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedEmailData.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <ReplyAll className="h-4 w-4 mr-2" />
                    Reply All
                  </Button>
                  <Button variant="outline" size="sm">
                    <Forward className="h-4 w-4 mr-2" />
                    Forward
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {selectedEmailData.priority === 'high' && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-700">This email is marked as high priority</span>
                </div>
              )}
              
              {selectedEmailData.hasAttachment && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Q4_Budget_Allocation.xlsx (245 KB)</span>
                  <Button variant="outline" size="sm" className="ml-auto">Download</Button>
                </div>
              )}
            </div>

            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
              <Card className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900">
                    {selectedEmailData.content}
                  </div>
                </div>
              </Card>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an email</h3>
              <p className="text-gray-600">Choose an email from the list to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}