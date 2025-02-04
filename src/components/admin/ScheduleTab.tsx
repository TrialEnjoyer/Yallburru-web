/* eslint-disable */
import { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, Upload, X, MapPin, Clock, User, FileText, ChevronDown, Bell, SquareArrowUpRightIcon, HelpCircle } from 'lucide-react';
import { supabase } from '~/utils/supabase';
import { type Database } from '~/types/supabase';
import Papa from 'papaparse';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { type EventClickArg } from '@fullcalendar/core';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { format, startOfWeek, isSameWeek, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Database types that match our actual schema
type DbSchedule = {
  shift_id: string;
  name: string;
  address: string;
  staff: string;
  staff_id: string;
  start_date_time: string;
  end_date_time: string;
  hours: number;
  mileage: number | null;
  expense: number | null;
  absent: boolean | null;
  shift_status: string;
  cancelled_reason: string | null;
  clockin_date_time: string | null;
  clockout_date_time: string | null;
  shift_type: string;
  url: string | null;
  note: string | null;
};

// Type for the Supabase table
type SupabaseSchedule = {
  shift_id: string;
  name: string;
  address: string;
  staff: string;
  staff_id: string;
  start_date_time: string;
  end_date_time: string;
  hours: number;
  mileage: number | null;
  expense: number | null;
  absent: boolean | null;
  shift_status: string;
  cancelled_reason: string | null;
  clockin_date_time: string | null;
  clockout_date_time: string | null;
  shift_type: string;
  url: string | null;
  note: string | null;
};

// Calendar event type that matches FullCalendar's requirements
type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  className?: string;
  extendedProps: {
    staff: string;
    staff_id: string;
    shift_type: string;
    shift_status: string;
    hours: number;
    mileage: number | null;
    expense: number | null;
    absent: boolean | null;
    note: string | null;
  };
};

interface CSVRow extends Record<string, string> {
  'Shift ID': string;
  'Name': string;
  'Address': string;
  'Staff': string;
  'Staff ID': string;
  'Start Date Time': string;
  'End Date Time': string;
  'Hours': string;
  'Mileage': string;
  'Expense': string;
  'Absent': string;
  'Shift Status': string;
  'Cancelled Reason': string;
  'Clockin Date Time': string;
  'Clockout Date Time': string;
  'Shift Type': string;
  'URL': string;
  'Note': string;
}

// Add new type for selected event
type SelectedEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  staff: string;
  staff_id: string;
  shift_type: string;
  shift_status: string;
  hours: number;
  mileage: number | null;
  expense: number | null;
  absent: boolean | null;
  note: string | null;
  address: string;
} | null;

// Add EventApi type
type EventApi = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    staff: string;
    staff_id: string;
    shift_type: string;
    shift_status: string;
    hours: number;
    mileage: number | null;
    expense: number | null;
    absent: boolean | null;
    note: string | null;
    location: string;
  };
};

// Add new types for compliance tracking
type StaffCompliance = {
  staff: string;
  staff_id: string;
  totalShifts: number;
  missingClockIn: number;
  missingClockOut: number;
  missingNotes: number;
  incompleteShifts: DbSchedule[];
};

// Add cache types
type ComplianceCache = {
  data: StaffCompliance[];
  timestamp: number;
  weekStart: string; // ISO string of the week start
};

// Add new types for upcoming shifts
type ShiftStatus = 'upcoming' | 'in-progress' | 'completed';

type UpcomingShift = {
  shift_id: string;
  staff: string;
  staff_id: string;
  start_date_time: Date;
  end_date_time: Date;
  name: string;
  shift_type: string;
  address: string;
  hasClockIn: boolean;
  hasClockOut: boolean;
  hasNotes: boolean;
};

// Add new type for SMS message modal
type SmsModalShift = UpcomingShift | null;

// Add new types at the top with other types
type LastUploadInfo = {
  timestamp: number;
  date: string;
};

// Add new constants after CACHE_KEY
const LAST_UPLOAD_KEY = 'last_csv_upload';
const MORNING_REMINDER_HOUR = 6;
const EVENING_REMINDER_HOUR = 17;
const EVENING_REMINDER_MINUTE = 30;

// Add new constants for care work shift types
const CARE_WORK_SHIFT_TYPES = [
  "Assistance with daily living",
  "Garden lawns light",
  "Domestic assistance",
  "Individual social support",
  "Domestic assistance",
  "Personal Care"
];

// Add new functions before the return statement
const checkAndSetLastUpload = () => {
  try {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    if (!todayStr) throw new Error('Failed to get today\'s date');
    
    const lastUploadInfo: LastUploadInfo = {
      timestamp: Date.now(),
      date: todayStr
    };
    localStorage.setItem(LAST_UPLOAD_KEY, JSON.stringify(lastUploadInfo));
  } catch (err) {
    console.error('Error setting last upload info:', err);
  }
};

