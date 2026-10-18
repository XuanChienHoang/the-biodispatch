"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Headphones, Loader2, Volume2 } from "lucide-react";

interface AudioBriefPlayerProps {
  title: string;
  summaryText: string;
  isVi: boolean;
}

/**
 * Widget trình phát bản tin tóm tắt âm thanh (Audio Brief Player).
 * Sử dụng luồng âm thanh tiếng Việt chuẩn tự nhiên qua /api/tts (Google Neural TTS),
 * khắc phục triệt để lỗi giọng đọc tiếng Anh mặc định trên hệ điều hành Windows/iOS.
 */
export function AudioBriefPlayer({ title, summaryText, isVi }: AudioBriefPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const textToRead = `${title}. ${summaryText}`.trim();

  // Dọn dẹp audio khi component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const initAudio = () => {
    if (audioRef.current) return audioRef.current;

    const lang = isVi ? "vi" : "en";
    const src = `/api/tts?text=${encodeURIComponent(textToRead)}&lang=${lang}`;
    const audio = new Audio(src);
    audio.playbackRate = speed;

    audio.onwaiting = () => setIsLoading(true);
    audio.oncanplay = () => setIsLoading(false);
    audio.onplaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    audio.onloadedmetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.onerror = () => {
      setIsLoading(false);
      setIsPlaying(false);
      console.warn("API TTS playback issue, falling back to Web Speech API");
      fallbackWebSpeech();
    };

    audioRef.current = audio;
    return audio;
  };

  const fallbackWebSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = isVi ? "vi-VN" : "en-US";
    utterance.rate = speed;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleTogglePlay = async () => {
    const audio = initAudio();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        audio.playbackRate = speed;
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Play error, trying fallback:", err);
        setIsLoading(false);
        fallbackWebSpeech();
      }
    }
  };

  const handleChangeSpeed = () => {
    const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 1.5 : 1;
    setSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = pct * duration;
    setProgress(pct * 100);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="not-prose my-6 rounded-sm border border-slate-hair bg-paper-tint/90 p-4 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Title and Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`grid h-9 w-9 place-items-center rounded-full text-white shadow-xs transition-colors ${
              isPlaying ? "bg-teal-700 animate-pulse" : "bg-indigo-deep"
            }`}
          >
            <Headphones size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="caps text-[10px] font-bold text-teal-800 tracking-wide">
                AUDIO BRIEF
              </span>
              <span className="rounded bg-teal-100 px-1.5 py-0.2 text-[9px] font-mono text-teal-800 font-semibold">
                {isVi ? "Giọng Tiếng Việt chuẩn" : "Natural Voice"}
              </span>
            </div>
            <h4 className="font-display text-xs sm:text-sm font-bold text-indigo-deep">
              {isVi ? "Nghe bản tin tóm tắt âm thanh" : "Listen to Audio Dispatch Brief"}
            </h4>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          {/* Time display */}
          {duration > 0 && (
            <span className="font-mono text-[11px] text-slate-ink mr-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={handleChangeSpeed}
            title={isVi ? "Tốc độ đọc" : "Playback speed"}
            className="rounded border border-slate-hair bg-paper px-2 py-1 font-mono text-[11px] font-semibold text-slate-ink hover:text-indigo-deep hover:border-indigo-deep cursor-pointer transition-colors"
          >
            {speed}x
          </button>

          {/* Reset button */}
          {(progress > 0 || isPlaying) && (
            <button
              type="button"
              onClick={handleReset}
              title={isVi ? "Phát lại từ đầu" : "Replay"}
              className="grid h-8 w-8 place-items-center rounded border border-slate-hair bg-paper text-slate-ink hover:text-indigo-deep cursor-pointer transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          )}

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            disabled={isLoading}
            className={`flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer ${
              isPlaying ? "bg-amber-700 hover:bg-amber-800" : "bg-teal-800 hover:bg-teal-900"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>{isVi ? "Đang tải..." : "Loading..."}</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause size={14} />
                <span>{isVi ? "Tạm dừng" : "Pause"}</span>
              </>
            ) : (
              <>
                <Play size={14} className="fill-current" />
                <span>{isVi ? "Phát tóm tắt" : "Play Brief"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar (Clickable for Seeking) */}
      <div
        ref={progressBarRef}
        onClick={handleSeek}
        title={isVi ? "Bấm để tua âm thanh" : "Click to seek"}
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-hair cursor-pointer hover:h-2 transition-all"
      >
        <div
          className="h-full bg-teal-600 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
