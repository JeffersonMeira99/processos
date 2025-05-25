export const getCurrentUser = (req: any, field?: string) => {
  if (!field) return req.user;
  return req.user?.[field];
};

export const getCurrentUserId = (req: any): number => {
  return req.user?.sub;
};
