export interface Env {
    EXPENSE_TRACKER_AUTH_KV: KVNamespace;
    expense_tracker_db: D1Database;
    JWT_SECRET?: string;
}