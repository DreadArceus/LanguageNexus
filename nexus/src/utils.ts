export const constructPostOptions = (body: Record<string, unknown>) => {
  return {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
