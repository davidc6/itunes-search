export const hash = (toHash: string) => {
  return Buffer.from(`${toHash}`).toString("base64")
}
