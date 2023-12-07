export const contentLength = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 1000,
} as const;
export const ErrorMessages = {
  ERROR_INVALID_CONTENT_LENGTH: `댓글은 ${contentLength.MIN_LENGTH}자 이상 ${contentLength.MAX_LENGTH}자 이하로 입력해주세요.`,
} as const;
