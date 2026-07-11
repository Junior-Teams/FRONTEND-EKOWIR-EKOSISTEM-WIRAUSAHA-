import { useQueryClient } from "@tanstack/react-query"
import { MessageCircle, Send, Share2, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Navigate, useNavigate, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { MateriContent } from "@/components/materi/materi-content"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import {
  useCreateComment,
  useDeleteComment,
  useDeleteForum,
  useForumQuery,
} from "@/hooks/forum/useForum"
import { getAvatarColor } from "@/lib/avatar"
import { showGamificationToast } from "@/lib/gamification"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

function AuthorTag({ user, fallbackName, size = "default" }) {
  const name = user?.name || fallbackName
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full font-bold",
          NEO_BORDER,
          getAvatarColor(name),
          size === "sm" ? "size-7 text-xs" : "size-8 text-sm"
        )}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <span className={size === "sm" ? "text-sm font-bold" : "font-bold"}>{name}</span>
      {user?.tier?.name && (
        <span
          className={cn(
            "rounded-full bg-eko-secondary px-2 py-0.5 text-[10px] font-bold uppercase",
            NEO_BORDER
          )}
        >
          {user.tier.name}
        </span>
      )}
    </div>
  )
}

function CommentItem({ comment, canDelete, onDelete }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <AuthorTag user={comment.user} fallbackName={comment.created_by} size="sm" />
        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete(comment.ID)}
            aria-label="Hapus komentar"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-3.5" />
          </button>
        )}
      </div>
      <p className="text-sm">{comment.content}</p>
      {comment.image && (
        <img
          src={comment.image}
          alt=""
          className={cn("h-40 w-full max-w-xs rounded-lg object-cover", NEO_BORDER)}
        />
      )}
    </div>
  )
}

export function Component() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: currentUser } = useCurrentUser()
  const { data: thread, isLoading, isError } = useForumQuery(id)
  const [commentText, setCommentText] = useState("")

  function invalidateThread() {
    queryClient.invalidateQueries({ queryKey: ["forum.threads.detail", id] })
    queryClient.invalidateQueries({ queryKey: ["forum.threads"] })
  }

  const { mutate: createComment, isPending: isCommenting } = useCreateComment({
    onSuccess: (data) => {
      setCommentText("")
      showGamificationToast(data.gamification)
      invalidateThread()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal mengirim komentar")
    },
  })

  const { mutate: deleteComment } = useDeleteComment({
    onSuccess: () => {
      toast.success("Komentar dihapus")
      invalidateThread()
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus komentar")
    },
  })

  const { mutate: deleteForum, isPending: isDeletingForum } = useDeleteForum({
    onSuccess: () => {
      toast.success("Diskusi dihapus")
      queryClient.invalidateQueries({ queryKey: ["forum.threads"] })
      navigate("/dashboard/forum")
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menghapus diskusi")
    },
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError || !thread) {
    return <Navigate to="/dashboard/forum" replace />
  }

  const comments = thread.comments ?? []
  const canManageThread =
    currentUser && (currentUser.id === thread.user_id || currentUser.role === "admin")

  function handleSubmitComment(event) {
    event.preventDefault()
    if (!commentText.trim()) return
    createComment({ idForum: id, content: commentText.trim() })
  }

  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Tautan disalin ke clipboard"))
      .catch(() => toast.error("Gagal menyalin tautan"))
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        backHref="/dashboard/forum"
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Forum", href: "/dashboard/forum" },
          { label: thread.title },
        ]}
      />

      <div
        className={cn(
          "flex flex-col gap-3 rounded-lg bg-white p-5 dark:bg-neutral-900",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <AuthorTag user={thread.user} fallbackName={thread.created_by} />
          {thread.Module?.name_module && (
            <span
              className={cn(
                "rounded-full bg-eko-secondary px-2 py-0.5 text-[10px] font-bold uppercase",
                NEO_BORDER
              )}
            >
              {thread.Module.name_module}
            </span>
          )}
        </div>

        <h1 className="font-heading text-xl font-bold sm:text-2xl">{thread.title}</h1>
        <MateriContent content={thread.description} />

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-sm font-bold dark:bg-neutral-900",
              NEO_BORDER
            )}
          >
            <MessageCircle className="size-4" />
            {thread.comment_count ?? comments.length}
          </span>
          <Button variant="ghost" size="sm" className="gap-1" onClick={handleShare}>
            <Share2 className="size-4" />
            Bagikan
          </Button>
          {canManageThread && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive gap-1"
              disabled={isDeletingForum}
              onClick={() => {
                if (window.confirm("Hapus diskusi ini beserta seluruh komentarnya?")) {
                  deleteForum(thread.ID)
                }
              }}
            >
              <Trash2 className="size-4" />
              Hapus
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold">
          {thread.comment_count ?? comments.length} Komentar
        </h2>

        <form
          onSubmit={handleSubmitComment}
          className={cn(
            "flex flex-col gap-3 rounded-lg bg-white p-4 dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <Textarea
            placeholder="Tulis komentar kamu..."
            rows={3}
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!commentText.trim() || isCommenting}
            className={cn("w-fit gap-1.5", NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            <Send className="size-3.5" />
            {isCommenting ? "Mengirim..." : "Kirim Komentar"}
          </Button>
        </form>

        {comments.length > 0 ? (
          <div
            className={cn(
              "flex flex-col gap-4 rounded-lg bg-white p-5 dark:bg-neutral-900",
              NEO_BORDER,
              NEO_SHADOW
            )}
          >
            {comments.map((comment) => (
              <CommentItem
                key={comment.ID}
                comment={comment}
                canDelete={
                  currentUser &&
                  (currentUser.id === comment.user_id || currentUser.role === "admin")
                }
                onDelete={deleteComment}
              />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg bg-white p-8 text-center dark:bg-neutral-900",
              NEO_BORDER,
              NEO_SHADOW
            )}
          >
            <MessageCircle className="text-muted-foreground size-6" />
            <p className="text-muted-foreground text-sm">
              Belum ada komentar. Jadilah yang pertama berkomentar!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
