import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, Phone } from "lucide-react";

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

export default function DoctorConsole() {
  const [sessionCode, setSessionCode] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [doctorLanguage, setDoctorLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
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

  const generateSession = async () => {
    try {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();

      const { data, error } = await supabase
        .from('translation_sessions')
        .insert({
          session_code: code,
          doctor_language: doctorLanguage,
          patient_language: 'en',
        })
        .select()
        .single();

      if (error) throw error;

      setSessionCode(code);
      setSessionId(data.id);

      toast({
        title: "Session Created",
        description: "Patient can now scan the QR code to join",
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
      const { data: session } = await supabase
        .from('translation_sessions')
        .select('patient_language')
        .eq('id', sessionId)
        .single();

      if (!session?.patient_language) {
        toast({
          title: "Waiting for patient",
          description: "Patient hasn't joined yet",
        });
        return;
      }

      const { data: translateData } = await supabase.functions.invoke('translate-text', {
        body: {
          text,
          sourceLanguage: doctorLanguage,
          targetLanguage: session.patient_language,
        },
      });

      if (translateData?.error) throw new Error(translateData.error);

      await supabase
        .from('translation_messages')
        .insert({
          session_id: sessionId,
          sender_type: 'doctor',
          original_text: text,
          original_language: doctorLanguage,
          translated_text: translateData.translatedText,
          translated_language: session.patient_language,
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
      recognition.lang = doctorLanguage;
      recognition.start();
      setIsListening(true);
    }
  };

  const endSession = async () => {
    if (!sessionId) return;

    try {
      await supabase
        .from('translation_sessions')
        .update({ status: 'ended', ended_at: new Date().toISOString() })
        .eq('id', sessionId);

      setSessionCode("");
      setSessionId("");

      toast({
        title: "Session Ended",
        description: "Translation session has been closed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Doctor Console - Language Sync
        </h1>

        {!sessionCode ? (
          <Card className="p-8 shadow-card">
            <h2 className="text-2xl font-semibold mb-6 text-center">Start Translation Session</h2>
            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium mb-2 text-center">Your Language</label>
              <Select value={doctorLanguage} onValueChange={setDoctorLanguage}>
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

            <Button onClick={generateSession} className="w-full" size="lg">
              Generate QR Code
            </Button>
          </Card>
        ) : (
          <Card className="p-8 shadow-card text-center">
            <h2 className="text-2xl font-semibold mb-6">Patient Scan Code</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-6 rounded-lg">
                <QRCodeSVG 
                  value={`${window.location.origin}/patient-translate?code=${sessionCode}`}
                  size={256}
                  level="H"
                />
              </div>
              <p className="text-2xl font-bold text-primary">{sessionCode}</p>
              <p className="text-sm text-muted-foreground text-center">
                Patient scans this code to join the session
              </p>
            </div>

            <div className="mt-6 space-y-2">
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

              <Button 
                onClick={endSession} 
                variant="outline"
                className="w-full"
              >
                <Phone className="mr-2 h-5 w-5" />
                End Session
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
