import { useEffect } from "react";
import { WpEmojiSettings } from "../../../declarations/interfaces";
import exeEmoji from "../../../lib/head/js/wp/wp-emoji-release.js";
import emojiScript from "../../../lib/head/js/client/emojiScript.js";
declare global {
  interface Window {
    _wpemojiSettings: WpEmojiSettings;
  }
}
export default function EmojiInitializer(): JSX.Element {
  useEffect(() => exeEmoji(), []);
  return (
    <script
      type="text/javascript"
      defer
      id="wp-emoji-settings"
      crossOrigin="anonymous"
      dangerouslySetInnerHTML={{
        __html: `${emojiScript}`,
      }}
    ></script>
  );
}
