-- Create translation sessions table
CREATE TABLE IF NOT EXISTS public.translation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_code TEXT UNIQUE NOT NULL,
  doctor_language TEXT NOT NULL DEFAULT 'en',
  patient_language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ
);

-- Create translation messages table for storing conversation
CREATE TABLE IF NOT EXISTS public.translation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.translation_sessions(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('doctor', 'patient')),
  original_text TEXT NOT NULL,
  original_language TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  translated_language TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.translation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translation_messages ENABLE ROW LEVEL SECURITY;

-- Public access policies for translation sessions (no auth required for this feature)
CREATE POLICY "Anyone can create translation sessions"
  ON public.translation_sessions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view translation sessions"
  ON public.translation_sessions
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update translation sessions"
  ON public.translation_sessions
  FOR UPDATE
  USING (true);

-- Public access policies for translation messages
CREATE POLICY "Anyone can create translation messages"
  ON public.translation_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view translation messages"
  ON public.translation_messages
  FOR SELECT
  USING (true);

-- Enable realtime for both tables
ALTER TABLE public.translation_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.translation_messages REPLICA IDENTITY FULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_translation_sessions_code ON public.translation_sessions(session_code);
CREATE INDEX IF NOT EXISTS idx_translation_messages_session ON public.translation_messages(session_id, created_at DESC);