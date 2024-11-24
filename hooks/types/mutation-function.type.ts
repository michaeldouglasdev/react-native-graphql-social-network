import { MutationFunctionOptions, TypedDocumentNode } from "@apollo/client";

export type MutationFunction<T extends TypedDocumentNode<any, any>> =
  MutationFunctionOptions<
    T extends TypedDocumentNode<infer Data, any> ? Data : never,
    T extends TypedDocumentNode<any, infer Variables> ? Variables : never
  >;
