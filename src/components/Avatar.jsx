import styles from "./Avatar.module.css";

export function Avatar({ src, hasBoder = true }) {
  return (
    <img
      className={hasBoder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
}
