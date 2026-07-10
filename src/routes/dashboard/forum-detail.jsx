import {
  ArrowBigDown,
  ArrowBigUp,
  ChevronDown,
  MessageCircle,
  Reply,
  Share2,
  Sparkles,
} from "lucide-react"
import { useState } from "react"
import { Navigate, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  countComments,
  getAvatarColor,
  getThreadById,
} from "@/lib/forum-threads"
import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

function VoteControl({ initialVotes, size = "default" }) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState(0)

  function vote(direction) {
    const next = userVote === direction ? 0 : direction
    setVotes((current) => current - userVote + next)
    setUserVote(next)
  }

  const iconSize = size === "sm" ? "size-4" : "size-5"

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-white dark:bg-neutral-900",
        NEO_BORDER,
        size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1"
      )}
    >
      <button type="button" onClick={() => vote(1)} aria-label="Setuju">
        <ArrowBigUp
          className={cn(
            iconSize,
            userVote === 1 && "fill-eko-primary text-eko-primary"
          )}
        />
      </button>
      <span className="min-w-[1.25rem] text-center text-sm font-bold">
        {votes}
      </span>
      <button type="button" onClick={() => vote(-1)} aria-label="Tidak setuju">
        <ArrowBigDown
          className={cn(iconSize, userVote === -1 && "fill-red-500 text-red-500")}
        />
      </button>
    </div>
  )
}

function Comment({ comment, depth = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const replies = comment.replies ?? []
  const visibleReplies = expanded ? replies : replies.slice(0, 1)
  const hiddenCount = replies.length - visibleReplies.length

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        depth > 0 && "border-l-2 border-black pl-4 dark:border-white"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            NEO_BORDER,
            getAvatarColor(comment.author)
          )}
        >
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-bold">{comment.author}</span>
        {comment.badge && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
              NEO_BORDER,
              comment.badge === "OP" ? "bg-eko-primary text-white" : "bg-eko-secondary"
            )}
          >
            {comment.badge}
          </span>
        )}
        <span className="text-muted-foreground text-xs">{comment.time}</span>
      </div>

      <p className="text-sm">{comment.body}</p>

      <div className="flex items-center gap-1">
        <VoteControl initialVotes={comment.votes} size="sm" />
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <Reply className="size-3.5" />
          Balas
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <Sparkles className="size-3.5" />
          Apresiasi
        </Button>
      </div>

      {visibleReplies.length > 0 && (
        <div className="flex flex-col gap-3">
          {visibleReplies.map((reply) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-eko-primary ml-10 flex w-fit items-center gap-1 text-xs font-bold hover:underline"
        >
          <ChevronDown className="size-3.5" />
          Lihat {hiddenCount} balasan lagi
        </button>
      )}
    </div>
  )
}

export function Component() {
  const { id } = useParams()
  const thread = getThreadById(id)

  if (!thread) {
    return <Navigate to="/dashboard/forum" replace />
  }

  const totalComments = countComments(thread.comments)

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                NEO_BORDER,
                getAvatarColor(thread.author)
              )}
            >
              {thread.author.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <span className="font-bold">{thread.author}</span>
              <span className="text-muted-foreground"> &middot; {thread.time}</span>
            </div>
          </div>
          <span
            className={cn(
              "rounded-full bg-eko-secondary px-2 py-0.5 text-[10px] font-bold uppercase",
              NEO_BORDER
            )}
          >
            {thread.category}
          </span>
        </div>

        <h1 className="font-heading text-xl font-bold sm:text-2xl">
          {thread.title}
        </h1>
        <p className="text-sm">{thread.body}</p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <VoteControl initialVotes={thread.votes} />
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-sm font-bold dark:bg-neutral-900",
              NEO_BORDER
            )}
          >
            <MessageCircle className="size-4" />
            {totalComments}
          </span>
          <Button variant="ghost" size="sm" className="gap-1">
            <Sparkles className="size-4" />
            Apresiasi
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Share2 className="size-4" />
            Bagikan
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold">
          {totalComments} Komentar
        </h2>
        <div
          className={cn(
            "flex flex-col gap-4 rounded-lg bg-white p-5 dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          {thread.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}
