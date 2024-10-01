import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useMemo = (id) => useQuery({
    queryKey: ['memos', id],
    queryFn: () => fromSupabase(supabase.from('memo').select('*').eq('id', id).single()),
});

export const useMemos = () => useQuery({
    queryKey: ['memos'],
    queryFn: () => fromSupabase(supabase.from('memo').select('*')),
});

export const useAddMemo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMemo) => fromSupabase(supabase.from('memo').insert([{ memo: newMemo.memo }])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memos'] });
        },
    });
};

export const useUpdateMemo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, memo }) => fromSupabase(supabase.from('memo').update({ memo }).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memos'] });
        },
    });
};

export const useDeleteMemo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('memo').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memos'] });
        },
    });
};

export const useFilteredMemos = (tool) => useQuery({
    queryKey: ['memos', tool],
    queryFn: () => fromSupabase(supabase.from('memo').select('*').filter('memo', 'cs', `[{"tool":"${tool}"}]`)),
});