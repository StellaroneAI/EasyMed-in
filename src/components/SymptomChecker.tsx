import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { voiceService, Symptom, DiagnosisResult } from '../services/openai';

export default function SymptomChecker() {
  const { currentLanguage } = useLanguage();

  // Translation texts
  const texts = {
    english: {
      aiSymptomChecker: "AI Symptom Checker",
      headerDescription: "Advanced AI-powered health assessment and recommendations",
      patientInformation: "Patient Information",
      age: "Age",
      enterAge: "Enter age",
      gender: "Gender",
      selectGender: "Select gender",
      male: "Male",
      female: "Female",
      other: "Other",
      describeSymptomsLabel: "Describe your symptoms in your own words",
      describeSymptomsPlaceholder: "e.g., I have a sharp pain in my chest that gets worse when I breathe deeply.",
      existingMedicalConditions: "Existing Medical Conditions",
      nextSelectSymptoms: "Next: Select Symptoms",
      selectYourSymptoms: "Select Your Symptoms",
      selectedSymptoms: "Selected Symptoms",
      back: "Back",
      nextDurationDetails: "Next: Duration & Details",
      symptomDurationSeverity: "Symptom Duration & Severity",
      duration: "Duration",
      severity: "Severity",
      fewHours: "Few hours",
      oneTwoDays: "1-2 days",
      threeSevenDays: "3-7 days",
      oneTwoWeeks: "1-2 weeks",
      moreThanTwoWeeks: "More than 2 weeks",
      mild: "Mild",
      moderate: "Moderate",
      severe: "Severe",
      analyzeSymptoms: "Analyze Symptoms",
      aiAnalysisRecommendations: "AI Analysis & Recommendations",
      startAIAnalysis: "Start AI Analysis",
      ourAIWillAnalyze: "Our AI will analyze your symptoms and provide recommendations",
      analyzingSymptoms: "Analyzing your symptoms...",
      pleaseWait: "Please wait while our AI processes your information",
      emergency: "Emergency",
      urgent: "Urgent",
      routine: "Routine",
      emergencyDesc: "Immediate medical attention required",
      urgentDesc: "Schedule appointment soon",
      routineDesc: "Can wait for routine care",
      listenDiagnosis: "Listen to diagnosis",
      analysisResults: "Analysis Results",
      likelyCondition: "Likely Condition:",
      confidenceLevel: "Confidence Level:",
      recommendedSpecialist: "Recommended Specialist:",
      recommendations: "Recommendations",
      bookAppointment: "Book Appointment",
      callDoctor: "Call Doctor",
      saveReport: "Save Report",
      newAnalysis: "New Analysis",
      importantDisclaimer: "Important Disclaimer",
      disclaimerText: "This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for proper diagnosis and treatment.",
    },
    hindi: {
      aiSymptomChecker: "एआई लक्षण चेकर",
      headerDescription: "उन्नत एआई-समर्थित स्वास्थ्य मूल्यांकन और अनुशंसाएं",
      patientInformation: "रोगी की जानकारी",
      age: "उम्र",
      enterAge: "उम्र दर्ज करें",
      gender: "लिंग",
      selectGender: "लिंग चुनें",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      describeSymptomsLabel: "अपने शब्दों में अपने लक्षणों का वर्णन करें",
      describeSymptomsPlaceholder: "उदा., मेरी छाती में तेज दर्द है जो गहरी सांस लेने पर बढ़ जाता है।",
      existingMedicalConditions: "मौजूदा चिकित्सा स्थितियां",
      nextSelectSymptoms: "अगला: लक्षण चुनें",
      selectYourSymptoms: "अपने लक्षण चुनें",
      selectedSymptoms: "चयनित लक्षण",
      back: "वापस",
      nextDurationDetails: "अगला: अवधि और विवरण",
      symptomDurationSeverity: "लक्षण अवधि और गंभीरता",
      duration: "अवधि",
      severity: "गंभीरता",
      fewHours: "कुछ घंटे",
      oneTwoDays: "1-2 दिन",
      threeSevenDays: "3-7 दिन",
      oneTwoWeeks: "1-2 सप्ताह",
      moreThanTwoWeeks: "2 सप्ताह से अधिक",
      mild: "हल्का",
      moderate: "मध्यम",
      severe: "गंभीर",
      analyzeSymptoms: "लक्षणों का विश्लेषण करें",
      aiAnalysisRecommendations: "एआई विश्लेषण और अनुशंसाएं",
      startAIAnalysis: "एआई विश्लेषण शुरू करें",
      ourAIWillAnalyze: "हमारा एआई आपके लक्षणों का विश्लेषण करेगा और सिफारिशें प्रदान करेगा",
      analyzingSymptoms: "आपके लक्षणों का विश्लेषण किया जा रहा है...",
      pleaseWait: "कृपया प्रतीक्षा करें जब तक हमारा एआई आपकी जानकारी को संसाधित करता है",
      emergency: "आपातकाल",
      urgent: "जरूरी",
      routine: "रूटीन",
      emergencyDesc: "तत्काल चिकित्सा ध्यान आवश्यक",
      urgentDesc: "शीघ्र अपॉइंटमेंट निर्धारित करें",
      routineDesc: "रूटीन देखभाल के लिए प्रतीक्षा कर सकते हैं",
      listenDiagnosis: "निदान सुनें",
      analysisResults: "विश्लेषण परिणाम",
      likelyCondition: "संभावित स्थिति:",
      confidenceLevel: "विश्वास स्तर:",
      recommendedSpecialist: "अनुशंसित विशेषज्ञ:",
      recommendations: "अनुशंसाएं",
      bookAppointment: "अपॉइंटमेंट बुक करें",
      callDoctor: "डॉक्टर को फोन करें",
      saveReport: "रिपोर्ट सहेजें",
      newAnalysis: "नया विश्लेषण",
      importantDisclaimer: "महत्वपूर्ण अस्वीकरण",
      disclaimerText: "यह एआई विश्लेषण केवल सूचना के उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह को प्रतिस्थापित नहीं करना चाहिए। सही निदान और उपचार के लिए हमेशा योग्य स्वास्थ्य सेवा प्रदाताओं से परामर्श करें।",
    },
    tamil: {
      aiSymptomChecker: "ஏஐ அறிகுறி சரிபார்ப்பு",
      headerDescription: "மேம்பட்ட ஏஐ-அணுகலில் சுகாதார மதிப்பீடு மற்றும் பரிந்துரைகள்",
      patientInformation: "நோயாளி தகவல્",
      age: "வயது",
      enterAge: "வயதை உள்ளிடவும்",
      gender: "பாலினம்",
      selectGender: "பாலினத்தைத் தேர்ந்தெடுக்கவும்",
      male: "ஆண்",
      female: "பெண்",
      other: "மற்றவை",
      describeSymptomsLabel: "உங்கள் அறிகுறிகளை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும்",
      describeSymptomsPlaceholder: "உதா., என் மார்பில் கூர்மையான வலி உள்ளது, அது ஆழமாக சுவாசிக்கும்போது மோசமாகிறது.",
      existingMedicalConditions: "தற்போதுள்ள மருத்துவ நிலைகள்",
      nextSelectSymptoms: "அடுத்து: அறிகுறிகளைத் தேர்வு செய்க",
      selectYourSymptoms: "உங்கள் அறிகুறிகளைத் தேர்ந்தெடுக்கவும்",
      selectedSymptoms: "தேர்ந்தெடுக்கப்பட்ட அறிகுறிகள்",
      back: "மீண்டும்",
      nextDurationDetails: "அடுத்து: காலம் மற்றும் விவரங்கள்",
      symptomDurationSeverity: "அறிகுறி காலம் மற்றும் தீவிரம்",
      duration: "காலம்",
      severity: "தீவிரம்",
      fewHours: "சில மணி நேரம்",
      oneTwoDays: "1-2 நாட்கள்",
      threeSevenDays: "3-7 நாட்கள்",
      oneTwoWeeks: "1-2 வாரங்கள்",
      moreThanTwoWeeks: "2 வாரங்களுக்கு மேல்",
      mild: "லேசான",
      moderate: "மிதமான",
      severe: "கடுமையான",
      analyzeSymptoms: "அறிகுறிகளை பகுப்பாய்வு செய்க",
      aiAnalysisRecommendations: "ஏஐ பகுப்பாய்வு மற்றும் பரிந்துரைகள்",
      startAIAnalysis: "ஏஐ பகுப்பாய்வு தொடங்கவும்",
      ourAIWillAnalyze: "எங்கள் ஏஐ உங்கள் அறிகுறிகளை பகுப்பாய்வு செய்து பரிந்துரைகளை வழங்கும்",
      analyzingSymptoms: "உங்கள் அறிகுறிகளை பகுப்பாய்வு செய்கிறது...",
      pleaseWait: "எங்கள் ஏஐ உங்கள் தகவலைச் செயலாக்கும் வரை காத்திருக்கவும்",
      emergency: "அவசர",
      urgent: "அவசர தேவை",
      routine: "வழக்கமான",
      emergencyDesc: "உடனடி மருத்துவ அவசியம் தேவை",
      urgentDesc: "அடிக்கடி அமர்வை திட்டமிடுங்கள்",
      routineDesc: "வழக்கமான கவனிக்காக காத்திருக்கலாம்",
      listenDiagnosis: "கண்டறிதலை கேட்கவும்",
      analysisResults: "பகுப்பாய்வு முடிவுகள்",
      likelyCondition: "சாத்தியமான நிலை:",
      confidenceLevel: "நம்பிக்கை நிலை:",
      recommendedSpecialist: "பரிந்துரைக்கப்பட்ட நிபுணர்:",
      recommendations: "பரிந்துரைகள்",
      bookAppointment: "அப்பாயிண்ட்மெண்ட் புக் செய்யுங்கள்",
      callDoctor: "மருத்துவரை அழைக்கவும்",
      saveReport: "அறிக்கையை சேமிக்கவும்",
      newAnalysis: "புதிய பகுப்பாய்வு",
      importantDisclaimer: "முக்கியமான மறுப்பு",
      disclaimerText: "இந்த AI பகுப்பாய்வு தகவல் நோக்கங்களுக்காக மட்டுமே மற்றும் தொழில்முறை மருத்துவ ஆலோசனையை மாற்ற வேண்டியதில்லை. சரியான கண்டறிதல் மற்றும் சிகிச்சைக்கு எப்போதும் தகுதியான சுகாதார சேவை வழங்குநர்களைக் கலந்தாலோசிக்கவும்.",
    },
    telugu: {
      aiSymptomChecker: "ఏఐ లక్షణ తనిఖీ",
      headerDescription: "అధునాతన ఏఐ-శక్తితో ఆరోగ్య మూల్యాంకనం మరియు సిఫార్సులు",
      patientInformation: "రోగి సమాచారం",
      age: "వయస్సు",
      enterAge: "వయస్సు నమోదు చేయండి",
      gender: "లింగం",
      selectGender: "లింగాన్ని ఎంచుకోండి",
      male: "పురుషుడు",
      female: "స్త్రీ",
      other: "ఇతర",
      describeSymptomsLabel: "మీ లక్షణాలను మీ మాటల్లో వివరించండి",
      describeSymptomsPlaceholder: "ఉదా., నా ఛాతీలో పదునైన నొప్పి ఉంది, అది లోతుగా ఊపిరి పీల్చుకున్నప్పుడు దిగజారుతుంది.",
      existingMedicalConditions: "ప్రస్తుత వైద్య పరిస్థితులు",
      nextSelectSymptoms: "తదుపరి: లక్షణాలను ఎంచుకోండి",
      selectYourSymptoms: "మీ లక్షణాలను ఎంచుకోండి",
      selectedSymptoms: "ఎంచుకున్న లక్షణాలు",
      back: "వెనక్కు",
      nextDurationDetails: "తదుపరి: వ్యవధి మరియు వివరాలు",
      symptomDurationSeverity: "లక్షణ వ్యవధి మరియు తీవ్రత",
      duration: "వ్యవధి",
      severity: "తీవ్రత",
      fewHours: "కొన్ని గంటలు",
      oneTwoDays: "1-2 రోజులు",
      threeSevenDays: "3-7 రోజులు",
      oneTwoWeeks: "1-2 వారాలు",
      moreThanTwoWeeks: "2 వారాలకు మించి",
      mild: "తేలిక",
      moderate: "మధ్యస్థ",
      severe: "తీవ్రమైన",
      analyzeSymptoms: "లక్షణాలను విశ్లేషించండి",
      aiAnalysisRecommendations: "ఏఐ విశ్లేషణ మరియు సిఫార్సులు",
      startAIAnalysis: "ఏఐ విశ్లేషణ ప్రారంభించండి",
      ourAIWillAnalyze: "మా ఏఐ మీ లక్షణాలను విశ్లేషిస్తుంది మరియు సిఫార్సులను అందిస్తుంది",
      analyzingSymptoms: "మీ లక్షణాలను విశ్లేషిస్తోంది...",
      pleaseWait: "దయచేసి మా ఏఐ మీ సమాచారాన్ని ప్రాసెస్ చేసే వరకు వేచి ఉండండి",
      emergency: "అత్యవసర",
      urgent: "అత్యవసర",
      routine: "సాధారణ",
      emergencyDesc: "తక్షణ వైద్య శ్రద్ధ అవసరం",
      urgentDesc: "త్వరలో అపాయింట్మెంట్ షెడ్యూల్ చేయండి",
      routineDesc: "సాధారణ సంరక్షణ కోసం వేచి ఉండవచ్చు",
      listenDiagnosis: "రోగ నిర్ధారణ వినండి",
      analysisResults: "విశ్లేషణ ఫలితాలు",
      likelyCondition: "సంభావ్య పరిస్థితి:",
      confidenceLevel: "విశ్వాస స్థాయి:",
      recommendedSpecialist: "సిఫార్సు చేయబడిన నిపుణుడు:",
      recommendations: "సిఫార్సులు",
      bookAppointment: "అపాయింట్మెంట్ బుక్ చేయండి",
      callDoctor: "వైద్యుడిని కాల్ చేయండి",
      saveReport: "రిపోర్ట్ను సేవ్ చేయండి",
      newAnalysis: "కొత్త విశ్లేషణ",
      importantDisclaimer: "ముఖ్యమైన నిరాకరణ",
      disclaimerText: "ఈ ఏఐ విశ్లేషణ కేవలం సమాచార ప్రయోజనాల కోసం మాత్రమే మరియు వృత్తిపరమైన వైద్య సలహాను భర్తీ చేయకూడదు. సరైన రోగ నిర్ధారణ మరియు చికిత్స కోసం ఎల్లప్పుడూ అర్హత కలిగిన ఆరోగ్య సేవా ప్రదాతలను సంప్రదించండి.",
    },
    kannada: {
      aiSymptomChecker: "ಎಐ ಲಕ್ಷಣ ಪರಿಶೀಲಕ",
      headerDescription: "ಮುನ್ನಡೆ ಎಐ ಆಧಾರಿತ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಶಿಫಾರಸುಗಳು",
      patientInformation: "ರೋಗಿಯ ಮಾಹಿತಿ",
      age: "ವಯಸ್ಸು",
      enterAge: "ವಯಸ್ಸು ನಮೂದಿಸಿ",
      gender: "ಲಿಂಗ",
      selectGender: "ಲಿಂಗ ಆಯ್ಕೆ ಮಾಡಿ",
      male: "ಪುರುಷ",
      female: "ಸ್ತ್ರೀ",
      other: "ಇತರೆ",
      describeSymptomsLabel: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ನಿಮ್ಮ ಮಾತಿನಲ್ಲಿ ವಿವರಿಸಿ",
      describeSymptomsPlaceholder: "ಉದಾ., ಗಾಢ ಉಸಿರೆಳೆದಾಗ ಎದೆ ನೋವು ಹೆಚ್ಚಾಗುತ್ತದೆ.",
      existingMedicalConditions: "ವೈದ್ಯಕೀಯ ಪರಿಸ್ಥಿತಿಗಳು",
      nextSelectSymptoms: "ಮುಂದೆ: ಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectYourSymptoms: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectedSymptoms: "ಆಯ್ಕೆಯಾದ ಲಕ್ಷಣಗಳು",
      back: "ಹಿಂದಕ್ಕೆ",
      nextDurationDetails: "ಮುಂದೆ: ಅವಧಿ ಮತ್ತು ವಿವರಗಳು",
      symptomDurationSeverity: "ಲಕ್ಷಣ ಅವಧಿ ಮತ್ತು ತೀವ್ರತೆ",
      duration: "ಅವಧಿ",
      severity: "ತೀವ್ರತೆ",
      fewHours: "ಕೆಲವು ಗಂಟೆಗಳು",
      oneTwoDays: "1-2 ದಿನಗಳು",
      threeSevenDays: "3-7 ದಿನಗಳು",
      oneTwoWeeks: "1-2 ವಾರಗಳು",
      moreThanTwoWeeks: "2 ವಾರಕ್ಕಿಂತ ಹೆಚ್ಚು",
      mild: "ಲಘು",
      moderate: "ಮಧ್ಯಮ",
      severe: "ತೀವ್ರ",
      analyzeSymptoms: "ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
      aiAnalysisRecommendations: "ಎಐ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಶಿಫಾರಸುಗಳು",
      startAIAnalysis: "ಎಐ ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
      ourAIWillAnalyze: "ನಮ್ಮ ಎಐ ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಶಿಫಾರಸುಗಳನ್ನು ನೀಡುತ್ತದೆ",
      analyzingSymptoms: "ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      pleaseWait: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ",
      emergency: "ತುರ್ತು",
      urgent: "ತುರ್ತು",
      routine: "ಸಾಮಾನ್ಯ",
      emergencyDesc: "ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಬೇಕು",
      urgentDesc: "ಶೀಘ್ರದಲ್ಲಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಹಾಕಿ",
      routineDesc: "ಸಾಮಾನ್ಯ ಚಿಕಿತ್ಸೆಗೆ ಕಾಯಬಹುದು",
      listenDiagnosis: "ರೋಗ ನಿರ್ಣಯ ಕೇಳಿ",
      analysisResults: "ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ",
      likelyCondition: "ಸಂಭಾವ್ಯ ಸ್ಥಿತಿ:",
      confidenceLevel: "ವಿಶ್ವಾಸ ಮಟ್ಟ:",
      recommendedSpecialist: "ಶಿಫಾರಸು ವೈದ್ಯ:",
      recommendations: "ಶಿಫಾರಸುಗಳು",
      bookAppointment: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
      callDoctor: "ವೈದ್ಯರನ್ನು ಕರೆ ಮಾಡಿ",
      saveReport: "ರಿಪೋರ್ಟ್ ಉಳಿಸಿ",
      newAnalysis: "ಹೊಸ ವಿಶ್ಲೇಷಣೆ",
      importantDisclaimer: "ಮುಖ್ಯ ಸೂಚನೆ",
      disclaimerText: "ಈ AI ವಿಶ್ಲೇಷಣೆ ಮಾಹಿತಿ ಉದ್ದೇಶಕ್ಕೆ ಮಾತ್ರ. ವೈದ್ಯರ ಸಲಹೆ ಅಗತ್ಯ.",
    },
        malayalam: {
      aiSymptomChecker: "എഐ ലക്ഷണ പരിശോധന",
      headerDescription: "ഉന്നത എഐ ആരോഗ്യ വിലയിരുത്തലുകളും ശുപാർശകളും",
      patientInformation: "രോഗിയുടെ വിവരങ്ങൾ",
      age: "പ്രായം",
      enterAge: "പ്രായം നൽകുക",
      gender: "ലിംഗം",
      selectGender: "ലിംഗം തിരഞ്ഞെടുക്കുക",
      male: "ആൺ",
      female: "പെൺ",
      other: "മറ്റ്",
      describeSymptomsLabel: "ലക്ഷണങ്ങൾ നിങ്ങളുടെ ഭാഷയിൽ വിശദീകരിക്കുക",
      describeSymptomsPlaceholder: "ഉദാ: ഞാന്‍ ആഴത്തില്‍ ശ്വാസം എടുക്കുമ്പോള്‍ നെഞ്ച് വേദന വര്‍ധിക്കുന്നു.",
      existingMedicalConditions: "നിലവിലുള്ള രോഗാവസ്ഥകള്‍",
      nextSelectSymptoms: "അടുത്തത്: ലക്ഷണങ്ങൾ തിരഞ്ഞെടുക്കുക",
      selectYourSymptoms: "ലക്ഷണങ്ങൾ തിരഞ്ഞെടുക്കുക",
      selectedSymptoms: "തിരഞ്ഞെടുത്ത ലക്ഷണങ്ങൾ",
      back: "തിരികെ",
      nextDurationDetails: "അടുത്തത്: ദൈർഘ്യം & വിശദാംശങ്ങൾ",
      symptomDurationSeverity: "ലക്ഷണം ദൈർഘ്യം & ഗുരുതരം",
      duration: "ദൈർഘ്യം",
      severity: "ഗുരുതരം",
      fewHours: "ചില മണിക്കൂർ",
      oneTwoDays: "1-2 ദിവസം",
      threeSevenDays: "3-7 ദിവസം",
      oneTwoWeeks: "1-2 ആഴ്ച",
      moreThanTwoWeeks: "2 ആഴ്ചകളിൽ കൂടുതൽ",
      mild: "ലഘു",
      moderate: "മിതമായ",
      severe: "ഗുരുതര",
      analyzeSymptoms: "ലക്ഷണങ്ങൾ വിശകലനം ചെയ്യുക",
      aiAnalysisRecommendations: "എഐ വിശകലനം & ശുപാർശകൾ",
      startAIAnalysis: "എഐ വിശകലനം ആരംഭിക്കുക",
      ourAIWillAnalyze: "എഐ ലക്ഷണങ്ങൾ വിശകലനം ചെയ്‌തു ശുപാർശകൾ നൽകും",
      analyzingSymptoms: "വിശകലനം നടക്കുന്നു...",
      pleaseWait: "ദയവായി കാത്തിരിക്കൂ",
      emergency: "ആപത്കാലം",
      urgent: "ത്വരിതം",
      routine: "സാധാരണ",
      emergencyDesc: "ഉടൻ ചികിത്സ ആവശ്യം",
      urgentDesc: "വേഗത്തിൽ അപ്പോയിന്റ്മെന്റ് എടുക്കുക",
      routineDesc: "സാധാരണ ചികിത്സക്ക് കാത്തിരിക്കുക",
      listenDiagnosis: "റിപ്പോർട്ട് കേൾക്കുക",
      analysisResults: "വിശകലന ഫലം",
      likelyCondition: "സാധ്യമായ അവസ്ഥ:",
      confidenceLevel: "വിശ്വാസനില:",
      recommendedSpecialist: "ശുപാർശ ഡോക്ടർ:",
      recommendations: "ശുപാർശകൾ",
      bookAppointment: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
      callDoctor: "ഡോക്ടറെ വിളിക്കുക",
      saveReport: "റിപ്പോർട് സേവ് ചെയ്യുക",
      newAnalysis: "പുതിയ വിശകലനം",
      importantDisclaimer: "പ്രധാന കുറിപ്പ്",
      disclaimerText: "ഇത് വിവരങ്ങൾക്ക് മാത്രമാണ്. നിർബന്ധമായി ഡോക്ടർ ഉപദേശം തേടുക.",
    },
        marathi: {
      aiSymptomChecker: "एआय लक्षण तपासणी",
      headerDescription: "प्रगत एआय आधारित आरोग्य मूल्यांकन आणि शिफारसी",
      patientInformation: "रुग्णाची माहिती",
      age: "वय",
      enterAge: "वय प्रविष्ट करा",
      gender: "लिंग",
      selectGender: "लिंग निवडा",
      male: "पुरुष",
      female: "महिला",
      other: "इतर",
      describeSymptomsLabel: "आपल्या भाषेत लक्षणांचे वर्णन करा",
      describeSymptomsPlaceholder: "उदा., खोल श्वास घेताना छातीत तीव्र वेदना होते.",
      existingMedicalConditions: "अस्तित्वात असलेल्या वैद्यकीय स्थिती",
      nextSelectSymptoms: "पुढे: लक्षणे निवडा",
      selectYourSymptoms: "लक्षणे निवडा",
      selectedSymptoms: "निवडलेली लक्षणे",
      back: "मागे",
      nextDurationDetails: "पुढे: कालावधी आणि तपशील",
      symptomDurationSeverity: "लक्षण कालावधी व तीव्रता",
      duration: "कालावधी",
      severity: "तीव्रता",
      fewHours: "काही तास",
      oneTwoDays: "1-2 दिवस",
      threeSevenDays: "3-7 दिवस",
      oneTwoWeeks: "1-2 आठवडे",
      moreThanTwoWeeks: "2 आठवड्यांपेक्षा जास्त",
      mild: "मंद",
      moderate: "मध्यम",
      severe: "गंभीर",
      analyzeSymptoms: "लक्षणांचे विश्लेषण करा",
      aiAnalysisRecommendations: "एआय विश्लेषण आणि शिफारसी",
      startAIAnalysis: "एआय विश्लेषण सुरू करा",
      ourAIWillAnalyze: "एआय लक्षणांचे विश्लेषण करून शिफारसी देईल",
      analyzingSymptoms: "विश्लेषण सुरू आहे...",
      pleaseWait: "कृपया प्रतीक्षा करा",
      emergency: "आपत्काल",
      urgent: "तातडीचे",
      routine: "नियमित",
      emergencyDesc: "तात्काळ वैद्यकीय मदत आवश्यक",
      urgentDesc: "लवकरात लवकर अपॉइंटमेंट घ्या",
      routineDesc: "नियमित देखभालीसाठी प्रतीक्षा करू शकता",
      listenDiagnosis: "निदान ऐका",
      analysisResults: "विश्लेषण निकाल",
      likelyCondition: "संभाव्य स्थिती:",
      confidenceLevel: "विश्वास पातळी:",
      recommendedSpecialist: "शिफारस तज्ज्ञ:",
      recommendations: "शिफारसी",
      bookAppointment: "अपॉइंटमेंट बुक करा",
      callDoctor: "डॉक्टरला फोन करा",
      saveReport: "अहवाल जतन करा",
      newAnalysis: "नवीन विश्लेषण",
      importantDisclaimer: "महत्त्वाची सूचना",
      disclaimerText: "ही एआय माहिती संदर्भासाठी आहे. डॉक्टरांचा सल्ला आवश्यक आहे.",
    },
    bengali: {
      aiSymptomChecker: "এআই লক্ষণ পরীক্ষক",
      headerDescription: "উন্নত এআই-চালিত স্বাস্থ্য মূল্যায়ন এবং সুপারিশ",
      patientInformation: "রোগীর তথ্য",
      age: "বয়স",
      enterAge: "বয়স প্রবেশ করুন",
      gender: "লিঙ্গ",
      selectGender: "লিঙ্গ নির্বাচন করুন",
      male: "পুরুষ",
      female: "মহিলা",
      other: "অন্য",
      describeSymptomsLabel: "আপনার নিজের ভাষায় আপনার লক্ষণগুলি বর্ণনা করুন",
      describeSymptomsPlaceholder: "যেমন, আমার বুকে তীব্র ব্যথা আছে যা গভীর শ্বাস নিলে আরও খারাপ হয়।",
      existingMedicalConditions: "বিদ্যমান চিকিৎসা অবস্থা",
      nextSelectSymptoms: "পরবর্তী: লক্ষণ নির্বাচন করুন",
      selectYourSymptoms: "আপনার লক্ষণগুলি নির্বাচন করুন",
      selectedSymptoms: "নির্বাচিত লক্ষণ",
      back: "পিছনে",
      nextDurationDetails: "পরবর্তী: সময়কাল এবং বিবরণ",
      symptomDurationSeverity: "লক্ষণের সময়কাল এবং তীব্রতা",
      duration: "সময়কাল",
      severity: "তীব্রতা",
      fewHours: "কয়েক ঘন্টা",
      oneTwoDays: "১-২ দিন",
      threeSevenDays: "৩-৭ দিন",
      oneTwoWeeks: "১-২ সপ্তাহ",
      moreThanTwoWeeks: "২ সপ্তাহের বেশি",
      mild: "হালকা",
      moderate: "মাঝারি",
      severe: "গুরুতর",
      analyzeSymptoms: "লক্ষণ বিশ্লেষণ করুন",
      aiAnalysisRecommendations: "এআই বিশ্লেষণ এবং সুপারিশ",
      startAIAnalysis: "এআই বিশ্লেষণ শুরু করুন",
      ourAIWillAnalyze: "আমাদের এআই আপনার লক্ষণগুলি বিশ্লেষণ করবে এবং সুপারিশ প্রদান করবে",
      analyzingSymptoms: "আপনার লক্ষণগুলি বিশ্লেষণ করা হচ্ছে...",
      pleaseWait: "দয়া করে অপেক্ষা করুন যতক্ষণ না আমাদের এআই আপনার তথ্য প্রক্রিয়া করে",
      emergency: "জরুরি",
      urgent: "জরুরি",
      routine: "নিয়মিত",
      emergencyDesc: "তাৎক্ষণিক চিকিৎসা মনোযোগ প্রয়োজন",
      urgentDesc: "শীঘ্রই অ্যাপয়েন্টমেন্ট নির্ধারণ করুন",
      routineDesc: "নিয়মিত যত্নের জন্য অপেক্ষা করতে পারেন",
      listenDiagnosis: "রোগ নির্ণয় শুনুন",
      analysisResults: "বিশ্লেষণের ফলাফল",
      likelyCondition: "সম্ভাব্য অবস্থা:",
      confidenceLevel: "আত্মবিশ্বাসের স্তর:",
      recommendedSpecialist: "প্রস্তাবিত বিশেষজ্ঞ:",
      recommendations: "সুপারিশ",
      bookAppointment: "অ্যাপয়েন্টমেন্ট বুক করুন",
      callDoctor: "ডাক্তারকে কল করুন",
      saveReport: "রিপোর্ট সংরক্ষণ করুন",
      newAnalysis: "নতুন বিশ্লেষণ",
      importantDisclaimer: "গুরুত্বপূর্ণ দাবিত্যাগ",
      disclaimerText: "এই এআই বিশ্লেষণ শুধুমাত্র তথ্যগত উদ্দেশ্যে এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প হওয়া উচিত নয়। সঠিক রোগ নির্ণয় এবং চিকিৎসার জন্য সর্বদা যোগ্য স্বাস্থ্যসেবা প্রদানকারীদের সাথে পরামর্শ করুন।",
    },
  };

  const getLocalText = (key: keyof typeof texts.english): string => {
    return (
      texts[currentLanguage as keyof typeof texts]?.[key] ||
      texts.english[key]
    );
  };
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    gender: '',
    existingConditions: [] as string[],
    medications: [] as string[]
  });

  const commonSymptoms = [
    { id: 'fever', name: 'Fever', severity: 'moderate' as const, bodyPart: 'general', duration: '' },
    { id: 'headache', name: 'Headache', severity: 'mild' as const, bodyPart: 'head', duration: '' },
    { id: 'chest_pain', name: 'Chest Pain', severity: 'severe' as const, bodyPart: 'chest', duration: '' },
    { id: 'cough', name: 'Cough', severity: 'mild' as const, bodyPart: 'respiratory', duration: '' },
    { id: 'fatigue', name: 'Fatigue', severity: 'mild' as const, bodyPart: 'general', duration: '' },
    { id: 'nausea', name: 'Nausea', severity: 'moderate' as const, bodyPart: 'stomach', duration: '' },
    { id: 'dizziness', name: 'Dizziness', severity: 'moderate' as const, bodyPart: 'head', duration: '' },
    { id: 'shortness_breath', name: 'Shortness of Breath', severity: 'severe' as const, bodyPart: 'respiratory', duration: '' },
    { id: 'abdominal_pain', name: 'Abdominal Pain', severity: 'moderate' as const, bodyPart: 'stomach', duration: '' },
    { id: 'joint_pain', name: 'Joint Pain', severity: 'mild' as const, bodyPart: 'joints', duration: '' }
  ];

  const existingConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 
    'Thyroid Disorder', 'Kidney Disease', 'Liver Disease'
  ];

  const [naturalLanguageSymptoms, setNaturalLanguageSymptoms] = useState('');

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);
    try {
      const result = await voiceService.analyzeSymptomsWithAI(
        selectedSymptoms,
        patientInfo,
        naturalLanguageSymptoms,
        currentLanguage
      );
      setDiagnosisResult(result);
    } catch (error) {
      console.error('Symptom analysis failed:', error);
      // Optionally, set an error state to display a message to the user
    }
    setIsAnalyzing(false);
  };

  const addSymptom = (symptom: typeof commonSymptoms[0]) => {
    if (!selectedSymptoms.find(s => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, { ...symptom, duration: '1-2 days' }]);
    }
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const speakDiagnosis = () => {
    if ('speechSynthesis' in window && diagnosisResult) {
      const text = `Analysis complete. Condition: ${diagnosisResult.condition}. Probability: ${diagnosisResult.probability}%. Urgency level: ${diagnosisResult.urgency}. Recommended specialist: ${diagnosisResult.specialist}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">🤖 {getLocalText('aiSymptomChecker')}</h1>
        <p className="text-blue-100">{getLocalText('headerDescription')}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= step 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Patient Information */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">👤 {getLocalText('patientInformation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getLocalText('age')}</label>
              <input
                type="number"
                value={patientInfo.age}
                onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={getLocalText('enterAge')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getLocalText('gender')}</label>
              <select
                value={patientInfo.gender}
                onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{getLocalText('selectGender')}</option>
                <option value="male">{getLocalText('male')}</option>
                <option value="female">{getLocalText('female')}</option>
                <option value="other">{getLocalText('other')}</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{getLocalText('describeSymptomsLabel')}</label>
            <textarea
              value={naturalLanguageSymptoms}
              onChange={(e) => setNaturalLanguageSymptoms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={getLocalText('describeSymptomsPlaceholder')}
              rows={4}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{getLocalText('existingMedicalConditions')}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {existingConditions.map((condition) => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={patientInfo.existingConditions.includes(condition)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPatientInfo({
                          ...patientInfo,
                          existingConditions: [...patientInfo.existingConditions, condition]
                        });
                      } else {
                        setPatientInfo({
                          ...patientInfo,
                          existingConditions: patientInfo.existingConditions.filter(c => c !== condition)
                        });
                      }
                    }}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            disabled={!patientInfo.age || !patientInfo.gender}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getLocalText('nextSelectSymptoms')}
          </button>
        </div>
      )}

      {/* Step 2: Symptom Selection */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 {getLocalText('selectYourSymptoms')}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => addSymptom(symptom)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedSymptoms.find(s => s.id === symptom.id)
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                  symptom.severity === 'mild' ? 'bg-green-500' :
                  symptom.severity === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                {symptom.name}
              </button>
            ))}
          </div>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">{getLocalText('selectedSymptoms')} ({selectedSymptoms.length})</h3>
              <div className="space-y-2">
                {selectedSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        symptom.severity === 'mild' ? 'bg-green-500' :
                        symptom.severity === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{symptom.name}</span>
                      <span className="text-sm text-gray-600">({getLocalText(symptom.severity as keyof typeof texts.english)})</span>
                    </div>
                    <button
                      onClick={() => removeSymptom(symptom.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              {getLocalText('back')}
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={selectedSymptoms.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getLocalText('nextDurationDetails')}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Symptom Details */}
      {currentStep === 3 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⏰ {getLocalText('symptomDurationSeverity')}</h2>
          
          <div className="space-y-4">
            {selectedSymptoms.map((symptom, index) => (
              <div key={symptom.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-3">{symptom.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getLocalText('duration')}</label>
                    <select
                      value={symptom.duration}
                      onChange={(e) => {
                        const updated = [...selectedSymptoms];
                        updated[index].duration = e.target.value;
                        setSelectedSymptoms(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="few-hours">{getLocalText('fewHours')}</option>
                      <option value="1-2-days">{getLocalText('oneTwoDays')}</option>
                      <option value="3-7-days">{getLocalText('threeSevenDays')}</option>
                      <option value="1-2-weeks">{getLocalText('oneTwoWeeks')}</option>
                      <option value="more-than-2-weeks">{getLocalText('moreThanTwoWeeks')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{getLocalText('severity')}</label>
                    <select
                      value={symptom.severity}
                      onChange={(e) => {
                        const updated = [...selectedSymptoms];
                        updated[index].severity = e.target.value as 'mild' | 'moderate' | 'severe';
                        setSelectedSymptoms(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="mild">{getLocalText('mild')}</option>
                      <option value="moderate">{getLocalText('moderate')}</option>
                      <option value="severe">{getLocalText('severe')}</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              {getLocalText('back')}
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {getLocalText('analyzeSymptoms')}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Analysis & Results */}
      {currentStep === 4 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔬 {getLocalText('aiAnalysisRecommendations')}</h2>
          
          {!diagnosisResult && !isAnalyzing && (
            <div className="text-center py-8">
              <button
                onClick={analyzeSymptoms}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                🤖 {getLocalText('startAIAnalysis')}
              </button>
              <p className="text-gray-600 mt-2">{getLocalText('ourAIWillAnalyze')}</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg font-medium text-blue-600">{getLocalText('analyzingSymptoms')}</p>
              <p className="text-gray-600 mt-2">{getLocalText('pleaseWait')}</p>
            </div>
          )}

          {diagnosisResult && (
            <div className="space-y-6">
              {/* Urgency Alert */}
              <div className={`p-4 rounded-lg border-l-4 ${
                diagnosisResult.urgency === 'emergency' 
                  ? 'bg-red-50 border-red-500' 
                  : diagnosisResult.urgency === 'urgent'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-green-50 border-green-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${
                      diagnosisResult.urgency === 'emergency' ? 'text-red-800' :
                      diagnosisResult.urgency === 'urgent' ? 'text-yellow-800' : 'text-green-800'
                    }`}>
                      {diagnosisResult.urgency === 'emergency' ? `🚨 ${getLocalText('emergency')}` :
                       diagnosisResult.urgency === 'urgent' ? `⚠️ ${getLocalText('urgent')}` : `✅ ${getLocalText('routine')}`}
                    </h3>
                    <p className={`text-sm ${
                      diagnosisResult.urgency === 'emergency' ? 'text-red-700' :
                      diagnosisResult.urgency === 'urgent' ? 'text-yellow-700' : 'text-green-700'
                    }`}>
                      {diagnosisResult.urgency === 'emergency' ? getLocalText('emergencyDesc') :
                       diagnosisResult.urgency === 'urgent' ? getLocalText('urgentDesc') : getLocalText('routineDesc')}
                    </p>
                  </div>
                  <button
                    onClick={speakDiagnosis}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    title={getLocalText('listenDiagnosis')}
                  >
                    🔊
                  </button>
                </div>
              </div>

              {/* Diagnosis Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3">📊 {getLocalText('analysisResults')}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">{getLocalText('likelyCondition')}</span>
                      <p className="font-medium">{diagnosisResult.condition}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">{getLocalText('confidenceLevel')}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${diagnosisResult.probability}%` }}
                          />
                        </div>
                        <span className="font-medium">{diagnosisResult.probability}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">{getLocalText('recommendedSpecialist')}</span>
                      <p className="font-medium">{diagnosisResult.specialist}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3">💡 {getLocalText('recommendations')}</h3>
                  <ul className="space-y-2">
                    {diagnosisResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  📅 {getLocalText('bookAppointment')}
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  📞 {getLocalText('callDoctor')}
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  📋 {getLocalText('saveReport')}
                </button>
                <button 
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedSymptoms([]);
                    setDiagnosisResult(null);
                    setPatientInfo({ age: '', gender: '', existingConditions: [], medications: [] });
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  🔄 {getLocalText('newAnalysis')}
                </button>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <h4 className="font-semibold mb-2">⚠️ {getLocalText('importantDisclaimer')}</h4>
                <p>{getLocalText('disclaimerText')}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
