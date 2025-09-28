// app/chat/ChatClient.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  FileText,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ChatClient() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newComment, setNewComment] = useState({});
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [pendingFile, setPendingFile] = useState(null);
  const [fileCaption, setFileCaption] = useState("");
  const [showFileDialog, setShowFileDialog] = useState(false);

  const { toast } = useToast();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getUser();
    fetchMessages();
    const cleanup = subscribeToMessages();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select(
        `
        *,
        profiles:user_id (display_name),
        likes:chat_likes (
          id,
          user_id,
          emoji,
          profiles:user_id (display_name)
        ),
        comments:chat_comments (
          id,
          user_id,
          content,
          created_at,
          profiles:user_id (display_name),
          likes:chat_comment_likes (
            id,
            user_id,
            emoji,
            profiles:user_id (display_name)
          )
        )
      `
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }
    setMessages(data || []);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel("chat_messages_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        async (payload) => {
          const { data } = await supabase
            .from("chat_messages")
            .select(`*, profiles:user_id (display_name)`)
            .eq("id", payload.new.id)
            .single();
          if (data) setMessages((prev) => [...prev, data]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const { error } = await supabase.from("chat_messages").insert([
      {
        user_id: user.id,
        content: newMessage,
        message_type: "text",
      },
    ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return;
    }
    setNewMessage("");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "text/plain",
    ];
    if (!allowed.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only images, PDFs, and text files are allowed",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      });
      return;
    }

    setPendingFile(file);
    setFileCaption("");
    setShowFileDialog(true);
  };

  const handleFileUpload = async () => {
    if (!pendingFile || !user) return;
    setUploading(true);
    setShowFileDialog(false);

    try {
      const fileExt = pendingFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase
        .storage
        .from("chat-files")
        .upload(fileName, pendingFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("chat-files").getPublicUrl(fileName);

      const { error: messageError } = await supabase.from("chat_messages").insert([
        {
          user_id: user.id,
          content: fileCaption.trim() || null,
          message_type: "file",
          file_url: publicUrl,
          file_name: pendingFile.name,
          file_type: pendingFile.type,
          file_size: pendingFile.size,
        },
      ]);

      if (messageError) throw messageError;

      toast({ title: "File uploaded", description: "File shared successfully" });
    } catch (err) {
      console.error("Upload error:", err);
      toast({
        title: "Upload failed",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setPendingFile(null);
      setFileCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const cancelFileUpload = () => {
    setPendingFile(null);
    setFileCaption("");
    setShowFileDialog(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLikeMessage = async (messageId, emoji = "👍") => {
    if (!user) return;

    const message = messages.find((m) => m.id === messageId);
    const existingLike =
      message?.likes?.find((l) => l.user_id === user.id && l.emoji === emoji) ||
      null;

    if (existingLike) {
      const { error } = await supabase
        .from("chat_likes")
        .delete()
        .eq("id", existingLike.id);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove like",
          variant: "destructive",
        });
        return;
      }
    } else {
      const { error } = await supabase.from("chat_likes").insert([
        {
          user_id: user.id,
          message_id: messageId,
          emoji,
        },
      ]);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to add like",
          variant: "destructive",
        });
        return;
      }
    }
    fetchMessages();
  };

  const handleLikeComment = async (commentId, emoji = "👍") => {
    if (!user) return;

    const comment =
      messages.flatMap((m) => m.comments || []).find((c) => c.id === commentId) ||
      null;

    const existingLike =
      comment?.likes?.find((l) => l.user_id === user.id && l.emoji === emoji) ||
      null;

    if (existingLike) {
      const { error } = await supabase
        .from("chat_comment_likes")
        .delete()
        .eq("id", existingLike.id);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove comment like",
          variant: "destructive",
        });
        return;
      }
    } else {
      const { error } = await supabase.from("chat_comment_likes").insert([
        {
          user_id: user.id,
          comment_id: commentId,
          emoji,
        },
      ]);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to like comment",
          variant: "destructive",
        });
        return;
      }
    }
    fetchMessages();
  };

  const handleAddComment = async (messageId) => {
    if (!user || !(newComment[messageId]?.trim())) return;

    const { error } = await supabase.from("chat_comments").insert([
      {
        user_id: user.id,
        message_id: messageId,
        content: newComment[messageId].trim(),
      },
    ]);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
      return;
    }
    setNewComment((prev) => ({ ...prev, [messageId]: "" }));
    fetchMessages();
  };

  const toggleComments = (messageId) => {
    setExpandedComments((prev) => ({ ...prev, [messageId]: !prev[messageId] }));
  };

  const handleEditMessage = async (messageId, newContent) => {
    if (!user || !newContent.trim()) return;

    const { error } = await supabase
      .from("chat_messages")
      .update({ content: newContent.trim(), is_edited: true })
      .eq("id", messageId)
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to edit message",
        variant: "destructive",
      });
      return;
    }
    setEditingMessage(null);
    setEditContent("");
    fetchMessages();
  };

  const handleDeleteMessage = async (messageId) => {
    if (!user) return;

    const { error } = await supabase
      .from("chat_messages")
      .delete()
      .eq("id", messageId)
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Message deleted", description: "Your message was removed." });
    fetchMessages();
  };

  const startEdit = (message) => {
    setEditingMessage(message.id);
    setEditContent(message.content || "");
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setEditContent("");
  };

  const getShortName = (displayName) => {
    if (!displayName || displayName === "Anonymous") return "A";
    const names = displayName.trim().split(" ");
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names.map((n) => n.charAt(0)).join("").toUpperCase();
  };

  const renderMessage = (message) => {
    const isOwnMessage = user && message.user_id === user.id;
    const displayName = message.profiles?.display_name || "Anonymous";
    const shortName = getShortName(displayName);
    const likes = message.likes || [];
    const comments = message.comments || [];
    const isEditing = editingMessage === message.id;

    const likeGroups = likes.reduce((acc, like) => {
      if (!acc[like.emoji]) acc[like.emoji] = [];
      acc[like.emoji].push(like);
      return acc;
    }, {});

    return (
      <div key={message.id} className="mb-6">
        <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
          <Card className="max-w-xs md:max-w-lg p-4 bg-gray-50 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {shortName}
                </div>
                <div className="text-xs text-gray-600">
                  {displayName} •{" "}
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  {message.is_edited && message.edited_at && (
                    <span className="ml-2 italic">
                      (edited{" "}
                      {formatDistanceToNow(new Date(message.edited_at), {
                        addSuffix: true,
                      })}
                      )
                    </span>
                  )}
                </div>
              </div>

              {isOwnMessage && !isEditing && (
                <div className="flex gap-1 ml-2">
                  {message.message_type === "text" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => startEdit(message)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Message</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this message? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteMessage(message.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="mb-3">
                <Input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Edit your message..."
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleEditMessage(message.id, editContent)}
                    disabled={!editContent.trim()}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {message.message_type === "text" && message.content && (
                  <div className="break-words mb-3">{message.content}</div>
                )}

                {message.message_type === "file" && message.file_url && (
                  <div className="mb-3">
                    {message.content && (
                      <div className="break-words mb-2 text-sm text-gray-700">
                        {message.content}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      {message.file_type?.startsWith("image/") && <ImageIcon className="h-4 w-4" />}
                      {(message.file_type === "application/pdf" ||
                        message.file_type === "text/plain") && <FileText className="h-4 w-4" />}
                      <span className="text-sm font-medium">{message.file_name}</span>
                    </div>

                    {message.file_type?.startsWith("image/") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={message.file_url}
                        alt={message.file_name || "Uploaded image"}
                        className="max-w-full h-auto rounded"
                      />
                    ) : (
                      <a
                        href={message.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 underline"
                      >
                        Download {message.file_name}
                      </a>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Reactions */}
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(
                likesToGroups(message.likes || [])
              ).map(([emoji, emojiLikes]) => {
                const userLiked = emojiLikes.some((l) => l.user_id === user?.id);
                return (
                  <Button
                    key={emoji}
                    variant={userLiked ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-xs px-2"
                    onClick={() => handleLikeMessage(message.id, emoji)}
                  >
                    {emoji} {emojiLikes.length}
                  </Button>
                );
              })}

              {!((message.likes || []).some((l) => l.emoji === "👍")) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => handleLikeMessage(message.id, "👍")}
                >
                  👍
                </Button>
              )}
              {!((message.likes || []).some((l) => l.emoji === "❤️")) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => handleLikeMessage(message.id, "❤️")}
                >
                  ❤️
                </Button>
              )}
              {!((message.likes || []).some((l) => l.emoji === "😄")) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => handleLikeMessage(message.id, "😄")}
                >
                  😄
                </Button>
              )}
            </div>

            {/* Comments */}
            <div className="border-t pt-2">
              <Collapsible
                open={expandedComments[message.id] || false}
                onOpenChange={() => toggleComments(message.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>
                        {(message.comments || []).length}{" "}
                        {(message.comments || []).length === 1 ? "Comment" : "Comments"}
                      </span>
                    </div>
                    {expandedComments[message.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 mt-2">
                  {(message.comments || [])
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                    )
                    .map((comment) => {
                      const commentGroups = likesToGroups(comment.likes || []);
                      return (
                        <div key={comment.id} className="bg-white p-3 rounded border text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="h-6 w-6 rounded-full bg-secondary/50 flex items-center justify-center text-xs font-medium text-secondary-foreground">
                              {getShortName(comment.profiles?.display_name)}
                            </div>
                            <div className="text-xs text-gray-600">
                              {comment.profiles?.display_name || "Anonymous"} •{" "}
                              {formatDistanceToNow(new Date(comment.created_at), {
                                addSuffix: true,
                              })}
                            </div>
                          </div>
                          <div className="mb-2">{comment.content}</div>

                          <div className="flex flex-wrap gap-1">
                            {Object.entries(commentGroups).map(([emoji, emojiLikes]) => {
                              const userLiked = emojiLikes.some((l) => l.user_id === user?.id);
                              return (
                                <Button
                                  key={emoji}
                                  variant={userLiked ? "default" : "outline"}
                                  size="sm"
                                  className="h-6 text-xs px-1"
                                  onClick={() => handleLikeComment(comment.id, emoji)}
                                >
                                  {emoji} {emojiLikes.length}
                                </Button>
                              );
                            })}

                            {!commentGroups["👍"] && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 text-xs px-1"
                                onClick={() => handleLikeComment(comment.id, "👍")}
                              >
                                👍
                              </Button>
                            )}
                            {!commentGroups["❤️"] && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 text-xs px-1"
                                onClick={() => handleLikeComment(comment.id, "❤️")}
                              >
                                ❤️
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  {user && (
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newComment[message.id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({ ...prev, [message.id]: e.target.value }))
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddComment(message.id)
                        }
                        placeholder="Add a comment..."
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddComment(message.id)}
                        disabled={!newComment[message.id]?.trim()}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* JSON-LD for SEO (optional extra) */}
      <script
        type="application/ld+json"
        // This script tag is safe in a client component
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DiscussionForumPosting",
            about: "UPSC preparation chat",
            discussionUrl: "https://www.nextgenpsc.com/chat",
            headline: "Study Chat — UPSC Preparation",
            publisher: { "@type": "Organization", name: "NextGenPSC" },
          }),
        }}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Study Chat</h1>
        <p className="text-muted-foreground">
          Connect with fellow UPSC aspirants and share study materials
        </p>
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-background">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-8">
              <h3 className="text-lg font-semibold mb-2">Welcome to Study Chat!</h3>
              <p>Start a conversation by sending a message or sharing study materials</p>
            </div>
          ) : (
            messages.map(renderMessage)
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="mb-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <div className="flex-1" />

            <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="ml-auto">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* File Upload Dialog */}
          <AlertDialog open={showFileDialog} onOpenChange={setShowFileDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add File</AlertDialogTitle>
                <AlertDialogDescription>
                  {pendingFile && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        {pendingFile.type.startsWith("image/") ? (
                          <ImageIcon className="h-4 w-4" />
                        ) : pendingFile.type.includes("pdf") ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <Paperclip className="h-4 w-4" />
                        )}
                        <span className="text-sm">{pendingFile.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({Math.round(pendingFile.size / 1024)} KB)
                        </span>
                      </div>
                    </div>
                  )}
                  <Input
                    value={fileCaption}
                    onChange={(e) => setFileCaption(e.target.value)}
                    placeholder="Add a caption (optional)..."
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={cancelFileUpload}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleFileUpload} disabled={uploading}>
                  {uploading ? "Uploading..." : "Share"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="text-xs text-muted-foreground mt-2">
            Supported files: Images (JPG, PNG, GIF), PDFs, Text files • Max size: 10MB
          </div>
        </div>
      </Card>
    </div>
  );
}

/* helpers */
function likesToGroups(likes) {
  return likes.reduce((acc, like) => {
    if (!acc[like.emoji]) acc[like.emoji] = [];
    acc[like.emoji].push(like);
    return acc;
  }, {});
}
