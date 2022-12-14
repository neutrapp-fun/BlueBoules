import { writable } from "svelte/store";

import supabase from "../lib/supabase";

export const blog = writable([]);

export const fetchPosts = (num = 10, post_date = '2022-12-01 17:26:06') => {
    supabase.rpc('get_post_with_limit', {
        num,
        post_date
    }).then(({ data, error }) => {
        if (error) {
            console.log('error to fetch posts : ', error)
            return;
        }
        blog.set(data);
    });
}

export async function upVote(post_id) {
    let { data, error } = await supabase
        .rpc('update_upvotes', { post_id })
    if (error) {
        console.log('up vote failed ', error);
        return;
    }
    return data.new.upvotes
}

supabase.channel('supabase_realtime').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchPosts(); }).subscribe();


fetchPosts();