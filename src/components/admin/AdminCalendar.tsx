import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';

const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

interface CalEvent {
  date: number;
  title: string;
  time: string;
  type: 'airport' | 'event' | 'excursion' | 'pro';
  client: string;
}

const typeColors: Record<string, string> = {
  airport: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  event: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  excursion: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  pro: 'bg-brand-gold/20 text-brand-gold border-brand-gold/30',
};

const mockEvents: CalEvent[] = [
  { date: 2, title: 'Aéroport Nice → Monaco', time: '08:00', type: 'airport', client: 'J. Dupont' },
  { date: 5, title: 'Gala Cannes', time: '19:00', type: 'event', client: 'M. Leclerc' },
  { date: 8, title: 'Excursion Calanques', time: '09:30', type: 'excursion', client: 'P. Martin' },
  { date: 12, title: 'Transfer Pro', time: '07:00', type: 'pro', client: 'S. Bernard' },
  { date: 15, title: 'Aéroport Marseille', time: '14:00', type: 'airport', client: 'L. Moreau' },
  { date: 18, title: 'Mariage Saint-Tropez', time: '11:00', type: 'event', client: 'A. Rousseau' },
  { date: 22, title: 'Circuit Gorges du Verdon', time: '08:30', type: 'excursion', client: 'C. Petit' },
  { date: 27, title: 'Transfer VIP', time: '06:00', type: 'pro', client: 'D. Robert' },
];

export default function AdminCalendar() {
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });

  const navigate = (dir: number) => {
    let m = currentMonth + dir;
    let y = currentYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setCurrentMonth(m);
    setCurrentYear(y);
    setSelectedDate(null);
  };

  const eventsForDate = (d: number) => mockEvents.filter((e) => e.date === d);
  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-white">Calendrier</h1>
        <p className="text-sm text-white/40 mt-1">Planning des réservations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-[15px] font-semibold text-white/80">
              {months[currentMonth]} {currentYear}
            </h2>
            <button onClick={() => navigate(1)} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => (
              <div key={d} className="text-center py-2 text-[10px] font-medium text-white/25 uppercase tracking-wider">
                {d}
              </div>
            ))}
            {calendarDays.map((day, i) => {
              const events = day ? eventsForDate(day) : [];
              const isSelected = day === selectedDate;
              const isToday = day === 27 && currentMonth === 2;
              return (
                <button
                  key={i}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day}
                  className={`relative aspect-square flex flex-col items-center justify-start p-1 rounded-lg transition-all ${
                    !day ? '' : isSelected
                      ? 'bg-brand-gold/10 border border-brand-gold/30'
                      : isToday
                        ? 'bg-white/5 border border-white/10'
                        : 'hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  {day && (
                    <>
                      <span className={`text-[12px] ${isToday ? 'text-brand-gold font-bold' : 'text-white/50'}`}>
                        {day}
                      </span>
                      {events.length > 0 && (
                        <div className="flex gap-0.5 mt-1">
                          {events.slice(0, 3).map((e, j) => (
                            <div key={j} className={`w-1.5 h-1.5 rounded-full ${
                              e.type === 'airport' ? 'bg-blue-400' :
                              e.type === 'event' ? 'bg-purple-400' :
                              e.type === 'excursion' ? 'bg-emerald-400' : 'bg-brand-gold'
                            }`} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5">
            {[
              { label: 'Aéroport', color: 'bg-blue-400' },
              { label: 'Événement', color: 'bg-purple-400' },
              { label: 'Excursion', color: 'bg-emerald-400' },
              { label: 'Pro', color: 'bg-brand-gold' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-[10px] text-white/30">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Events */}
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">
            {selectedDate ? `${selectedDate} ${months[currentMonth]}` : 'Sélectionnez une date'}
          </h3>

          {selectedDate && selectedEvents.length === 0 && (
            <p className="text-[12px] text-white/25 text-center py-8">Aucune réservation</p>
          )}

          <div className="space-y-3">
            {selectedEvents.map((e, i) => (
              <div key={i} className={`p-3 rounded-lg border ${typeColors[e.type]}`}>
                <p className="text-[13px] font-medium">{e.title}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-[11px] opacity-70">
                    <Clock className="w-3 h-3" />
                    {e.time}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] opacity-70">
                    <User className="w-3 h-3" />
                    {e.client}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming */}
          {!selectedDate && (
            <div className="space-y-3">
              <p className="text-[11px] text-white/25 uppercase tracking-wider mb-3">Prochaines réservations</p>
              {mockEvents.slice(0, 5).map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02]">
                  <div className={`w-1 h-8 rounded-full ${
                    e.type === 'airport' ? 'bg-blue-400' :
                    e.type === 'event' ? 'bg-purple-400' :
                    e.type === 'excursion' ? 'bg-emerald-400' : 'bg-brand-gold'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-white/60 truncate">{e.title}</p>
                    <p className="text-[10px] text-white/25">{e.date} {months[currentMonth]} · {e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
