import type { ColumnType } from "kysely";

export type AuthAalLevel = "aal1" | "aal2" | "aal3";

export type AuthCodeChallengeMethod = "plain" | "s256";

export type AuthFactorStatus = "unverified" | "verified";

export type AuthFactorType = "totp" | "webauthn";

export type CustomerType = "customer" | "prospect";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, string | number | bigint, string | number | bigint>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Numeric = ColumnType<string, string | number, string | number>;

export type PgsodiumKeyStatus = "default" | "expired" | "invalid" | "valid";

export type PgsodiumKeyType = "aead-det" | "aead-ietf" | "auth" | "generichash" | "hmacsha256" | "hmacsha512" | "kdf" | "secretbox" | "secretstream" | "shorthash" | "stream_xchacha20";

export type ProspectStatus = "Awareness" | "Consideration" | "Loyalty" | "Preference" | "Purchase";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AuthAuditLogEntries {
  instance_id: string | null;
  id: string;
  payload: Json | null;
  created_at: Timestamp | null;
  ip_address: Generated<string>;
}

export interface AuthFlowState {
  id: string;
  user_id: string | null;
  auth_code: string;
  code_challenge_method: AuthCodeChallengeMethod;
  code_challenge: string;
  provider_type: string;
  provider_access_token: string | null;
  provider_refresh_token: string | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface AuthIdentities {
  id: string;
  user_id: string;
  identity_data: Json;
  provider: string;
  last_sign_in_at: Timestamp | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
  email: Generated<string | null>;
}

export interface AuthInstances {
  id: string;
  uuid: string | null;
  raw_base_config: string | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface AuthMfaAmrClaims {
  session_id: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  authentication_method: string;
  id: string;
}

export interface AuthMfaChallenges {
  id: string;
  factor_id: string;
  created_at: Timestamp;
  verified_at: Timestamp | null;
  ip_address: string;
}

export interface AuthMfaFactors {
  id: string;
  user_id: string;
  friendly_name: string | null;
  factor_type: AuthFactorType;
  status: AuthFactorStatus;
  created_at: Timestamp;
  updated_at: Timestamp;
  secret: string | null;
}

export interface AuthRefreshTokens {
  instance_id: string | null;
  id: Generated<Int8>;
  token: string | null;
  user_id: string | null;
  revoked: boolean | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
  parent: string | null;
  session_id: string | null;
}

export interface AuthSamlProviders {
  id: string;
  sso_provider_id: string;
  entity_id: string;
  metadata_xml: string;
  metadata_url: string | null;
  attribute_mapping: Json | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface AuthSamlRelayStates {
  id: string;
  sso_provider_id: string;
  request_id: string;
  for_email: string | null;
  redirect_to: string | null;
  from_ip_address: string | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface AuthSchemaMigrations {
  version: string;
}

export interface AuthSessions {
  id: string;
  user_id: string;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
  factor_id: string | null;
  aal: AuthAalLevel | null;
  not_after: Timestamp | null;
}

export interface AuthSsoDomains {
  id: string;
  sso_provider_id: string;
  domain: string;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface AuthSsoProviders {
  id: string;
  resource_id: string | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface AuthUsers {
  instance_id: string | null;
  id: string;
  aud: string | null;
  role: string | null;
  email: string | null;
  encrypted_password: string | null;
  email_confirmed_at: Timestamp | null;
  invited_at: Timestamp | null;
  confirmation_token: string | null;
  confirmation_sent_at: Timestamp | null;
  recovery_token: string | null;
  recovery_sent_at: Timestamp | null;
  email_change_token_new: string | null;
  email_change: string | null;
  email_change_sent_at: Timestamp | null;
  last_sign_in_at: Timestamp | null;
  raw_app_meta_data: Json | null;
  raw_user_meta_data: Json | null;
  is_super_admin: boolean | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
  phone: Generated<string | null>;
  phone_confirmed_at: Timestamp | null;
  phone_change: Generated<string | null>;
  phone_change_token: Generated<string | null>;
  phone_change_sent_at: Timestamp | null;
  confirmed_at: Generated<Timestamp | null>;
  email_change_token_current: Generated<string | null>;
  email_change_confirm_status: Generated<number | null>;
  banned_until: Timestamp | null;
  reauthentication_token: Generated<string | null>;
  reauthentication_sent_at: Timestamp | null;
  is_sso_user: Generated<boolean>;
  deleted_at: Timestamp | null;
}

export interface Company {
  company_id: Generated<string>;
  company_name: string | null;
}

export interface CompanyNote {
  note_id: Generated<string>;
  note_title: Generated<string>;
  note_content: Generated<string>;
  company_id: string;
  customer_id: string | null;
}

export interface Customer {
  company_id: string;
  customer_id: Generated<string>;
  status: Generated<ProspectStatus>;
  type: Generated<CustomerType>;
  phone_number: number | null;
  customer_email: string | null;
}

export interface CustomerDeal {
  deal_id: Generated<string>;
  customer_id: string | null;
  deal_value: string | null;
}

export interface CustomerEmail {
  email_id: Generated<string>;
  customer_id: string;
  email_text: Generated<string>;
  email_header: Generated<string>;
  date: Generated<Timestamp>;
}

export interface CustomerInteraction {
  meeting_id: Generated<string>;
  customer_id: string;
  meeting_notes: string | null;
  date: Generated<Timestamp>;
  transcript: string | null;
}

export interface CustomerPermission {
  user_id: string;
  customer_id: string;
  company_id: string;
}

export interface ExtensionsPgStatStatements {
  userid: number | null;
  dbid: number | null;
  toplevel: boolean | null;
  queryid: Int8 | null;
  query: string | null;
  plans: Int8 | null;
  total_plan_time: number | null;
  min_plan_time: number | null;
  max_plan_time: number | null;
  mean_plan_time: number | null;
  stddev_plan_time: number | null;
  calls: Int8 | null;
  total_exec_time: number | null;
  min_exec_time: number | null;
  max_exec_time: number | null;
  mean_exec_time: number | null;
  stddev_exec_time: number | null;
  rows: Int8 | null;
  shared_blks_hit: Int8 | null;
  shared_blks_read: Int8 | null;
  shared_blks_dirtied: Int8 | null;
  shared_blks_written: Int8 | null;
  local_blks_hit: Int8 | null;
  local_blks_read: Int8 | null;
  local_blks_dirtied: Int8 | null;
  local_blks_written: Int8 | null;
  temp_blks_read: Int8 | null;
  temp_blks_written: Int8 | null;
  blk_read_time: number | null;
  blk_write_time: number | null;
  temp_blk_read_time: number | null;
  temp_blk_write_time: number | null;
  wal_records: Int8 | null;
  wal_fpi: Int8 | null;
  wal_bytes: Numeric | null;
  jit_functions: Int8 | null;
  jit_generation_time: number | null;
  jit_inlining_count: Int8 | null;
  jit_inlining_time: number | null;
  jit_optimization_count: Int8 | null;
  jit_optimization_time: number | null;
  jit_emission_count: Int8 | null;
  jit_emission_time: number | null;
}

export interface ExtensionsPgStatStatementsInfo {
  dealloc: Int8 | null;
  stats_reset: Timestamp | null;
}

export interface PgsodiumDecryptedKey {
  id: string | null;
  status: PgsodiumKeyStatus | null;
  created: Timestamp | null;
  expires: Timestamp | null;
  key_type: PgsodiumKeyType | null;
  key_id: Int8 | null;
  key_context: Buffer | null;
  name: string | null;
  associated_data: string | null;
  raw_key: Buffer | null;
  decrypted_raw_key: Buffer | null;
  raw_key_nonce: Buffer | null;
  parent_key: string | null;
  comment: string | null;
}

export interface PgsodiumKey {
  id: Generated<string>;
  status: Generated<PgsodiumKeyStatus | null>;
  created: Generated<Timestamp>;
  expires: Timestamp | null;
  key_type: PgsodiumKeyType | null;
  key_id: Generated<Int8 | null>;
  key_context: Generated<Buffer | null>;
  name: string | null;
  associated_data: Generated<string | null>;
  raw_key: Buffer | null;
  raw_key_nonce: Buffer | null;
  parent_key: string | null;
  comment: string | null;
  user_data: string | null;
}

export interface PgsodiumMaskColumns {
  attname: string | null;
  attrelid: number | null;
  key_id: string | null;
  key_id_column: string | null;
  associated_columns: string | null;
  nonce_column: string | null;
  format_type: string | null;
}

export interface PgsodiumMaskingRule {
  attrelid: number | null;
  attnum: number | null;
  relnamespace: string | null;
  relname: string | null;
  attname: string | null;
  format_type: string | null;
  col_description: string | null;
  key_id_column: string | null;
  key_id: string | null;
  associated_columns: string | null;
  nonce_column: string | null;
  view_name: string | null;
  priority: number | null;
}

export interface PgsodiumValidKey {
  id: string | null;
  name: string | null;
  status: PgsodiumKeyStatus | null;
  key_type: PgsodiumKeyType | null;
  key_id: Int8 | null;
  key_context: Buffer | null;
  created: Timestamp | null;
  expires: Timestamp | null;
  associated_data: string | null;
}

export interface StorageBuckets {
  id: string;
  name: string;
  owner: string | null;
  created_at: Generated<Timestamp | null>;
  updated_at: Generated<Timestamp | null>;
  public: Generated<boolean | null>;
  avif_autodetection: Generated<boolean | null>;
  file_size_limit: Int8 | null;
  allowed_mime_types: string[] | null;
}

export interface StorageMigrations {
  id: number;
  name: string;
  hash: string;
  executed_at: Generated<Timestamp | null>;
}

export interface StorageObjects {
  id: Generated<string>;
  bucket_id: string | null;
  name: string | null;
  owner: string | null;
  created_at: Generated<Timestamp | null>;
  updated_at: Generated<Timestamp | null>;
  last_accessed_at: Generated<Timestamp | null>;
  metadata: Json | null;
  path_tokens: Generated<string[] | null>;
  version: string | null;
}

export interface User {
  user_id: Generated<string>;
  username: string;
  email: string;
  created_at: Generated<Timestamp>;
  is_system_admin: Generated<boolean>;
  is_company_admin: Generated<boolean>;
  company_id: string | null;
}

export interface UserNote {
  note_id: Generated<string>;
  note_title: Generated<string>;
  note_content: Generated<string>;
  user_id: string;
}

export interface VaultDecryptedSecrets {
  id: string | null;
  name: string | null;
  description: string | null;
  secret: string | null;
  decrypted_secret: string | null;
  key_id: string | null;
  nonce: Buffer | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface VaultSecrets {
  id: Generated<string>;
  name: string | null;
  description: Generated<string>;
  secret: string;
  key_id: Generated<string | null>;
  nonce: Generated<Buffer | null>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  "auth.audit_log_entries": AuthAuditLogEntries;
  "auth.flow_state": AuthFlowState;
  "auth.identities": AuthIdentities;
  "auth.instances": AuthInstances;
  "auth.mfa_amr_claims": AuthMfaAmrClaims;
  "auth.mfa_challenges": AuthMfaChallenges;
  "auth.mfa_factors": AuthMfaFactors;
  "auth.refresh_tokens": AuthRefreshTokens;
  "auth.saml_providers": AuthSamlProviders;
  "auth.saml_relay_states": AuthSamlRelayStates;
  "auth.schema_migrations": AuthSchemaMigrations;
  "auth.sessions": AuthSessions;
  "auth.sso_domains": AuthSsoDomains;
  "auth.sso_providers": AuthSsoProviders;
  "auth.users": AuthUsers;
  company: Company;
  company_note: CompanyNote;
  customer: Customer;
  customer_deal: CustomerDeal;
  customer_email: CustomerEmail;
  customer_interaction: CustomerInteraction;
  customer_permission: CustomerPermission;
  "extensions.pg_stat_statements": ExtensionsPgStatStatements;
  "extensions.pg_stat_statements_info": ExtensionsPgStatStatementsInfo;
  "pgsodium.decrypted_key": PgsodiumDecryptedKey;
  "pgsodium.key": PgsodiumKey;
  "pgsodium.mask_columns": PgsodiumMaskColumns;
  "pgsodium.masking_rule": PgsodiumMaskingRule;
  "pgsodium.valid_key": PgsodiumValidKey;
  "storage.buckets": StorageBuckets;
  "storage.migrations": StorageMigrations;
  "storage.objects": StorageObjects;
  user: User;
  user_note: UserNote;
  "vault.decrypted_secrets": VaultDecryptedSecrets;
  "vault.secrets": VaultSecrets;
}
