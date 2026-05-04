import { useRef, useState, useEffect } from "react";

export const Ai = () => {
    const [isListening, setIsListening] = useState(false);
    const [replymsg, setReplymsg] = useState("");
    const [transcript, setTranscript] = useState("");
    const wsref = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        wsref.current = new WebSocket("ws://ai-calling-agent-drnt.onrender.com");
        wsref.current.onopen = () => console.log('Connected to AI Server');

        wsref.current.onmessage = (event) => {
            let reply = JSON.parse(event.data);
            if (reply.type === 'youtube') {
                const query = encodeURIComponent(reply.query);
                window.open(`https://www.youtube.com/results?search_query=${query}`);
            }
            if(reply.type==='chrome'){
                const query=encodeURIComponent(reply.query)
                window.open(`https://www.google.com/search?q=${query}`);
            }
            if (reply.type === 'reply') {
                setReplymsg(reply.message);
                speak(reply.message);
            }

        };

        return () => wsref.current.close();
    }, []);
    useEffect(() => {
        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognitionRef.current.lang = "hi-IN";

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);

        recognitionRef.current.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            wsref.current.send(JSON.stringify({ type: "message", text: text }));
        };
    }, [])


    function startMic() {
        recognitionRef.current.start();
    }

    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'hi-IN';
        speech.rate = 1;
        speech.onend = () => {
            recognitionRef.current.start();
            setIsListening(true)
        }
        window.speechSynthesis.speak(speech);
    }

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans text-white">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 blur-[120px] rounded-full"></div>

            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Nexus AI
                    </h1>
                    <p className="text-slate-400 text-sm mt-2">Voice-Activated Assistant</p>
                </div>

                {/* Response Display */}
                <div className="min-h-[120px] flex flex-col justify-center mb-8 bg-black/20 rounded-2xl p-4 border border-white/5">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">AI Response</p>
                    <p className="text-lg font-light leading-relaxed">
                        {replymsg || "Waiting for your command..."}
                    </p>
                </div>

                {/* Transcript Display */}
                {transcript && (
                    <p className="text-sm text-blue-300 italic text-center mb-4 italic">
                        "{transcript}"
                    </p>
                )}

                {/* Controls */}
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={startMic}
                        className={`relative group flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                            }`}
                    >
                        {isListening && (
                            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
                        )}
                        <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m8 0h-8m4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </button>

                    <p className="text-sm text-slate-400">
                        {isListening ? "Listening..." : "Tap to Speak"}
                    </p>
                </div>
            </div>
        </div>
    );
};