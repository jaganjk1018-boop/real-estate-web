'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  Sun, 
  Moon, 
  Sunset, 
  Compass
} from 'lucide-react';
import { useRealEstateStore } from '../lib/store';
import { formatLocalizedArea } from '../lib/utils';

export default function FloorPlanExplorer({ property, onOpenTourRoom }) {
  const { unit } = useRealEstateStore();
  const [activeLevel, setActiveLevel] = useState('level-1');
  const [activeRoomId, setActiveRoomId] = useState('room-salon');
  const [lightingMode, setLightingMode] = useState('golden'); // 'golden' | 'daylight' | 'night'

  // Dynamic levels data
  const levels = [
    {
      id: 'level-1',
      title: 'Level 1: Grand Living & Terrace',
      description: 'Open-concept reception salon, show kitchen, and cantilevered infinity deck.',
      areaSqFt: Math.round(property.areaSqFt * 0.48),
      rooms: [
        {
          id: 'room-salon',
          name: 'Grand Living Salon',
          areaSqFt: 2200,
          dimensions: "44' x 50'",
          ceilingHeight: "24 ft Double-Height",
          finishes: "Polished Italian Travertine & Custom Walnut Slats",
          acousticRating: "STC 58 Acoustic Decoupled Glass",
          description: "Floor-to-ceiling automated glass pocket walls opening seamlessly to sunset infinity pool views.",
          tourRoomId: 'room-1',
          svgCoords: { x: 20, y: 25, width: 35, height: 45 }
        },
        {
          id: 'room-kitchen',
          name: "Boffi Chef's & Prep Kitchen",
          areaSqFt: 850,
          dimensions: "25' x 34'",
          ceilingHeight: "14 ft Coffered",
          finishes: "Calacatta Gold Marble & Brushed Bronze Cabinetry",
          acousticRating: "Sound-damped extraction hoods",
          description: "Dual Sub-Zero refrigeration columns, Gaggenau induction suite, and hidden butler's pantry.",
          tourRoomId: 'room-3',
          svgCoords: { x: 58, y: 25, width: 25, height: 30 }
        },
        {
          id: 'room-deck',
          name: 'Zero-Edge Infinity Terrace',
          areaSqFt: 3100,
          dimensions: "62' x 50'",
          ceilingHeight: "Open Sky",
          finishes: "Honed Quartzite & Floating Bronze Firepit",
          acousticRating: "Architectural sound baffles",
          description: "Olympic-length cantilevered pool facing unobstructed horizon and city lights.",
          tourRoomId: 'room-1',
          svgCoords: { x: 20, y: 72, width: 63, height: 22 }
        }
      ]
    },
    {
      id: 'level-2',
      title: 'Level 2: Primary Master Sanctuary',
      description: 'Dual walk-in dressing galleries, ensuite spa baths, and private stargazing loggia.',
      areaSqFt: Math.round(property.areaSqFt * 0.34),
      rooms: [
        {
          id: 'room-master',
          name: 'Primary Sanctuary Suite',
          areaSqFt: 1450,
          dimensions: "32' x 45'",
          ceilingHeight: "16 ft Vaulted",
          finishes: "European White Oak & Silk Wall Coverings",
          acousticRating: "Triple-pane Low-E Acoustic Glass",
          description: "Floating bio-ethanol fireplace, automated blackout shading, and private skyline balcony.",
          tourRoomId: 'room-2',
          svgCoords: { x: 22, y: 28, width: 40, height: 42 }
        },
        {
          id: 'room-bath',
          name: 'Dual Master Ensuite Spa',
          areaSqFt: 720,
          dimensions: "24' x 30'",
          ceilingHeight: "14 ft",
          finishes: "Bookmatched Statuario Marble & Dornbracht Fixtures",
          acousticRating: "Whisper-quiet steam ventilation",
          description: "Monolithic freestanding soaking tub carved from solid stone with rainfall chromotherapy shower.",
          tourRoomId: 'room-2',
          svgCoords: { x: 64, y: 28, width: 22, height: 42 }
        }
      ]
    },
    {
      id: 'level-sub',
      title: 'Sub-Level: Private Wellness & Vault',
      description: 'Temperature-controlled wine gallery, Finnish dry sauna, steam room, and cinema salon.',
      areaSqFt: Math.round(property.areaSqFt * 0.18),
      rooms: [
        {
          id: 'room-spa',
          name: 'Executive Thermal Spa & Sauna',
          areaSqFt: 1100,
          dimensions: "30' x 36'",
          ceilingHeight: "12 ft",
          finishes: "Nordic Cedar, Basalt Stone & Cold Plunge Pool",
          acousticRating: "Acoustically isolated wellness zone",
          description: "Custom Finnish dry sauna, Turkish hammam steam room, and hydrotherapy massage cascade.",
          tourRoomId: 'room-3',
          svgCoords: { x: 24, y: 30, width: 34, height: 42 }
        },
        {
          id: 'room-wine',
          name: '1,200-Bottle Wine & Cognac Vault',
          areaSqFt: 450,
          dimensions: "18' x 25'",
          ceilingHeight: "12 ft",
          finishes: "Smoked Bronze Glass & Backlit Onyx Display",
          acousticRating: "Vibration-damped precision climate system",
          description: "Dual-zone 55°F / 65% humidity preservation vault with private sommelier tasting bar.",
          tourRoomId: 'room-3',
          svgCoords: { x: 60, y: 30, width: 24, height: 42 }
        }
      ]
    }
  ];

  const currentLevel = levels.find((l) => l.id === activeLevel) || levels[0];
  const currentRoom = currentLevel.rooms.find((r) => r.id === activeRoomId) || currentLevel.rooms[0];

  // Lighting scheme styles for light canvas
  const lightingStyles = {
    golden: {
      bg: 'bg-[#FAF8F5]',
      stroke: '#D4AF37',
      fill: 'rgba(212, 175, 55, 0.08)',
      activeFill: 'rgba(212, 175, 55, 0.25)',
      primaryStroke: '#1E3A5F'
    },
    daylight: {
      bg: 'bg-[#F0F4F8]',
      stroke: '#1E3A5F',
      fill: 'rgba(30, 58, 95, 0.06)',
      activeFill: 'rgba(30, 58, 95, 0.18)',
      primaryStroke: '#1E3A5F'
    },
    night: {
      bg: 'bg-[#EBF0F5]',
      stroke: '#475569',
      fill: 'rgba(71, 85, 105, 0.08)',
      activeFill: 'rgba(212, 175, 55, 0.22)',
      primaryStroke: '#1E3A5F'
    }
  };

  const currentStyle = lightingStyles[lightingMode];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-8 shadow-card">
      
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#996515] border border-[#D4AF37]/30 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Architectural Layout & Spatial Analysis</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] font-serif mt-2">
            Interactive Floor Plan Explorer
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            Review spatial flow, ceiling elevations, acoustic materials, and jump into 360° virtual rooms.
          </p>
        </div>

        {/* Lighting Simulation Toggle */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <span className="text-[10px] uppercase tracking-widest text-[#1E3A5F] font-bold">Ambiance:</span>
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-2xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setLightingMode('golden')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                lightingMode === 'golden'
                  ? 'bg-[#D4AF37] text-[#1E3A5F] font-bold shadow-sm'
                  : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
              title="Golden Hour Sunset"
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>Sunset Dusk</span>
            </button>
            <button
              onClick={() => setLightingMode('daylight')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                lightingMode === 'daylight'
                  ? 'bg-[#1E3A5F] text-white font-semibold shadow-sm'
                  : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
              title="Natural Daylight"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Daylight</span>
            </button>
            <button
              onClick={() => setLightingMode('night')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                lightingMode === 'night'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-[#4B5563] hover:text-[#1E3A5F]'
              }`}
              title="Night LED Architecture"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night LED</span>
            </button>
          </div>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => {
              setActiveLevel(lvl.id);
              setActiveRoomId(lvl.rooms[0].id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold tracking-wide border transition-all ${
              activeLevel === lvl.id
                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                : 'bg-[#FAF8F5] text-[#1F2937] border-gray-200 hover:bg-gray-100 hover:border-gray-300'
            }`}
          >
            {lvl.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid: Blueprint + Room Spec Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Architectural SVG Canvas (7 cols) */}
        <div className={`lg:col-span-7 rounded-3xl border border-gray-200 p-6 relative overflow-hidden ${currentStyle.bg} min-h-[420px] flex flex-col justify-between shadow-card transition-colors duration-500`}>
          
          {/* Top level description */}
          <div className="flex items-center justify-between text-xs text-[#4B5563] z-10">
            <span className="font-bold text-[#1E3A5F] tracking-wider uppercase text-[11px]">
              {currentLevel.title}
            </span>
            <span className="text-[#996515] font-semibold">
              Gross Footprint: {formatLocalizedArea(currentLevel.areaSqFt, unit)}
            </span>
          </div>

          {/* SVG Blueprint Rendering */}
          <div className="relative w-full h-[320px] my-auto">
            <svg 
              className="w-full h-full"
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Outer structural perimeter outline */}
              <rect
                x="15"
                y="15"
                width="72"
                height="75"
                rx="3"
                fill="none"
                stroke={currentStyle.stroke}
                strokeWidth="1"
                strokeDasharray="2,1"
                opacity="0.8"
              />

              {/* Architectural Grid Lines */}
              <line x1="15" y1="50" x2="87" y2="50" stroke="#1E3A5F" strokeWidth="0.3" opacity="0.15" />
              <line x1="50" y1="15" x2="50" y2="90" stroke="#1E3A5F" strokeWidth="0.3" opacity="0.15" />

              {/* Room Interactive Zones */}
              {currentLevel.rooms.map((room) => {
                const isSelected = activeRoomId === room.id;
                const { x, y, width, height } = room.svgCoords;

                return (
                  <g 
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className="cursor-pointer group"
                  >
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="2"
                      fill={isSelected ? currentStyle.activeFill : currentStyle.fill}
                      stroke={isSelected ? '#1E3A5F' : currentStyle.stroke}
                      strokeWidth={isSelected ? '1.5' : '0.8'}
                      className="transition-all duration-300 group-hover:opacity-90"
                    />

                    {/* Room Label */}
                    <text
                      x={x + width / 2}
                      y={y + height / 2 - 2}
                      textAnchor="middle"
                      fill="#1E3A5F"
                      fontSize="3.2"
                      fontWeight="700"
                      className="pointer-events-none select-none"
                    >
                      {room.name}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 3}
                      textAnchor="middle"
                      fill="#996515"
                      fontSize="2.4"
                      fontWeight="600"
                      className="pointer-events-none select-none"
                    >
                      {formatLocalizedArea(room.areaSqFt, unit)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom helper prompt */}
          <div className="text-[11px] text-[#4B5563] flex items-center justify-between border-t border-gray-200 pt-3 z-10 font-medium">
            <span>Tap any room boundary to inspect engineering specs</span>
            <span className="text-[#996515] font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> True North Orientation
            </span>
          </div>
        </div>

        {/* Selected Room Specifications Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-card space-y-6">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#996515] border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-wider">
                Room Inspection
              </span>
              <span className="text-xs font-bold text-[#1E3A5F]">
                {currentRoom.dimensions}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#1E3A5F] font-serif">
                {currentRoom.name}
              </h4>
              <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                {currentRoom.description}
              </p>
            </div>

            {/* Spec Attributes Grid */}
            <div className="space-y-2.5 pt-2 border-t border-gray-200 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-[#4B5563]">Usable Spatial Area:</span>
                <span className="font-bold text-[#1E3A5F]">{formatLocalizedArea(currentRoom.areaSqFt, unit)}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-[#4B5563]">Clear Ceiling Elevation:</span>
                <span className="font-bold text-[#1E3A5F]">{currentRoom.ceilingHeight}</span>
              </div>
              <div className="flex items-start justify-between py-1 border-b border-gray-100">
                <span className="text-[#4B5563]">Material Palettes:</span>
                <span className="font-semibold text-[#1E3A5F] text-right max-w-[200px]">{currentRoom.finishes}</span>
              </div>
              <div className="flex items-start justify-between py-1">
                <span className="text-[#4B5563]">Acoustic Specs:</span>
                <span className="font-medium text-[#1F2937] text-right max-w-[200px]">{currentRoom.acousticRating}</span>
              </div>
            </div>

          </div>

          {/* Action: Jump to 360 Virtual Tour for this room */}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <button
              onClick={() => onOpenTourRoom?.(property, currentRoom.tourRoomId)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#1E3A5F] hover:bg-[#162C48] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#1E3A5F]/20 transition-all group"
            >
              <Eye className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Teleport to 360° Virtual Tour ({currentRoom.name})</span>
            </button>
            <p className="text-[10px] text-center text-[#4B5563]">
              Rotates the interactive 360° camera to this room's primary vantage point.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
