import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  localization: Scalars['String'];
  websiteUrl: Scalars['String'];
  logoUrl: Scalars['String'];
  jobs: Array<Maybe<Job>>;
};

export type CreateJobArgs = {
  title: Scalars['String'];
  salaryFrom: Scalars['Int'];
  salaryTo: Scalars['Int'];
  description: Scalars['String'];
  applyUrl: Scalars['String'];
  applyEmail: Scalars['String'];
  categoryId: Scalars['Int'];
  employmentTypeId: Scalars['Int'];
};

export type CreateUserCompanyArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  localization: Scalars['String'];
  websiteUrl: Scalars['String'];
  logo: Scalars['Upload'];
};


export type EmploymentType = {
  __typename?: 'EmploymentType';
  id: Scalars['Int'];
  name: Scalars['String'];
  jobs: Array<Maybe<Job>>;
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Job = {
  __typename?: 'Job';
  id: Scalars['Int'];
  title: Scalars['String'];
  salaryFrom: Scalars['Int'];
  salaryTo: Scalars['Int'];
  description: Scalars['String'];
  applyUrl: Scalars['String'];
  applyEmail: Scalars['String'];
  creationDate: Scalars['Date'];
  company: Company;
  category: JobCategory;
  employmentType: EmploymentType;
};

export type JobCategory = {
  __typename?: 'JobCategory';
  id: Scalars['Int'];
  name: Scalars['String'];
  jobs: Array<Maybe<Job>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  createUserCompany?: Maybe<Company>;
  updateUserCompany?: Maybe<Company>;
  createJob?: Maybe<Job>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserCompanyArgs = {
  company: CreateUserCompanyArgs;
};


export type MutationUpdateUserCompanyArgs = {
  company: UpdateUserCompanyArgs;
};


export type MutationCreateJobArgs = {
  job: CreateJobArgs;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  company?: Maybe<Company>;
  companies?: Maybe<Array<Maybe<Company>>>;
  categories?: Maybe<Array<Maybe<JobCategory>>>;
  category?: Maybe<JobCategory>;
  employmentTypes?: Maybe<Array<Maybe<EmploymentType>>>;
  employmentType?: Maybe<EmploymentType>;
  job?: Maybe<Job>;
  jobs?: Maybe<Array<Maybe<Job>>>;
};


export type QueryCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryEmploymentTypeArgs = {
  id: Scalars['Int'];
};


export type QueryJobArgs = {
  id: Scalars['Int'];
};


export type QueryJobsArgs = {
  categories?: Maybe<Array<Scalars['Int']>>;
  companyId?: Maybe<Scalars['Int']>;
};

export type UpdateUserCompanyArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  localization?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['Upload']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  creationDate: Scalars['String'];
  company?: Maybe<Company>;
  jobs?: Maybe<Array<Maybe<Job>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Company: ResolverTypeWrapper<Company>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateJobArgs: CreateJobArgs;
  CreateUserCompanyArgs: CreateUserCompanyArgs;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  EmploymentType: ResolverTypeWrapper<EmploymentType>;
  File: ResolverTypeWrapper<File>;
  Job: ResolverTypeWrapper<Job>;
  JobCategory: ResolverTypeWrapper<JobCategory>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  UpdateUserCompanyArgs: UpdateUserCompanyArgs;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Company: Company;
  Int: Scalars['Int'];
  String: Scalars['String'];
  CreateJobArgs: CreateJobArgs;
  CreateUserCompanyArgs: CreateUserCompanyArgs;
  Date: Scalars['Date'];
  EmploymentType: EmploymentType;
  File: File;
  Job: Job;
  JobCategory: JobCategory;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Query: {};
  UpdateUserCompanyArgs: UpdateUserCompanyArgs;
  Upload: Scalars['Upload'];
  User: User;
  ID: Scalars['ID'];
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  localization?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  websiteUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jobs?: Resolver<Array<Maybe<ResolversTypes['Job']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EmploymentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmploymentType'] = ResolversParentTypes['EmploymentType']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jobs?: Resolver<Array<Maybe<ResolversTypes['Job']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  salaryFrom?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salaryTo?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  applyUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  applyEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['JobCategory'], ParentType, ContextType>;
  employmentType?: Resolver<ResolversTypes['EmploymentType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['JobCategory'] = ResolversParentTypes['JobCategory']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jobs?: Resolver<Array<Maybe<ResolversTypes['Job']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'passwordConfirmation'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createUserCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationCreateUserCompanyArgs, 'company'>>;
  updateUserCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationUpdateUserCompanyArgs, 'company'>>;
  createJob?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<MutationCreateJobArgs, 'job'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<QueryCompanyArgs, 'id'>>;
  companies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['JobCategory']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['JobCategory']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  employmentTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmploymentType']>>>, ParentType, ContextType>;
  employmentType?: Resolver<Maybe<ResolversTypes['EmploymentType']>, ParentType, ContextType, RequireFields<QueryEmploymentTypeArgs, 'id'>>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<QueryJobArgs, 'id'>>;
  jobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType, RequireFields<QueryJobsArgs, never>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  jobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Company?: CompanyResolvers<ContextType>;
  Date?: GraphQLScalarType;
  EmploymentType?: EmploymentTypeResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  JobCategory?: JobCategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
