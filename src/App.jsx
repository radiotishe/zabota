import { useState, useEffect } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const HABITS = {
  morning: [
    { id: "no_phone_am", emoji: "✨", label: "Не брать телефон сразу", nudge: "Подожди чуточку, солнышко... Дай себе несколько минут просто побыть с собой. Телефон никуда не убежит 🌸", energy: 5 },
    { id: "water", emoji: "💧", label: "Стакан воды", nudge: "Ты проспала столько часов! Твоё тело так хочет водички. Один маленький глоточек — и уже лучше 💙", energy: 5 },
    { id: "vitamin_d", emoji: "💊", label: "Витамин Д", nudge: "Один маленький глоточек солнца в капсуле — и ты позаботилась о себе на весь день 🌸", energy: 5 },
    { id: "bed", emoji: "🛏️", label: "Заправить постель", nudge: "Это займёт ровно две минутки, и ты потом будешь собой гордиться. Просто начни с одной подушки 🤍", energy: 5 },
    { id: "wash", emoji: "🫧", label: "Умыться", nudge: "Прохладная водичка на лице — это как маленький перезапуск. Ты заслуживаешь этого свежего момента 🌊", energy: 5 },
    { id: "teeth", emoji: "🦷", label: "Почистить зубы", nudge: "Такая маленькая забота о себе, а как поднимает настроение! Давай, сделай это для своей улыбки 😊", energy: 5 },
    { id: "dress", emoji: "💍", label: "Нарядиться", nudge: "Оденься как будто тебя ждут хорошие вещи — потому что так и есть. Ты этого достойна каждый день 🌷", energy: 5 },
    { id: "hair", emoji: "🪮", label: "Расчесать волосы", nudge: "Побалуй себя — медленно, с любовью. Это твоё время заботы о себе 💆‍♀️", energy: 5 },
    { id: "yoga", emoji: "🧘🏾‍♀️", label: "Сделать йогу", nudge: "Не нужно идеально. Просто потянись немного. Твоё тело скажет тебе спасибо шёпотом 🌿", energy: 10 },
  ],
  day: [
    { id: "dress_work", emoji: "😻", label: "Нарядиться перед работой", nudge: "Оденься так, будто сегодня что-то хорошее случится — потому что так и будет 🌷", energy: 5 },
    { id: "magnesium_day", emoji: "💊", label: "Магний", nudge: "Маленькая забота о нервной системе прямо сейчас. Ты это заслуживаешь 🌿", energy: 5 },
    { id: "walk", emoji: "🌿", label: "Выйти, прогуляться", nudge: "Свежий воздух и несколько шагов — это уже подарок для твоего тела и головы. Просто выйди на пять минут 🍃", energy: 5 },
    { id: "c1_start", emoji: "🟢", label: "Начать консультацию 1 вовремя", nudge: "Ты готова. Сделай глубокий вдох — и начинай. Всё уже есть внутри тебя 💚", energy: 5 },
    { id: "c1_end", emoji: "🔴", label: "Закончить консультацию 1 вовремя", nudge: "Удержать время — это тоже забота о себе. Ты можешь мягко завершить, и это хорошо 🔵", energy: 5 },
    { id: "c1_notes", emoji: "📝", label: "Заметки после консультации 1", nudge: "Пока всё свежо в памяти — запиши. Это такая забота о будущей себе 📖", energy: 5 },
    { id: "c2_start", emoji: "🟢", label: "Начать консультацию 2 вовремя", nudge: "Ты уже провела одну — и справилась. Эта тоже будет хорошей 🌿", energy: 5 },
    { id: "c2_end", emoji: "🔴", label: "Закончить консультацию 2 вовремя", nudge: "Бережно завершить — это тоже профессионализм и забота 💙", energy: 5 },
    { id: "c2_notes", emoji: "📝", label: "Заметки после консультации 2", nudge: "Ещё раз для будущей себя — она оценит 🌸", energy: 5 },
    { id: "c3_start", emoji: "🔴", label: "Начать консультацию 3 вовремя", nudge: "Последняя — и ты всё ещё здесь, всё ещё заботишься. Это так много значит 🌷", energy: 5 },
    { id: "c3_end", emoji: "🔴", label: "Закончить консультацию 3 вовремя", nudge: "Финишная черта! Завершай мягко и с гордостью — ты прошла весь день 🎉", energy: 5 },
    { id: "c3_notes", emoji: "📝", label: "Заметки после консультации 3", nudge: "Последние заметки — и день завершён. Потом скажешь себе спасибо ✨", energy: 5 },
  ],
  evening: [
    { id: "magnesium_eve", emoji: "💊", label: "Магний х2", nudge: "Последняя забота о теле перед сном. Магний поможет расслабиться и лучше спать 🌙", energy: 5 },
    { id: "tidy", emoji: "🧹", label: "Немного прибраться", nudge: "Не всё, просто чуть-чуть. Один уголок. Ты заслуживаешь входить в чистое пространство утром 🏡", energy: 5 },
    { id: "teeth_eve", emoji: "🦷", label: "Почистить зубы", nudge: "Последняя маленькая забота о себе перед сном. Твоя улыбка заслуживает этого 😊", energy: 5 },
    { id: "face", emoji: "🧴", label: "Уход за лицом", nudge: "Этот ритуал — только для тебя. Медленно, с любовью. Ты это заслужила сегодня 🌹", energy: 5 },
    { id: "yin_yoga", emoji: "🕯️", label: "Yin Yoga", nudge: "Мягко, медленно, без усилий. Просто позволь телу расслабиться 🌙", energy: 10 },
    { id: "hair_eve", emoji: "🪄", label: "Расчесаться на ночь", nudge: "Последний момент заботы о себе перед сном. Медленно и ласково — ты это заслужила 💜", energy: 5 },
    { id: "no_phone_pm", emoji: "📵", label: "Отложить телефон", nudge: "Ты сделала достаточно на сегодня. Дай своей голове отдохнуть. Мир подождёт до утра 💜", energy: 10 },
  ],
};

const CONSULT_IDS = ["c1_start","c1_end","c1_notes","c2_start","c2_end","c2_notes","c3_start","c3_end","c3_notes"];

const SECTIONS = {
  morning: { label: "Утро", icon: "🦋", color: "#42a5f5" },
  day:     { label: "День", icon: "☀️",  color: "#ef6c00" },
  evening: { label: "Вечер", icon: "🌌", color: "#7b1fa2" },
};

const MAXIM_MARKERS = [
  { id: "was_myself", emoji: "👑", label: "Была собой",              type: "happy" },
  { id: "boundary",  emoji: "🛡️", label: "Удержала границу",        type: "happy" },
  { id: "took_care", emoji: "💛", label: "Позаботилась о себе",      type: "happy" },
  { id: "felt_good", emoji: "✨", label: "Было хорошо между нами",   type: "happy" },
  { id: "no_contact",emoji: "🤍", label: "Не виделись сегодня",      type: "neutral" },
  { id: "fight",     emoji: "🌩️", label: "В ссоре",                  type: "neutral2" },
  { id: "felt_anxiety",emoji:"😶\u200d🌫️",label:"Почувствовала тревогу",  type: "sad" },
  { id: "yielded",   emoji: "🌊", label: "Уступила себе в ущерб",    type: "sad" },
];

