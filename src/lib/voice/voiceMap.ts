export type VoiceMode = "normal" | "emergency";

export const VOICE_MAP: Record<string, { normal: string; emergency: string }> = {
  // Keep the Indian English voices unchanged – these are the recommended voices for
  // conversational scenarios in India.  See the Azure voice list for details:
  // https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support
  "en-IN": { normal: "en-IN-NeerjaNeural",  emergency: "en-IN-PrabhatNeural"  },
  // Hindi voices: Swara (female) and Madhur (male) are available neural voices
  // for hi-IN.  Other names such as "Neerja" are English voices and will sound
  // unnatural when reading Hindi text.
  "hi-IN": { normal: "hi-IN-SwaraNeural",   emergency: "hi-IN-MadhurNeural"   },
  // Tamil voices: the correct normal voice is "PallaviNeural"; the previous
  // "PadmaNeural" does not exist and causes the SDK to fall back to a default
  // voice that sounds shaky.  Valluvar is the male counterpart used in
  // emergency mode.
  "ta-IN": { normal: "ta-IN-PallaviNeural", emergency: "ta-IN-ValluvarNeural" },
  // Telugu voices: Azure provides "ShrutiNeural" (female) and "MohanNeural" (male).
  // The earlier mapping used "Sree" and "Chaitanya", which are not valid voice
  // names and thus triggered a fallback to a lower-quality voice.
  "te-IN": { normal: "te-IN-ShrutiNeural",  emergency: "te-IN-MohanNeural"    },
  // Kannada voices: use "SapnaNeural" for normal mode and "GaganNeural" for
  // emergency mode.  The previous "Manjula" and "Guru" voices are not valid
  // Azure voice names and result in a fallback to the default (English) voice.
  "kn-IN": { normal: "kn-IN-SapnaNeural",   emergency: "kn-IN-GaganNeural"    }
};