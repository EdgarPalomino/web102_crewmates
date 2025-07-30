import { createClient } from "@supabase/supabase-js";

const client = createClient("https://msvcnpczfuagojlellre.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdmNucGN6ZnVhZ29qbGVsbHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTMwODksImV4cCI6MjA2ODg4OTA4OX0.16vRBf2Qh15rlYhxOKbiUGG30JLMaRbZ7tShzfFXMT0");

export default client;
