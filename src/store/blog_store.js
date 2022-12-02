import {writable} from "svelte/store";
import { createClient } from '@supabase/supabase-js'
export const blog = writable([]);

const fetchProduct = async () => {

    const supabaseUrl = 'https://xdcuxkatfeggqpppxozd.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkY3V4a2F0ZmVnZ3FwcHB4b3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk5MTg3MzMsImV4cCI6MTk4NTQ5NDczM30.lXzcXuFYte89BEF4Jf4LMSQI41Vvd-t4Ynl2LHF_gQk"
    const supabase = createClient(supabaseUrl, supabaseKey)
    let post_date = '2022-12-01 15:26:06.138921';
    let num=5;
    let { data, error } = await supabase
        .rpc('get_post_with_limit', {
            num,
            post_date
        })
    blog.set(data)
};
fetchProduct()