const getLastUploadInfo = (): LastUploadInfo | null => {
  try {
    const stored = localStorage.getItem(LAST_UPLOAD_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as LastUploadInfo;
    if (!parsed?.timestamp || !parsed?.date) return null;
    
    return parsed;
  } catch (err) {
    console.error('Error getting last upload info:', err);
    return null;
  }
};

const shouldShowUploadReminder = (): boolean => {
  const lastUpload = getLastUploadInfo();
  if (!lastUpload) return true;

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  if (!todayStr) return true;
  
  // If last upload was not today, we should show reminder
  if (lastUpload.date !== todayStr) return true;
  
  return false;
};

// Move the checkUploadReminders inside the component to access notificationsEnabled state
export default function ScheduleTab() {
  const [view, setView] = useState<'calendar' | 'import'>('calendar');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent>(null);
  const [complianceData, setComplianceData] = useState<StaffCompliance[]>([]);
  const [expandedStaff, setExpandedStaff] = useState<Set<string>>(new Set());
  const [upcomingShifts, setUpcomingShifts] = useState<UpcomingShift[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const updateTimerRef = useRef<NodeJS.Timeout>();
  const [selectedSmsShift, setSelectedSmsShift] = useState<SmsModalShift>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showOnlyCareWork, setShowOnlyCareWork] = useState(false);
  const [showOnlyCareWorkUpcoming, setShowOnlyCareWorkUpcoming] = useState(false);

  const CACHE_KEY = 'compliance_data_cache';

  // Add type guard for cache validation
  const isValidCache = (data: unknown): data is ComplianceCache => {
    if (!data || typeof data !== 'object') return false;
    const cache = data as Partial<ComplianceCache>;
    return !!(
      Array.isArray(cache.data) &&
      typeof cache.timestamp === 'number' &&
      typeof cache.weekStart === 'string'
    );
  };

  const getComplianceCache = (): ComplianceCache | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      
      const parsedData: unknown = JSON.parse(cached);
      if (!isValidCache(parsedData)) return null;

      const now = new Date();
      if (!(now instanceof Date)) return null;

      const currentWeekStart = startOfWeek(now, { weekStartsOn: 1, locale: enUS }) as Date;
      if (!(currentWeekStart instanceof Date)) return null;

      let cachedWeekStart: Date;
      try {
        const parsed = parseISO(parsedData.weekStart);
        if (!(parsed instanceof Date)) return null;
        cachedWeekStart = parsed;
      } catch {
        return null;
      }
      
      if (!isSameWeek(currentWeekStart, cachedWeekStart, { weekStartsOn: 1, locale: enUS })) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      
      return parsedData;
    } catch (err) {
      console.error('Error reading compliance cache:', err);
      return null;
    }
  };

  const setComplianceCache = (data: StaffCompliance[]) => {
    try {
      const now = new Date();
      if (!(now instanceof Date)) throw new Error('Invalid date');
      
      const currentWeekStart = startOfWeek(now, { weekStartsOn: 1, locale: enUS }) as Date;
      if (!(currentWeekStart instanceof Date)) throw new Error('Invalid week start date');

      const cacheData: ComplianceCache = {
        data,
        timestamp: Date.now(),
        weekStart: currentWeekStart.toISOString()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      console.error('Error setting compliance cache:', err);
    }
  };

  useEffect(() => {
    void fetchEvents();
    void getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
    }
  };

  const getCurrentWeekBounds = (targetDate?: Date) => {
    const now = targetDate ?? new Date();
    // Get the current date
    const currentDate = new Date(now);
    
    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // Calculate the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  };

  const getComplianceBounds = () => {
    const now = new Date();
    
    // Get the start of the current week (Monday)
    const currentWeekStart = new Date(now);
    const currentDay = currentWeekStart.getDay();
    const diff = currentWeekStart.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    currentWeekStart.setDate(diff);
    currentWeekStart.setHours(0, 0, 0, 0);
    
    // End date is the day before the current week started
    const endDate = new Date(currentWeekStart);
    endDate.setDate(endDate.getDate() - 1);
    endDate.setHours(23, 59, 59, 999);
    
    // Start date is 28 days (4 weeks) before the end date
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 27); // -27 because end date is inclusive
    startDate.setHours(0, 0, 0, 0);

    return { startDate, endDate };
  };

  const analyzeStaffCompliance = (shifts: DbSchedule[]) => {
    const staffMap = new Map<string, StaffCompliance>();

    shifts.forEach(shift => {
      let staffData = staffMap.get(shift.staff_id);
      if (!staffData) {
        staffData = {
          staff: shift.staff,
          staff_id: shift.staff_id,
          totalShifts: 0,
          missingClockIn: 0,
          missingClockOut: 0,
          missingNotes: 0,
          incompleteShifts: []
        };
        staffMap.set(shift.staff_id, staffData);
      }

      staffData.totalShifts++;
      let isIncomplete = false;

      if (!shift.clockin_date_time) {
        staffData.missingClockIn++;
        isIncomplete = true;
      }
      if (!shift.clockout_date_time) {
        staffData.missingClockOut++;
        isIncomplete = true;
      }
      if (!shift.note) {
        staffData.missingNotes++;
        isIncomplete = true;
      }

      if (isIncomplete) {
        staffData.incompleteShifts.push(shift);
      }
    });

    return Array.from(staffMap.values())
      .filter(staff => staff.missingClockIn > 0 || staff.missingClockOut > 0 || staff.missingNotes > 0)
      .sort((a, b) => {
        // Sort by total number of missing items
        const aMissing = a.missingClockIn + a.missingClockOut + a.missingNotes;
        const bMissing = b.missingClockIn + b.missingClockOut + b.missingNotes;
        return bMissing - aMissing;
      });
  };

  const transformToCalendarEvent = (dbEvent: DbSchedule): CalendarEvent => {
    // Convert UTC ISO string to local time
    const utcStart = new Date(dbEvent.start_date_time);  // Already in UTC
    const utcEnd = new Date(dbEvent.end_date_time);      // Already in UTC
    
    // Convert to local ISO strings by SUBTRACTING the offset
    // (negative offset means we're ahead of UTC, positive means we're behind)
    const localStart = new Date(utcStart.getTime() - (utcStart.getTimezoneOffset() * 60000));
    const localEnd = new Date(utcEnd.getTime() - (utcEnd.getTimezoneOffset() * 60000));

    return {
      id: dbEvent.shift_id,
      title: `${dbEvent.name} - ${dbEvent.shift_type}`,
      start: localStart.toISOString(),
      end: localEnd.toISOString(),
      description: `Staff: ${dbEvent.staff}\nLocation: ${dbEvent.address}\n${dbEvent.note ?? ''}`.trim(),
      location: dbEvent.address,
      className: `${dbEvent.absent ? 'bg-red-100' : ''} calendar-event`,
      extendedProps: {
        staff: dbEvent.staff,
        staff_id: dbEvent.staff_id,
        shift_type: dbEvent.shift_type,
        shift_status: dbEvent.shift_status,
        hours: dbEvent.hours,
        mileage: dbEvent.mileage,
        expense: dbEvent.expense,
        absent: dbEvent.absent,
        note: dbEvent.note
      }
    };
  };

  const fetchEvents = async (targetDate?: Date) => {
    setIsLoading(true);
    try {
      // Fetch current week data for calendar display
      const { startOfWeek: calendarStart, endOfWeek } = getCurrentWeekBounds(targetDate);
      
      console.log('Fetching calendar events between:', {
        start: calendarStart.toISOString(),
        end: endOfWeek.toISOString()
      });
      
      const { data: calendarData, error: calendarError } = await supabase
        .from('schedules')
        .select('*')
        .gte('start_date_time', calendarStart.toISOString())
        .lte('start_date_time', endOfWeek.toISOString())
        .order('start_date_time', { ascending: true });

      if (calendarError) throw calendarError;

      // Process calendar events
      const calendarEvents = (calendarData as unknown as DbSchedule[]).map(transformToCalendarEvent);
      setEvents(calendarEvents);

      // Check cache for compliance data
      const cachedCompliance = getComplianceCache();
      let complianceResult: StaffCompliance[] = [];

      if (cachedCompliance) {
        console.log('Using cached compliance data');
        complianceResult = cachedCompliance.data;
        setComplianceData(cachedCompliance.data);
      } else {
        console.log('Fetching fresh compliance data');
        // Fetch previous four weeks data for compliance checking
        const { startDate, endDate } = getComplianceBounds();
        
        const { data: complianceData, error: complianceError } = await supabase
          .from('schedules')
          .select('*')
          .gte('start_date_time', startDate.toISOString())
          .lte('start_date_time', endDate.toISOString())
          .order('start_date_time', { ascending: true });

        if (complianceError) throw complianceError;

        // Process compliance data
        complianceResult = analyzeStaffCompliance(complianceData as unknown as DbSchedule[]);
        setComplianceData(complianceResult);
        setComplianceCache(complianceResult);
      }
      
      
      // Fetch upcoming shifts for staff requiring attention
      if (complianceResult.length > 0) {
        const staffIds = complianceResult.map(staff => staff.staff_id);
        const now = new Date();
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const { data: upcomingData, error: upcomingError } = await supabase
          .from('schedules')
          .select('*')
          .in('staff_id', staffIds)
          .gte('start_date_time', now.toISOString())
          .lte('start_date_time', nextWeek.toISOString())
          .order('start_date_time', { ascending: true });

        if (upcomingError) throw upcomingError;

        // Add helper function for timezone conversion
        const convertToLocalTime = (dateString: string): Date => {
          const utcDate = new Date(dateString);  // Already in UTC
          // Convert to local time by subtracting the offset
          // (negative offset means we're ahead of UTC, positive means we're behind)
          return new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
        };

        const upcoming = (upcomingData as unknown as DbSchedule[]).map(shift => ({
          shift_id: shift.shift_id,
          staff: shift.staff,
          staff_id: shift.staff_id,
          start_date_time: convertToLocalTime(shift.start_date_time),
          end_date_time: convertToLocalTime(shift.end_date_time),
          name: shift.name,
          shift_type: shift.shift_type,
          address: shift.address,
          hasClockIn: !!shift.clockin_date_time,
          hasClockOut: !!shift.clockout_date_time,
          hasNotes: !!shift.note
        }));

        setUpcomingShifts(upcoming);
      } else {
        setUpcomingShifts([]);
      }
    } catch (err) {
      setError('Failed to load events');
      console.error('Error loading events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    Papa.parse<CSVRow>(file, {
      header: true,
      complete: (results) => {
        void (async () => {
          try {
            // Create a Map to store the latest version of each shift
            const shiftsMap = new Map<string, SupabaseSchedule>();
            
            // Find the earliest date in the CSV
            let earliestDate: Date | null = null;
            
            results.data
              .filter((row): row is CSVRow => Boolean(row['Shift ID'] && row['Start Date Time']))
              .forEach((row) => {
                const startDate = new Date(row['Start Date Time']);
                if (!earliestDate || startDate < earliestDate) {
                  earliestDate = startDate;
                }

                // Create a unique composite key using shift_id and staff_id
                const uniqueKey = `${row['Shift ID']}_${row['Staff ID']}`;
                
                const schedule: SupabaseSchedule = {
                  shift_id: uniqueKey, // Use the composite key as the shift_id
                  name: row.Name,
                  address: row.Address,
                  staff: row.Staff,
                  staff_id: row['Staff ID'],
                  start_date_time: new Date(row['Start Date Time']).toISOString(),
                  end_date_time: new Date(row['End Date Time']).toISOString(),
                  hours: parseFloat(row.Hours),
                  mileage: row.Mileage ? parseFloat(row.Mileage) : null,
                  expense: row.Expense ? parseFloat(row.Expense) : null,
                  absent: row.Absent?.toLowerCase() === 'true',
                  shift_status: row['Shift Status'],
                  cancelled_reason: row['Cancelled Reason'] ?? null,
                  clockin_date_time: row['Clockin Date Time'] ? new Date(row['Clockin Date Time']).toISOString() : null,
                  clockout_date_time: row['Clockout Date Time'] ? new Date(row['Clockout Date Time']).toISOString() : null,
                  shift_type: row['Shift Type'],
                  url: row.URL ?? null,
                  note: row.Note ?? null
                };

                // If this shift already exists in the map, only update it if the new one is more recent
                const existing = shiftsMap.get(uniqueKey);
                if (!existing || new Date(schedule.start_date_time) > new Date(existing.start_date_time)) {
                  shiftsMap.set(uniqueKey, schedule);
                }
              });

            // Convert map to array of schedules
            const schedules = Array.from(shiftsMap.values());

            const { error } = await supabase
              .from('schedules')
              .upsert(schedules as unknown as Database['public']['Tables']['schedules']['Insert'][], {
                onConflict: 'shift_id',
                ignoreDuplicates: false // We want to update existing records
              });

            if (error) throw error;
            
            // After successful upload, fetch events for the week of the earliest date
            if (earliestDate) {
              await fetchEvents(earliestDate);
            }
            
            // After successful upload, update the last upload timestamp
            checkAndSetLastUpload();
            
            setView('calendar');
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to import events. Please check your CSV format.';
            setError(errorMessage);
            console.error('Error importing events:', err);
          } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }
        })();
      },
      error: (error: Error) => {
        setError('Failed to parse CSV file');
        console.error('CSV Parse Error:', error);
        setIsLoading(false);
      }
    });
  };

  const handleEventClick = ({ event }: EventClickArg) => {
    const eventData = event as unknown as EventApi;
    setSelectedEvent({
      id: eventData.id,
      title: eventData.title,
      start: eventData.start,
      end: eventData.end,
      staff: eventData.extendedProps.staff,
      staff_id: eventData.extendedProps.staff_id,
      shift_type: eventData.extendedProps.shift_type,
      shift_status: eventData.extendedProps.shift_status,
      hours: eventData.extendedProps.hours,
      mileage: eventData.extendedProps.mileage,
      expense: eventData.extendedProps.expense,
      absent: eventData.extendedProps.absent,
      note: eventData.extendedProps.note,
      address: eventData.extendedProps.location ?? ''
    });
  };

  // Add helper function to calculate total missing items
  const getTotalMissingItems = (staff: StaffCompliance) => {
    return staff.missingClockIn + staff.missingClockOut + staff.missingNotes;
  };

  // Request notification permissions
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setNotificationsEnabled(permission === 'granted');
      }
    };
    void requestNotificationPermission();
  }, []);

  // Set up real-time updates for upcoming shifts
  useEffect(() => {
    const updateUpcomingShifts = () => {
      const now = new Date();
      const filteredShifts = upcomingShifts.filter(shift => {
        return shift.end_date_time > now;
      });

      // Check for shifts that need notifications
      filteredShifts.forEach(shift => {
        const timeDiff = shift.start_date_time.getTime() - now.getTime();
        const minutesUntilStart = Math.floor(timeDiff / (1000 * 60));

        // Notify 30 minutes before shift starts
        // Using a range of 29-31 minutes to account for timing variations
        if (minutesUntilStart >= 29 && minutesUntilStart <= 31 && notificationsEnabled) {
          const startTime = format(shift.start_date_time, 'h:mm a');
          const endTime = format(shift.end_date_time, 'h:mm a');
          
          new Notification(`Upcoming Shift for ${shift.staff}`, {
            body: `Shift starts in 30 minutes (${startTime} - ${endTime})\nLocation: ${shift.address}\n\nReminders:\n✓ Clock in when starting\n✓ Add notes during shift\n✓ Clock out when finished`,
            icon: '/favicon.ico',
            tag: `shift-${shift.shift_id}`, // Prevent duplicate notifications
            requireInteraction: false
          });
        }
      });

      setUpcomingShifts(filteredShifts);
    };

    // Update every minute
    updateTimerRef.current = setInterval(updateUpcomingShifts, 60000);
    return () => {
      if (updateTimerRef.current) {
        clearInterval(updateTimerRef.current);
      }
    };
  }, [upcomingShifts, notificationsEnabled]);

  // Add type guard for Date objects
  const isValidDate = (date: unknown): date is Date => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Update the getShiftStatus function with proper type safety
  const getShiftStatus = (shift: UpcomingShift): ShiftStatus => {
    const now = new Date();
    if (!isValidDate(now)) return 'completed';
    
    if (!shift?.start_date_time || !shift?.end_date_time || 
        !isValidDate(shift.start_date_time) || !isValidDate(shift.end_date_time)) {
      return 'completed';
    }
    
    const startTime = shift.start_date_time.getTime();
    const endTime = shift.end_date_time.getTime();
    const currentTime = now.getTime();
    
    if (currentTime < startTime) return 'upcoming';
    if (currentTime >= startTime && currentTime <= endTime) return 'in-progress';
    return 'completed';
  };

  // Update the safe date formatting helper with proper type assertions
  const safeDateFormat = (date: Date | string | null | undefined, formatStr: string): string => {
    if (!date) return '';
    
    try {
      let dateObj: Date;
      
      if (typeof date === 'string') {
        try {
          const parsed = parseISO(date);
          if (!isValidDate(parsed)) return '';
          dateObj = parsed;
        } catch {
          return '';
        }
      } else if (date instanceof Date) {
        if (!isValidDate(date)) return '';
        dateObj = date;
      } else {
        return '';
      }
      
      try {
        const formatted = format(dateObj, formatStr, { locale: enUS });
        return formatted ?? '';
      } catch {
        return '';
      }
    } catch (err) {
      console.error('Error formatting date:', err);
      return '';
    }
  };

  // Update the generateSmsMessage function with proper type safety
  const generateSmsMessage = (shift: UpcomingShift): string => {
    if (!shift?.start_date_time || !shift?.end_date_time || 
        !isValidDate(shift.start_date_time) || !isValidDate(shift.end_date_time)) {
      return 'Error: Invalid shift times';
    }

    const startTime = safeDateFormat(shift.start_date_time, 'h:mm a') ?? '';
    const endTime = safeDateFormat(shift.end_date_time, 'h:mm a') ?? '';
    
    if (!startTime || !endTime) {
      return 'Error: Could not format shift times';
    }
    
    return `Yallburru - Upcoming shift:
${startTime} - ${endTime}

Please remember to:
- Clock in
- Add a note
- Clock out
and have a great shift!`;
  };

  // Add copy handler function
  const handleCopy = async () => {
    if (selectedSmsShift && !isCopied) {
      await navigator.clipboard.writeText(generateSmsMessage(selectedSmsShift));
      setIsCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const checkUploadReminders = useCallback(() => {
    if (!notificationsEnabled) return;
    
    const now = new Date();
    if (!(now instanceof Date)) return;

    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Check if we should show a reminder
    if (!shouldShowUploadReminder()) return;
    
    // Morning reminder at 6 AM
    if (hours === MORNING_REMINDER_HOUR && minutes === 0) {
      try {
        new Notification('CSV Upload Reminder', {
          body: 'Please remember to upload today\'s schedule CSV file.',
          icon: '/favicon.ico',
          tag: 'csv-reminder-morning',
          requireInteraction: true
        });
      } catch (err) {
        console.error('Failed to show morning reminder notification:', err);
      }
    }
    
    // Evening reminder at 5:30 PM
    if (hours === EVENING_REMINDER_HOUR && minutes === EVENING_REMINDER_MINUTE) {
      try {
        new Notification('CSV Upload Reminder', {
          body: 'Please ensure today\'s schedule CSV file has been uploaded.',
          icon: '/favicon.ico',
          tag: 'csv-reminder-evening',
          requireInteraction: true
        });
      } catch (err) {
        console.error('Failed to show evening reminder notification:', err);
      }
    }
  }, [notificationsEnabled]);

  // Add effect for checking reminders
  useEffect(() => {
    const checkReminders = () => {
      try {
        checkUploadReminders();
      } catch (err) {
        console.error('Error checking reminders:', err);
      }
    };

    // Check every minute for reminders
    const reminderInterval = setInterval(checkReminders, 60000);
    
    // Initial check
    checkReminders();
    
    return () => {
      clearInterval(reminderInterval);
    };
  }, [checkUploadReminders]); // Only depend on the memoized callback

  // Add filter function for care work shifts
  const filterCareWorkShifts = (shifts: DbSchedule[]): DbSchedule[] => {
    if (!shifts) return [];
    return shifts.filter(shift => CARE_WORK_SHIFT_TYPES.includes(shift.shift_type));
  };

  // Update the staff compliance section to include the filter
  const getFilteredComplianceData = (): StaffCompliance[] => {
    if (!showOnlyCareWork) return complianceData;
    
    return complianceData.map(staff => ({
      ...staff,
      incompleteShifts: filterCareWorkShifts(staff.incompleteShifts),
      totalShifts: filterCareWorkShifts(staff.incompleteShifts).length,
      missingClockIn: filterCareWorkShifts(staff.incompleteShifts.filter(s => !s.clockin_date_time)).length,
      missingClockOut: filterCareWorkShifts(staff.incompleteShifts.filter(s => !s.clockout_date_time)).length,
      missingNotes: filterCareWorkShifts(staff.incompleteShifts.filter(s => !s.note)).length,
    })).filter(staff => staff.totalShifts > 0);
  };

  // Update the upcoming shifts section to include the filter
  const getFilteredUpcomingShifts = (): UpcomingShift[] => {
    if (!showOnlyCareWorkUpcoming) return upcomingShifts;
    return upcomingShifts.filter(shift => CARE_WORK_SHIFT_TYPES.includes(shift.shift_type));
  };

  return (
    <div className="min-h-[600px] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'calendar'
                ? 'bg-sky-100 text-sky-600'
                : 'hover:bg-gray-100'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span className="ml-2">Calendar</span>
          </button>
          <button
            onClick={() => setView('import')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'import'
                ? 'bg-sky-100 text-sky-600'
                : 'hover:bg-gray-100'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span className="ml-2">Import CSV</span>
          </button>
        </div>
        <button
          onClick={() => setShowHelpModal(true)}
          className="flex items-center px-3 py-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <X className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      )}

      {/* Calendar View */}
      {!isLoading && view === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridDay,timeGridWeek,dayGridMonth'
              }}
              events={events}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              height="auto"
              aspectRatio={1.8}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              slotDuration="00:30:00"
              scrollTime="06:00:00"
              allDaySlot={false}
              nowIndicator={true}
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short',
                hour12: true
              }}
              displayEventTime={true}
              displayEventEnd={true}
              eventDisplay="block"
              timeZone="local"
              handleWindowResize={true}
              eventClick={handleEventClick}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Non-compliant Staff List */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Staff Requiring Attention</h3>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Care Work Only</span>
                    <button
                      onClick={() => setShowOnlyCareWork(!showOnlyCareWork)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                        showOnlyCareWork ? 'bg-sky-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`${
                          showOnlyCareWork ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                {getFilteredComplianceData().length === 0 ? (
                  <p className="text-gray-500 text-center py-4">All staff are up to date with their shift requirements!</p>
                ) : (
                  getFilteredComplianceData().map((staff) => {
                    const isExpanded = expandedStaff.has(staff.staff_id);
                    const totalMissing = getTotalMissingItems(staff);

                    return (
                      <div 
                        key={staff.staff_id}
                        className="border rounded-lg p-4 space-y-2 transition-all duration-200"
                      >
                        <div 
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => {
                            const newExpanded = new Set(expandedStaff);
                            if (isExpanded) {
                              newExpanded.delete(staff.staff_id);
                            } else {
                              newExpanded.add(staff.staff_id);
                            }
                            setExpandedStaff(newExpanded);
                          }}
                        >
                          <div>
                            <h4 className="font-medium">{staff.staff}</h4>
                            <p className="text-sm text-gray-600">ID: {staff.staff_id}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Total Shifts: {staff.totalShifts}</p>
                              <p className="text-sm font-medium text-red-600">Missing Items: {totalMissing}</p>
                            </div>
                            <ChevronDown 
                              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                isExpanded ? 'transform rotate-180' : ''
                              }`}
                            />
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="grid grid-cols-3 gap-4 pt-4 mt-2 border-t">
                            {staff.missingClockIn > 0 && (
                              <div className="text-center p-2 bg-red-50 rounded-lg">
                                <p className="text-lg font-semibold text-red-600">{staff.missingClockIn}</p>
                                <p className="text-xs text-gray-600">Missing Clock-ins</p>
                              </div>
                            )}
                            {staff.missingClockOut > 0 && (
                              <div className="text-center p-2 bg-orange-50 rounded-lg">
                                <p className="text-lg font-semibold text-orange-600">{staff.missingClockOut}</p>
                                <p className="text-xs text-gray-600">Missing Clock-outs</p>
                              </div>
                            )}
                            {staff.missingNotes > 0 && (
                              <div className="text-center p-2 bg-yellow-50 rounded-lg">
                                <p className="text-lg font-semibold text-yellow-600">{staff.missingNotes}</p>
                                <p className="text-xs text-gray-600">Missing Notes</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Upcoming Shifts */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Upcoming Shifts</h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Care Work Only</span>
                    <button
                      onClick={() => setShowOnlyCareWorkUpcoming(!showOnlyCareWorkUpcoming)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                        showOnlyCareWorkUpcoming ? 'bg-sky-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`${
                          showOnlyCareWorkUpcoming ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                  </label>
                  {!notificationsEnabled && (
                    <button
                      onClick={() => void Notification.requestPermission().then(
                        permission => setNotificationsEnabled(permission === 'granted')
                      )}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      <Bell className="w-4 h-4" />
                      Enable Notifications
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                {getFilteredUpcomingShifts().length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No upcoming shifts for staff requiring attention</p>
                ) : (
                    //first five
                    getFilteredUpcomingShifts().slice(0, 5).map((shift) => {
                    const status = getShiftStatus(shift);
                    return (
                      <div 
                        key={shift.shift_id}
                        className={`
                          border rounded-lg p-4 space-y-2 cursor-pointer hover:shadow-md transition-all duration-200
                          ${status === 'upcoming' ? 'bg-blue-50 border-blue-200' : ''}
                          ${status === 'in-progress' ? 'bg-green-50 border-green-200' : ''}
                        `}
                        onClick={() => setSelectedSmsShift(shift)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{shift.staff}</h4>
                            <p className="text-sm text-gray-600">{shift.name} - {shift.shift_type}</p>
                            <p className="text-sm text-gray-600">{shift.address}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {safeDateFormat(shift.start_date_time, 'h:mm a')} - {safeDateFormat(shift.end_date_time, 'h:mm a')}
                            </p>
                            <p className="text-xs text-gray-500">
                              {safeDateFormat(shift.start_date_time, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import View */}
      {!isLoading && view === 'import' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Import Schedule from CSV</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">CSV Format Requirements:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Required columns: Shift ID, Start Date Time</li>
                <li>Optional columns: Name, Address, Staff, Staff ID, End Date Time, Hours, Mileage, Expense, Absent, Shift Status, Cancelled Reason, Clockin Date Time, Clockout Date Time, Shift Type, URL, Note</li>
                <li>Dates should be in ISO format (YYYY-MM-DD HH:mm:ss)</li>
              </ul>
            </div>

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">CSV files only</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Example CSV Format:</h3>
              <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
                Shift ID,Name,Address,Staff,Staff ID,Start Date Time,End Date Time,Hours,Mileage,Expense,Absent,Shift Status,Cancelled Reason,Clockin Date Time,Clockout Date Time,Shift Type,URL,Note{'\n'}
                1,&quot;John Doe&quot;,&quot;123 Main St&quot;,&quot;John Doe&quot;,&quot;J12345&quot;,&quot;2024-03-20 08:00:00&quot;,&quot;2024-03-20 16:00:00&quot;,&quot;8&quot;,&quot;100&quot;,&quot;50&quot;,&quot;No&quot;,&quot;Active&quot;,&quot;&quot;,&quot;2024-03-20 08:00:00&quot;,&quot;2024-03-20 16:00:00&quot;,&quot;Full-time&quot;,&quot;&quot;,&quot;Regular shift&quot;{'\n'}
                2,&quot;Jane Smith&quot;,&quot;456 Elm St&quot;,&quot;Jane Smith&quot;,&quot;J67890&quot;,&quot;2024-03-21 09:00:00&quot;,&quot;2024-03-21 17:00:00&quot;,&quot;8&quot;,&quot;100&quot;,&quot;50&quot;,&quot;No&quot;,&quot;Active&quot;,&quot;&quot;,&quot;2024-03-21 09:00:00&quot;,&quot;2024-03-21 17:00:00&quot;,&quot;Full-time&quot;,&quot;&quot;,&quot;Regular shift&quot;
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title ?? 'Event Details'}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Time</div>
                  <div className="text-sm text-gray-600">
                    {safeDateFormat(selectedEvent.start, 'MMM d, yyyy h:mm a')} - {safeDateFormat(selectedEvent.end, 'h:mm a')}
                  </div>
                  <div className="text-sm text-gray-600">Duration: {selectedEvent.hours} hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Staff Details</div>
                  <div className="text-sm text-gray-600">{selectedEvent.staff}</div>
                  <div className="text-sm text-gray-600">ID: {selectedEvent.staff_id}</div>
                  <div className="text-sm text-gray-600">Type: {selectedEvent.shift_type}</div>
                  <div className="text-sm text-gray-600">Status: {selectedEvent.shift_status}</div>
                  {selectedEvent.absent && (
                    <div className="text-sm text-red-600 font-medium">Marked as Absent</div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-gray-600">{selectedEvent.address}</div>
                </div>
              </div>

              {selectedEvent.note && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Notes</div>
                    <div className="text-sm text-gray-600 whitespace-pre-wrap">{selectedEvent.note}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* SMS Message Modal */}
      <Dialog open={!!selectedSmsShift} onOpenChange={() => setSelectedSmsShift(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Shift Reminder Message</DialogTitle>
          </DialogHeader>
          {selectedSmsShift && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
                {generateSmsMessage(selectedSmsShift)}
              </div>
              <div className="flex justify-between gap-2">
                <button 
                  className='flex items-center gap-2' 
                  onClick={() => window.open('https://app.shiftcare.com/users/staff', '_blank')}
                >
                  <SquareArrowUpRightIcon className="w-4 h-4" /> 
                  Shiftcare
                </button>
                <button
                  onClick={handleCopy}
                  disabled={isCopied}
                  className={`
                    px-4 py-2 text-sm font-medium text-white rounded-lg
                    flex items-center gap-2 transition-all duration-200
                    ${isCopied 
                      ? 'bg-green-500 cursor-default' 
                      : 'bg-blue-500 hover:bg-blue-600'
                    }
                  `}
                >
                  {isCopied ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-[spin_600ms_ease-in-out]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    'Copy Message'
                  )}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Help Modal */}
      <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>How to Use the Schedule Manager</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Calendar View</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• View shifts in daily, weekly, or monthly format</li>
                <li>• Click on any shift to view detailed information</li>
                <li>• Navigate between dates using the arrows or 'Today' button</li>
                <li>• Color coding indicates shift status (upcoming, in-progress, completed)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">CSV Import</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Upload your schedule CSV file daily (recommended at start of day)</li>
                <li>• Upload CSV file at end of the day to update previous and upcoming shifts (recommended at ~5:30 PM)</li>
                <li>• System will remind you at 6:00 AM and 5:30 PM if no upload is detected</li>
                <li>• Ensure CSV format matches the provided example</li>
                <li>• All existing shifts will be updated with new information</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Staff Compliance</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Monitor staff compliance with clock-in/out and notes requirements</li>
                <li>• View upcoming shifts for staff requiring attention</li>
                <li>• Click on staff entries to see detailed compliance information</li>
                <li>• Enable notifications to receive reminders for upcoming shifts</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">SMS Reminders</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Click on any upcoming shift to generate an SMS reminder message</li>
                <li>• Copy the message with one click</li>
                <li>• Quick access to Shiftcare staff portal</li>
                <li>• System automatically formats shift times in local timezone</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 