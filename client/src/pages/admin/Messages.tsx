import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, Mail, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ContactMessage } from "@shared/schema";
import { format } from "date-fns";

export default function MessagesPage() {
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['/api/admin/messages'],
    queryFn: async () => {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      return response.json();
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('admin_token');
      return apiRequest('PATCH', `/api/admin/messages/${id}/read`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/messages'] });
      toast({ title: "Message marked as read" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to mark as read", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const unreadCount = messages?.filter((m: ContactMessage) => !m.read).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  No messages yet
                </TableCell>
              </TableRow>
            ) : (
              messages?.map((message: ContactMessage) => (
                <TableRow key={message.id} data-testid={`row-message-${message.id}`}>
                  <TableCell>
                    {message.read ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                  </TableCell>
                  <TableCell className={!message.read ? "font-semibold" : ""}>
                    {message.name}
                  </TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className={!message.read ? "font-semibold" : ""}>
                    {message.subject}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {message.message}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(message.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    {!message.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsReadMutation.mutate(message.id)}
                        data-testid={`button-mark-read-${message.id}`}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Read
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
