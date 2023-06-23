export const constructPostOptions = (
  body: Record<string, unknown>
): RequestInit => {
  return {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
