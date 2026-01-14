export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: any; output: any; }
};

export type CreateEventInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endedAt: Scalars['Timestamp']['input'];
  externalLink?: InputMaybe<UrlLinkInput>;
  hasLive?: InputMaybe<Scalars['Boolean']['input']>;
  hasTicket?: InputMaybe<Scalars['Boolean']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  notifiedAt?: InputMaybe<Scalars['Timestamp']['input']>;
  poster?: InputMaybe<Scalars['String']['input']>;
  startedAt: Scalars['Timestamp']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type EventModel = {
  __typename?: 'EventModel';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endedAt: Scalars['DateTime']['output'];
  externalLink?: Maybe<UrlLink>;
  hasLive: Scalars['Boolean']['output'];
  hasTicket: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  isPublished: Scalars['Boolean']['output'];
  notifiedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  startedAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: EventModel;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};

export type Query = {
  __typename?: 'Query';
  events: Array<EventModel>;
};

export type UrlLink = {
  __typename?: 'UrlLink';
  name?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type UrlLinkInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};
