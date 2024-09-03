export interface EmojiSource {
  concatemoji: string;
  wpemoji?: string;
  twemoji?: string;
}
export interface WpEmojiSettings {
  baseUrl: string;
  ext: string;
  svgUrl: string;
  svgExt: string;
  source: EmojiSource;
}
