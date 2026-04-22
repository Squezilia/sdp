export interface ResponseError {
  error: string;
  reason: string;
}

export default interface Language {
  error: {
    organization: {
      insufficentPermission: ResponseError;
    };
  };
}
