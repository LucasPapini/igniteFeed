import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

import { Avatar } from "./Avatar";
import { Comments } from "./Comments";
import styles from "./Post.module.css";

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(["Post muito bacana, hein!"]);

  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publisheDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(e) {
    e.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChage(e) {
    e.target.setCustomValidity("");
    setNewCommentText(e.target.value);
  }

  function deleteComment(commentToDelete) {
    const commentWithoutDelete = comments.filter((comment) => {
      return comment != commentToDelete;
    });
    setComments(commentWithoutDelete);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  const isNewCommentInputEpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publisheDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentario"
          onChange={handleNewCommentChage}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button disabled={isNewCommentInputEpty}>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comments
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
