/**
 * @description Verify that the file describes Nue Component
 * @param {string} filePath a source file path to check
 */
export const isNueComponent = (filePath: string) => {
  return !!filePath.split("/").find((v: string) => v === "nues" || v === "nue");
};
