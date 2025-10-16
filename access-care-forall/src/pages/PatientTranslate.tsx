import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, ArrowLeft } from "lucide-react";

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'mr', name: 'Marathi' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
];

export default function PatientTranslate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionCode, setSessionCode] = useState(searchParams.get('code') || "");
  const [sessionId, setSessionId] = useState<string>("");
  const [patientLanguage, setPatientLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = async (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        await handleSpeech(transcript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    // Subscribe to new messages
    const channel = supabase
      .channel('patient-translation-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'translation_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const joinSession = async () => {
    try {
      const { data: session, error } = await supabase
        .from('translation_sessions')
        .select('*')
        .eq('session_code', sessionCode.toUpperCase())
        .eq('status', 'active')
        .single();

      if (error || !session) {
        throw new Error('Invalid session code or session expired');
      }

      // Update session with patient language
      await supabase
        .from('translation_sessions')
        .update({ patient_language: patientLanguage })
        .eq('id', session.id);

      setSessionId(session.id);
      setJoined(true);

      toast({
        title: "Joined Session",
        description: "You are now connected to the doctor",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSpeech = async (text: string) => {
    if (!sessionId) return;

    try {
      // Get current session to know doctor's language
      const { data: session } = await supabase
        .from('translation_sessions')
        .select('doctor_language')
        .eq('id', sessionId)
        .single();

      if (!session?.doctor_language) return;

      // Translate text
      const { data: translateData } = await supabase.functions.invoke('translate-text', {
        body: {
          text,
          sourceLanguage: patientLanguage,
          targetLanguage: session.doctor_language,
        }
      });

      if (translateData?.error) throw new Error(translateData.error);

      // Save message
      await supabase
        .from('translation_messages')
        .insert({
          session_id: sessionId,
          sender_type: 'patient',
          original_text: text,
          original_language: patientLanguage,
          translated_text: translateData.translatedText,
          translated_language: session.doctor_language,
        });

    } catch (error: any) {
      console.error('Error handling speech:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.lang = patientLanguage;
      recognition.start();
      setIsListening(true);
    }
  };

  if (!joined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8 flex items-center justify-center">
        <Card className="p-8 shadow-card max-w-md w-full">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Join Translation Session
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Session Code</label>
              <Input
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="uppercase"
                maxLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Language</label>
              <Select value={patientLanguage} onValueChange={setPatientLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={joinSession} className="w-full" size="lg">
              Join Session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Talk to Your Doctor
        </h1>

        <Card className="p-8 shadow-card">
          <div className="mb-6">
            <Button 
              onClick={toggleListening} 
              className={`w-full ${isListening ? 'bg-destructive hover:bg-destructive/90' : ''}`}
              size="lg"
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  Stop Speaking
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  Start Speaking
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No messages yet. Start speaking to talk to the doctor.
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    msg.sender_type === 'patient'
                      ? 'bg-primary/10 ml-8'
                      : 'bg-muted mr-8'
                  }`}
                >
                  <p className="font-semibold text-sm mb-1">
                    {msg.sender_type === 'patient' ? 'You' : 'Doctor'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {msg.original_text}
                  </p>
                  <p className="text-base">
                    {msg.sender_type === 'patient' ? msg.translated_text : msg.original_text}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
