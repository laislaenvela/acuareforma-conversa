import { STYLES } from "@/app/lib/styles";

type ArticleTextProps = {
  text: string;
  className?: string;
};

export default function ArticleText({ text, className }: ArticleTextProps) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  function classifyLine(line: string): "numeral" | "literal" | "regular" {
    if (/^\s*\d+\.\s+/.test(line)) {
      return "numeral";
    }

    if (/^\s*[a-z]\.\s+/i.test(line)) {
      return "literal";
    }

    return "regular";
  }

  function getParagraphBlocks(paragraph: string): Array<
    { type: "numeral" | "literal"; text: string } |
    { type: "regular"; text: string }
  > {
    const lines = paragraph.split(/\r?\n/);
    const blocks: Array<
      { type: "numeral" | "literal"; text: string } |
      { type: "regular"; text: string }
    > = [];

    let regularBuffer: string[] = [];

    const flushRegular = () => {
      if (regularBuffer.length === 0) {
        return;
      }

      blocks.push({
        type: "regular",
        text: regularBuffer.join("\n"),
      });

      regularBuffer = [];
    };

    for (const line of lines) {
      const lineType = classifyLine(line);

      if (lineType === "regular") {
        regularBuffer.push(line);
        continue;
      }

      flushRegular();
      blocks.push({ type: lineType, text: line });
    }

    flushRegular();

    return blocks;
  }

  return (
    <div className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const blocks = getParagraphBlocks(paragraph);

        return (
          <div key={paragraphIndex} className="mb-8 last:mb-0">
            {blocks.map((block, blockIndex) => {
              if (block.type === "numeral") {
                return (
                  <p
                    key={`${paragraphIndex}-${blockIndex}`}
                    className={`${STYLES.body} mt-6 font-semibold`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === "literal") {
                return (
                  <p
                    key={`${paragraphIndex}-${blockIndex}`}
                    className={`${STYLES.body} mt-3 ml-5`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {block.text}
                  </p>
                );
              }

              return (
                <p
                  key={`${paragraphIndex}-${blockIndex}`}
                  className={STYLES.body}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {block.text}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}