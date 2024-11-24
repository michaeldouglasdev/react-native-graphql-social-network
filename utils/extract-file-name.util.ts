export function extractFileName(fileName: string) {
  const split = fileName.split("amazonaws.com/");
  return split[1];
}
