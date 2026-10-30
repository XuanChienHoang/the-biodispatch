"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Play, Pause, RotateCcw, Headphones, Loader2, UserCheck, Sparkles } from "lucide-react";

interface AudioBriefPlayerProps {
  title: string;
  summaryText: string;
  isVi: boolean;
}

/**
 * Widget trình phát bản tin tóm tắt âm thanh (Audio Brief Player).
 * Sử dụng mô hình Neural AI thế hệ mới (Microsoft Azure Neural TTS v2):
 * - Mặc định: Giọng Nam Minh (vi-VN-NamMinhNeural) / Guy (en-US-GuyNeural)
 * - Tùy chọn chuyển đổi: Hoài My (vi-VN-HoaiMyNeural) / Jenny (en-US-JennyNeural)
 * - Tương thích 100% với iOS Safari & Android Chrome thông qua thẻ <audio playsInline> cố định.
 */
export function AudioBriefPlayer({ title, summaryText, isVi }: AudioBriefPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);
  // Mặc định là giọng Nam Minh ("male") theo yêu cầu
  const [voiceGender, setVoiceGender] = useState<"female" | "male">("male");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadedGenderRef = useRef<"female" | "male" | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const textToRead = useMemo(() => {
    const raw = `${title}. ${summaryText}`
      .replace(/[*_#`~>]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return raw.slice(0, 1600);
  }, [title, summaryText]);

  const buildAudioSrc = useCallback(
    (selectedGender: "female" | "male") => {
      const lang = isVi ? "vi" : "en";
      return `/api/tts?text=${encodeURIComponent(textToRead)}&lang=${lang}&gender=${selectedGender}`;
    },
    [isVi, textToRead]
  );

  // Dọn dẹp audio khi component unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
        audioEl.removeAttribute("src");
        audioEl.load();
      }
    };
  }, []);

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setErrorMsg(null);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsLoading(true);
      const targetSrc = buildAudioSrc(voiceGender);

      // Nếu chưa nạp nguồn âm thanh hoặc vừa đổi giọng đọc, gán src trực tiếp trong gesture click
      if (loadedGenderRef.current !== voiceGender || !audio.getAttribute("src")) {
        audio.src = targetSrc;
        audio.playbackRate = speed;
        loadedGenderRef.current = voiceGender;
        audio.load();
      } else {
        audio.playbackRate = speed;
      }

      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (err: any) {
      console.warn("Audio Brief play error:", err);
      setIsLoading(false);
      setIsPlaying(false);
      setErrorMsg(
        isVi
          ? "Không thể phát âm thanh lúc này. Vui lòng chạm lại để thử."
          : "Unable to play audio right now. Please tap again to retry."
      );
    }
  };

  const handleChangeSpeed = () => {
    const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 1.5 : 1;
    setSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleToggleGender = async () => {
    const nextGender = voiceGender === "male" ? "female" : "male";
    setVoiceGender(nextGender);
    setErrorMsg(null);

    const audio = audioRef.current;
    const wasPlaying = isPlaying;

    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    loadedGenderRef.current = null;

    if (wasPlaying && audio) {
      try {
        setIsLoading(true);
        audio.src = buildAudioSrc(nextGender);
        audio.playbackRate = speed;
        loadedGenderRef.current = nextGender;
        audio.load();
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  };

  const handleReset = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
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
    <div className="not-prose my-6 rounded-sm border border-slate-hair bg-paper-tint/90 p-3.5 sm:p-4 shadow-2xs max-w-full overflow-hidden">
      {/* Thẻ audio vật lý cố định giúp mở khóa âm thanh tức thì trên iOS Safari & Android Chrome */}
      <audio
        ref={audioRef}
        playsInline
        preload="none"
        className="hidden"
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
          setErrorMsg(null);
          if (audioRef.current) {
            audioRef.current.playbackRate = speed;
          }
        }}
        onPause={() => {
          if (audioRef.current && !audioRef.current.seeking) {
            setIsPlaying(false);
          }
        }}
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;
          if (el.duration && !isNaN(el.duration) && isFinite(el.duration)) {
            setDuration(el.duration);
          }
        }}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          setCurrentTime(el.currentTime);
          if (el.duration && !isNaN(el.duration) && isFinite(el.duration)) {
            setDuration(el.duration);
            setProgress((el.currentTime / el.duration) * 100);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(100);
        }}
        onError={() => {
          // Bỏ qua lỗi khi src trống lúc khởi tạo
          if (!loadedGenderRef.current) return;
          setIsLoading(false);
          setIsPlaying(false);
          setErrorMsg(
            isVi
              ? "Kết nối âm thanh gián đoạn. Vui lòng bấm Phát tóm tắt để thử lại."
              : "Audio stream interrupted. Please tap Play Brief to retry."
          );
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Title and Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-white shadow-xs transition-colors ${isPlaying ? "bg-teal-700 animate-pulse" : "bg-indigo-deep"
              }`}
          >
            <Headphones size={16} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="caps text-[10px] font-bold text-teal-800 tracking-wide">
                AUDIO BRIEF
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-teal-100 px-1.5 py-0.2 text-[9px] font-mono text-teal-800 font-semibold">
                <Sparkles size={9} />
                {isVi ? "Azure Neural AI · Tự nhiên" : "Azure Neural AI · Natural"}
              </span>
            </div>
            <h4 className="font-display text-xs sm:text-sm font-bold text-indigo-deep truncate">
              {isVi ? "Nghe bản tin tóm tắt âm thanh" : "Listen to Audio Dispatch Brief"}
            </h4>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Time display */}
            {duration > 0 && (
              <span className="font-mono text-[11px] text-slate-ink mr-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}

            {/* Voice Gender Switcher */}
            <button
              type="button"
              onClick={handleToggleGender}
              title={isVi ? "Đổi giọng đọc Nam / Nữ" : "Switch Male / Female voice"}
              className="flex items-center gap-1 rounded border border-slate-hair bg-paper px-2 py-1 text-[11px] font-medium text-slate-ink hover:text-indigo-deep hover:border-indigo-deep cursor-pointer transition-colors"
            >
              <UserCheck size={11} className="text-teal-700 shrink-0" />
              <span>
                {isVi
                  ? voiceGender === "male"
                    ? "Nam Minh (Nam)"
                    : "Hoài My (Nữ)"
                  : voiceGender === "male"
                    ? "Guy (Male)"
                    : "Jenny (Female)"}
              </span>
            </button>

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
                className="grid h-7 w-7 place-items-center rounded border border-slate-hair bg-paper text-slate-ink hover:text-indigo-deep cursor-pointer transition-colors"
              >
                <RotateCcw size={12} />
              </button>
            )}
          </div>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            disabled={isLoading}
            className={`flex items-center justify-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer ${isPlaying ? "bg-amber-700 hover:bg-amber-800" : "bg-teal-800 hover:bg-teal-900"
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

      {errorMsg && (
        <p className="mt-2 text-[11px] font-medium text-amber-800">{errorMsg}</p>
      )}

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
