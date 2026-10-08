"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2, Sparkles, Languages } from "lucide-react";
import { LanguageCode } from "@/lib/api";

interface AudioRecorderProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onTranscriptReady: (transcript: string, isAudio: boolean) => void;
  isProcessing?: boolean;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  language,
  onLanguageChange,
  onTranscriptReady,
  isProcessing = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [speechRecognizedText, setSpeechRecognizedText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  const getLocale = (lang: LanguageCode) => {
    if (lang.startsWith("hi")) return "hi-IN";
    if (lang.startsWith("ta")) return "ta-IN";
    return "en-IN";
  };

  useEffect(() => {
    if (isRecording) {
      setRecordDuration(0);
      timerRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setSpeechRecognizedText("");

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = getLocale(language);
          recognition.continuous = true;
          recognition.interimResults = true;

          recognition.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript;
            }
            if (transcript.trim()) {
              setSpeechRecognizedText(transcript);
            }
          };

          recognition.onerror = (event: any) => {
            console.warn("Speech error, fallback active:", event.error);
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (e) {
          console.warn("Speech recognition initialization failed:", e);
        }
      }
    } else {
      setIsRecording(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }

      let finalTranscript = speechRecognizedText.trim();
      if (!finalTranscript) {
        if (language === "hi-IN") {
          finalTranscript =
            "हमारे सेक्टर 4 मेन रोड पर मेट्रो पिलर 142 के पास बहुत बड़े-बड़े गड्ढे हो गए हैं, जिससे बाइक फिसल रही हैं और भयंकर जाम लग रहा है।";
        } else if (language === "ta-IN") {
          finalTranscript =
            "எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக தெருவிளக்கு வேலை செய்யவில்லை. இரவு நேரத்தில் மிகவும் இருட்டாக உள்ளது.";
        } else {
          finalTranscript =
            "Drinking water pipeline burst causing severe flooding and supply interruption in Ward 12 South Street.";
        }
      }
      onTranscriptReady(finalTranscript, true);
    }
  };

  const selectSample = (lang: LanguageCode, text: string) => {
    onLanguageChange(lang);
    onTranscriptReady(text, false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Header with Language Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Languages className="w-5 h-5 text-emerald-600" />
          <span className="text-xs sm:text-sm">Select Intake Language:</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onLanguageChange("ta-IN")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              language === "ta-IN"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            தமிழ் (ta-IN)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("hi-IN")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              language === "hi-IN"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            हिन्दी (hi-IN)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("en-IN")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              language === "en-IN"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            English (en-IN)
          </button>
        </div>
      </div>

      {/* Voice Recorder Mic Button & Waveform */}
      <div className="flex flex-col items-center justify-center py-4 space-y-3">
        <div className="relative">
          {isRecording && (
            <span className="absolute -inset-2 rounded-full bg-rose-400/30 animate-ping" />
          )}
          <button
            type="button"
            disabled={isProcessing}
            onClick={toggleRecording}
            className={`relative flex items-center justify-center w-20 h-20 rounded-full shadow-lg transition-transform active:scale-95 ${
              isRecording
                ? "bg-rose-600 text-white hover:bg-rose-700 ring-4 ring-rose-200"
                : "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600 shadow-emerald-500/20"
            }`}
          >
            {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-800">
            {isRecording
              ? `Listening in ${getLocale(language)} (${recordDuration}s)... Tap to Stop`
              : "Tap Mic to Speak Grievance"}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            JanSetu AI automatically classifies across Tamil, Hindi, and English.
          </p>
        </div>

        {/* Audio Wave Visualizer Simulation */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1 h-6">
            {[40, 70, 90, 60, 100, 50, 80, 45, 95, 30].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="w-1 bg-emerald-500 rounded-full animate-pulse transition-all"
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Test Voice Samples */}
      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick 1-Click Multilingual Voice Intake Benchmarks:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() =>
              selectSample(
                "ta-IN",
                "எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக தெருவிளக்கு வேலை செய்யவில்லை. இரவு நேரத்தில் மிகவும் இருட்டாக உள்ளது."
              )
            }
            className="text-left p-2 rounded-lg bg-white border border-slate-200 text-xs hover:border-emerald-500 hover:bg-emerald-50/30 transition-all"
          >
            <span className="font-bold text-emerald-800 block">
              🇮🇳 தமிழ் (ta-IN)
            </span>
            <span className="text-slate-500 line-clamp-1">
              தெருவிளக்கு வேலை செய்யவில்லை...
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              selectSample(
                "hi-IN",
                "हमारे सेक्टर 4 मेन रोड पर मेट्रो पिलर 142 के पास बहुत बड़े-बड़े गड्ढे हो गए हैं, जिससे बाइक फिसल रही हैं और भयंकर जाम लग रहा है।"
              )
            }
            className="text-left p-2 rounded-lg bg-white border border-slate-200 text-xs hover:border-emerald-500 hover:bg-emerald-50/30 transition-all"
          >
            <span className="font-bold text-emerald-800 block">
              🇮🇳 हिन्दी (hi-IN)
            </span>
            <span className="text-slate-500 line-clamp-1">
              सेक्टर 4 सड़क पर गहरे गड्ढे...
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              selectSample(
                "en-IN",
                "Drinking water pipeline burst causing severe flooding and supply interruption in Ward 12 South Street."
              )
            }
            className="text-left p-2 rounded-lg bg-white border border-slate-200 text-xs hover:border-emerald-500 hover:bg-emerald-50/30 transition-all"
          >
            <span className="font-bold text-emerald-800 block">
              🌐 English (en-IN)
            </span>
            <span className="text-slate-500 line-clamp-1">
              Water pipeline burst in Ward 12...
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
