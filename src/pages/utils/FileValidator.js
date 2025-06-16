// src/utils/fileValidator.js
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'pdf']; // 허용되는 확장자

export const validateFile = (file) => {
  if (!file) {
    return { isValid: false, message: '파일을 선택해주세요.' };
  }

  // 1. 용량 검사
  if (file.size > MAX_FILE_SIZE) {
    //return { isValid: false, message: `파일 용량이 너무 큽니다. (최대 ${MAX_FILE_SIZE / (1024 * 1024)}MB)` };
  }

  // 2. 확장자 검사
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    //return { isValid: false, message: `허용되지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS.join(', ')})` };
  }

  // 모든 검증 통과
  return { isValid: true, message: '파일 검증 통과.' };
};