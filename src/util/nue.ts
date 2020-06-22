export const isNueComponent = (filePath: string) => {
  return !!filePath.split("/").find((v: string) => v === "nues");
};
