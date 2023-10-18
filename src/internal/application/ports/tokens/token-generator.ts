export interface ITokenGenerator {
  generate(payload: any): string;
}
