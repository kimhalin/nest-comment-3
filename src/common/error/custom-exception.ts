import { BadRequestException, NotFoundException } from '@nestjs/common';

export class InvalidParameterException extends BadRequestException {
  constructor(message?: string, code?: string) {
    super(message ?? '파라미터 에러', code ?? 'INVALID_PARAMETER');
  }
}

export class ResourceNotFoundException extends NotFoundException {
  constructor(message?: string, code?: string) {
    super(message ?? '리소스를 찾지 못했습니다.', code ?? 'RESOURCE_NOT_FOUND');
  }
}
