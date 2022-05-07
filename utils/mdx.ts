export async function getHeadings(source: string) {
  const headingLines = source.split("\n").filter((line: string) => {
    return line.match(/^##\s/);
  });

  return headingLines.map((raw: string) => {
    const text = raw.replace(/^###*\s/, "");

    return { text, href: `#${text.replace(/\s/gi, "").toLowerCase()}` };
  });
}