const ENERGY_MSGS = [
  { min: 0,   msg: "Привет, солнышко ♥️" },
  { min: 20,  msg: "Уже начинаешь цвести 🌸 Так держать!" },
  { min: 40,  msg: "Ты набираешь силу 💫 Посмотри, как ты стараешься" },
  { min: 60,  msg: "Ты сияешь сегодня ✨ Вот это ты молодец!" },
  { min: 80,  msg: "Ты просто огонь 🔥 Гордись собой!" },
  { min: 100, msg: "Ты — суперзвезда 🌟 Этот день полностью твой!" },
];

const ALL_HABITS = Object.values(HABITS).flat();
const TOTAL_ENERGY = ALL_HABITS.reduce((s, h) => s + h.energy, 0);

// ── DATE HELPERS ─────────────────────────────────────────────────────────────

function localDateKey(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

function calcCycleDay(startStr) {
  if (!startStr) return null;
  const [y, m, d] = startStr.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / 86400000) + 1;
  return diff > 0 ? diff : null;
}

function getCyclePhase(day) {
  if (!day) return null;
  if (day <= 5)  return { label: "Менструация",   color: "#c2185b", emoji: "🌹" };
  if (day <= 13) return { label: "Фолликулярная", color: "#f9a825", emoji: "🌱" };
  if (day <= 16) return { label: "Овуляция",      color: "#e91e8c", emoji: "🌸" };
  return           { label: "Лютеиновая",    color: "#7b1fa2", emoji: "🌙" };
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function NudgeModal({ habit, onConfirm, onCancel, onCancelled, isConsult }) {
  return (
    <div onClick={onCancel} style={{ position:"fixed", inset:0, background:"rgba(30,20,50,0.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:"24px", backdropFilter:"blur(6px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"linear-gradient(135deg,#fff9f0,#fce4ec)", borderRadius:"28px", padding:"36px 32px", maxWidth:"380px", width:"100%", boxShadow:"0 20px 60px rgba(180,80,120,0.2)", textAlign:"center", border:"1.5px solid rgba(255,180,200,0.4)", animation:"popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)", position:"relative" }}>
        <button onClick={onCancel} style={{ position:"absolute", top:"14px", right:"18px", background:"none", border:"none", fontSize:"22px", color:"#c07090", cursor:"pointer" }}>×</button>
        <div style={{ fontSize:"52px", marginBottom:"12px" }}>{habit.emoji}</div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px", color:"#6d2b5e", marginBottom:"16px", fontWeight:700 }}>{habit.label}</div>
        <p style={{ fontSize:"16px", color:"#5d3a5a", lineHeight:1.7, marginBottom:"28px" }}>{habit.nudge}</p>
        <div style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onCancel} style={{ background:"rgba(220,180,210,0.3)", color:"#9c5080", border:"1.5px solid rgba(220,180,210,0.5)", borderRadius:"50px", padding:"12px 20px", fontSize:"14px", fontWeight:700, cursor:"pointer" }}>Потом</button>
          {isConsult && <button onClick={onCancelled} style={{ background:"rgba(150,150,150,0.15)", color:"#888", border:"1.5px solid rgba(150,150,150,0.3)", borderRadius:"50px", padding:"12px 20px", fontSize:"14px", fontWeight:700, cursor:"pointer" }}>Отменили</button>}
          <button onClick={onConfirm} style={{ background:"linear-gradient(135deg,#e91e8c,#9c27b0)", color:"#fff", border:"none", borderRadius:"50px", padding:"12px 28px", fontSize:"15px", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px rgba(233,30,140,0.35)" }}>Сделаю! 💪</button>
        </div>
      </div>
    </div>
  );
}

function HistoryView({ onClose }) {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("selfcare_")) keys.push(k.replace("selfcare_", ""));
  }
  keys.sort((a, b) => b.localeCompare(a));

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(30,20,50,0.6)", display:"flex", alignItems:"flex-start", justifyContent:"center", zIndex:200, padding:"24px", backdropFilter:"blur(8px)", overflowY:"auto" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"linear-gradient(135deg,#fff9f0,#f3e8ff)", borderRadius:"28px", padding:"32px 24px", maxWidth:"500px", width:"100%", boxShadow:"0 20px 60px rgba(100,20,120,0.2)", marginTop:"20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"22px", color:"#6d2b5e", fontWeight:700 }}>История</div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:"24px", color:"#c07090", cursor:"pointer" }}>×</button>
        </div>
        {keys.length === 0 && <p style={{ color:"#9c5080", textAlign:"center" }}>Пока нет записей 🌱</p>}
        {keys.map(dateKey => {
          const data = JSON.parse(localStorage.getItem("selfcare_" + dateKey) || "{}");
          const pct = Math.round((ALL_HABITS.filter(h => data.checked?.[h.id]).reduce((s,h) => s+h.energy, 0) / TOTAL_ENERGY) * 100);
          const markers = MAXIM_MARKERS.filter(m => data.maximMarkers?.[m.id]);
          return (
            <div key={dateKey} style={{ background:"rgba(255,255,255,0.7)", borderRadius:"18px", padding:"16px 18px", marginBottom:"12px", border:"1.5px solid rgba(220,180,220,0.4)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <div style={{ fontWeight:700, color:"#6d2b5e", fontSize:"15px" }}>
                  {formatKey(dateKey)}
                  {data.cycleDay && <span style={{ marginLeft:"8px", fontSize:"12px", color:"#9c5080", fontWeight:400 }}>день {data.cycleDay}</span>}
                </div>
                <div style={{ background:"linear-gradient(135deg,#e91e8c,#9c27b0)", color:"#fff", borderRadius:"50px", padding:"3px 12px", fontSize:"13px", fontWeight:700 }}>{pct}% ✨</div>
              </div>
              {markers.length > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"6px" }}>
                  {markers.map(m => <span key={m.id} style={{ background:"rgba(233,30,140,0.08)", color:"#9c5080", borderRadius:"50px", padding:"2px 10px", fontSize:"12px" }}>{m.emoji} {m.label}</span>)}
                </div>
              )}
              {data.maximNote && <div style={{ fontSize:"13px", color:"#7b4a9a", fontStyle:"italic", borderTop:"1px solid rgba(220,180,220,0.3)", paddingTop:"6px", marginTop:"6px" }}>📝 {data.maximNote}</div>}
              {data.diary && <div style={{ fontSize:"13px", color:"#5d3a5a", borderTop:"1px solid rgba(220,180,220,0.3)", paddingTop:"6px", marginTop:"6px" }}>🌙 {data.diary}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

export default function App() {
  const TODAY = localDateKey(0);
  const TOMORROW = localDateKey(1);

  const [checked, setChecked]           = useState({});
  const [cancelled, setCancelled]        = useState({});
  const [nudge, setNudge]               = useState(null);
  const [bigTask, setBigTask]           = useState("");
  const [bigDone, setBigDone]           = useState(false);
  const [urgentTask, setUrgentTask]     = useState("");
  const [urgentDone, setUrgentDone]     = useState(false);
  const [smallTasks, setSmallTasks]     = useState(["","",""]);
  const [smallDone, setSmallDone]       = useState([false,false,false]);
  const [diary, setDiary]               = useState("");
  const [diarySubmitted, setDiarySubmitted] = useState(false);
  const [section, setSection]           = useState("morning");
  const [isOff, setIsOff]               = useState(false);
  const [maximMarkers, setMaximMarkers] = useState({});
  const [maximNote, setMaximNote]       = useState("");
  const [maximHappyNote, setMaximHappyNote] = useState("");
  const [maximSadNote, setMaximSadNote] = useState("");
  const [tab, setTab]                   = useState("today");
  const [tmrBig, setTmrBig]             = useState("");
  const [tmrSmall, setTmrSmall]         = useState(["","",""]);
  const [cycleStart, setCycleStart]     = useState("");
  const [showCycleEdit, setShowCycleEdit] = useState(false);
  const [showHistory, setShowHistory]   = useState(false);
  const [bankInput, setBankInput]       = useState("");
  const [taskBank, setTaskBank]         = useState([]);
  const [customHappy, setCustomHappy]   = useState([]);
  const [customSad, setCustomSad]       = useState([]);
  const [happyInput, setHappyInput]     = useState("");
  const [sadInput, setSadInput]         = useState("");

  useEffect(() => {
    // Load today — only if dateKey matches
    try {
      const raw = localStorage.getItem("selfcare_" + TODAY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.dateKey === TODAY) {
          if (s.checked)              setChecked(s.checked);
          if (s.cancelled)            setCancelled(s.cancelled);
          if (s.bigTask !== undefined) setBigTask(s.bigTask);
          if (s.bigDone !== undefined) setBigDone(s.bigDone);
          if (s.urgentTask !== undefined) setUrgentTask(s.urgentTask);
          if (s.urgentDone !== undefined) setUrgentDone(s.urgentDone);
          if (s.smallTasks)           setSmallTasks(s.smallTasks);
          if (s.smallDone)            setSmallDone(s.smallDone);
          if (s.diary !== undefined)  setDiary(s.diary);
          if (s.diarySubmitted !== undefined) setDiarySubmitted(s.diarySubmitted);
          if (s.isOff !== undefined)  setIsOff(s.isOff);
          if (s.maximMarkers)         setMaximMarkers(s.maximMarkers);
          if (s.maximNote !== undefined)      setMaximNote(s.maximNote);
          if (s.maximHappyNote !== undefined) setMaximHappyNote(s.maximHappyNote);
          if (s.maximSadNote !== undefined)   setMaximSadNote(s.maximSadNote);
          if (s.customHappy)  setCustomHappy(s.customHappy);
          if (s.customSad)    setCustomSad(s.customSad);
        } else {
          // New day — load yesterday's "tomorrow" tasks as today's tasks
          const yesterday = localDateKey(-1);
          try {
            const yraw = localStorage.getItem("selfcare_" + yesterday);
            if (yraw) {
              const y = JSON.parse(yraw);
              // yesterday's tomorrow tasks become today
              const tmrKey = "selfcare_tmr_tasks";
              const tmrRaw = localStorage.getItem(tmrKey);
              if (tmrRaw) {
                const tmr = JSON.parse(tmrRaw);
                if (tmr.bigTask !== undefined) setBigTask(tmr.bigTask);
                if (tmr.smallTasks) setSmallTasks(tmr.smallTasks);
              }
            }
          } catch {}
        }
      }
    } catch {}

    // Load tomorrow planned tasks
    try {
      const tmrKey = "selfcare_tmr_tasks";
      const t = JSON.parse(localStorage.getItem(tmrKey) || "{}");
      if (t.bigTask !== undefined) setTmrBig(t.bigTask);
      if (t.smallTasks)            setTmrSmall(t.smallTasks);
    } catch {}

    // Task bank (persistent)
    try {
      const b = JSON.parse(localStorage.getItem("task_bank") || "[]");
      setTaskBank(b);
    } catch {}

    // Cycle (persistent)
    const cs = localStorage.getItem("cycle_start");
    if (cs) setCycleStart(cs);
  }, []);

  const save = (patch) => {
    // Always read the current saved record first, then merge patch on top.
    // This avoids stale-closure bugs where React state hasn't updated yet.
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem("selfcare_" + TODAY) || "{}"); } catch { return {}; }
    })();
    const cycleDay = calcCycleDay(cycleStart);
    const cur = { ...existing, dateKey: TODAY, cycleDay, ...patch };
    localStorage.setItem("selfcare_" + TODAY, JSON.stringify(cur));
  };

  const saveTmr = (patch) => {
    const cur = JSON.parse(localStorage.getItem("selfcare_tmr_tasks") || "{}");
    localStorage.setItem("selfcare_tmr_tasks", JSON.stringify({ ...cur, ...patch }));
  };

  const saveBank = (next) => localStorage.setItem("task_bank", JSON.stringify(next));

  const saveCycle = (val) => {
    setCycleStart(val);
    localStorage.setItem("cycle_start", val);
    save({ cycleDay: calcCycleDay(val) });
  };

  const cycleDay   = calcCycleDay(cycleStart);
  const cyclePhase = getCyclePhase(cycleDay);

  const visHabits = (sec) => sec === "day" && isOff
    ? HABITS.day.filter(h => !CONSULT_IDS.includes(h.id))
    : HABITS[sec];

  const earnedEnergy  = ALL_HABITS.filter(h => checked[h.id]).reduce((s, h) => s + h.energy, 0);
  const energyPct     = Math.round((earnedEnergy / TOTAL_ENERGY) * 100);
  const energyMsg     = [...ENERGY_MSGS].reverse().find(m => energyPct >= m.min);

  const handleCheck = (habit) => {
    if (checked[habit.id] || cancelled[habit.id]) {
      const nc = { ...checked }; delete nc[habit.id];
      const ncan = { ...cancelled }; delete ncan[habit.id];
      setChecked(nc); setCancelled(ncan);
      save({ checked: nc, cancelled: ncan });
    } else {
      const next = { ...checked, [habit.id]: true };
      setChecked(next);
      save({ checked: next });
    }
  };

  const openNudge = (e, habit) => {
    e.stopPropagation();
    setNudge(habit);
  };

  const confirmNudge = () => {
    const next = { ...checked, [nudge.id]: true };
    setChecked(next);
    save({ checked: next });
    setNudge(null);
  };

  const confirmCancelled = () => {
    const next = { ...cancelled, [nudge.id]: true };
    setCancelled(next);
    save({ cancelled: next });
    setNudge(null);
  };

  const toggleMaxim = (id) => {
    const next = { ...maximMarkers, [id]: !maximMarkers[id] };
    setMaximMarkers(next);
    save({ maximMarkers: next });
  };

  const addToBank = () => {
    if (!bankInput.trim()) return;
    const undone = taskBank.filter(t => !t.done);
    if (undone.length >= 5) return;
    const next = [...taskBank, { id: Date.now(), text: bankInput.trim(), done: false }];
    setTaskBank(next); setBankInput(""); saveBank(next);
  };
  const toggleBank = (id) => {
    const next = taskBank.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTaskBank(next); saveBank(next);
  };
  const exportData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `selfcare-backup-${localDateKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
        window.location.reload();
      } catch { alert("Файл повреждён"); }
    };
    reader.readAsText(file);
  };

  const removeBank = (id) => {
    const next = taskBank.filter(t => t.id !== id);
    setTaskBank(next); saveBank(next);
  };

  const TAB = (active, color) => ({
    padding: "10px 18px", borderRadius: "50px", border: "2px solid",
    borderColor: active ? color : "rgba(180,120,180,0.25)",
    background: active ? color : "rgba(255,255,255,0.7)",
    color: active ? "#fff" : "#9c5080",
    fontWeight: 700, fontSize: "14px", cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: active ? `0 4px 16px ${color}44` : "none",
  });

  const happyCount = MAXIM_MARKERS.filter(m => m.type === "happy" && maximMarkers[m.id]).length + customHappy.length;
  const sadCount   = MAXIM_MARKERS.filter(m => m.type === "sad"   && maximMarkers[m.id]).length + customSad.length;

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#fff1f8 0%,#f3e8ff 50%,#e8f4fd 100%)", fontFamily:"'Lato',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@300;400;700&display=swap');
        @keyframes popIn  { from { transform:scale(0.7); opacity:0 } to { transform:scale(1); opacity:1 } }
        @keyframes fadeUp { from { transform:translateY(16px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-thumb { background:#e9a0c7; border-radius:10px; }
        textarea, input { outline:none; font-family:'Lato',sans-serif; }
      `}</style>

      {nudge && <NudgeModal habit={nudge} onConfirm={confirmNudge} onCancel={() => setNudge(null)} onCancelled={confirmCancelled} isConsult={CONSULT_IDS.includes(nudge.id)} />}
      {showHistory && <HistoryView onClose={() => setShowHistory(false)} />}

      {/* кнопка наверх — на всех страницах */}
      <button onClick={() => window.scrollTo({top:0, behavior:"smooth"})}
        style={{ position:"fixed", top:"75%", right:"4px", transform:"translateY(-50%)", background:"none", border:"none", color:"#f5eef5", fontSize:"24px", cursor:"pointer", zIndex:50, padding:"8px" }}>
        ↑
      </button>

      {/* ── HEADER ── */}
      <div style={{ textAlign:"center", padding:"36px 20px 22px", background:"linear-gradient(135deg,#fce4ec,#f3e5f5)", borderBottom:"1.5px solid rgba(233,160,199,0.3)" }}>

        {/* date + cycle badge */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", marginBottom:"10px", flexWrap:"wrap" }}>
          <span style={{ fontSize:"13px", color:"#b06090", letterSpacing:"2px", textTransform:"uppercase" }}>
            {new Date().toLocaleDateString("ru-RU", { weekday:"long", day:"numeric", month:"long" })}
          </span>
          {cycleDay && cyclePhase
            ? <div onClick={() => setShowCycleEdit(!showCycleEdit)} style={{ display:"flex", alignItems:"center", gap:"5px", background:"rgba(255,255,255,0.6)", border:`1.5px solid ${cyclePhase.color}44`, borderRadius:"50px", padding:"3px 12px", cursor:"pointer" }}>
                <span style={{ fontSize:"14px" }}>{cyclePhase.emoji}</span>
                <span style={{ fontSize:"12px", color:cyclePhase.color, fontWeight:700 }}>День {cycleDay} · {cyclePhase.label}</span>
              </div>
            : <div onClick={() => setShowCycleEdit(!showCycleEdit)} style={{ fontSize:"12px", color:"#b06090", cursor:"pointer", background:"rgba(255,255,255,0.5)", borderRadius:"50px", padding:"3px 12px", border:"1px dashed rgba(180,120,180,0.4)" }}>
                🌸 Добавить день цикла
              </div>
          }
        </div>

        {showCycleEdit && (
          <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"16px", padding:"14px 18px", maxWidth:"320px", margin:"0 auto 12px", border:"1.5px solid rgba(220,180,220,0.4)", animation:"fadeUp 0.2s both" }}>
            <div style={{ fontSize:"13px", color:"#6d2b5e", fontWeight:700, marginBottom:"8px" }}>Первый день последней менструации</div>
            <input type="date" value={cycleStart} onChange={e => saveCycle(e.target.value)}
              style={{ width:"100%", border:"1.5px solid rgba(220,180,220,0.5)", borderRadius:"10px", padding:"8px 12px", fontSize:"14px", color:"#5d3a5a", background:"rgba(255,250,255,0.9)" }} />
            <button onClick={() => setShowCycleEdit(false)} style={{ marginTop:"8px", fontSize:"12px", color:"#9c5080", background:"none", border:"none", cursor:"pointer", textDecoration:"underline" }}>готово</button>
          </div>
        )}

        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,6vw,40px)", color:"#6d2b5e", fontWeight:900, lineHeight:1.1, marginBottom:"8px" }}>
          Моя энергия сегодня
        </h1>
        <p style={{ color:"#9c5080", fontSize:"16px" }}>{energyMsg?.msg}</p>

        {/* energy bar */}
        <div style={{ margin:"18px auto 0", maxWidth:"400px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
            <span style={{ color:"#b06090", fontSize:"13px" }}>0%</span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"22px", color:"#7b2d6e" }}>{energyPct}% ✨</span>
            <span style={{ color:"#b06090", fontSize:"13px" }}>100%</span>
          </div>
          <div style={{ background:"rgba(233,160,199,0.3)", borderRadius:"50px", height:"16px", overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:"50px", background:"linear-gradient(90deg,#e91e8c,#9c27b0,#673ab7)", width:energyPct+"%", transition:"width 0.6s cubic-bezier(0.34,1.2,0.64,1)", boxShadow:"0 2px 12px rgba(233,30,140,0.4)" }} />
          </div>
        </div>

        <button onClick={() => setShowHistory(true)} style={{ marginTop:"14px", background:"rgba(255,255,255,0.6)", border:"1.5px solid rgba(220,180,220,0.5)", borderRadius:"50px", padding:"7px 18px", color:"#9c5080", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>
          История
        </button>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth:"620px", margin:"0 auto", padding:"24px 16px 120px" }}>

        {/* main tabs */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"24px", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => setTab("today")}    style={TAB(tab==="today",    "#e91e8c")}>🌸 Сегодня</button>
          <button onClick={() => setTab("tomorrow")} style={TAB(tab==="tomorrow", "#7b2d9e")}>🌙 Завтра</button>
          <button onClick={() => setTab("maxim")}    style={TAB(tab==="maxim",    "#c2185b")}>💛 Максим</button>
        </div>

        {/* ══════════════ TODAY ══════════════ */}
        {tab === "today" && (
          <>
            {/* day-off toggle */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"18px", background:"rgba(255,255,255,0.7)", borderRadius:"16px", padding:"13px 18px", border:"1.5px solid rgba(220,180,220,0.35)" }}>
              <span style={{ fontSize:"14px", color:"#6d2b5e", fontWeight:700, flex:1 }}>🏖️ Сегодня у меня выходной</span>
              <div onClick={() => { setIsOff(!isOff); save({ isOff: !isOff }); }}
                style={{ width:"48px", height:"26px", borderRadius:"50px", cursor:"pointer", transition:"background 0.3s", background:isOff?"linear-gradient(135deg,#e91e8c,#9c27b0)":"rgba(220,180,210,0.4)", position:"relative" }}>
                <div style={{ position:"absolute", top:"3px", left:isOff?"24px":"3px", width:"20px", height:"20px", borderRadius:"50%", background:"#fff", transition:"left 0.3s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
            </div>

            {/* section tabs */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"18px", justifyContent:"center" }}>
              {Object.entries(SECTIONS).map(([key, s]) => (
                <button key={key} onClick={() => setSection(key)} style={{
                  padding:"9px 14px", borderRadius:"50px", border:"2px solid",
                  borderColor: section===key ? s.color : "rgba(180,120,180,0.25)",
                  background: section===key ? s.color : "rgba(255,255,255,0.7)",
                  color: section===key ? "#fff" : "#9c5080",
                  fontWeight:700, fontSize:"13px", cursor:"pointer", transition:"all 0.2s",
                }}>
                  {s.icon} {s.label} <span style={{ fontSize:"11px", opacity:0.85 }}>{visHabits(key).filter(h => checked[h.id]).length}/{visHabits(key).length}</span>
                </button>
              ))}
            </div>

            {/* habit tiles */}
            <div style={{ display:"grid", gap:"10px", marginBottom:"26px" }}>
              {visHabits(section).map((habit, i) => (
                <div key={habit.id} onClick={() => handleCheck(habit)} style={{
                  background: checked[habit.id] ? "linear-gradient(135deg,rgba(233,30,140,0.12),rgba(156,39,176,0.12))" : cancelled[habit.id] ? "rgba(200,200,200,0.2)" : "rgba(255,255,255,0.75)",
                  border: `2px solid ${checked[habit.id] ? "#e91e8c" : cancelled[habit.id] ? "rgba(150,150,150,0.4)" : "rgba(220,180,220,0.4)"}`,
                  borderRadius:"18px", padding:"15px 18px", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:"12px",
                  transition:"all 0.2s", backdropFilter:"blur(6px)",
                  animation:`fadeUp 0.3s ${i*0.04}s both`,
                  opacity: cancelled[habit.id] ? 0.5 : 1,
                }}>
                  <div style={{ width:"42px", height:"42px", borderRadius:"12px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px",
                    background: checked[habit.id] ? "linear-gradient(135deg,#e91e8c,#9c27b0)" : cancelled[habit.id] ? "rgba(150,150,150,0.2)" : "rgba(233,160,199,0.2)", transition:"all 0.2s" }}>
                    {checked[habit.id] ? "✓" : cancelled[habit.id] ? "✕" : habit.emoji}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:"14px", color: checked[habit.id] ? "#7b2d6e" : cancelled[habit.id] ? "#999" : "#5d3a5a", textDecoration: checked[habit.id] || cancelled[habit.id] ? "line-through" : "none", opacity: checked[habit.id] ? 0.75 : 1 }}>{habit.label}</div>
                    <div style={{ fontSize:"11px", color:"#b06090", marginTop:"2px" }}>+{habit.energy}% энергии</div>
                  </div>
                  {!checked[habit.id] && !cancelled[habit.id] && (
                    <div onClick={e => openNudge(e, habit)} style={{ fontSize:"11px", color:"#e91e8c", fontWeight:700, background:"rgba(233,30,140,0.1)", padding:"3px 10px", borderRadius:"50px", whiteSpace:"nowrap", cursor:"pointer" }}>уговори меня</div>
                  )}
                </div>
              ))}
              {isOff && section==="day" && (
                <div style={{ textAlign:"center", padding:"12px", color:"#b06090", fontSize:"14px", fontStyle:"italic" }}>
                  🏖️ Консультации сегодня отдыхают вместе с тобой
                </div>
              )}
            </div>

            {/* big task */}
            <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"22px", padding:"20px", marginBottom:"12px", border:"2px solid rgba(156,39,176,0.2)", backdropFilter:"blur(8px)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#6d2b5e", marginBottom:"10px", fontWeight:700 }}>🎯 Одна большая задача</div>
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                <input value={bigTask} onChange={e => { setBigTask(e.target.value); save({ bigTask:e.target.value }); }} placeholder="Что важного сегодня?.."
                  style={{ flex:1, border:"1.5px solid rgba(220,180,220,0.5)", borderRadius:"12px", padding:"10px 14px", fontSize:"14px", color:"#5d3a5a", background:"rgba(255,250,255,0.8)", textDecoration:bigDone?"line-through":"none", opacity:bigDone?0.6:1 }} />
                <button onClick={() => { setBigDone(!bigDone); save({ bigDone:!bigDone }); }}
                  style={{ width:"42px", height:"42px", borderRadius:"12px", border:"none", background:bigDone?"linear-gradient(135deg,#e91e8c,#9c27b0)":"rgba(233,160,199,0.25)", color:bigDone?"#fff":"#b06090", fontSize:"17px", cursor:"pointer", transition:"all 0.2s", flexShrink:0 }}>
                  {bigDone ? "✓" : "○"}
                </button>
              </div>
            </div>

            {/* urgent */}
            <div style={{ background:"linear-gradient(135deg,rgba(211,47,47,0.06),rgba(233,30,140,0.06))", borderRadius:"22px", padding:"20px", marginBottom:"12px", border:"2px solid rgba(211,47,47,0.25)", backdropFilter:"blur(8px)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#b71c1c", marginBottom:"10px", fontWeight:700 }}>🔥 Срочно</div>
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                <input value={urgentTask} onChange={e => { setUrgentTask(e.target.value); save({ urgentTask:e.target.value }); }} placeholder="Что нельзя откладывать?.."
                  style={{ flex:1, border:"1.5px solid rgba(211,47,47,0.3)", borderRadius:"12px", padding:"10px 14px", fontSize:"14px", color:"#5d3a5a", background:"rgba(255,250,250,0.9)", textDecoration:urgentDone?"line-through":"none", opacity:urgentDone?0.55:1 }} />
                <button onClick={() => { setUrgentDone(!urgentDone); save({ urgentDone:!urgentDone }); }}
                  style={{ width:"42px", height:"42px", borderRadius:"12px", border:"none", background:urgentDone?"linear-gradient(135deg,#d32f2f,#e91e8c)":"rgba(211,47,47,0.12)", color:urgentDone?"#fff":"#d32f2f", fontSize:"17px", cursor:"pointer", transition:"all 0.2s", flexShrink:0 }}>
                  {urgentDone ? "✓" : "○"}
                </button>
              </div>
            </div>

            {/* small tasks */}
            <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"22px", padding:"20px", marginBottom:"12px", border:"2px solid rgba(233,30,140,0.15)", backdropFilter:"blur(8px)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#6d2b5e", marginBottom:"10px", fontWeight:700 }}>🌸 Три маленькие задачки</div>
              {smallTasks.map((task, i) => (
                <div key={i} style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"8px" }}>
                  <button onClick={() => { const n=[...smallDone]; n[i]=!n[i]; setSmallDone(n); save({ smallDone:n }); }}
                    style={{ width:"32px", height:"32px", borderRadius:"9px", border:"none", background:smallDone[i]?"linear-gradient(135deg,#e91e8c,#9c27b0)":"rgba(233,160,199,0.25)", color:smallDone[i]?"#fff":"#b06090", fontSize:"13px", cursor:"pointer", flexShrink:0, transition:"all 0.2s" }}>
                    {smallDone[i] ? "✓" : i+1}
                  </button>
                  <input value={task} onChange={e => { const n=[...smallTasks]; n[i]=e.target.value; setSmallTasks(n); save({ smallTasks:n }); }}
                    placeholder={["Что-то лёгкое...","Что-то приятное...","Что-то полезное..."][i]}
                    style={{ flex:1, border:"1.5px solid rgba(220,180,220,0.4)", borderRadius:"10px", padding:"9px 12px", fontSize:"13px", color:"#5d3a5a", background:"rgba(255,250,255,0.8)", textDecoration:smallDone[i]?"line-through":"none", opacity:smallDone[i]?0.6:1 }} />
                </div>
              ))}
            </div>

            {/* diary */}
            <div style={{ background:"linear-gradient(135deg,rgba(103,58,183,0.08),rgba(156,39,176,0.08))", borderRadius:"22px", padding:"20px", marginBottom:"12px", border:"2px solid rgba(103,58,183,0.2)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#4a1a6e", marginBottom:"6px", fontWeight:700 }}>🌙 Хорошее о себе сегодня</div>
              <p style={{ fontSize:"12px", color:"#7b4a9a", marginBottom:"10px", fontStyle:"italic" }}>За что ты можешь себя похвалить?</p>
              {!diarySubmitted
                ? <>
                    <textarea value={diary} onChange={e => { setDiary(e.target.value); save({ diary:e.target.value }); }} placeholder="Я сегодня молодец, потому что..." rows={3}
                      style={{ width:"100%", border:"1.5px solid rgba(156,39,176,0.3)", borderRadius:"12px", padding:"11px 13px", fontSize:"13px", color:"#4a1a6e", background:"rgba(255,250,255,0.9)", resize:"none", lineHeight:1.6 }} />
                    <button onClick={() => { setDiarySubmitted(true); save({ diarySubmitted:true }); }}
                      style={{ marginTop:"10px", width:"100%", background:"linear-gradient(135deg,#673ab7,#9c27b0)", color:"#fff", border:"none", borderRadius:"14px", padding:"12px", fontSize:"14px", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(103,58,183,0.3)" }}>
                      Сохранить и обнять себя 🤗
                    </button>
                  </>
                : <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:"12px", padding:"13px", border:"1.5px solid rgba(156,39,176,0.2)", animation:"fadeUp 0.4s both" }}>
                    <p style={{ fontSize:"13px", color:"#4a1a6e", lineHeight:1.7, marginBottom:"8px" }}>{diary}</p>
                    <p style={{ fontSize:"12px", color:"#9c27b0", fontStyle:"italic" }}>✨ Ты замечательная. Спокойной ночи, солнышко 🌙</p>
                    <button onClick={() => setDiarySubmitted(false)} style={{ marginTop:"6px", fontSize:"11px", color:"#9c5080", background:"none", border:"none", cursor:"pointer", textDecoration:"underline" }}>изменить</button>
                  </div>
              }
            </div>

            {/* task bank */}
            <div style={{ background:"linear-gradient(135deg,rgba(33,150,243,0.05),rgba(103,58,183,0.05))", borderRadius:"22px", padding:"20px", border:"2px solid rgba(33,150,243,0.18)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#1a237e", marginBottom:"4px", fontWeight:700 }}>📋 Банк задач</div>
              <p style={{ fontSize:"12px", color:"#5c6bc0", marginBottom:"12px", fontStyle:"italic" }}>Всё что висит и ждёт — сюда 🌿</p>
              <div style={{ display:"flex", gap:"8px", marginBottom:taskBank.length?"12px":"0" }}>
                <input value={bankInput} onChange={e => setBankInput(e.target.value)} onKeyDown={e => { if(e.key==="Enter") { addToBank(); } }} placeholder="Добавить задачу и нажать Enter..."
                  style={{ width:"100%", border:"1.5px solid rgba(33,150,243,0.3)", borderRadius:"10px", padding:"9px 12px", fontSize:"16px", color:"#1a237e", background:"rgba(255,250,255,0.9)" }} />
              </div>
              {taskBank.length > 0 && (
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  {taskBank.map(item => (
                    <div key={item.id} style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.7)", borderRadius:"10px", padding:"8px 12px", border:`1px solid ${item.done?"rgba(103,58,183,0.2)":"rgba(33,150,243,0.15)"}` }}>
                      <button onClick={() => toggleBank(item.id)} style={{ width:"24px", height:"24px", borderRadius:"6px", border:"none", background:item.done?"linear-gradient(135deg,#1565c0,#673ab7)":"rgba(33,150,243,0.15)", color:item.done?"#fff":"#5c6bc0", fontSize:"12px", cursor:"pointer", flexShrink:0, transition:"all 0.2s" }}>{item.done?"✓":"○"}</button>
                      <span style={{ flex:1, fontSize:"13px", color:item.done?"#9c9cbe":"#1a237e", textDecoration:item.done?"line-through":"none", opacity:item.done?0.6:1 }}>{item.text}</span>
                      <button onClick={() => removeBank(item.id)} style={{ background:"none", border:"none", color:"#9090b0", cursor:"pointer", fontSize:"16px", lineHeight:1, flexShrink:0 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* backup — скрыто внизу */}
            <div style={{ marginTop:"32px", paddingTop:"16px", borderTop:"1px solid rgba(220,180,220,0.25)", display:"flex", gap:"8px", justifyContent:"center", opacity:0.45 }}>
              <button onClick={exportData} style={{ background:"none", border:"none", color:"#b06090", fontSize:"11px", cursor:"pointer" }}>
                💾 Скачать данные
              </button>
              <span style={{ color:"#d0aac0", fontSize:"11px" }}>·</span>
              <label style={{ color:"#b06090", fontSize:"11px", cursor:"pointer" }}>
                📂 Загрузить данные
                <input type="file" accept=".json" onChange={importData} style={{ display:"none" }} />
              </label>
            </div>
          </>
        )}

        {/* ══════════════ TOMORROW ══════════════ */}
        {tab === "tomorrow" && (
          <div style={{ animation:"fadeUp 0.3s both" }}>
            <div style={{ textAlign:"center", marginBottom:"20px" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px", color:"#6d2b5e", fontWeight:700 }}>🌙 Планы на {formatKey(TOMORROW)}</div>
              <p style={{ fontSize:"13px", color:"#9c5080", marginTop:"4px", fontStyle:"italic" }}>Забота о завтрашней себе — это тоже любовь 💜</p>
            </div>
            <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"22px", padding:"20px", marginBottom:"12px", border:"2px solid rgba(156,39,176,0.2)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#6d2b5e", marginBottom:"10px", fontWeight:700 }}>🎯 Одна большая задача</div>
              <input value={tmrBig} onChange={e => { setTmrBig(e.target.value); saveTmr({ bigTask:e.target.value }); }} placeholder="Что важного завтра?.."
                style={{ width:"100%", border:"1.5px solid rgba(220,180,220,0.5)", borderRadius:"12px", padding:"10px 14px", fontSize:"14px", color:"#5d3a5a", background:"rgba(255,250,255,0.8)" }} />
            </div>
            <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"22px", padding:"20px", border:"2px solid rgba(233,30,140,0.15)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#6d2b5e", marginBottom:"10px", fontWeight:700 }}>🌸 Три маленькие задачки</div>
              {tmrSmall.map((task, i) => (
                <div key={i} style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"8px" }}>
                  <div style={{ width:"32px", height:"32px", borderRadius:"9px", background:"rgba(233,160,199,0.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#b06090", fontWeight:700, flexShrink:0, fontSize:"13px" }}>{i+1}</div>
                  <input value={task} onChange={e => { const n=[...tmrSmall]; n[i]=e.target.value; setTmrSmall(n); saveTmr({ smallTasks:n }); }}
                    placeholder={["Что-то лёгкое...","Что-то приятное...","Что-то полезное..."][i]}
                    style={{ flex:1, border:"1.5px solid rgba(220,180,220,0.4)", borderRadius:"10px", padding:"9px 12px", fontSize:"13px", color:"#5d3a5a", background:"rgba(255,250,255,0.8)" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════ MAXIM ══════════════ */}
        {tab === "maxim" && (
          <div style={{ animation:"fadeUp 0.3s both" }}>

            {/* counters only */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"20px", marginBottom:"20px" }}>
              <span style={{ fontSize:"22px", fontWeight:900, color:"#2e7d32" }}>😊 {happyCount}</span>
              <span style={{ color:"#d0aac0", fontSize:"18px" }}>·</span>
              <span style={{ fontSize:"22px", fontWeight:900, color:"#b71c1c" }}>😢 {sadCount}</span>
            </div>

            {/* two columns */}
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"12px" }}>

              {/* happy */}
              <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"18px", padding:"16px", border:"2px solid rgba(76,175,80,0.2)" }}>
                <div style={{ fontSize:"20px", marginBottom:"8px", textAlign:"center" }}>😊</div>
                <div style={{ fontSize:"11px", color:"#2e7d32", fontWeight:700, textAlign:"center", marginBottom:"10px", textTransform:"uppercase", letterSpacing:"1px" }}>Хорошее</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  {MAXIM_MARKERS.filter(m => m.type==="happy").map(m => (
                    <div key={m.id} onClick={() => toggleMaxim(m.id)}
                      style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px", borderRadius:"10px", cursor:"pointer", transition:"all 0.15s",
                        background: maximMarkers[m.id] ? "rgba(76,175,80,0.12)" : "rgba(245,255,245,0.8)",
                        border: `1.5px solid ${maximMarkers[m.id] ? "#4caf50" : "rgba(76,175,80,0.2)"}` }}>
                      <span style={{ fontSize:"14px" }}>{maximMarkers[m.id] ? "✓" : m.emoji}</span>
                      <span style={{ fontSize:"12px", fontWeight:700, color:maximMarkers[m.id]?"#2e7d32":"#4a5a4a", lineHeight:1.3 }}>{m.label}</span>
                    </div>
                  ))}
                </div>
                {customHappy.map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px", borderRadius:"10px", background:"rgba(76,175,80,0.12)", border:"1.5px solid #4caf50" }}>
                    <span style={{ fontSize:"14px" }}>✓</span>
                    <span style={{ fontSize:"12px", fontWeight:700, color:"#2e7d32", flex:1, lineHeight:1.3 }}>{item}</span>
                    <button onClick={() => { const n=customHappy.filter((_,j)=>j!==i); setCustomHappy(n); save({customHappy:n}); }} style={{ background:"none", border:"none", color:"#4caf50", cursor:"pointer", fontSize:"16px", lineHeight:1 }}>×</button>
                  </div>
                ))}
                {customHappy.length < 5 && (
                  <div style={{ marginTop:"4px" }}>
                    <input value={happyInput} onChange={e=>setHappyInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&happyInput.trim()){const n=[...customHappy,happyInput.trim()];setCustomHappy(n);save({customHappy:n});setHappyInput("");}}} placeholder="Добавить и нажать Enter..." style={{ width:"100%", border:"1.5px solid rgba(76,175,80,0.3)", borderRadius:"8px", padding:"6px 10px", fontSize:"16px", color:"#2e7d32", background:"rgba(245,255,245,0.9)" }} />
                  </div>
                )}
              </div>

              {/* sad */}
              <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"18px", padding:"16px", border:"2px solid rgba(211,47,47,0.18)" }}>
                <div style={{ fontSize:"20px", marginBottom:"8px", textAlign:"center" }}>😢</div>
                <div style={{ fontSize:"11px", color:"#b71c1c", fontWeight:700, textAlign:"center", marginBottom:"10px", textTransform:"uppercase", letterSpacing:"1px" }}>Тяжёлое</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  {MAXIM_MARKERS.filter(m => m.type==="sad").map(m => (
                    <div key={m.id} onClick={() => toggleMaxim(m.id)}
                      style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px", borderRadius:"10px", cursor:"pointer", transition:"all 0.15s",
                        background: maximMarkers[m.id] ? "rgba(211,47,47,0.1)" : "rgba(255,250,250,0.8)",
                        border: `1.5px solid ${maximMarkers[m.id] ? "#d32f2f" : "rgba(211,47,47,0.18)"}` }}>
                      <span style={{ fontSize:"14px" }}>{maximMarkers[m.id] ? "✓" : m.emoji}</span>
                      <span style={{ fontSize:"12px", fontWeight:700, color:maximMarkers[m.id]?"#b71c1c":"#5a3a3a", lineHeight:1.3 }}>{m.label}</span>
                    </div>
                  ))}
                </div>
                {customSad.map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px", borderRadius:"10px", background:"rgba(211,47,47,0.1)", border:"1.5px solid #d32f2f" }}>
                    <span style={{ fontSize:"14px" }}>✓</span>
                    <span style={{ fontSize:"12px", fontWeight:700, color:"#b71c1c", flex:1, lineHeight:1.3 }}>{item}</span>
                    <button onClick={() => { const n=customSad.filter((_,j)=>j!==i); setCustomSad(n); save({customSad:n}); }} style={{ background:"none", border:"none", color:"#d32f2f", cursor:"pointer", fontSize:"16px", lineHeight:1 }}>×</button>
                  </div>
                ))}
                {customSad.length < 5 && (
                  <div style={{ marginTop:"4px" }}>
                    <input value={sadInput} onChange={e=>setSadInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&sadInput.trim()){const n=[...customSad,sadInput.trim()];setCustomSad(n);save({customSad:n});setSadInput("");}}} placeholder="Добавить и нажать Enter..." style={{ width:"100%", border:"1.5px solid rgba(211,47,47,0.3)", borderRadius:"8px", padding:"6px 10px", fontSize:"16px", color:"#b71c1c", background:"rgba(255,250,250,0.9)" }} />
                  </div>
                )}
              </div>
            </div>

            {/* neutral marker */}
            {MAXIM_MARKERS.filter(m => m.type==="neutral").map(m => (
              <div key={m.id} onClick={() => toggleMaxim(m.id)}
                style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 16px", borderRadius:"14px", cursor:"pointer", marginBottom:"8px",
                  background: maximMarkers[m.id] ? "rgba(158,158,158,0.15)" : "rgba(255,255,255,0.8)",
                  border: `2px solid ${maximMarkers[m.id] ? "#9e9e9e" : "rgba(200,200,200,0.4)"}` }}>
                <span style={{ fontSize:"18px" }}>{maximMarkers[m.id] ? "✓" : m.emoji}</span>
                <span style={{ fontSize:"14px", fontWeight:700, color:"#666" }}>{m.label}</span>
              </div>
            ))}
            {MAXIM_MARKERS.filter(m => m.type==="neutral2").map(m => (
              <div key={m.id} onClick={() => toggleMaxim(m.id)}
                style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 16px", borderRadius:"14px", cursor:"pointer", marginBottom:"12px",
                  background: maximMarkers[m.id] ? "rgba(211,47,47,0.08)" : "rgba(255,255,255,0.8)",
                  border: `2px solid ${maximMarkers[m.id] ? "#d32f2f" : "rgba(200,200,200,0.4)"}` }}>
                <span style={{ fontSize:"18px" }}>{maximMarkers[m.id] ? "✓" : m.emoji}</span>
                <span style={{ fontSize:"14px", fontWeight:700, color: maximMarkers[m.id] ? "#b71c1c" : "#666" }}>{m.label}</span>
              </div>
            ))}
            <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"18px", padding:"18px", border:"2px solid rgba(194,24,91,0.1)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", color:"#6d2b5e", marginBottom:"6px", fontWeight:700 }}>📝 Что хочу запомнить</div>
              <textarea value={maximNote} onChange={e => { setMaximNote(e.target.value); save({ maximNote:e.target.value }); }}
                placeholder="Сегодня я заметила..." rows={3}
                style={{ width:"100%", border:"1.5px solid rgba(194,24,91,0.2)", borderRadius:"12px", padding:"11px 13px", fontSize:"13px", color:"#4a1a6e", background:"rgba(255,250,255,0.9)", resize:"none", lineHeight:1.6 }} />
            </div>

            {/* статистика за месяц */}
            {(() => {
              const keys = [];
              for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith("selfcare_")) keys.push(k.replace("selfcare_", ""));
              }
              keys.sort((a, b) => b.localeCompare(a)).splice(30);
              if (keys.length === 0) return null;
              return (
                <div style={{ background:"rgba(255,255,255,0.8)", borderRadius:"18px", padding:"18px", border:"2px solid rgba(194,24,91,0.1)", marginTop:"12px" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", color:"#6d2b5e", marginBottom:"14px", fontWeight:700 }}>📅 Статистика за месяц</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    {keys.map(dateKey => {
                      const data = JSON.parse(localStorage.getItem("selfcare_" + dateKey) || "{}");
                      const mm = data.maximMarkers || {};
                      const happy = MAXIM_MARKERS.filter(m => m.type==="happy" && mm[m.id]).length + (data.customHappy?.length || 0);
                      const sad = MAXIM_MARKERS.filter(m => m.type==="sad" && mm[m.id]).length + (data.customSad?.length || 0);
                      const noContact = mm["no_contact"];
                      const fight = mm["fight"];
                      const [y, mo, d] = dateKey.split("-").map(Number);
                      const label = new Date(y, mo-1, d).toLocaleDateString("ru-RU", { day:"numeric", month:"short" });
                      return (
                        <div key={dateKey} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                          <span style={{ fontSize:"12px", color:"#9c5080", minWidth:"52px" }}>{label}</span>
                          <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
                            {happy > 0 && <span style={{ fontSize:"13px", fontWeight:700, color:"#2e7d32" }}>😊{happy}</span>}
                            {sad > 0 && <span style={{ fontSize:"13px", fontWeight:700, color:"#b71c1c" }}>😢{sad}</span>}
                            {noContact && <span style={{ fontSize:"16px" }}>🤍</span>}
                            {fight && <span style={{ fontSize:"16px" }}>🌩️</span>}
                            {!happy && !sad && !noContact && !fight && <span style={{ fontSize:"12px", color:"#ccc" }}>—</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* итог */}
                  {(() => {
                    let totalHappy = 0, totalSad = 0, totalNoContact = 0, totalFight = 0;
                    keys.forEach(dateKey => {
                      const data = JSON.parse(localStorage.getItem("selfcare_" + dateKey) || "{}");
                      const mm = data.maximMarkers || {};
                      totalHappy += MAXIM_MARKERS.filter(m => m.type==="happy" && mm[m.id]).length + (data.customHappy?.length || 0);
                      totalSad += MAXIM_MARKERS.filter(m => m.type==="sad" && mm[m.id]).length + (data.customSad?.length || 0);
                      if (mm["no_contact"]) totalNoContact++;
                      if (mm["fight"]) totalFight++;
                    });
                    return (
                      <div style={{ marginTop:"14px", paddingTop:"12px", borderTop:"1.5px solid rgba(194,24,91,0.15)", display:"flex", gap:"12px", flexWrap:"wrap" }}>
                        {totalHappy > 0 && <div style={{ textAlign:"center" }}><div style={{ fontSize:"20px" }}>😊</div><div style={{ fontSize:"16px", fontWeight:900, color:"#2e7d32" }}>{totalHappy}</div><div style={{ fontSize:"10px", color:"#4caf50" }}>хорошего</div></div>}
                        {totalSad > 0 && <div style={{ textAlign:"center" }}><div style={{ fontSize:"20px" }}>😢</div><div style={{ fontSize:"16px", fontWeight:900, color:"#b71c1c" }}>{totalSad}</div><div style={{ fontSize:"10px", color:"#d32f2f" }}>тяжёлого</div></div>}
                        {totalNoContact > 0 && <div style={{ textAlign:"center" }}><div style={{ fontSize:"20px" }}>🤍</div><div style={{ fontSize:"16px", fontWeight:900, color:"#888" }}>{totalNoContact}</div><div style={{ fontSize:"10px", color:"#aaa" }}>не виделись</div></div>}
                        {totalFight > 0 && <div style={{ textAlign:"center" }}><div style={{ fontSize:"20px" }}>🌩️</div><div style={{ fontSize:"16px", fontWeight:900, color:"#b71c1c" }}>{totalFight}</div><div style={{ fontSize:"10px", color:"#d32f2f" }}>в ссоре</div></div>}
                      </div>
                    );
                  })()}
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
}
