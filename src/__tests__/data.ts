import { 
  addDays,
  addHours,
  addMonths,
  formatISO,
  isTuesday,
  nextMonday,
  nextTuesday,
  setDay,
  setHours,
  setMinutes,
} from 'date-fns';

const todayWithoutTimeZone = new Date();
const timeZoneOffset = todayWithoutTimeZone.getTimezoneOffset();
const offset = timeZoneOffset < 0 ? Math.abs(timeZoneOffset / -60) : 0 -(timeZoneOffset/60)
const todayWithTimeZone = addHours(todayWithoutTimeZone, offset)
const tomorrow = addDays(todayWithTimeZone, 1);

const tomorrowAfternoon = formatISO(setMinutes(setHours(tomorrow, 14), 0));
const tomorrowAfternoonAt5 = formatISO(setMinutes(setHours(tomorrow, 17), 0));
const tuesdayTenThirdy = formatISO(setMinutes(setHours(isTuesday(todayWithTimeZone) ? todayWithTimeZone : nextTuesday(todayWithTimeZone), 10), 30));
const monday3PM = formatISO(setMinutes(setHours(nextMonday(todayWithTimeZone), 15), 0))
const dateAfter3Days = formatISO(setMinutes(setHours(addDays(todayWithTimeZone, 3), 9), 0))
const firstDayNextMonth = formatISO(setDay(addMonths(todayWithTimeZone, 1), 1))
const nextWeekToday = formatISO(addDays(todayWithTimeZone, 7))

export const generateAppointmentData = () => {

  return [
    {"text": "Randevu talebim için 13 Temmuz 2023 saat 14:00 uygun mu?", "result": {"dateTimeStr": "2023-07-13T14:00:00","intent": "new_appointment"}},
    {"text": "Yarın öğleden sonra bir randevu alabilir miyim?", "result": {"dateTimeStr": tomorrowAfternoon,"intent": "new_appointment"}},
    {"text": "Yarın öğleden sonra saat 17 de randevu alabilir miyim?", "result": {"dateTimeStr": tomorrowAfternoonAt5,"intent": "new_appointment"}},
    {"text": "Salı günü saat 10:30 için bir toplantı planlamak istiyorum.", "result": {"dateTimeStr": tuesdayTenThirdy,"intent": "new_appointment"}},
    {"text": "14 Temmuz 2023 Cuma günü için bir randevu talebim var.", "result": {"dateTimeStr": "2023-07-14T09:00:00","intent": "new_appointment"}},
    {"text": "Bir randevu saati ayarlamak istiyorum. Pazartesi saat 15:00 uygun mu?", "result": {"dateTimeStr": monday3PM,"intent": "new_appointment"}},
    {"text": "Bir toplantı planlamak için 3 gün sonra bir tarih önerebilir misiniz?", "result": {"dateTimeStr": dateAfter3Days,"intent": "new_appointment"}},
    {"text": "Önümüzdeki hafta içinde bir randevu ayarlayabilir misiniz?", "result": {"dateTimeStr": nextWeekToday,"intent": "new_appointment"}},
    {"text": "Gelecek ay için bir randevu talebim var. Hangi gün uygun olur?", "result": {"dateTimeStr": firstDayNextMonth,"intent": "new_appointment"}},
    {"text": "Bir randevu saati belirlemek istiyorum. En erken müsait zaman nedir?", "result": {"dateTimeStr": "N/A","intent": "new_appointment"}}, 
  ]
};

export const generateNonAppointmentData = () => {
  return [
    {"text": "27 Şubat 1996 benim doğum günüm", "result": {"dateTimeStr": "1996-02-27T09:00:00","intent": "other"}},
    {"text": "Bugün bir kitap kulübü toplantısı var.", "result": {"dateTimeStr": "N/A","intent": "other"}},
    {"text": "İlerleyen saatlerde hafif bir yağmur bekleniyor.", "result": {"dateTimeStr": "N/A","intent": "other"}},
    {"text": "Yaşamak, başkaları için yaşamaya değer.", "result": {"dateTimeStr": "N/A","intent": "other"}},
    {"text": "Kuşlar ötüyor.", "result": {"dateTimeStr": "N/A","intent": "other"}},
    {"text": "Merhaba nasılsın?", "result": {"dateTimeStr": "N/A","intent": "other"}},
    {"text": "Önümüzdeki ay araç fiyatlarına minimum % kaç zam beklenmektedir?", "result": {"dateTimeStr": firstDayNextMonth,"intent": "other"}},
  ]
};  
  