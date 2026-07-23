/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LeagueZoneDefinition } from "../types";
import { getDefaultZoneDefinitions } from "../config/competitions";
import { AlertTriangle, Plus, Trash2, ArrowUp, ArrowDown, RotateCcw, Check } from "lucide-react";

interface ZoneEditorProps {
  leagueId: string;
  zoneDefinitions: LeagueZoneDefinition[];
  onChange: (zones: LeagueZoneDefinition[]) => void;
  teamCount: number;
}

export const ZoneEditor: React.FC<ZoneEditorProps> = ({
  leagueId,
  zoneDefinitions,
  onChange,
  teamCount
}) => {
  // Ensure we operate on a non-empty sorted list
  const currentZones = (
    zoneDefinitions && zoneDefinitions.length > 0
      ? zoneDefinitions
      : getDefaultZoneDefinitions(leagueId)
  ).sort((a, b) => a.displayOrder - b.displayOrder);

  // Active zones conflict detection (Requirement 11)
  const activeZones = currentZones.filter((z) => z.isEnabled);
  const conflicts: string[] = [];
  const rangeWarnings: string[] = [];

  for (let i = 0; i < activeZones.length; i++) {
    for (let j = i + 1; j < activeZones.length; j++) {
      const z1 = activeZones[i];
      const z2 = activeZones[j];
      const overlapStart = Math.max(z1.startPosition, z2.startPosition);
      const overlapEnd = Math.min(z1.endPosition, z2.endPosition);

      if (overlapStart <= overlapEnd) {
        const rangeText =
          overlapStart === overlapEnd
            ? `${overlapStart}. sırada`
            : `${overlapStart}–${overlapEnd}. sıralar arasında`;
        conflicts.push(
          `"${z1.label}" ile "${z2.label}" bölgeleri ${rangeText} çakışıyor.`
        );
      }
    }
  }

  // Range and Label Validation (Requirement 12)
  currentZones.forEach((z) => {
    if (!z.label || z.label.trim() === "") {
      rangeWarnings.push(`Etiketi boş olan bir bölge tanımlı.`);
    }
    if (z.startPosition < 1) {
      rangeWarnings.push(`"${z.label || 'Bölge'}": Başlangıç sırası en az 1 olmalıdır.`);
    }
    if (z.endPosition < z.startPosition) {
      rangeWarnings.push(
        `"${z.label || 'Bölge'}": Bitiş sırası (${z.endPosition}), başlangıç sırasından (${z.startPosition}) küçük olamaz.`
      );
    }
    if (teamCount > 0 && z.endPosition > teamCount) {
      rangeWarnings.push(
        `"${z.label || 'Bölge'}": Bitiş sırası (${z.endPosition}), toplam takım sayısından (${teamCount}) büyüktür.`
      );
    }
  });

  // Helper to update a specific zone
  const handleUpdateZone = (id: string, updates: Partial<LeagueZoneDefinition>) => {
    const updated = currentZones.map((z) => (z.id === id ? { ...z, ...updates } : z));
    onChange(updated);
  };

  // Helper to add new zone
  const handleAddZone = () => {
    const maxOrder = currentZones.reduce((max, z) => Math.max(max, z.displayOrder || 0), 0);
    const newZone: LeagueZoneDefinition = {
      id: `zone-${Date.now()}`,
      label: "Yeni Bölge",
      color: "#38BDF8",
      startPosition: 1,
      endPosition: 1,
      displayOrder: maxOrder + 1,
      isEnabled: true
    };
    onChange([...currentZones, newZone]);
  };

  // Helper to delete zone
  const handleDeleteZone = (id: string) => {
    const filtered = currentZones.filter((z) => z.id !== id);
    // Re-index displayOrders
    filtered.forEach((z, idx) => {
      z.displayOrder = idx + 1;
    });
    onChange(filtered);
  };

  // Helper to move zone up/down
  const handleMoveZone = (id: string, direction: "up" | "down") => {
    const index = currentZones.findIndex((z) => z.id === id);
    if (index === -1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentZones.length) return;

    const copy = [...currentZones];
    // Swap displayOrders
    const tempOrder = copy[index].displayOrder;
    copy[index].displayOrder = copy[targetIndex].displayOrder;
    copy[targetIndex].displayOrder = tempOrder;

    copy.sort((a, b) => a.displayOrder - b.displayOrder);
    copy.forEach((z, idx) => {
      z.displayOrder = idx + 1;
    });

    onChange(copy);
  };

  // Helper to reset to default
  const handleReset = () => {
    if (window.confirm("Bu lig için varsayılan derece bölgelerine dönmek istediğinize emin misiniz?")) {
      onChange(getDefaultZoneDefinitions(leagueId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#111827]/40 border border-gray-800/60 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            LİG BÖLGELERİ VE RENK AÇIKLAMALARI
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Aktif lig/grup çalışma alanındaki sıralama renklerini, başlangıç/bitiş sıralarını ve alt legend kartlarını yönetin.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg flex items-center gap-1.5 transition-colors border border-gray-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Varsayılana Dön
          </button>
          <button
            onClick={handleAddZone}
            className="px-4 py-2 text-xs font-bold bg-[#10B981] hover:bg-[#059669] text-white rounded-lg flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Yeni Bölge Ekle
          </button>
        </div>
      </div>

      {/* Conflict Warnings (Requirement 11) */}
      {conflicts.length > 0 && (
        <div className="bg-amber-950/40 border border-amber-800/80 text-amber-200 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            Çakışan Bölge Uyarısı ({conflicts.length})
          </div>
          <div className="text-xs space-y-1 pl-7 leading-relaxed text-amber-200/90">
            {conflicts.map((msg, i) => (
              <div key={i}>• {msg} <span className="opacity-75 text-[11px]">(Not: Sıralama önceliği displayOrder değeri küçük olan bölgeye verilir)</span></div>
            ))}
          </div>
        </div>
      )}

      {/* Range / Label Warnings (Requirement 12) */}
      {rangeWarnings.length > 0 && (
        <div className="bg-red-950/40 border border-red-800/80 text-red-200 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-red-300">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            Geçersiz Sıra / Etiket Ayarı
          </div>
          <div className="text-xs space-y-1 pl-7 leading-relaxed text-red-200/90">
            {rangeWarnings.map((msg, i) => (
              <div key={i}>• {msg}</div>
            ))}
          </div>
        </div>
      )}

      {/* Zone Cards List */}
      <div className="space-y-4">
        {currentZones.map((zone, index) => (
          <div
            key={zone.id}
            className={`bg-[#111827]/40 border ${
              zone.isEnabled ? "border-gray-800/80" : "border-gray-900/60 opacity-60"
            } p-5 rounded-xl space-y-4 transition-all`}
          >
            {/* Top Bar: Order badge, color swatch, Label input, Toggle switch */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                <span className="text-xs font-bold px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700">
                  #{zone.displayOrder}
                </span>
                <div
                  className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: zone.color }}
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={zone.label}
                    onChange={(e) => handleUpdateZone(zone.id, { label: e.target.value })}
                    placeholder="Bölge Açıklaması (Örn: Play-Off Finali)"
                    className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-400">
                  {zone.isEnabled ? "Görünür" : "Gizli"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={zone.isEnabled}
                    onChange={(e) => handleUpdateZone(zone.id, { isEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
                </label>
              </div>
            </div>

            {/* Zone Control Inputs */}
            {zone.isEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-gray-800/40">
                {/* Start Position */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                    BAŞLANGIÇ SIRA
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={teamCount || 30}
                    value={zone.startPosition}
                    onChange={(e) =>
                      handleUpdateZone(zone.id, {
                        startPosition: Math.max(1, parseInt(e.target.value) || 1)
                      })
                    }
                    className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                {/* End Position */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                    BİTİŞ SIRA
                  </label>
                  <input
                    type="number"
                    min={zone.startPosition}
                    max={teamCount || 30}
                    value={zone.endPosition}
                    onChange={(e) =>
                      handleUpdateZone(zone.id, {
                        endPosition: Math.max(zone.startPosition, parseInt(e.target.value) || 1)
                      })
                    }
                    className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                {/* Color Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                    BÖLGE RENGİ
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={zone.color}
                      onChange={(e) => handleUpdateZone(zone.id, { color: e.target.value })}
                      className="w-9 h-8 rounded border border-gray-800 cursor-pointer bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      value={zone.color}
                      onChange={(e) => handleUpdateZone(zone.id, { color: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </div>

                {/* Reorder & Delete Actions */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                    SIRALAMA &amp; İŞLEM
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleMoveZone(zone.id, "up")}
                      disabled={index === 0}
                      className="p-1.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800 text-gray-200 rounded border border-gray-700 transition-colors"
                      title="Yukarı taşı"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveZone(zone.id, "down")}
                      disabled={index === currentZones.length - 1}
                      className="p-1.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800 text-gray-200 rounded border border-gray-700 transition-colors"
                      title="Aşağı taşı"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteZone(zone.id)}
                      className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded border border-red-900/50 transition-colors ml-auto"
                      title="Bölgeyi sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZoneEditor;
