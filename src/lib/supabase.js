import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xdcuxkatfeggqpppxozd.supabase.co/'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkY3V4a2F0ZmVnZ3FwcHB4b3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk5MTg3MzMsImV4cCI6MTk4NTQ5NDczM30.lXzcXuFYte89BEF4Jf4LMSQI41Vvd-t4Ynl2LHF_gQk"

export default createClient(supabaseUrl, supabaseKey);
