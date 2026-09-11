import React, { useState } from 'react';
import type { Fixture } from '../../types/fixture';
import { X, Save, RotateCcw, Upload, FileText, Check, Plus, Trash2 } from 'lucide-react';
import { findAuthenticTeamLogo, findAuthenticTeamId, getAuthenticTeamName } from '../../data/turkishLowerLeagueTeams';

interface FixtureEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixtures: Fixture[];
  onSave: (newFixtures: Fixture[]) => void;
  onReset: () => void;
  leagueTitle: string;
  week: number;
}

export const FixtureEditorModal: React.FC<FixtureEditorModalProps> = ({
  isOpen,
  onClose,
  fixtures,
  onSave,
  onReset,
  leagueTitle,
  week,
}) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'paste'>('matches');
  const [editableMatches, setEditableMatches] = useState<Fixture[]>(() => JSON.parse(JSON.stringify(fixtures)));
  const [pastedText, setPastedText] = useState('');
  const [pasteFeedback, setPasteFeedback] = useState<string | null>(null);

  // Sync with prop when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEditableMatches(JSON.parse(JSON.stringify(fixtures)));
      setPasteFeedback(null);
    }
  }, [isOpen, fixtures]);

  if (!isOpen) return null;

  const handleMatchChange = (index: number, field: string, value: any) => {
    setEditableMatches((prev) => {
      const updated = [...prev];
      const match = { ...updated[index] };

      if (field === 'homeName') {
        match.homeTeam = {
          ...match.homeTeam,
          name: value,
          logo: findAuthenticTeamLogo(value, match.homeTeam.id, match.homeTeam.logo),
          id: findAuthenticTeamId(value, match.homeTeam.id),
        };
      } else if (field === 'homeLogo') {
        match.homeTeam = { ...match.homeTeam, logo: value };
      } else if (field === 'awayName') {
        match.awayTeam = {
          ...match.awayTeam,
          name: value,
          logo: findAuthenticTeamLogo(value, match.awayTeam.id, match.awayTeam.logo),
          id: findAuthenticTeamId(value, match.awayTeam.id),
        };
      } else if (field === 'awayLogo') {
        match.awayTeam = { ...match.awayTeam, logo: value };
      } else if (field === 'homeScore') {
        match.homeScore = value === '' || value === null ? null : Number(value);
        if (match.homeScore !== null && match.awayScore !== null) {
          match.status = 'played';
        } else if (match.homeScore === null && match.awayScore === null) {
          match.status = 'fixture';
        }
      } else if (field === 'awayScore') {
        match.awayScore = value === '' || value === null ? null : Number(value);
        if (match.homeScore !== null && match.awayScore !== null) {
          match.status = 'played';
        } else if (match.homeScore === null && match.awayScore === null) {
          match.status = 'fixture';
        }
      } else if (field === 'time') {
        match.time = value;
      } else if (field === 'date') {
        match.date = value;
      }

      updated[index] = match;
      return updated;
    });
  };

  const handleAddMatch = () => {
    const newMatch: Fixture = {
      id: `custom-${Date.now()}`,
      week,
      date: new Date().toISOString().split('T')[0],
      time: '16:00',
      status: 'fixture',
      homeTeam: { id: 0, name: 'Ev Sahibi', logo: '' },
      awayTeam: { id: 0, name: 'Deplasman', logo: '' },
      homeScore: null,
      awayScore: null,
      halfTimeHomeScore: null,
      halfTimeAwayScore: null,
    };
    setEditableMatches([...editableMatches, newMatch]);
  };

  const handleAddBye = () => {
    const newBye: Fixture = {
      id: `custom-bye-${Date.now()}`,
      week,
      date: '',
      time: '',
      status: 'bye',
      isBye: true,
      homeTeam: { id: 0, name: 'Bay Geçen Takım', logo: '' },
      awayTeam: { id: 0, name: 'BAY', logo: '' },
      homeScore: null,
      awayScore: null,
      halfTimeHomeScore: null,
      halfTimeAwayScore: null,
    };
    setEditableMatches([...editableMatches, newBye]);
  };

  const handleToggleBye = (index: number) => {
    setEditableMatches((prev) => {
      const updated = [...prev];
      const match = { ...updated[index] };
      const currentlyBye = match.status === 'bye' || match.isBye || match.awayTeam?.name === 'BAY';

      if (currentlyBye) {
        match.status = 'fixture';
        match.isBye = false;
        match.awayTeam = { id: 0, name: 'Deplasman Takım', logo: '' };
        match.time = '16:00';
      } else {
        match.status = 'bye';
        match.isBye = true;
        match.awayTeam = { id: 0, name: 'BAY', logo: '' };
        match.homeScore = null;
        match.awayScore = null;
        match.time = '';
        match.date = '';
      }

      updated[index] = match;
      return updated;
    });
  };

  const handleRemoveMatch = (index: number) => {
    setEditableMatches(editableMatches.filter((_, i) => i !== index));
  };

  const handleParsePastedText = () => {
    if (!pastedText.trim()) return;

    const lines = pastedText.trim().split('\n');
    const parsed: Fixture[] = [];

    lines.forEach((line, idx) => {
      const cleanLine = line.trim();
      if (!cleanLine) return;

      // Check for BAY line e.g. "Kırklarelispor (BAY)" or "Kırklarelispor - BAY" or "BAY: Kırklarelispor"
      const bayMatch = cleanLine.match(/^(?:bay\s*[:–-]\s*(.*?)|(.*?)\s*(?:[-(–]\s*bay\b|\(bay\)|\[bay\]|\bbay\s*geçiyor\b))/i);
      if (bayMatch) {
        const teamName = (bayMatch[1] || bayMatch[2] || '').trim();
        if (teamName) {
          parsed.push({
            id: `pasted-bye-${idx}-${Date.now()}`,
            week,
            date: '',
            time: '',
            status: 'bye',
            isBye: true,
            homeTeam: {
              id: findAuthenticTeamId(teamName),
              name: teamName,
              logo: findAuthenticTeamLogo(teamName),
            },
            awayTeam: { id: 0, name: 'BAY', logo: '' },
            homeScore: null,
            awayScore: null,
            halfTimeHomeScore: null,
            halfTimeAwayScore: null,
          });
          return;
        }
      }

      // Pattern: "Takım A 2 - 1 Takım B" or "Takım A 2-1 Takım B" or "Takım A - Takım B"
      const scoreMatch = cleanLine.match(/^(.*?)(?:\s+(\d+)\s*[-:]\s*(\d+)\s+)(.*?)$/);

      if (scoreMatch) {
        const homeName = scoreMatch[1].trim();
        const homeScore = parseInt(scoreMatch[2], 10);
        const awayScore = parseInt(scoreMatch[3], 10);
        const awayName = scoreMatch[4].trim();
        const homeId = findAuthenticTeamId(homeName);
        const awayId = findAuthenticTeamId(awayName);

        parsed.push({
          id: `pasted-${idx}-${Date.now()}`,
          week,
          date: new Date().toISOString().split('T')[0],
          time: '16:00',
          status: 'played',
          homeTeam: {
            id: homeId,
            name: getAuthenticTeamName(homeName, homeId),
            logo: findAuthenticTeamLogo(homeName, homeId),
          },
          awayTeam: {
            id: awayId,
            name: getAuthenticTeamName(awayName, awayId),
            logo: findAuthenticTeamLogo(awayName, awayId),
          },
          homeScore,
          awayScore,
          halfTimeHomeScore: null,
          halfTimeAwayScore: null,
        });
      } else {
        // Pattern with dash without scores: "Takım A - Takım B"
        const parts = cleanLine.split(/\s*[-–—]\s*/);
        if (parts.length >= 2) {
          const homeName = parts[0].trim();
          const awayName = parts[1].trim();
          const homeId = findAuthenticTeamId(homeName);
          const awayId = findAuthenticTeamId(awayName);
          parsed.push({
            id: `pasted-${idx}-${Date.now()}`,
            week,
            date: new Date().toISOString().split('T')[0],
            time: '16:00',
            status: 'fixture',
            homeTeam: {
              id: homeId,
              name: getAuthenticTeamName(homeName, homeId),
              logo: findAuthenticTeamLogo(homeName, homeId),
            },
            awayTeam: {
              id: awayId,
              name: getAuthenticTeamName(awayName, awayId),
              logo: findAuthenticTeamLogo(awayName, awayId),
            },
            homeScore: null,
            awayScore: null,
            halfTimeHomeScore: null,
            halfTimeAwayScore: null,
          });
        }
      }
    });

    if (parsed.length > 0) {
      setEditableMatches(parsed);
      setActiveTab('matches');
      setPasteFeedback(`${parsed.length} maç başarıyla ayrıştırıldı ve logoları eşleştirildi!`);
    } else {
      setPasteFeedback('Satırlar ayrıştırılamadı. Format örneği: "Bursaspor 2 - 1 Boluspor"');
    }
  };

  const handleSave = () => {
    onSave(editableMatches);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0b1b22] border border-cyan-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-cyan-500/20 bg-[#071318]">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">⚡</span> Fikstür, Skor ve Logo Düzenleyici
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {leagueTitle} • {week}. Hafta maçlarını, skorlarını veya kulüp logolarını buradan özelleştirebilirsiniz.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-cyan-500/20 bg-[#09181f] px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'matches'
                ? 'bg-[#0b1b22] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Maç Listesi & Logolar ({editableMatches.length})
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'paste'
                ? 'bg-[#0b1b22] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Metin Olarak Hızlı Yapıştır
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'matches' ? (
            <div className="space-y-3">
              {editableMatches.map((m, idx) => {
                const isItemBye = m.status === 'bye' || m.isBye || m.awayTeam?.name?.trim().toUpperCase() === 'BAY';

                if (isItemBye) {
                  return (
                    <div
                      key={m.id || idx}
                      className="bg-gradient-to-r from-[#08202d] via-[#0d2a3a] to-[#08202d] border border-cyan-400/40 rounded-xl p-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 shadow-md"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                        <span className="text-xs font-mono text-cyan-400 font-bold w-6 text-center">{idx + 1}</span>
                        <div className="w-10 h-10 min-w-[40px] bg-black/40 rounded-lg p-1 flex items-center justify-center border border-cyan-400/30">
                          {m.homeTeam.logo ? (
                            <img src={m.homeTeam.logo} alt="" className="max-w-full max-h-full object-contain" />
                          ) : (
                            <span className="text-[10px] text-slate-500">Logo Yok</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={m.homeTeam.name}
                            onChange={(e) => handleMatchChange(idx, 'homeName', e.target.value)}
                            placeholder="Bay Geçen Takım Adı"
                            className="w-full bg-[#0d222b] border border-cyan-400/40 rounded px-2.5 py-1 text-sm font-bold text-white focus:outline-none focus:border-cyan-300"
                          />
                          <input
                            type="text"
                            value={m.homeTeam.logo || ''}
                            onChange={(e) => handleMatchChange(idx, 'homeLogo', e.target.value)}
                            placeholder="Logo URL (opsiyonel)"
                            className="w-full bg-[#051116] border border-white/5 rounded px-2 py-0.5 text-[11px] text-slate-400 focus:outline-none mt-1"
                          />
                        </div>
                      </div>

                      {/* BAY Banner in Row */}
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/60 rounded-full flex items-center gap-1.5 shadow-[0_0_8px_rgba(0,175,175,0.3)]">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-xs font-mono font-black text-cyan-300 uppercase tracking-wider">
                            BAY GEÇİYOR
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 hidden sm:inline font-mono">
                          (Maç Yapmaz)
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleBye(idx)}
                          title="Normal 2 takımlı maça çevir"
                          className="px-2.5 py-1.5 text-xs text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 rounded-lg transition-colors font-semibold"
                        >
                          Maça Çevir
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveMatch(idx)}
                          title="Kaldır"
                          className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={m.id || idx}
                    className="bg-[#071318]/70 border border-cyan-500/20 rounded-xl p-3 flex flex-wrap md:flex-nowrap items-center gap-3"
                  >
                    <span className="text-xs font-mono text-cyan-400/70 w-6 text-center">{idx + 1}</span>

                    {/* Home Team */}
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                      <div className="w-9 h-9 min-w-[36px] bg-black/40 rounded-lg p-1 flex items-center justify-center border border-white/10">
                        {m.homeTeam.logo ? (
                          <img src={m.homeTeam.logo} alt="" className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-[10px] text-slate-500">Logo Yok</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={m.homeTeam.name}
                          onChange={(e) => handleMatchChange(idx, 'homeName', e.target.value)}
                          placeholder="Ev Sahibi Takım"
                          className="w-full bg-[#0d222b] border border-cyan-500/30 rounded px-2.5 py-1 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                        <input
                          type="text"
                          value={m.homeTeam.logo || ''}
                          onChange={(e) => handleMatchChange(idx, 'homeLogo', e.target.value)}
                          placeholder="Logo URL (opsiyonel)"
                          className="w-full bg-[#051116] border border-white/5 rounded px-2 py-0.5 text-[11px] text-slate-400 focus:outline-none mt-1"
                        />
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="flex items-center gap-1.5 px-2">
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : ''}
                        onChange={(e) => handleMatchChange(idx, 'homeScore', e.target.value)}
                        placeholder="-"
                        className="w-11 h-9 text-center bg-[#0d222b] border border-cyan-400/40 rounded text-base font-bold text-cyan-300 focus:outline-none focus:border-cyan-300"
                      />
                      <span className="text-slate-500 font-bold">:</span>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : ''}
                        onChange={(e) => handleMatchChange(idx, 'awayScore', e.target.value)}
                        placeholder="-"
                        className="w-11 h-9 text-center bg-[#0d222b] border border-cyan-400/40 rounded text-base font-bold text-cyan-300 focus:outline-none focus:border-cyan-300"
                      />
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={m.awayTeam.name}
                          onChange={(e) => handleMatchChange(idx, 'awayName', e.target.value)}
                          placeholder="Deplasman Takım"
                          className="w-full bg-[#0d222b] border border-cyan-500/30 rounded px-2.5 py-1 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                        <input
                          type="text"
                          value={m.awayTeam.logo || ''}
                          onChange={(e) => handleMatchChange(idx, 'awayLogo', e.target.value)}
                          placeholder="Logo URL (opsiyonel)"
                          className="w-full bg-[#051116] border border-white/5 rounded px-2 py-0.5 text-[11px] text-slate-400 focus:outline-none mt-1"
                        />
                      </div>
                      <div className="w-9 h-9 min-w-[36px] bg-black/40 rounded-lg p-1 flex items-center justify-center border border-white/10">
                        {m.awayTeam.logo ? (
                          <img src={m.awayTeam.logo} alt="" className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-[10px] text-slate-500">Logo Yok</span>
                        )}
                      </div>
                    </div>

                    {/* Match Time */}
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={m.time || ''}
                        onChange={(e) => handleMatchChange(idx, 'time', e.target.value)}
                        placeholder="16:00"
                        title="Maç Başlama Saati (TSİ)"
                        className="w-16 h-8 text-center bg-[#0d222b] border border-cyan-400/30 rounded text-xs font-bold text-cyan-200 focus:outline-none focus:border-cyan-400"
                      />
                      <span className="text-[9px] text-slate-400 mt-0.5">TSİ</span>
                    </div>

                    {/* Quick convert to BAY */}
                    <button
                      type="button"
                      onClick={() => handleToggleBye(idx)}
                      title="Bu maçı BAY takım olarak işaretle"
                      className="px-2 py-1 text-[11px] text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-slate-700 hover:border-cyan-500/30 rounded transition-colors"
                    >
                      BAY
                    </button>

                    {/* Remove Match button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveMatch(idx)}
                      title="Maçı Kaldır"
                      className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddMatch}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Yeni Maç Ekle
                </button>
                <button
                  type="button"
                  onClick={handleAddBye}
                  className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" /> BAY Takım Ekle
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4 text-xs text-cyan-200">
                <p className="font-semibold mb-1">TFF veya WhatsApp'tan maçları kopyalayıp buraya yapıştırabilirsiniz:</p>
                <code className="block bg-black/50 p-2 rounded text-cyan-300 mt-2 font-mono">
                  68 Aksaray Bld 2 - 1 Adana Demirspor<br />
                  Aliağa FK 1 - 0 Ankaraspor<br />
                  Elazığspor 2 - 2 Kastamonuspor
                </code>
              </div>

              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Maçları her satıra bir maç gelecek şekilde yapıştırın..."
                rows={10}
                className="w-full bg-[#071318] border border-cyan-500/30 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />

              {pasteFeedback && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/40 rounded-lg text-xs text-cyan-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" />
                  {pasteFeedback}
                </div>
              )}

              <button
                onClick={handleParsePastedText}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
              >
                Metni Ayrıştır ve Maç Listesini Güncelle
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-cyan-500/20 bg-[#071318] flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Bu haftanın maçlarını varsayılan orijinal fikstüre döndürmek istiyor musunuz?')) {
                onReset();
                onClose();
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Varsayılan Fikstüre Sıfırla
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-semibold transition-colors"
            >
              Vazgeç
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Save className="w-4 h-4" /> Postere Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
