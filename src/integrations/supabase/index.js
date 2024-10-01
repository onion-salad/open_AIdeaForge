// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useMemo, useMemos, useAddMemo, useUpdateMemo, useDeleteMemo } from './hooks/useMemo.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useMemo,
  useMemos,
  useAddMemo,
  useUpdateMemo,
  useDeleteMemo,
};